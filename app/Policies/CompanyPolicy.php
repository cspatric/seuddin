<?php

namespace App\Policies;

use App\Models\Company;
use App\Models\User;

class CompanyPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function viewAny(User $user): bool
    {
        return $user->hasPermission('view-any-company');
    }

    public function view(User $user, Company $company): bool
    {
        return $user->hasPermission('view-company') && ($user->isAdmin() || $user->company_id == $company->id);
    }

    public function create(User $user): bool
    {
        return $user->hasPermission('create-company');
    }

    public function update(User $user, Company $company): bool
    {
        return $user->hasPermission('edit-company') && ($user->isAdmin() || $user->company_id == $company->id);
    }
}
