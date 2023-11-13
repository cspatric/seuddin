<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentSlipRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_date',
        'barcode_number'
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
