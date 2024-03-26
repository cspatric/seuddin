<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Permission;
use App\Models\Supplier;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = Company::all();
        $permissions = [
            'view-any-supplier',
            'view-supplier',
            'create-supplier',
            'edit-supplier',
            'delete-supplier'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['slug' => $permission]);
        }

        foreach ($companies as $company) {
            Supplier::factory(rand(1, 3))->create([
                'company_id' => $company->id
            ]);
        }
    }
}
