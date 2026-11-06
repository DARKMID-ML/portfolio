<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Reproduit l'ancien schéma Drizzle `contact_messages`
     * (src/db/schema.ts du projet Next.js).
     */
    public function up(): void
    {
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 80);
            $table->string('email', 120);
            $table->string('subject', 120);
            $table->text('message');
            $table->boolean('read')->default(false);
            $table->timestamp('created_at')->useCurrent();

            // L'ancien schéma Drizzle ne gère pas updated_at.
            $table->index(['read', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
    }
};
