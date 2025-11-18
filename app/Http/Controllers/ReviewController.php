<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $testi = Review::get();

        return Inertia::render('Dashboard/Testimoni/Index', [
            'data' => $testi
        ]);
    }
 public function store(Request $request)
    {
        $data = $request->validate([
            'nama' => 'required|string',
            'komentar' => 'required|string',
            'bintang' => 'required',
        ]);

        Review::create($data);

        return back()->with('success','Testimoni ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
             'nama' => 'required|string',
            'komentar' => 'required|string',
            'bintang' => 'required',
        ]);

          try {
            $type = Review::findOrFail($id);
            $type->update($validated);

            return back()->with('success', 'Testimoni berhasil diperbarui.');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal memperbarui Testimoni.');
        }
    }

     public function destroy(Request $request)
    {
        $ids = $request->ids; // array ID dari Inertia

        if (!$ids || !is_array($ids)) {
            return back()->with('error', 'ID tidak valid.');
        }

        Review::whereIn('id', $ids)->delete();

        return back()->with('success', 'Tipe produk berhasil dihapus.');
    }
}
