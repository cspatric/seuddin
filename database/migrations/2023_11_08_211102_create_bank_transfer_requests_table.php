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
            $table->foreignId('company_id')->constrained();
            $table->date('request_date');
            $table->string('transfer_type')->nullable();
            $table->string('key_type')->nullable();
            $table->string('pix_key')->nullable();
            $table->string('recipient_name');
            $table->decimal('amount', 20, 2);
            $table->date('payment_date')->nullable();
            $table->text('remarks')->nullable();
            $table->string('status')->default('new');
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
