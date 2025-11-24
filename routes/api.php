<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TranslateController;

Route::post('/translate', [TranslateController::class, 'translate']);
