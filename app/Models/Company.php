<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'short_name',
        'tax_id'
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function paymentRequests(): HasMany
    {
        return $this->hasMany(PaymentRequest::class);
    }

    public function endOfDayReports(): HasMany
    {
        return $this->hasMany(EndOfDayReport::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function accounts(): HasMany
    {
        return $this->hasMany(Account::class);
    }
}
