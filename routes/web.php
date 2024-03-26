<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ConciliationController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EndOfDayReportController;
use App\Http\Controllers\PaymentRequestController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TransactionController;
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
    return Auth::check() ? redirect()->route('dashboard') : redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard/companies', [CompanyController::class, 'index'])->name('company.index');
    Route::get('/dashboard/companies/create', [CompanyController::class, 'create'])->name('company.create');
    Route::get('/dashboard/companies/{id}', [CompanyController::class, 'edit'])->name('company.edit');

    Route::get('/dashboard/payments', [PaymentRequestController::class, 'index'])->name('paymentRequest.index');
    Route::get('/dashboard/payments/create', [PaymentRequestController::class, 'create'])->name('paymentRequest.create');
    Route::get('/dashboard/payments/{id}', [PaymentRequestController::class, 'edit'])->name('paymentRequest.edit');

    Route::get('/dashboard/reports', [EndOfDayReportController::class, 'index'])->name('endOfDayReport.index');
    Route::get('/dashboard/reports/create', [EndOfDayReportController::class, 'create'])->name('endOfDayReport.create');
    Route::get('/dashboard/reports/{id}', [EndOfDayReportController::class, 'edit'])->name('endOfDayReport.edit');

    Route::get('/dashboard/transactions', [TransactionController::class, 'index'])->name('transaction.index');
    Route::get('/dashboard/transactions/create', [TransactionController::class, 'create'])->name('transaction.create');
    Route::get('/dashboard/transactions/{id}', [TransactionController::class, 'edit'])->name('transaction.edit');

    Route::get('/dashboard/accounts', [AccountController::class, 'index'])->name('account.index');
    Route::get('/dashboard/accounts/create', [AccountController::class, 'create'])->name('account.create');
    Route::get('/dashboard/accounts/{id}', [AccountController::class, 'edit'])->name('account.edit');

    Route::get('/dashboard/settings', [SettingsController::class, 'index'])->name('settings.index');

    Route::get('/dashboard/categories/create', [CategoryController::class, 'create'])->name('category.create');
    Route::get('/dashboard/categories/{id}', [AccountController::class, 'edit'])->name('category.edit');

    Route::get('/dashboard/suppliers', [SupplierController::class, 'index'])->name('supplier.index');
    Route::get('/dashboard/suppliers/create', [SupplierController::class, 'create'])->name('supplier.create');
    Route::get('/dashboard/suppliers/{id}', [SupplierController::class, 'edit'])->name('supplier.edit');

    Route::get('/dashboard/employees', [EmployeeController::class, 'index'])->name('employees.index');
    Route::get('/dashboard/employees/create', [EmployeeController::class, 'create'])->name('employees.create');
    Route::get('/dashboard/employees/{id}', [EmployeeController::class, 'edit'])->name('employees.edit');

    Route::get('/dashboard/customers', [CustomerController::class, 'index'])->name('customers.index');
    Route::get('/dashboard/customers/create', [CustomerController::class, 'create'])->name('customers.create');
    Route::get('/dashboard/customers/{id}', [CustomerController::class, 'edit'])->name('customers.edit');

    Route::get('/dashboard/accounts/{id}/conciliation', [ConciliationController::class, 'edit'])->name('conciliation.edit');

    Route::get('/dashboard/report', [ReportController::class, 'index'])->name('report.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/companies', [CompanyController::class, 'store'])->name('company.store');
    Route::patch('/companies/{id}', [CompanyController::class, 'update'])->name('company.update');
    Route::delete('/companies/{id}', [CompanyController::class, 'destroy'])->name('company.destroy');

    Route::post('/payments', [PaymentRequestController::class, 'store'])->name('payment_requests.store');
    Route::patch('/payments/{id}', [PaymentRequestController::class, 'update'])->name('payment_requests.update');
    Route::delete('/payments/{id}', [PaymentRequestController::class, 'destroy'])->name('payment_requests.destroy');

    Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
    Route::patch('/transactions/{id}', [TransactionController::class, 'update'])->name('transactions.update');
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy'])->name('transactions.destroy');

    Route::post('/endofdayreports', [EndOfDayReportController::class, 'store'])->name('end_of_day_reports.store');
    Route::patch('/endofdayreports/{id}', [EndOfDayReportController::class, 'update'])->name('end_of_day_reports.update');
    Route::delete('/endofdayreports/{id}', [EndOfDayReportController::class, 'destroy'])->name('end_of_day_reports.destroy');

    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::patch('/categories/{id}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    Route::post('/suppliers', [CategoryController::class, 'store'])->name('suppliers.store');
    Route::patch('/suppliers/{id}', [CategoryController::class, 'update'])->name('suppliers.update');
    Route::delete('/suppliers/{id}', [CategoryController::class, 'destroy'])->name('suppliers.destroy');

    Route::post('/employees', [CategoryController::class, 'store'])->name('employees.store');
    Route::patch('/employees/{id}', [CategoryController::class, 'update'])->name('employees.update');
    Route::delete('/employees/{id}', [CategoryController::class, 'destroy'])->name('employees.destroy');

    Route::patch('/transactions/{id}/conciliation', [ConciliationController::class, 'update'])->name('conciliation.update');
    Route::post('/transactions/{id}/conciliation/upload', [ConciliationController::class, 'upload'])->name('conciliation.upload');
});

require __DIR__.'/auth.php';
