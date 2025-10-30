<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('company_profiles', function (Blueprint $table) {
            $table->id();
            $table->longText('sejarah');
            $table->integer('tahun_berdiri');
            $table->longText('visi');
            $table->longText('misi');
            $table->string('email');
            $table->integer('no_hp');
            $table->longText('tiktok');
            $table->longText('shopee');
            $table->longText('foto');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_profiles');
    }
};
