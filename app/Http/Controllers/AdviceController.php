<?php

namespace App\Http\Controllers;

use App\Models\Advice;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdviceController extends Controller
{
    public function index()
    {
        $advice = Advice::with('user')->orderBy('id', 'desc')->get();
        return Inertia::render('Dashboard/Saran/Index', [
            'data' => $advice
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'saran' => 'required|string|max:1000',
        ]);

        $user = auth()->user();
        $userId = $user->id;

        // Hitung total order dengan status 1
        $totalOrders = Order::where('id_user', $userId)
                            ->where('status', 1)
                            ->count();

        // Hitung total saran yang sudah dibuat
        $totalAdvice = Advice::where('id_user', $userId)->count();

        if ($totalOrders === 0) {
            return notif_error("Anda belum memiliki order yang selesai, tidak bisa memberi saran.");
        }

        if ($totalAdvice >= $totalOrders) {
            return notif_error("Jumlah saran yang dapat dikirim sudah maksimal.");
        }

        Advice::create([
            'id_user' => $userId,
            'saran' => $request->saran
        ]);

        return notif_success("Saran berhasil dikirim");
    }

    public function destroy(Request $request)
    {
        $ids = $request->ids; // array ID dari Inertia

        if (!$ids || !is_array($ids)) {
            return back()->with('error', 'ID tidak valid.');
        }

        Advice::whereIn('id', $ids)->delete();

        return notif_success("Saran berhasil dihapus");
    }
}
