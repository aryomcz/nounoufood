<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Promo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $promo = Promo::with('products')->first();
        $products = Product::get();
        return Inertia::render('Dashboard/Promo/Index', [
            'promo' => $promo,
            'products' => $products
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
   public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required',
            'deskripsi' => 'nullable|string',
            'diskon_persen' => 'required|numeric',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date',
            'produk_ids' => 'array',
        ]);

        // CARI PROMO (HANYA 1)
        $promo = Promo::first();


        // 📌 PROSES FOTO CUSTOM NAME
        if ($request->hasFile('foto')) {

            $file = $request->file('foto');
            $ext  = $file->getClientOriginalExtension();
            $filename = 'promo-' . date('Y-m-d') . '-' . time() . '.' . $ext;

            $file->storeAs('promo', $filename, 'public');
            $validated['foto'] = asset('storage/promo/' . $filename);

            // HAPUS FOTO LAMA
            if ($promo && $promo->foto) {
                $oldFile = basename($promo->foto);
                $oldPath = storage_path('app/public/promo/' . $oldFile);
                if (file_exists($oldPath)) unlink($oldPath);
            }
        }

        // 📌 JIKA ADA → UPDATE
        if ($promo) {
            $promo->update($validated);
        } 
        // 📌 JIKA BELUM ADA → CREATE
        else {
            $promo = Promo::create($validated);
        }
        
        // 📌 UPDATE PRODUK TERPILIH
        Product::whereNotNull('id_promo')->update(['id_promo' => null]);
        
        if (!empty($validated['produk_ids'])) {
            Product::whereIn('id', $validated['produk_ids'])->update([
                'id_promo' => $promo->id
            ]);
        }
        if ($promo) {
            return notif_success("Promo berhasil ditambahkan");
        } else {
            return notif_success("Promo berhasil diubah");
        }
    }

}
