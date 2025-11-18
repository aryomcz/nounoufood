<?php

namespace App\Http\Controllers;

use App\Models\Advice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdviceController extends Controller
{
    public function index()
    {
        $advice = Advice::with('user')->orderBy('id', 'desc')->get();
        return Inertia::render('Dashboard/Saran/Index', [
            'data' => $advice
        ]);
    }

    public function store(Request $request)
    {
        
    }
}
