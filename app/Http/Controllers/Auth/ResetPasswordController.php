<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ResetPasswordController extends Controller
{
    public function index()
    {
        // Cek apakah session email ada
        if (!Session::has('reset_email')) {
            return redirect()->route('password.request')->withErrors(['otp' => 'Kode OTP belum diverifikasi']);
        }

        return Inertia::render('Auth/ResetPassword'); // ke react page
    }

    public function store(Request $request)
    {
        $request->validate([
            'password' => 'required|min:6|confirmed',
        ]);

        if (!Session::has('reset_email')) {
            return redirect()->route('password.request')->withErrors(['email' => 'Session reset password kadaluarsa']);
        }

        $email = Session::get('reset_email');

        User::where('email', $email)->update([
            'password' => Hash::make($request->password)
        ]);

        Session::forget('reset_email');

        return redirect()->route('login')->with('success', 'Password berhasil direset. Silahkan login.');
    }
}
