<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\TransactionCategory;
use App\Models\TransactionCategoryGroup;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function create(Request $request): Response {
        $user = Auth::user();
        if ($user->hasPermission('create-transaction-category')) {
            $transactionCategories = TransactionCategoryGroup::with(['transactionCategorySubgroups'])->get();
        } else {
            $transactionCategories = collect();
        }
        return Inertia::render('Dashboard/Category/Create', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'transactionCategories' => $transactionCategories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'type' => 'required|string',
            'company_id' => 'required|numeric',
            'transaction_category_group_id' => 'required|numeric'
        ]);

        $transactionCategory = new TransactionCategory([
            'name' => $request->input('name'),
            'type' => $request->input('type'),
            'company_id' => $request->input('company_id'),
            'transaction_category_group_id' => $request->input('transaction_category_group_id'),
            'transaction_category_subgroup_id' => $request->input('transaction_category_subgroup_id'),
        ]);

        $transactionCategory->save();

        return redirect()->route('settings.index');
    }
}
