<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaymentSlipRequest>
 */
class PaymentSlipRequestFactory extends Factory
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
            'barcode_number' => $this->faker->numerify(str_repeat('#', 47)),
            'status' => $this->faker->randomElement(['new', 'pending', 'completed']),
            'company_id' => function () {
                return \App\Models\Company::factory()->create()->id;
            },
        ];
    }
}
