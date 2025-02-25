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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained();
            $table->foreignId('supplier_id')->nullable();
            $table->foreignId('customer_id')->nullable();
            $table->foreignId('employee_id')->nullable();
            $table->dateTime('date');
            $table->foreignId('transaction_category_id')->nullable();
            $table->decimal('amount', 20, 2);
            $table->string('payment_method')->nullable();
            $table->string('file')->nullable();
            $table->text('remarks')->nullable();
            $table->text('description')->nullable();
            $table->string('status')->default('new');
            $table->decimal('balance', 20, 2);
            $table->enum('type', ['payment', 'transfer'])->default('payment');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
