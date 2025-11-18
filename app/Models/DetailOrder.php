<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailOrder extends Model
{
    //
    use HasFactory;
    
    protected $fillable = [
        'id_order',
        'id_produk',
        'nama',
        'qty',
        'diskon',
        'total',
    ];

    public function order() {
        return $this->belongsTo(Order::class, 'id_order');
    }

    public function produk() {
        return $this->belongsTo(Product::class, 'id_produk');
    }
}
