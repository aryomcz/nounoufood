<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use function Symfony\Component\Clock\now;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'nama' => 'admin',
            'email' => 'admin@mail.com',
            'no_hp' => '083870911774',
            'alamat' => 'test',
            'role' => 'admin',
            'password' => bcrypt('12345678'),
            'email_verified_at' => now()
        ]);
        User::create([
            'nama' => 'aryo',
            'email' => 'machfudzaryo@gmail.com',
            'no_hp' => '083870911770',
            'alamat' => 'test',
            'role' => 'pelanggan',
            'password' => bcrypt('12345678')
        ]);
    }
}
