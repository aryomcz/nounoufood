<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'harga',
        'qty',
        'is_best_seller',
        'is_halal',
        'deskripsi',
        'foto',
        'id_type',
        'id_promo'
    ];

    public function product_type() {
        return $this->belongsTo(ProductType::class, 'id_type');
    }

    public function halal() {
        return $this->hasOne(Halal::class, 'id_produk');
    }
    
    public function promo() {
        return $this->belongsTo(Promo::class, 'id_promo');
    }

}
