<?php

use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

test('creates an administrator from the configured credentials', function () {
    Config::set('portfolio.admin.name', 'Portfolio Admin');
    Config::set('portfolio.admin.email', 'admin@example.com');
    Config::set('portfolio.admin.password', 'long-unique-password-123');

    $this->seed(DatabaseSeeder::class);

    $user = User::query()->where('email', 'admin@example.com')->firstOrFail();

    expect($user->name)->toBe('Portfolio Admin')
        ->and(Hash::check('long-unique-password-123', $user->password))->toBeTrue();

    $this->post('/login', [
        'email' => 'admin@example.com',
        'password' => 'long-unique-password-123',
    ])->assertRedirect('/admin');

    $this->assertAuthenticatedAs($user);
});

test('requires a strong admin password when seeding production', function () {
    Config::set('app.env', 'production');
    Config::set('portfolio.admin.password', null);

    expect(fn () => (new DatabaseSeeder)->run())
        ->toThrow(RuntimeException::class, 'Set ADMIN_PASSWORD');
});
