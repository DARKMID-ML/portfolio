<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::query()->firstOrCreate(
            ['email' => Config::string('portfolio.admin.email', 'admin@portfolio.local')],
            [
                'name' => Config::string('portfolio.admin.name', 'Administrateur'),
                'password' => Hash::make(
                    Config::string('portfolio.admin.password', 'password'),
                ),
            ],
        );

        $this->call(PortfolioSeeder::class);
    }
}
