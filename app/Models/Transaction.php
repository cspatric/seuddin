<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_id',
        'supplier_id',
        'customer_id',
        'employee_id',
        'date',
        'amount',
        'payment_method',
        'file',
        'description',
        'remarks',
        'status',
        'balance'
    ];

    public function transactionCategory(): BelongsTo
    {
        return $this->belongsTo(TransactionCategory::class);
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }


    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }
}
