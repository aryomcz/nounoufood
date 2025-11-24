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
            $request->validate([
                'items' => 'required|array',
                'alamat' => 'required|string|max:255', // <---- wajib isi alamat
            ]);

            $user = auth()->user();

            // cek apakah alamat berubah
            if ($request->alamat !== $user->alamat) {
                $user->update([
                    'alamat' => $request->alamat
                ]);
            }

            $alamatFinal = $request->alamat;

            $carts = Cart::whereIn('id', $request->items)->with('products.promo')->get();

            if ($carts->isEmpty()) {
                return back()->withErrors('Tidak ada item yang dipilih.');
            }
            $subtotal_all = 0;   // subtotal tanpa diskon
            $promo_all = 0;      // total diskon
            $total_all = 0;      // grand total setelah diskon
            $items = [];

            foreach ($carts as $c) {
                $harga = $c->products->harga;
                $diskon = $c->products->promo->diskon_persen ?? 0;

                $subtotal = $harga * $c->qty; // subtotal per item
                $potongan = ($harga * $diskon / 100) * $c->qty; // diskon per item

                $subtotal_all += $subtotal;     // total semua
                $promo_all += $potongan;        // total diskon semua
                $total_all += ($subtotal - $potongan);

                $items[] = [
                    'nama' => $c->products->nama,
                    'qty'  => $c->qty,
                    'harga' => $harga,
                    'diskon' => $diskon,
                ];
            }



            // Simpan ke tabel orders
            $order = Order::create([
                'id_user' => $user->id,
                'total' => $total_all,
                'status' => 2, // default
            ]);

            // Masukkan ke tabel order_details
            foreach ($carts as $c) {
                $harga = $c->products->harga;
                $diskon = $c->products->promo->diskon_persen ?? 0;
                $subtotal = $harga * $c->qty;
                $potongan = ($harga * $diskon / 100) * $c->qty;

                DetailOrder::create([
                    'id_order' => $order->id,
                    'id_produk' => $c->products->id,
                    'qty' => $c->qty,
                    'diskon' => $diskon,
                    'total' => $subtotal - $potongan,
                ]);
            }

            // Hapus cart yang dipilih
            Cart::whereIn('id', $request->items)->delete();

          return back()->with('notification', [
            'title' => 'Pesanan Berhasil',
            'message' => 'Pesanan anda sudah dibuat, mohon ditunggu untuk kami arahkan ke whatsapp!',
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
     * Display the specified resource.
     */
     public function storeWA(Request $request)
    {
        $request->validate([
            'id_produk' => 'required|exists:products,id',
            'qty' => 'required|integer|min:1',
            'alamat' => 'required|string|max:255',
        ]);

        $user = auth()->user();

        // update alamat jika berbeda
        if ($request->alamat !== $user->alamat) {
            $user->update(['alamat' => $request->alamat]);
        }

        $product = Product::with('promo')->findOrFail($request->id_produk);

        $harga = $product->harga;
        $diskon = $product->promo->diskon_persen ?? 0;

        $subtotal = $harga * $request->qty;
        $potongan = ($harga * $diskon / 100) * $request->qty;
        $total = $subtotal - $potongan;

        // simpan order
        $order = Order::create([
            'id_user' => $user->id,
            'total' => $total,
            'status' => 2, // default
        ]);

        // simpan detail order
        DetailOrder::create([
            'id_order' => $order->id,
            'id_produk' => $product->id,
            'qty' => $request->qty,
            'diskon' => $diskon,
            'total' => $total,
        ]);

        return back()->with('notification', [
            'title' => 'Pesanan Berhasil',
            'message' => 'Pesanan anda sudah ditambahkan, mohon lanjut ke WhatsApp untuk konfirmasi!',
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

   

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
