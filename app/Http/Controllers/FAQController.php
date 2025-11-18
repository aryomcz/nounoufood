<?php

namespace App\Http\Controllers;

use App\Models\FAQ;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FAQController extends Controller
{
    public function index()
    {
        $faqs = Faq::orderBy('id','desc')->get();

        return Inertia::render('Dashboard/FAQ/Index', [
            'data' => $faqs
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'pertanyaan' => 'required|string',
            'jawaban' => 'required|string',
        ]);

        FAQ::create($data);

        return back()->with('success','FAQ ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'pertanyaan' => 'required|string',
            'jawaban' => 'required|string',
        ]);

          try {
            $type = Faq::findOrFail($id);
            $type->update($validated);

            return back()->with('success', 'FAQ berhasil diperbarui.');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal memperbarui FAQ.');
        }
    }

     public function destroy(Request $request)
    {
        $ids = $request->ids; // array ID dari Inertia

        if (!$ids || !is_array($ids)) {
            return back()->with('error', 'ID tidak valid.');
        }

        Faq::whereIn('id', $ids)->delete();

        return back()->with('success', 'Tipe produk berhasil dihapus.');
    }
}
