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
        Schema::create('end_of_day_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained();
            $table->date('closing_date');
            $table->decimal('initial_cash_balance', 20, 2);
            $table->decimal('cash_sales_total', 20, 2);
            $table->decimal('cash_receipts_accounts_receivable', 20, 2);
            $table->decimal('cash_expenses_total', 20, 2);
            $table->decimal('final_cash_balance', 20, 2);
            $table->decimal('credit_sales_total', 20, 2);
            $table->decimal('pix_transfer_sales_total', 20, 2);
            $table->decimal('card_sales_total', 20, 2);
            $table->decimal('payment_link_sales_total', 20, 2);
            $table->decimal('other_sales_modalities_total', 20, 2);
            $table->decimal('accounts_receivable_pix_transfer_total', 20, 2);
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
        Schema::dropIfExists('end_of_day_reports');
    }
};
