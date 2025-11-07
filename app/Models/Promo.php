<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promo extends Model
{
    use HasFactory;

    protected $fillable = [
        'judul',
        'deskripsi',
        'diskon_persen',
        'tanggal_mulai',
        'tanggal_selesai',
        'foto',
    ];

    public function promo() {
        return $this->hasMany(Product::class);
    }
}
