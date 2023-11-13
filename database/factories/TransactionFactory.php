<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
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
            'date' => $this->faker->date,
            'value' => $this->faker->randomFloat(2, 10, 1000),
            'payment_method' => $this->faker->randomElement(['money', 'credit_card', 'bank_transfer', 'pix']),
            'file' => $this->faker->word,
            'remarks' => $this->faker->sentence,
            'status' => $this->faker->randomElement(['new', 'pending', 'completed']),
            'transaction_category_id' => $this->faker->biasedNumberBetween(1, 66),
            'company_id' => function () {
                return \App\Models\Company::factory()->create()->id;
            },
        ];
    }
}
