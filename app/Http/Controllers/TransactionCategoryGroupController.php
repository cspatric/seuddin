<?php

namespace App\Http\Controllers;

use App\Models\TransactionCategoryGroup;
use Illuminate\Http\Request;

class TransactionCategoryGroupController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', TransactionCategoryGroup::class);

        return TransactionCategoryGroup::all();
    }

    public function store(Request $request)
    {
        $this->authorize('create', TransactionCategoryGroup::class);

        $request->validate([
            'name' => ['required'],
        ]);

        return TransactionCategoryGroup::create($request->validated());
    }

    public function show(TransactionCategoryGroup $transactionCategoryGroup)
    {
        $this->authorize('view', $transactionCategoryGroup);

        return $transactionCategoryGroup;
    }

    public function update(Request $request, TransactionCategoryGroup $transactionCategoryGroup)
    {
        $this->authorize('update', $transactionCategoryGroup);

        $request->validate([
            'name' => ['required'],
        ]);

        $transactionCategoryGroup->update($request->validated());

        return $transactionCategoryGroup;
    }

    public function destroy(TransactionCategoryGroup $transactionCategoryGroup)
    {
        $this->authorize('delete', $transactionCategoryGroup);

        $transactionCategoryGroup->delete();

        return response()->json();
    }
}
