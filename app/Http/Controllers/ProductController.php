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
            'stok' => 'required|numeric',
            'deskripsi' => 'string',
            'id_type' => 'required|integer|exists:product_types,id',
            'is_best_seller' => 'boolean',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        // Upload Foto
        if ($request->hasFile('foto')) {
             $file = $request->file('foto');
            $ext  = $file->getClientOriginalExtension();
            $filename = 'produk-' . date('Y-m-d') . '-' . time() . '.' . $ext;

            $file->storeAs('products', $filename, 'public');
            $validated['foto'] = asset('storage/products/' . $filename);
        }

        $produk = Product::create($validated);

        return notif_success("Produk berhasil ditambahkan");
    }


 public function update(Request $request, $id)
    {
        $produk = Product::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'qty' => 'required|numeric',
            'stok' => 'required|numeric',
            'harga' => 'required|numeric',
            'id_type' => 'required|integer|exists:product_types,id',
            'deskripsi' => 'string',
            'is_best_seller' => 'boolean',
        ]);

        // === HANDLE FOTO BARU ===
        if ($request->hasFile('foto')) {

            // hapus foto lama
            if ($produk->foto) {
                $oldFile = basename($produk->foto);
                $oldPath = storage_path('app/public/products/' . $oldFile);
                if (file_exists($oldPath)) unlink($oldPath);
            }

            // upload foto baru
            $file = $request->file('foto');
            $ext  = $file->getClientOriginalExtension();
            $filename = 'produk-' . date('Y-m-d') . '-' . time() . '.' . $ext;

            $file->storeAs('products', $filename, 'public');

            // update URL foto
            $validated['foto'] = asset('storage/products/' . $filename);
        } else {
            // kalau tidak upload foto → pertahankan URL lama
            $validated['foto'] = $produk->foto;
        }

        $produk->update($validated);

        return notif_success("Produk berhasil diubah");
    }

    public function updateBestSeller(Request $request, $id)
    {
        $request->validate([
            'is_best_seller' => 'required|boolean',
        ]);

        $product = Product::findOrFail($id);

        $product->is_best_seller = $request->is_best_seller;
        $product->save();

        if ($request->is_best_seller == true) {
            return notif_success("Produk jadi best seller");
        } else {
            return notif_success("Produk jadi bukan best seller");
        }

    }

    public function updateStok(Request $request, $id)
    {
        $request->validate([
            'stok' => 'required|numeric',
        ]);

        $product = Product::findOrFail($id);

        $product->stok = $request->stok;
        $product->save();

        return notif_success("Stok berhasil diupdate");

    }


        public function destroy(Request $request)
    {
        $ids = $request->ids;

        if (!$ids || !is_array($ids)) {
            return back()->with('error', 'ID tidak valid.');
        }

        // Ambil semua produk yang akan dihapus
        $products = Product::whereIn('id', $ids)->get();

        foreach ($products as $produk) {
            // Hapus foto jika ada
            if ($produk->foto) {
                $oldFile = basename($produk->foto);
                $oldPath = storage_path('app/public/products/' . $oldFile);

                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }

            // Hapus data produk
            $produk->delete();
        }

       return notif_success("Produk berhasil dihapus");
    }

}
