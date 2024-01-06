<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\Company;
use App\Models\Permission;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = Company::all();
        $permissions = [
            'view-any-account',
            'view-account',
            'create-account',
            'edit-account',
            'delete-account'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['slug' => $permission]);
        }

        foreach ($companies as $company) {
            Account::factory(rand(1, 3))->create([
                'company_id' => $company->id
            ]);
        }
    }
}
