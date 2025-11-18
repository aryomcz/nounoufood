<?php

namespace App\Http\Controllers;

use App\Models\Store;
use DOMDocument;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $store = Store::get();

        return Inertia::render('Dashboard/Toko/Index', [
            'data' => $store
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama' => 'required|string',
            'alamat' => 'required|string',
            'url_map' => 'required',
            'url_map_embed' => 'required',
        ]);

        $dom = new DOMDocument();
        $dom->loadHTML($request->url_map_embed);
        $iframes = $dom->getElementsByTagName('iframe');
        if ($iframes->length > 0) {
            $iframe = $iframes[0];
            $mapUrl = $iframe->getAttribute('src');
        } else {
            $mapUrl = $request->url_map_embed;
        }

        $data['url_map_embed'] = $mapUrl;

        Store::create($data);

        return back()->with('success','Toko ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
           'nama' => 'required|string',
            'alamat' => 'required|string',
            'url_map' => 'required',
            'url_map_embed' => 'required',
        ]);

          try {
            $type = Store::findOrFail($id);
            $dom = new DOMDocument();
            $dom->loadHTML($request->url_map_embed);
            $iframes = $dom->getElementsByTagName('iframe');
            if ($iframes->length > 0) {
                $iframe = $iframes[0];
                $mapUrl = $iframe->getAttribute('src');
            } else {
                $mapUrl = $request->url_map_embed;
            }

            $validated['url_map_embed'] = $mapUrl;
            $type->update($validated);

            return back()->with('success', 'Toko berhasil diperbarui.');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal memperbarui Toko.');
        }
    }

     public function destroy(Request $request)
    {
        $ids = $request->ids; // array ID dari Inertia

        if (!$ids || !is_array($ids)) {
            return back()->with('error', 'ID tidak valid.');
        }

        Store::whereIn('id', $ids)->delete();

        return back()->with('success', 'Tipe produk berhasil dihapus.');
    }
}
