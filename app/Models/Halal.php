<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Halal extends Model
{
     use HasFactory;

    protected $fillable = [
        'no_sertifikasi',
        'id_produk'
    ];

    public function products() {
        return $this->belongsTo(Product::class, 'id_produk');
    }

}
