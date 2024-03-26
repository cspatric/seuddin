<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Employee;
use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = Company::all();
        $permissions = [
            'view-any-employee',
            'view-employee',
            'create-employee',
            'edit-employee',
            'delete-employee'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['slug' => $permission]);
        }

        foreach ($companies as $company) {
            Employee::factory(rand(1, 3))->create([
                'company_id' => $company->id
            ]);
        }
    }
}
