<?php

namespace App\Http\Controllers;

use App\Models\FAQ;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FAQController extends Controller
{
    public function index()
    {
        $faqs = FAQ::orderBy('id','desc')->get();

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

    public function update(Request $request, FAQ $faq)
    {
        $data = $request->validate([
            'pertanyaan' => 'required|string',
            'jawaban' => 'required|string',
        ]);

        $faq->update($data);

        return back()->with('success','FAQ diupdate');
    }

    public function destroy(FAQ $faq)
    {
        $faq->delete();

        return back()->with('success','FAQ dihapus');
    }
}
