<?php

namespace App\Http\Controllers;

use App\Models\Halal;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HalalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $halal = Halal::with('products')->get();
        $products = Product::with('halal')->doesntHave('halal')->get();
        return Inertia::render('Dashboard/Halal/Index', [
            'data' => $halal,
            'produk'  => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $validated = $request->validate([
            'no_sertifikasi' => 'required|string',
            'id_produk' => 'required|integer|exists:products,id',
        ]);

         try {
            Halal::create($validated);
            return notif_success("Sertifikasi halal berhasil ditambahkan");
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal membuat tipe produk.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Halal $halal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Halal $halal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'no_sertifikasi' => 'required|string',
            'id_produk' => 'required|integer|exists:products,id',
        ]);

        try {
            $halal = Halal::findOrFail($id);
            $halal->update($validated);

            return notif_success("Sertifikasi halal berhasil diubah");

        } catch (\Exception $e) {
            return back()->with('error', 'Gagal memperbarui tipe produk.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $ids = $request->ids; // array ID dari Inertia

        if (!$ids || !is_array($ids)) {
            return back()->with('error', 'ID tidak valid.');
        }

        Halal::whereIn('id', $ids)->delete();

        return notif_success("Sertifikasi halal berhasil dihapus");

    }
}
