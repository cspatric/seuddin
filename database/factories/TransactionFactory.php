<?php

namespace Database\Factories;

use App\Models\Account;
use App\Models\Bank;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'account_id' => function () {
                return Account::factory()->create()->id;
            },
            'date' => $this->faker->dateTimeThisYear,
            'amount' => $this->faker->randomFloat(2, -1000, 1000),
            'payment_method' => $this->faker->randomElement(['money', 'credit_card', 'bank_transfer', 'pix']),
            'file' => $this->faker->word,
            'description' => $this->faker->sentence,
            'remarks' => $this->faker->sentence,
            'status' => $this->faker->randomElement(['new', 'pending', 'completed']),
            'transaction_category_id' => $this->faker->biasedNumberBetween(1, 66),
            'balance' => 0
        ];
    }
}
