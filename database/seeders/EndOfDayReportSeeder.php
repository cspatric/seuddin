<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\EndOfDayReport;
use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EndOfDayReportSeeder extends Seeder
{
    use WithoutModelEvents;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = Company::all();
        $permissions = [
            'view-any-end-of-day-report',
            'view-end-of-day-report',
            'create-end-of-day-report',
            'edit-end-of-day-report',
            'delete-end-of-day-report'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['slug' => $permission]);
        }

        foreach ($companies as $company) {
            EndOfDayReport::factory(7)->create([
                'company_id' => $company->id
            ]);
        }
    }
}
