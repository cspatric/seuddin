<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EndOfDayReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'closing_date',
        'initial_cash_balance',
        'cash_sales_total',
        'cash_receipts_accounts_receivable',
        'cash_expenses_total',
        'final_cash_balance',
        'credit_sales_total',
        'pix_transfer_sales_total',
        'card_sales_total',
        'payment_link_sales_total',
        'other_sales_modalities_total',
        'accounts_receivable_pix_transfer_total',
        'remarks',
    ];

    protected $dates = [
        'closing_date',
        'created_at',
        'updated_at',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
