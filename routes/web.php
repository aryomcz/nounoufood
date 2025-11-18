<?php

use App\Http\Controllers\AdviceController;
use App\Http\Controllers\CompanyProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductTypeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PromoController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\StoreController;
use App\Models\Advice;
use App\Models\CompanyProfile;
use App\Models\Review;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('HomePage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::prefix('/dashboard')->middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/orders', [OrderController::class, 'index'])->name('dashboard.order');
    Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus']);

    Route::get('/products', [ProductController::class, 'index'])->name('dashboard.product');
    Route::patch('/products/{id}/best-seller', [ProductController::class, 'updateBestSeller'])
    ->name('products.best-seller');
    Route::post('/products/create', [ProductController::class, 'store'])->name('products.store');
    Route::post('/products/update/{id}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/delete', [ProductController::class, 'destroy'])->name('products.delete');

    Route::get('/product-type', [ProductTypeController::class, 'index'])->name('dashboard.product-type');
    Route::delete('/product-type/delete', [ProductTypeController::class, 'destroy'])->name('product-type.delete');
    Route::post('/product-type/create', [ProductTypeController::class, 'store'])->name('product-type.store');
    Route::put('/product-type/update/{id}', [ProductTypeController::class, 'update'])->name('product-type.update');

    Route::get('/promo', [PromoController::class, 'index'])->name('dashboard.promo');
    Route::post('/promo', [PromoController::class, 'store'])->name('promo.store');

    Route::get('/store', [StoreController::class, 'index'])->name('dashboard.store');
    Route::get('/faq', [FAQController::class, 'index'])->name('dashboard.faq');
    Route::get('/testimoni', [ReviewController::class, 'index'])->name('dashboard.testimoni');
    Route::get('/advice', [AdviceController::class, 'index'])->name('dashboard.advice');
    Route::get('/company-profile', [CompanyProfileController::class, 'index'])->name('dashboard.company');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
