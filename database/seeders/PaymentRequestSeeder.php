<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\PaymentRequest;
use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentRequestSeeder extends Seeder
{
    use WithoutModelEvents;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = Company::all();
        $permissions = [
            'view-any-payment-request',
            'view-payment-request',
            'create-payment-request',
            'edit-payment-request',
            'delete-payment-request'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['slug' => $permission]);
        }

        foreach ($companies as $company) {
            PaymentRequest::factory(7)->create([
                'company_id' => $company->id
            ]);
        }
    }
}
