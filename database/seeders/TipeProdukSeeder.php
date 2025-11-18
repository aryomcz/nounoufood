<?php

namespace Database\Seeders;

use App\Models\ProductType;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipeProdukSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        ProductType::create([
            'nama' => 'basreng',
        ]);
        ProductType::create([
            'nama' => 'Keripik Kaca',
        ]);
    }
}
