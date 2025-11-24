<?php

namespace App\Http\Controllers;

use App\Models\CompanyProfile;
use App\Models\Faq;
use App\Models\Product;
use App\Models\ProductType;
use App\Models\Promo;
use App\Models\Review;
use App\Models\Store;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['promo','halal'])->where('is_best_seller', true)->get();
        // $promo = Promo::first();
        $stores = Store::get();
        $faq = Faq::get();
        $testi = Review::get();
        $company = CompanyProfile::first();
        $promo = Promo::with('products')->first();
        // $cart
        return Inertia::render('HomePage', [
            'produk' => $products,
            'toko' => $stores,
            'faq' => $faq, 
            'testi' => $testi,
            'company' => $company,
            'promo' => $promo
        ]);
    }

     public function catalog()
    {
        $products = ProductType::with(['products.halal','products.promo'])->get();
        return Inertia::render('Catalog', [
            'produk' => $products
        ]);
    }
}
