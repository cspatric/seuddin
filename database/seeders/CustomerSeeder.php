<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Customer;
use App\Models\Employee;
use App\Models\Permission;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = Company::all();
        $permissions = [
            'view-any-customer',
            'view-customer',
            'create-customer',
            'edit-customer',
            'delete-customer'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['slug' => $permission]);
        }

        foreach ($companies as $company) {
            Customer::factory(rand(1, 3))->create([
                'company_id' => $company->id
            ]);
        }
    }
}
