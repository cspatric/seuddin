<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'request_date',
        'payment_type',
        'pix_key',
        'key_type',
        'recipient_name',
        'amount',
        'payment_date',
        'remarks',
        'barcode_number',
        'file_url'
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
