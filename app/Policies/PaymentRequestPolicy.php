<?php

namespace App\Policies;

use App\Models\PaymentRequest;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PaymentRequestPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('view-any-payment-request');
    }

    public function view(User $user, PaymentRequest $paymentRequest): bool
    {
        return $user->hasPermission('view-payment-request') && ($user->isAdmin() || $user->company_id == $paymentRequest->company_id);
    }

    public function create(User $user): bool
    {
        return $user->hasPermission('create-payment-request');
    }

    public function update(User $user, PaymentRequest $paymentRequest): bool
    {
        return $user->hasPermission('edit-payment-request') && ($user->isAdmin() || $user->company_id == $paymentRequest->company_id);
    }
}
