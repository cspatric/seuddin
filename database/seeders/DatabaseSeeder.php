<?php

namespace Database\Seeders;

use App\Models\TransactionCategory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(BankSeeder::class);
        $this->call(CompanySeeder::class);
        $this->call(EndOfDayReportSeeder::class);
        $this->call(PaymentRequestSeeder::class);
        $this->call(AccountSeeder::class);
        $this->call(TransactionCategorySeeder::class);
        $this->call(TransactionSeeder::class);
        $this->call(SupplierSeeder::class);
        $this->call(EmployeeSeeder::class);
        $this->call(CustomerSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);
    }
}
