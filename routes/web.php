<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard/companies', [CompanyController::class, 'index'])->name('company.index');
    Route::get('/dashboard/companies/create', [CompanyController::class, 'create'])->name('company.create');
    Route::get('/dashboard/companies/{id}', [CompanyController::class, 'edit'])->name('company.edit');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/companies', [CompanyController::class, 'store'])->name('company.store');
    Route::patch('/companies/{id}', [CompanyController::class, 'update'])->name('company.update');
    Route::delete('/companies/{id}', [CompanyController::class, 'destroy'])->name('company.destroy');
});

require __DIR__.'/auth.php';
