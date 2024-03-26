<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\TransactionCategoryGroup;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function index(Request $request): Response {

        $user = Auth::user();
        if ($user->hasPermission('view-transaction-category-group')) {
            $groups = TransactionCategoryGroup::with([
                'transactionCategorySubgroups' => function ($query) {
                $query->with('transactionCategories');
            }, 'transactionCategories' => function ($query) use ($request) {
                $query->where('transaction_category_subgroup_id', null);
            }])
            ->when($request->input('companyId'), function ($query, $companyId) {
                return $query->where('company_id', $companyId);
            })
            ->orWhereNull('company_id')
            ->get();
        } else {
            $groups = collect();
        }

        return Inertia::render('Dashboard/Settings', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'groups' => $groups
        ]);
    }
}
