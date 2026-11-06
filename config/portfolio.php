<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Compte administrateur
    |--------------------------------------------------------------------------
    |
    | Ces valeurs sont utilisées par le seeder pour créer le compte qui donne
    | accès au back-office. Pensez à les remplacer en production.
    |
    */

    'admin' => [
        'name' => env('ADMIN_NAME', 'Administrateur'),
        'email' => env('ADMIN_EMAIL', 'admin@portfolio.local'),
        'password' => env('ADMIN_PASSWORD', 'password'),
    ],

];
