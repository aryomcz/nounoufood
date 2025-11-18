<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\ProductType;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index(Request $request) {
        $user = User::where('role', 'pelanggan')->count();
        $order = Order::count();
        $total_pembayaran = Order::where('status', 1)->sum('total');

        $year = $request->input('year', date('Y'));

        // mapping bulan
        $bulan = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];

        // ambil jumlah order per bulan pake created_at
        // ambil dari DB
        $ordersDB = Order::where('status', 1)->whereYear('created_at', $year)
        ->selectRaw('MONTH(created_at) as bulan, COUNT(*) as total')
        ->groupBy('bulan')
        ->orderBy('bulan')
        ->get()
        ->keyBy('bulan'); // key by bulan → memudahkan mapping

        $orders = collect(range(1, 12))->map(function ($m) use ($bulan, $ordersDB) {
            return [
                'name'  => $bulan[$m],
                'value' => $ordersDB[$m]->total ?? 0, // kalau tidak ada → 0
            ];
        });

        // list tahun yang ada di order
        $years = Order::where('status', 1)->selectRaw('YEAR(created_at) as year')
            ->groupBy('year')
            ->orderBy('year', 'desc')
            ->pluck('year');
        
        return Inertia::render('Dashboard/Index', [
            'user' => $user,
            'order' => $order,
            'totalPembayaran' => $total_pembayaran,
            'salesChart' => $orders,
            'year'       => $year,
            'years'      => $years,
        ]);
    }
}
