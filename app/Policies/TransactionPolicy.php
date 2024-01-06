<?php

namespace App\Policies;

use App\Models\Company;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TransactionPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('view-any-transaction');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Transaction $transaction): bool
    {
        return $user->hasPermission('view-transaction') && ($user->isAdmin() || $user->company_id == $transaction->company_id);
    }

    public function create(User $user): bool
    {
        return $user->hasPermission('create-transaction');
    }

    public function update(User $user, Transaction $company): bool
    {
        return $user->hasPermission('edit-transaction') && ($user->isAdmin() || $user->company_id == $company->id);
    }
}
