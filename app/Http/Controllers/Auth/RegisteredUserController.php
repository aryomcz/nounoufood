<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'no_hp' => 'required|max:20|regex:/^[0-9+\- ]+$/',
            'alamat'  => 'required|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ],
        [
    'nama.required' => 'Nama harus diisi.',
    'nama.string' => 'Nama harus berupa teks.',
    'nama.max' => 'Nama maksimal 255 karakter.',

    'no_hp.required' => 'Nomor HP harus diisi.',
    'no_hp.max' => 'Nomor HP maksimal 20 karakter.',
    'no_hp.regex' => 'Nomor HP hanya boleh angka, +, -, dan spasi.',

    'alamat.required' => 'Alamat harus diisi.',
    'alamat.string' => 'Alamat harus berupa teks.',
    'alamat.max' => 'Alamat maksimal 255 karakter.',

    'email.required' => 'Email harus diisi.',
    'email.email' => 'Format email tidak valid.',
    'email.unique' => 'Email sudah terdaftar.',

    'password.required' => 'Password harus diisi.',
    'password.confirmed' => 'Konfirmasi password tidak sesuai.',
    'password.min' => 'Password minimal 6 karakter.',
]
);

        $user = User::create([
            'nama' => $request->nama,
            'email' => $request->email,
            'no_hp' => $request->no_hp,
            'alamat' => $request->alamat,
            'password' => Hash::make($request->password),
            'role' => 'pelanggan',
        ]);

        event(new Registered($user)); // akan mengirim email verification
        Auth::login($user);
        return redirect()->route('verification.notice');

    }
}
