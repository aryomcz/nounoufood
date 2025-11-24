<?php

use App\Http\Controllers\AdviceController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CompanyProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\HalalController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductTypeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PromoController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\StoreController;
use App\Models\Advice;
use App\Models\CompanyProfile;
use App\Models\Halal;
use App\Models\Review;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/products', [HomeController::class, 'catalog'])->name('catalog');

Route::middleware(['auth', 'verified', 'role:pelanggan'])->group(function () {
    Route::get('/cart', [CartController::class, 'index'])->name('cart');
    Route::post('/cart', [CartController::class, 'create'])->name('cart.store');
    Route::put('/cart', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart', [CartController::class, 'destroy'])->name('cart.delete');
    Route::patch('/cart', [CartController::class, 'updateQty'])->name('cart.qty');

    Route::post('/order/store', [OrderController::class, 'store'])->name('order.store');
    Route::post('/order/singlestore', [OrderController::class, 'storeWA'])->name('order.single.store');

});

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

    Route::get('/halal', [HalalController::class, 'index'])->name('dashboard.halal');
    Route::delete('/halal/delete', [HalalController::class, 'destroy'])->name('halal.delete');
    Route::post('/halal/create', [HalalController::class, 'store'])->name('halal.store');
    Route::put('/halal/update/{id}', [HalalController::class, 'update'])->name('halal.update');

    Route::get('/promo', [PromoController::class, 'index'])->name('dashboard.promo');
    Route::post('/promo', [PromoController::class, 'store'])->name('promo.store');

    Route::get('/company-profile', [CompanyProfileController::class, 'index'])->name('dashboard.company');
    Route::post('/company-profile', [CompanyProfileController::class, 'store'])->name('company.store');

    Route::get('/store', [StoreController::class, 'index'])->name('dashboard.store');
    Route::delete('/toko/delete', [StoreController::class, 'destroy'])->name('toko.delete');
    Route::post('/toko/create', [StoreController::class, 'store'])->name('toko.store');
    Route::put('/toko/update/{id}', [StoreController::class, 'update'])->name('toko.update');

    Route::get('/faq', [FAQController::class, 'index'])->name('dashboard.faq');
    Route::delete('/faq/delete', [FAQController::class, 'destroy'])->name('faq.delete');
    Route::post('/faq/create', [FAQController::class, 'store'])->name('faq.store');
    Route::put('/faq/update/{id}', [FAQController::class, 'update'])->name('faq.update');

    Route::get('/testimoni', [ReviewController::class, 'index'])->name('dashboard.testimoni');
    Route::delete('/testimoni/delete', [ReviewController::class, 'destroy'])->name('testimoni.delete');
    Route::post('/testimoni/create', [ReviewController::class, 'store'])->name('testimoni.store');
    Route::put('/testimoni/update/{id}', [ReviewController::class, 'update'])->name('testimoni.update');

    Route::get('/advice', [AdviceController::class, 'index'])->name('dashboard.advice');
    Route::delete('/advice/delete', [AdviceController::class, 'destroy'])->name('advice.delete');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
