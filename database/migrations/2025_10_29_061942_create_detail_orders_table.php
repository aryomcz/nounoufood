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
        Schema::create('detail_orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_order');
            $table->unsignedBigInteger('id_produk')->nullable();
            $table->integer('qty');
            $table->integer('diskon');
            $table->integer('total');
            $table->timestamps();
            $table->foreign('id_order')->references('id')->on('orders')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('id_produk')->references('id')->on('products')->onDelete('set null')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_orders');
    }
};
