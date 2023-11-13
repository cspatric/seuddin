<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\PaymentSlipRequest;
use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentSlipRequestSeeder extends Seeder
{
    use WithoutModelEvents;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = Company::all();
        $permissions = [
            'view-payment-slip-request',
            'create-payment-slip-request',
            'edit-payment-slip-request',
            'delete-payment-slip-request'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['slug' => $permission]);
        }

        foreach ($companies as $company) {
            PaymentSlipRequest::factory(7)->create([
                'company_id' => $company->id
            ]);
        }
    }
}
