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
        $this->call(CompanySeeder::class);
        $this->call(BankTransferRequestSeeder::class);
        $this->call(EndOfDayReportSeeder::class);
        $this->call(PaymentSlipRequestSeeder::class);
        $this->call(TransactionCategorySeeder::class);
        $this->call(TransactionSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);
    }
}
