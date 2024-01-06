<?php

namespace Database\Factories;

use App\Models\PaymentRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PaymentRequest>
 */
class PaymentRequestFactory extends Factory
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
            'payment_type' => $this->faker->randomElement(['slip', 'transfer', 'pix']),
            'key_type' => $this->faker->randomElement(['document', 'email', 'phone', 'random']),
            'pix_key' => $this->faker->randomElement([
                $this->faker->numerify('########0001##'),
                $this->faker->email,
                $this->faker->phoneNumber,
                $this->faker->uuid,
            ]),
            'recipient_name' => $this->faker->name,
            'amount' => $this->faker->randomFloat(2, 1, 4000),
            'payment_date' => $this->faker->date,
            'remarks' => $this->faker->sentence(3),
            'file_url' => $this->faker->randomElement([null, $this->faker->imageUrl])
        ];
    }
}
