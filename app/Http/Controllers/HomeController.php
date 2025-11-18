<?php

namespace App\Http\Controllers;

use App\Models\CompanyProfile;
use App\Models\Product;
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
        $products = Product::where('is_best_seller', true)->get();
        // $promo = Promo::first();
        $stores = Store::all();
        $company = CompanyProfile::first();
        // $cart

        
        return Inertia::render('HomePage');
    }
}
