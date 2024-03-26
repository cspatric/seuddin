<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Customer;
use App\Models\Employee;
use App\Models\Supplier;
use App\Models\Transaction;
use App\Models\TransactionCategory;
use Endeken\OFX\OFX;
use Exception;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ConciliationController extends Controller
{
    public function edit(Request $request): Response
    {

        $user = Auth::user();

        if ($user->hasPermission('view-any-transaction')) {
            $account = Account::findOrFail($request->id);
            $customers = Customer::where('company_id', $account->company_id)->get();
            $employees = Employee::where('company_id', $account->company_id)->get();
            $suppliers = Supplier::where('company_id', $account->company_id)->get();
            $categories = TransactionCategory::where('company_id', $user->company_id)->get();
            $transactions = Transaction::with(['account.company'])
                ->where('status', 'new')
                ->where('account_id', $request->id)
                ->paginate(10);
        } elseif ($user->hasPermission('view-transaction')) {
            // TODO: These queries should have a different logic, maybe around a permission check?
            $account = Account::findOrFail($request->id);
            $customers = Customer::where('company_id', $account->company_id)->get();
            $employees = Employee::where('company_id', $account->company_id)->get();
            $suppliers = Supplier::where('company_id', $account->company_id)->get();
            $categories = TransactionCategory::where('company_id', $user->company_id)->get();
            $transactions = Transaction::whereHas('account', function ($query) use ($user) {
                $query->where('company_id', $user->company_id);
            })->with(['account.company'])->paginate(10);
        } else {
            // If the user doesn't have permission to view any transactions, return an empty collection.
            $account = null;
            $customers = collect();
            $employees = collect();
            $suppliers = collect();
            $categories = collect();
            $transactions = collect();
        }

        return Inertia::render('Dashboard/Account/Conciliation', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'account' => $account,
            'transactions' => $transactions ?? [],
            'customers' => $customers,
            'employees' => $employees,
            'suppliers' => $suppliers,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $request->validate([
            'transactionId' => 'required|numeric',
            'transactionType' => 'required|string',
            'associationType' => 'string',
            'associationId' => 'required|numeric',
            'categoryId' => 'required|numeric',
            'description' => 'string',
//            'files' => 'files|mimes:pdf,jpg,jpeg,png',
        ]);

        $transaction = Transaction::findOrFail($request->transactionId);
        $transaction->type = $request->transactionType;
        switch ($request->associationType) {
            case 'customer':
                $transaction->customer_id = $request->associationId;
                break;
            case 'supplier':
                $transaction->supplier_id = $request->associationId;
                break;
            case 'employee':
                $transaction->employee_id = $request->associationId;
                break;
        }
        $transaction->transaction_category_id = $request->categoryId;
        $transaction->description = $request->description;

        if ($request->hasFile('files')) {
            $files = $request->file('files');
            foreach ($files as $file) {
                $path = $file->store('transactions');
                $transaction->files()->create([
                    'path' => $path,
                    'filename' => $file->getClientOriginalName(),
                ]);
            }
        }
        $transaction->status = 'completed';

        $transaction->save();

        return redirect()->route('conciliation.edit', $transaction->account_id);
    }

    /**
     * @throws Exception
     */
    public function upload(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'file' => 'required|file',
        ]);

        $file = $request->file('file');

        $contents = \File::get($file->getRealPath());

        $ofx = OFX::parse($contents);

        foreach ($ofx->bankAccounts as $bankAccount) {
            foreach ($bankAccount->statement->transactions as $transaction) {
                Transaction::create([
                    'account_id' => $request->id,
                    'amount' => $transaction->amount,
                    'remarks' => $transaction->memo,
                    'date' => $transaction->date,
                    'balance' => 0,
                    'status' => 'new'
                ]);
            }
        }

        $transactions = Transaction::whereHas('account', function ($query) use ($user) {
            $query->where('company_id', $user->company_id);
        })->with(['account.company'])->paginate(10);

        return redirect()->route('conciliation.edit', $request->id);
    }
}
