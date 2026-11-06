<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\SkillCategoryController;
use App\Http\Controllers\Admin\TimelineEntryController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CvController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

// ----- Site public -----
Route::get('/', HomeController::class)->name('home');
Route::get('/cv', CvController::class)->name('cv.download');

// ----- Authentification du back-office -----
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'create'])->name('login');
    Route::post('/login', [AuthController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('login.store');
});

Route::post('/logout', [AuthController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

// ----- Back-office -----
Route::prefix('admin')->name('admin.')->middleware('auth')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');

    Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');
    Route::get('/messages/{message}', [MessageController::class, 'show'])->name('messages.show');
    Route::patch('/messages/{message}', [MessageController::class, 'update'])->name('messages.update');
    Route::delete('/messages/{message}', [MessageController::class, 'destroy'])->name('messages.destroy');

    Route::get('/profil', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profil', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profil/cv', [ProfileController::class, 'uploadCv'])->name('profile.cv.store');
    Route::delete('/profil/cv', [ProfileController::class, 'destroyCv'])->name('profile.cv.destroy');
    Route::put('/profil/mot-de-passe', [ProfileController::class, 'updatePassword'])->name('profile.password');

    Route::resource('projects', ProjectController::class)->except(['show']);
    Route::resource('skills', SkillCategoryController::class)->except(['show']);
    Route::resource('timeline', TimelineEntryController::class)->except(['show']);
    Route::resource('services', ServiceController::class)->except(['show']);
});
