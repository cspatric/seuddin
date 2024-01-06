<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Bank;
use App\Models\PaymentRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function index(Request $request): Response
    {
        $user = Auth::user();
        if ($user->hasPermission('view-any-account')) {
            $accounts = Account::with(['company', 'bank', 'transactions' => function ($query) use ($request) {
                $query
                    ->when($request->input('startDate'), function ($query, $startDate) {
                        return $query->where('date', '>=', $startDate);
                    })
                    ->when($request->input('endDate'), function ($query, $endDate) {
                        return $query->where('date', '<=', $endDate);
                    })
                    ->orderBy('date', 'asc');
            }])
                ->when($request->input('companyId'), function ($query, $companyId) {
                    return $query->where('company_id', $companyId);
                })
                ->paginate(10);
        } elseif ($user->hasPermission('view-account')) {
            $accounts = Account::where('company_id', $user->company_id)->with('company', 'bank', 'transactions')->paginate(10);
        } else {
            $accounts = collect();
        }
        return Inertia::render('Dashboard/Account/Index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'accounts' => $accounts
        ]);
    }

    public function create(Request $request)
    {
        $banks = Bank::all();
        return Inertia::render('Dashboard/Account/Create', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'banks' => $banks
        ]);
    }

    public function store(Request $request)
    {
        $company = new Account([
            'bank_id' => $request->input('bank_id'),
            'company_id' => $request->input('company_id'),
            'bank_agency_number' => $request->input('bank_agency_number'),
            'bank_account_number' => $request->input('bank_account_number'),
            'bank_account_verification_digit' => $request->input('bank_account_verification_digit'),
            'balance' => $request->input('balance'),
            'balance_date' => $request->input('balance_date'),
            'description' => $request->input('description')
        ]);

        $company->save();

        return redirect()->route('account.index');
    }

    public function edit(Request $request, $id)
    {
        $banks = Bank::all();
        $account = Account::findOrFail($id);
        $users = User::where('company_id', $id)->paginate(10);

        return Inertia::render('Dashboard/Account/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'account' => $account,
            'users' => $users,
            'banks' => $banks
        ]);
    }

    public function update($id, Request $request): RedirectResponse
    {
        $account = Account::findOrFail($id);
        $account->bank_id = $request->input('bank_id');
        $account->company_id = $request->input('company_id');
        $account->bank_agency_number = $request->input('bank_agency_number');
        $account->bank_account_number = $request->input('bank_account_number');
        $account->bank_account_verification_digit = $request->input('bank_account_verification_digit');
        $account->balance = $request->input('balance');
        $account->balance_date = $request->input('balance_date');
        $account->description = $request->input('description');
        $account->save();

        return redirect()->route('account.index');
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $account = Account::findOrFail($id);
            $account->delete();
            return redirect()->route('account.index')->with('message', 'Record deleted successfully');
        } catch (\Exception $e) {
            return redirect()->route('account.index')->with('message', 'Erro ao excluir conta');
        }
    }
}
