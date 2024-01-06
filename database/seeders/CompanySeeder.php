<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Permission;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'view-any-company',
            'view-company',
            'create-company',
            'edit-company',
            'delete-company',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['slug' => $permission]);
        }

        Company::factory(12)->create();
    }
}
