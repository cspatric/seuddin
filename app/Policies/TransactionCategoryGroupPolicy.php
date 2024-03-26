<?php

namespace App\Policies;

use App\Models\TransactionCategoryGroup;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TransactionCategoryGroupPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {

    }

    public function view(User $user, TransactionCategoryGroup $transactionCategoryGroup): bool
    {
    }

    public function create(User $user): bool
    {
    }

    public function update(User $user, TransactionCategoryGroup $transactionCategoryGroup): bool
    {
    }

    public function delete(User $user, TransactionCategoryGroup $transactionCategoryGroup): bool
    {
    }

    public function restore(User $user, TransactionCategoryGroup $transactionCategoryGroup): bool
    {
    }

    public function forceDelete(User $user, TransactionCategoryGroup $transactionCategoryGroup): bool
    {
    }
}
