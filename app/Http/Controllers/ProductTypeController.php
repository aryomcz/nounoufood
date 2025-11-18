<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $type = ProductType::withCount('products')->get();
        return Inertia::render('Dashboard/TipeProduk/Index', [
            'data' => $type
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255']
        ], [
             'nama.required' => 'Nama harus diisi.',
        ]);

        try {
            ProductType::create($validated);

            return back()->with('success', 'Tipe produk berhasil dibuat.');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal membuat tipe produk.');
        }
    }

    /**
     * Update tipe produk
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255']
        ],[
             'nama.required' => 'Nama harus diisi.',
        ]);

        try {
            $type = ProductType::findOrFail($id);
            $type->update($validated);

            return back()->with('success', 'Tipe produk berhasil diperbarui.');
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

        DB::transaction(function () use ($ids) {

            // Set semua produk yang memiliki tipe tersebut menjadi NULL
            Product::whereIn('id_type', $ids)
                ->update(['id_type' => null]);

            // Hapus semua tipe produk
            ProductType::whereIn('id', $ids)->delete();
        });

        return back()->with('success', 'Tipe produk berhasil dihapus.');
    }
    
}
