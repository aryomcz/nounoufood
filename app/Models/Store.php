<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    //
     protected $fillable = [
        'nama',
        'alamat',
        'url_map',
        'url_map_embed',
    ];
}
