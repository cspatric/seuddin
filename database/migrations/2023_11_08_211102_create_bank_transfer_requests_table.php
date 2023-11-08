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
        Schema::create('bank_transfer_requests', function (Blueprint $table) {
            $table->id();
            $table->date('request_date');
            $table->string('transfer_type');
            $table->string('key_type');
            $table->string('pix_key');
            $table->string('recipient_name');
            $table->decimal('amount', 20, 2);
            $table->date('payment_date')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bank_transfer_requests');
    }
};
