<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function ($table) {
            $table->dropColumn('name');
        });

        Schema::table('users', function ($table) {
            $table->string('firstname', 100);
            $table->string('lastname', 100);
            $table->string('username', 100);
            $table->string('slug', 100);
            $table->text('avatar')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
