<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CompanyProfile;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // Tampilkan isi keranjang
    public function index()
  {
        $carts = Cart::with(['products.promo'])
            ->where('id_user', Auth::id())
            ->get();

        // hitung total otomatis
        $total = 0;
        $disc = 0;

        foreach ($carts as $c) {
            $harga = $c->products->harga;
            $diskon = $c->products->promo->diskon_persen ?? 0;

            $harga_disc = $harga - ($harga * $diskon / 100);
            $subtotal = $harga * $c->qty;

            $c->subtotal = $subtotal;

            
            $disc += ($harga * $diskon / 100) * $c->qty;

            $total += $subtotal - $disc;
        }

        $company = CompanyProfile::first();


        return inertia('Cart/Index', [
            'carts' => $carts,
            'total' => $total,
            'diskon' => $disc,
            'company' => $company
        ]);
    }

    // Tambah ke keranjang
    public function create(Request $request)
    {
        $request->validate([
            'id_produk' => 'required|integer',
            'qty' => 'required|integer|min:1'
        ]);

        $product = Product::findOrFail($request->id_produk);

        // Cek apakah sudah ada di cart
        $existing = Cart::where('id_user', Auth::id())
            ->where('id_produk', $product->id)
            ->first();

        if ($existing) {
            $existing->qty += $request->qty;
            $existing->save();
        } else {
            Cart::create([
                'id_user' => Auth::id(),
                'id_produk' => $product->id,
                'qty' => $request->qty,
            ]);
        }

        return redirect()->back()->with('notification', [
            'title' => 'Berhasil',
            'message' => "Produk berhasil ditambahkan ke keranjang",
            'color' => 'green',
        ]);

    }

    // Update qty
    public function updateQty(Request $request)
    {
        $request->validate([
            'cart_id' => 'required|integer',
            'qty' => 'required|integer|min:1'
        ]);

        $cart = Cart::findOrFail($request->cart_id);
        $cart->qty = $request->qty;
        $cart->save();

        return notif_success("Jumlah produk berhasil diupdate");
    }

    // Update cart item lainnya (opsional)
    public function update(Request $request)
    {
        // custom jika ada perubahan lain
    }

    // Hapus item
    public function destroy(Request $request)
    {
         if (!$request->cart_id || !is_array($request->cart_id)) {
            return back()->with('error', 'ID tidak valid.');
        }

        Cart::whereIn('id',$request->cart_id)->delete();

        return notif_success("Produk dihapus dari keranjang");
    }
}
