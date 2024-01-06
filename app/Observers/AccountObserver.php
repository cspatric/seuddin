<?php

namespace App\Observers;

use App\Models\Account;
use App\Models\Transaction;

class AccountObserver
{
    /**
     * Handle the Account "created" event.
     */
    public function created(Account $account): void
    {
        Transaction::create([
            'account_id' => $account->id,
            'amount' => $account->balance,
            'remarks' => 'Saldo inicial',
            'date' => $account->balance_date,
            'balance' => 0,
            'status' => 'completed'
        ]);
    }

    /**
     * Handle the Account "updated" event.
     */
    public function updated(Account $account): void
    {
        //
    }

    /**
     * Handle the Account "deleted" event.
     */
    public function deleted(Account $account): void
    {
        //
    }

    /**
     * Handle the Account "restored" event.
     */
    public function restored(Account $account): void
    {
        //
    }

    /**
     * Handle the Account "force deleted" event.
     */
    public function forceDeleted(Account $account): void
    {
        //
    }
}
