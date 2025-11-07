<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyProfile extends Model
{
    //
    protected $fillable = [
        'sejarah',
        'tahun_berdiri',
        'visi',
        'misi',
        'email',
        'no_hp',
        'tiktok',
        'shopee',
        'foto',
    ];

}
