<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TransactionCategoryGroup extends Model
{
    protected $fillable = [
        'company_id',
        'name',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function transactionCategorySubgroups(): HasMany {
        return $this->hasMany(TransactionCategorySubgroup::class);
    }

    public function transactionCategories(): HasMany {
        return $this->hasMany(TransactionCategory::class);
    }
}
