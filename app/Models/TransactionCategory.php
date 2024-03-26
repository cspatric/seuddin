<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TransactionCategory extends Model
{

    protected $fillable = [
        'company_id',
        'transaction_category_group_id',
        'transaction_category_subgroup_id',
        'name',
        'type'
    ];

    public function transactionCategoryGroup(): BelongsTo
    {
        return $this->belongsTo(TransactionCategoryGroup::class);
    }

    public function transactionCategorySubgroup(): BelongsTo
    {
        return $this->belongsTo(TransactionCategorySubgroup::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
