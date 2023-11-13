<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;

class UserSeeder extends Seeder
{
    use WithoutModelEvents;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin_role = Role::where('slug', 'admin')->get();
        $customer_role = Role::where('slug', 'customer')->get();
        $companies = Company::all();

        $admin = User::factory()->create();
        $admin->roles()->attach($admin_role);

        foreach ($companies as $company) {
            $customer = User::factory()->create([
                'company_id' => $company->id
            ]);
            $customer->roles()->attach($customer_role);
        }
    }
}
