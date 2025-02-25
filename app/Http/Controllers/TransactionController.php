<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Transaction;
use App\Models\TransactionCategory;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    /**
     * Display the companies listing.
     */
    public function index(Request $request): Response
    {

        $user = Auth::user();

        if ($user->hasPermission('view-any-transaction')) {
            $transactions = Transaction::with(['account.company'])->paginate(10);
        } elseif ($user->hasPermission('view-transaction')) {
            $transactions = Transaction::whereHas('account', function ($query) use ($user) {
                $query->where('company_id', $user->company_id);
            })->with(['account.company'])->paginate(10);
        } else {
            // If the user doesn't have permission to view any transactions, return an empty collection.
            $transactions = collect();
        }

        return Inertia::render('Dashboard/Transaction/Index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'transactions' => $transactions ?? []
        ]);
    }

    public function create(Request $request)
    {
        $user = Auth::user();
        if ($user->hasPermission('create-transaction')) {
            return Inertia::render('Dashboard/Transaction/Create', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
                'transactionCategories' => TransactionCategory::select('id', 'name')->get() ?? []
            ]);
        }
        return Inertia::location('/dashboard');
    }

    public function store(Request $request)
    {
        $request->validate([
            'request_date' => 'required|date',
            'payment_type' => 'required|string',
            'amount' => 'required|numeric',
            'payment_date' => 'required|date',
            'file' => 'file|mimes:pdf,jpg,jpeg,png',
        ]);

        try {
            $path = $request->file('file')->store('transactions', 's3');

            $paymentRequest = new Transaction([
                'request_date' => $request->input('request_date'),
                'payment_type' => $request->input('payment_type'),
                'pix_key' => $request->input('pix_key'),
                'key_type' => $request->input('key_type'),
                'recipient_name' => $request->input('recipient_name'),
                'amount' => $request->input('amount'),
                'payment_date' => $request->input('payment_date'),
                'remarks' => $request->input('remarks'),
                'barcode_number' => $request->input('barcode_number'),
                'file_url' => null
            ]);

            $paymentRequest->save();

            return redirect()->route('transaction.index');
        } catch (\Exception $exception) {
            // If an exception occurs, delete the file from S3
            if (isset($path) && Storage::disk('s3')->exists($path)) {
                Storage::disk('s3')->delete($path);
            }

            // Handle the error, log it, or return a response as needed
            return redirect()->back()->with('error', 'An error occurred while processing your request.');
        }
    }

    public function edit(Request $request, $id)
    {
        $transaction = Transaction::findOrFail($id);
        $company = Company::findOrFail($id);
        $users = User::where('company_id', $id)->paginate(10);

        return Inertia::render('Dashboard/Transaction/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'transaction' => $transaction,
            'company' => $company,
            'users' => $users
        ]);
    }

    public function update($id, Request $request): RedirectResponse
    {
        $company = Company::findOrFail($id);
        $company->name = $request->input('name');
        $company->short_name = $request->input('short_name');
        $company->tax_id = $request->input('tax_id');
        $company->save();

        return redirect()->route('company.index');
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $transaction = Transaction::findOrFail($id);
            $transaction->delete();
            return redirect()->route('transaction.index')->with('message', 'Record deleted successfully');
        } catch (\Exception $e) {
            return redirect()->route('transaction.index')->with('message', 'Erro ao excluir transação');
        }
    }
}
