<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\Company;
use App\Models\Permission;
use App\Models\Transaction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $accounts = Account::all();
        $permissions = [
            'view-any-transaction',
            'view-transaction',
            'create-transaction',
            'edit-transaction',
            'delete-transaction'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['slug' => $permission]);
        }

        foreach ($accounts as $account) {
            Transaction::factory(10)->create([
                'account_id' => $account->id
            ]);
        }
    }
}
