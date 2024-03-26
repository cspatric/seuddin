<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TransactionCategorySubgroup extends Model
{
    protected $fillable = [
        'company_id',
        'transaction_category_group_id',
        'name',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function transactionCategoryGroup(): BelongsTo
    {
        return $this->belongsTo(TransactionCategoryGroup::class);
    }

    public function transactionCategories(): HasMany {
        return $this->hasMany(TransactionCategory::class);
    }
}
