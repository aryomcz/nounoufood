<?php

namespace App\Http\Controllers;

use App\Models\Advice;
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
