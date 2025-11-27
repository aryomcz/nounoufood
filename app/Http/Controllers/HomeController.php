<?php

namespace App\Http\Controllers;

use App\Models\Advice;
use App\Models\CompanyProfile;
use App\Models\Faq;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductType;
use App\Models\Promo;
use App\Models\Review;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $canGiveAdvice = false;
        $maxSaran = 0;
        $currentSaran = 0;

         if (Auth::check()) {
            $userId = Auth::id();

            // jumlah order user dengan status 1
            $maxSaran = Order::where('id_user', $userId)
                             ->where('status', 1)
                             ->count();

            // jumlah saran user yang sudah dikirim
            $currentSaran = Advice::where('id_user', $userId)->count();

            $canGiveAdvice = $maxSaran > 0 && $currentSaran < $maxSaran;
        }


        // $cart
        return Inertia::render('HomePage', [
            'produk' => $products,
            'toko' => $stores,
            'faq' => $faq, 
            'testi' => $testi,
            'company' => $company,
            'promo' => $promo,
            'canGiveAdvice' => $canGiveAdvice,
            'maxSaran' => $maxSaran,
            'currentSaran' => $currentSaran,
        ]);
    }

     public function catalog()
    {
         $company = CompanyProfile::first();
        $products = ProductType::with(['products.halal','products.promo'])->get();
        return Inertia::render('Catalog', [
            'produk' => $products,
            'company' => $company
        ]);
    }
}
