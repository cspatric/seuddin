<?php

namespace Database\Seeders;

use App\Models\BankTransferRequest;
use App\Models\Company;
use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BankTransferRequestSeeder extends Seeder
{
    use WithoutModelEvents;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = Company::all();
        $permissions = [
            'view-bank-transfer-request',
            'create-bank-transfer-request',
            'edit-bank-transfer-request',
            'delete-bank-transfer-request'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['slug' => $permission]);
        }

        foreach ($companies as $company) {
            BankTransferRequest::factory(2)->create([
                'company_id' => $company->id
            ]);
        }
    }
}
