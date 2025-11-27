<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\DetailOrder;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Order::query()->with('detail.produk.product_type','user');

        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('created_at', [
                $request->input('start_date'),
                $request->input('end_date')
            ]);
        }

        if ($request->filled('status')) {
            $query->whereIn('status', (array)$request->input('status'));
        }

        $order = $query->latest()->get();

        return Inertia::render('Dashboard/Order/Index', [
            'data' => $order,
            'filters' => $request->only(['start_date', 'end_date', 'status']),
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|integer|in:0,1,2',
        ]);

        $order->update(['status' => $request->status]);

        return notif_success("Status pesanan berhasil diubah");
    }

    /**
     * Store new order (cart checkout)
     */
    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'alamat' => 'required|string|max:255',
        ]);

        $user = auth()->user();

        if ($request->alamat !== $user->alamat) {
            $user->update(['alamat' => $request->alamat]);
        }

        $alamatFinal = $request->alamat;

        $carts = Cart::whereIn('id', $request->items)->with('products.promo')->get();

        if ($carts->isEmpty()) {
            return back()->withErrors('Tidak ada item yang dipilih.');
        }

        // ⚠ Validasi stok sebelum menyimpan order
        foreach ($carts as $c) {
            if ($c->qty > $c->products->stok) {
                return back()->with('notification', [
                    'title' => 'Stok Tidak Cukup',
                    'message' => "Stok produk {$c->products->nama} tersisa {$c->products->stok}",
                    'color' => 'red',
                    'success' => false
                ]);
            }
        }

        $subtotal_all = 0;
        $promo_all = 0;
        $total_all = 0;
        $items = [];

        foreach ($carts as $c) {
            $harga = $c->products->harga;
            $diskon = $c->products->promo->diskon_persen ?? 0;

            $subtotal = $harga * $c->qty;
            $potongan = ($harga * $diskon / 100) * $c->qty;

            $subtotal_all += $subtotal;
            $promo_all += $potongan;
            $total_all += ($subtotal - $potongan);

            $items[] = [
                'nama' => $c->products->nama,
                'qty'  => $c->qty,
                'harga' => $harga,
                'diskon' => $diskon,
            ];
        }

        // Simpan order
        $order = Order::create([
            'id_user' => $user->id,
            'total' => $total_all,
            'status' => 2,
        ]);

        // Simpan detail order & kurangi stok
        foreach ($carts as $c) {

            $produk = $c->products;

            DetailOrder::create([
                'id_order' => $order->id,
                'id_produk' => $produk->id,
                'qty' => $c->qty,
                'diskon' => $produk->promo->diskon_persen ?? 0,
                'total' => ($produk->harga * $c->qty) - (($produk->harga * ($produk->promo->diskon_persen ?? 0) / 100) * $c->qty),
            ]);

            // 👇 Kurangi stok
            $produk->decrement('stok', $c->qty);
        }

        Cart::whereIn('id', $request->items)->delete();

        return back()->with('notification', [
            'title' => 'Pesanan Berhasil',
            'message' => 'Pesanan anda sudah dibuat!',
            'color' => 'green',
            'success' => true,
            'whatsapp' => [
                'nama' => $user->nama,
                'phone' => $user->no_hp,
                'alamat' => $alamatFinal,
                'subtotal' => $subtotal_all,
                'diskon' => $promo_all,
                'total' => $total_all,
                'items' => $items,
            ]
        ]);
    }

    /**
     * Store WA order (langsung 1 produk)
     */
    public function storeWA(Request $request)
    {
        $request->validate([
            'id_produk' => 'required|exists:products,id',
            'qty' => 'required|integer|min:1',
            'alamat' => 'required|string|max:255',
        ]);

        $user = auth()->user();

        if ($request->alamat !== $user->alamat) {
            $user->update(['alamat' => $request->alamat]);
        }

        $product = Product::with('promo')->findOrFail($request->id_produk);

        // ⚠ Validasi stok
        if ($request->qty > $product->stok) {
            return back()->with('notification', [
                'title' => 'Stok Tidak Cukup',
                'message' => "Stok produk {$product->nama} hanya tersisa {$product->stok}",
                'color' => 'red',
                'success' => false
            ]);
        }

        $harga = $product->harga;
        $diskon = $product->promo->diskon_persen ?? 0;

        $subtotal = $harga * $request->qty;
        $potongan = ($harga * $diskon / 100) * $request->qty;
        $total = $subtotal - $potongan;

        $order = Order::create([
            'id_user' => $user->id,
            'total' => $total,
            'status' => 2,
        ]);

        DetailOrder::create([
            'id_order' => $order->id,
            'id_produk' => $product->id,
            'qty' => $request->qty,
            'diskon' => $diskon,
            'total' => $total,
        ]);

        // 👇 Kurangi stok
        $product->decrement('stok', $request->qty);

        return redirect()->back()->with('notification', [
            'title' => 'Pesanan Berhasil',
            'message' => 'Pesanan anda sudah ditambahkan!',
            'color' => 'green',
            'success' => true,
            'whatsapp' => [
                'nama' => $user->nama,
                'phone' => $user->no_hp,
                'alamat' => $request->alamat,
                'subtotal' => $subtotal,
                'diskon' => $potongan,
                'total' => $total,
                'items' => [
                    [
                        'nama' => $product->nama,
                        'qty' => $request->qty,
                    ]
                ]
            ]
        ]);
    }

    public function edit(Order $order) {}
    public function update(Request $request, Order $order) {}
    public function destroy(Order $order) {}
}
