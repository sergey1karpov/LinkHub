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
        Schema::create('link_style', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('link_id');
            $table->foreign('link_id')->references('id')->on('links');

            $table->string('link_font', 255)->nullable();
            $table->integer('link_font_size')->nullable();
            $table->string('link_font_color', 10)->nullable();
            $table->boolean('link_font_strong')->default(false)->nullable();
            $table->integer('link_font_shadow_offset_x')->nullable();
            $table->integer('link_font_shadow_offset_y')->nullable();
            $table->integer('link_font_shadow_blur_radius')->nullable();
            $table->string('link_font_shadow_color', 10)->nullable();
            $table->string('card_background_color_hex', 20)->nullable();
            $table->float('card_background_color_transparency')->nullable();
            $table->integer('card_shadow_offset_x')->nullable();
            $table->integer('card_shadow_offset_y')->nullable();
            $table->integer('card_shadow_blur_radius')->nullable();
            $table->string('card_shadow_color', 10)->nullable();
            $table->integer('card_border_width')->nullable();
            $table->string('card_border_color', 10)->nullable();
            $table->integer('card_border_radius_left_top')->nullable();
            $table->integer('card_border_radius_left_bottom')->nullable();
            $table->integer('card_border_radius_right_top')->nullable();
            $table->integer('card_border_radius_right_bottom')->nullable();
            $table->string('card_animation', 255)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('link_style');
    }
};
