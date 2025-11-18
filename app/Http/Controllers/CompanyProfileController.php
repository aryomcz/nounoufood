<?php

namespace App\Http\Controllers;

use App\Models\CompanyProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CompanyProfileController extends Controller
{
    public function index()
    {
        $profile = CompanyProfile::first();

        return Inertia::render('Dashboard/CompanyProfile/Index', [
            'data' => $profile
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sejarah' => 'string',
            'tahun_berdiri' => 'nullable|string',
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
            'email' => 'nullable|email',
            'no_hp' => 'max:20|regex:/^[0-9+\- ]+$/',
            'tiktok' => 'nullable|string',
            'shopee' => 'nullable|string',
        ]);

        $company = CompanyProfile::first();


        // 📌 PROSES FOTO CUSTOM NAME
        if ($request->hasFile('foto')) {

            $file = $request->file('foto');
            $ext  = $file->getClientOriginalExtension();
            $filename = 'profile-' . date('Y-m-d') . '-' . time() . '.' . $ext;

            $file->storeAs('company', $filename, 'public');
            $validated['foto'] = asset('storage/company/' . $filename);

            // HAPUS FOTO LAMA
            if ($company && $company->foto) {
                $oldFile = basename($company->foto);
                $oldPath = storage_path('app/public/promo/' . $oldFile);
                if (file_exists($oldPath)) unlink($oldPath);
            }
        }

        // 📌 JIKA ADA → UPDATE
        if ($company) {
            $company->update($validated);
        } 
        // 📌 JIKA BELUM ADA → CREATE
        else {
            $company = CompanyProfile::create($validated);
        }

        return back()->with('success','Company Profile dibuat');
    }

}
