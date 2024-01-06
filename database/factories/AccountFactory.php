<?php

namespace Database\Factories;

use App\Models\Bank;
use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Account>
 */
class AccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $randomBank = Bank::inRandomOrder()->first();
        return [
            'bank_id' => $randomBank->id,
            'bank_agency_number' => $this->faker->numerify('#####'),
            'bank_account_number' => $this->faker->numerify('#########'),
            'bank_account_verification_digit' => $this->faker->randomDigit,
            'balance' => $this->faker->randomFloat(2, 0, 10000),
            'balance_date' => $this->faker->dateTimeThisMonth,
            'description' => str_replace('S.A', '', $randomBank->name) . $this->faker->randomElement(['', ' '.$this->faker->word]),
            'company_id' => function () {
                return Company::factory()->create()->id;
            },
        ];
    }
}
