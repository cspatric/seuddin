<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = Permission::all();
        $admin_role = Role::create([
            'name' => 'Admin',
            'slug' => 'admin'
        ]);

        $customer_role = Role::create([
            'name' => 'Customer',
            'slug' => 'customer'
        ]);

        $customer_role->permissions()->attach($permissions);
        $admin_role->permissions()->attach($permissions);
    }
}
