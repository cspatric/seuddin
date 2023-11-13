<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BankTransferRequest>
 */
class BankTransferRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'request_date' => $this->faker->date,
            'key_type' => $this->faker->randomElement(['cpf', 'cnpj', 'e-mail', 'phone', 'random']),
            'pix_key' => $this->faker->unique()->word,
            'recipient_name' => $this->faker->name,
            'amount' => $this->faker->randomFloat(2, 10, 1000),
            'payment_date' => $this->faker->date,
            'remarks' => $this->faker->sentence,
            'status' => $this->faker->randomElement(['new', 'pending', 'completed']),
            'company_id' => function () {
                return \App\Models\Company::factory()->create()->id;
            },
        ];
    }
}
