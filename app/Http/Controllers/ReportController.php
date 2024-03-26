<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(Request $request): Response
    {

        $user = Auth::user();

        if ($user->hasPermission('view-any-transaction')) {
            $transactions = Transaction::with(['account.company'])->get();
        } elseif ($user->hasPermission('view-transaction')) {
            $transactions = Transaction::whereHas('account', function ($query) use ($user) {
                $query->where('company_id', $user->company_id);
            })->with(['account.company'])->get();
        } else {
            // If the user doesn't have permission to view any transactions, return an empty collection.
            $transactions = collect();
        }

        return Inertia::render('Dashboard/Report/Index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'transactions' => $transactions ?? []
        ]);
    }
}
