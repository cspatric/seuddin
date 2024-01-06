<?php

namespace Database\Factories;

use App\Models\EndOfDayReport;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<EndOfDayReport>
 */
class EndOfDayReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'closing_date' => $this->faker->date,
            'initial_cash_balance' => $this->faker->randomFloat(2, 100, 10000),
            'cash_sales_total' => $this->faker->randomFloat(2, 100, 5000),
            'cash_receipts_accounts_receivable' => $this->faker->randomFloat(2, 100, 2000),
            'cash_expenses_total' => $this->faker->randomFloat(2, 50, 3000),
            'final_cash_balance' => $this->faker->randomFloat(2, 500, 15000),
            'credit_sales_total' => $this->faker->randomFloat(2, 100, 5000),
            'pix_transfer_sales_total' => $this->faker->randomFloat(2, 50, 2000),
            'card_sales_total' => $this->faker->randomFloat(2, 100, 4000),
            'payment_link_sales_total' => $this->faker->randomFloat(2, 50, 1500),
            'other_sales_modalities_total' => $this->faker->randomFloat(2, 10, 1000),
            'accounts_receivable_pix_transfer_total' => $this->faker->randomFloat(2, 50, 2000),
            'remarks' => $this->faker->sentence,
            'status' => $this->faker->randomElement(['new', 'pending', 'completed']),
            'company_id' => function () {
                return \App\Models\Company::factory()->create()->id;
            },
        ];
    }
}
