<?php

namespace App\Policies;

use App\Models\EndOfDayReport;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class EndOfDayReportPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('view-any-end-of-day-report');
    }

    public function view(User $user, EndOfDayReport $endOfDayReport): bool
    {
        return $user->hasPermission('view-end-of-day-report') && ($user->isAdmin() || $user->company_id == $endOfDayReport->company_id);
    }

    public function create(User $user): bool
    {
        return $user->hasPermission('create-end-of-day-report');
    }

    public function update(User $user, EndOfDayReport $endOfDayReport): bool
    {
        return $user->hasPermission('edit-end-of-day-report') && ($user->isAdmin() || $user->company_id == $endOfDayReport->company_id);
    }
}
