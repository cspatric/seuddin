<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bank extends Model
{
    use HasFactory;

    protected $fillable = [
        'compe_code',
        'name',
    ];

    public function accounts(): HasMany
    {
        return $this->hasMany(Account::class);
    }
}
