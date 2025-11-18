<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advice extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'id_user',
        'saran',
    ];

    public function user() {
        return $this->belongsTo(User::class,'id_user');
    }
}
