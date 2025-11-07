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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->integer('harga');
            $table->integer('qty');
            $table->boolean('is_best_seller')->default(false);
            $table->boolean('is_halal')->default(false);
            $table->longText('deskripsi')->nullable();
            $table->longText('foto');
            $table->unsignedBigInteger('id_type')->nullable();
            $table->unsignedBigInteger('id_promo')->nullable();
            $table->foreign('id_type')->references('id')->on('product_types')->onDelete('set null')->onUpdate('cascade');
            $table->foreign('id_promo')->references('id')->on('promos')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
