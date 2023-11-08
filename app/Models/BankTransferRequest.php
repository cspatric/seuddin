<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankTransferRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_date',
        'key_type',
        'pix_key',
        'recipient_name',
        'amount',
        'payment_date',
        'remarks',
    ];
}
