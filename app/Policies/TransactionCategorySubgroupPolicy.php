<?php

namespace App\Policies;

use App\Models\TransactionCategorySubgroup;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TransactionCategorySubgroupPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {

    }

    public function view(User $user, TransactionCategorySubgroup $transactionCategorySubgroup): bool
    {
    }

    public function create(User $user): bool
    {
    }

    public function update(User $user, TransactionCategorySubgroup $transactionCategorySubgroup): bool
    {
    }

    public function delete(User $user, TransactionCategorySubgroup $transactionCategorySubgroup): bool
    {
    }

    public function restore(User $user, TransactionCategorySubgroup $transactionCategorySubgroup): bool
    {
    }

    public function forceDelete(User $user, TransactionCategorySubgroup $transactionCategorySubgroup): bool
    {
    }
}
