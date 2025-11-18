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

        if($profile){
            $profile->foto_url = $profile->foto ? asset('storage/'.$profile->foto) : null;
        }

        return Inertia::render('Dashboard/CompanyProfile/Index', [
            'data' => $profile
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'sejarah' => 'nullable|string',
            'tahun_berdiri' => 'nullable|string',
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
            'email' => 'nullable|email',
            'no_hp' => 'nullable|string',
            'tiktok' => 'nullable|string',
            'shopee' => 'nullable|string',
            'foto' => 'nullable|image|max:2048'
        ]);

        if($request->hasFile('foto')){
            $pictureName = time().'_'.$request->foto->getClientOriginalName();
            $data['foto'] = $request->foto->storeAs('company', $pictureName, 'public');
        }

        CompanyProfile::create($data);

        return back()->with('success','Company Profile dibuat');
    }

    public function update(Request $request, CompanyProfile $companyProfile)
    {
        $data = $request->validate([
            'sejarah' => 'nullable|string',
            'tahun_berdiri' => 'nullable|string',
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
            'email' => 'nullable|email',
            'no_hp' => 'nullable|string',
            'tiktok' => 'nullable|string',
            'shopee' => 'nullable|string',
            'foto' => 'nullable|image'
        ]);

        if($request->hasFile('foto')){
            // hapus foto lama
            if($companyProfile->foto){
                Storage::disk('public')->delete($companyProfile->foto);
            }

            $pictureName = time().'_'.$request->foto->getClientOriginalName();
            $data['foto'] = $request->foto->storeAs('company', $pictureName, 'public');
        }

        $companyProfile->update($data);

        return back()->with('success','Company Profile diupdate');
    }

    public function destroy(CompanyProfile $companyProfile)
    {
        if($companyProfile->foto){
            Storage::disk('public')->delete($companyProfile->foto);
        }

        $companyProfile->delete();

        return back()->with('success','Company Profile dihapus');
    }
}
