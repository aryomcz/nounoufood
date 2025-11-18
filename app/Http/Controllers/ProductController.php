<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $produk = Product::with('product_type')->get();
         $type = ProductType::get();
        return Inertia::render('Dashboard/Produk/Index', [
            'data' => $produk,
            'tipe'  => $type,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'qty' => 'required|numeric',
            'harga' => 'required|numeric',
            'deskripsi' => 'string',
            'id_type' => 'required|integer|exists:product_types,id',
            'is_best_seller' => 'boolean',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        // Upload Foto
        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('produk', 'public');
            $validated['foto'] = asset('storage/' . $path); // URL langsung
        }

        $produk = Product::create($validated);

        return back()->with('success', 'Produk berhasil ditambahkan.');
    }


  public function update(Request $request, $id)
    {
        $produk = Product::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'qty' => 'required|numeric',
            'harga' => 'required|numeric',
            'id_type' => 'required|integer|exists:product_types,id',
            'deskripsi' => 'string',
            'is_best_seller' => 'boolean',
        ]);

        // === HANDLE FOTO BARU ===
        if ($request->hasFile('foto')) {

            // Hapus foto lama dari storage
            if ($produk->foto) {
                // Ambil nama filenya dari URL
                $filename = basename($produk->foto);

                $oldPath = storage_path('app/public/produk/' . $filename);

                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }

            // Simpan foto baru
            $path = $request->file('foto')->store('produk', 'public');

            // Simpan URL baru
            $validated['foto'] = asset('storage/' . $path);
        }

        $produk->update($validated);

        return back()->with('success', 'Produk berhasil diupdate.');
    }



    public function updateBestSeller(Request $request, $id)
    {
        $request->validate([
            'is_best_seller' => 'required|boolean',
        ]);

        $product = Product::findOrFail($id);

        $product->is_best_seller = $request->is_best_seller;
        $product->save();

        return back()->with('success', 'Status best seller diperbarui');
    }


      public function destroy(Request $request)
    {
        $ids = $request->ids; // array ID dari Inertia

        if (!$ids || !is_array($ids)) {
            return back()->with('error', 'ID tidak valid.');
        }

        Product::whereIn('id', $ids)->delete();

        return back()->with('success', 'Tipe produk berhasil dihapus.');
    }
}
