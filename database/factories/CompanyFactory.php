<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $companyName = $this->faker->company;
        return [
            'name' => $companyName,
            'short_name' => $companyName,
            'tax_id' => $this->faker->numerify('########0001##')
        ];
    }
}
