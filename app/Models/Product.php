<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function product_type() {
        return $this->belongsTo(ProductType::class);
    }
    
    public function promo() {
        return $this->belongsTo(Promo::class);
    }

}
