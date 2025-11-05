<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
         return Inertia::render('HomePage');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function homedata()
    {
        //
    }
}
