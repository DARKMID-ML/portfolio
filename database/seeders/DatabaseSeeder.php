<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $password = Config::get('portfolio.admin.password');

        if (! is_string($password) || strlen($password) < 16) {
            if (Config::string('app.env', 'production') === 'production') {
                throw new RuntimeException(
                    'Set ADMIN_PASSWORD to a unique password of at least 16 characters before seeding in production.',
                );
            }

            $password = 'password';
        }

        User::query()->updateOrCreate(
            ['email' => Config::string('portfolio.admin.email', 'admin@portfolio.local')],
            [
                'name' => Config::string('portfolio.admin.name', 'Administrateur'),
                'password' => Hash::make($password),
            ],
        );

        $this->call(PortfolioSeeder::class);
    }
}
