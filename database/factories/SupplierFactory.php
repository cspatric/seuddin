<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Company>
 */
class SupplierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $supplierName = $this->faker->company;
        return [
            'name' => $supplierName,
            'short_name' => $supplierName,
            'tax_id' => $this->faker->numerify('########0001##')
        ];
    }
}
