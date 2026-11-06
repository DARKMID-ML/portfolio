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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name', 120);
            $table->string('initials', 4);
            $table->string('role', 120);
            $table->string('education', 160)->nullable();
            $table->string('profile_summary', 300)->nullable();
            $table->string('location', 120);
            $table->string('timezone', 60)->default('GMT (UTC+0)');
            $table->text('tagline');
            $table->json('bio');
            $table->string('email', 120);
            $table->string('phone', 40);
            $table->string('whatsapp', 255)->nullable();
            $table->string('linkedin', 255)->nullable();
            $table->string('github', 255)->nullable();
            $table->boolean('available')->default(true);
            $table->string('availability_text', 120);
            $table->json('roles');
            $table->json('languages');
            $table->string('cv_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
