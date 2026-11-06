<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\HealthController;
use Illuminate\Support\Facades\Route;

// Ping de test — ancienne route GET /api du projet Next.js.
Route::get('/', fn () => response()->json(['message' => 'Hello, world!']));

// Formulaire de contact du site.
Route::post('/contact', [ContactController::class, 'store']);

// Santé de l'application.
Route::get('/health', HealthController::class);
