<?php

namespace App\Http\Controllers;

use App\Models\TransactionCategorySubgroup;
use Illuminate\Http\Request;

class TransactionCategorySubgroupController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', TransactionCategorySubgroup::class);

        return TransactionCategorySubgroup::all();
    }

    public function store(Request $request)
    {
        $this->authorize('create', TransactionCategorySubgroup::class);

        $request->validate([

        ]);

        return TransactionCategorySubgroup::create($request->validated());
    }

    public function show(TransactionCategorySubgroup $transactionCategorySubgroup)
    {
        $this->authorize('view', $transactionCategorySubgroup);

        return $transactionCategorySubgroup;
    }

    public function update(Request $request, TransactionCategorySubgroup $transactionCategorySubgroup)
    {
        $this->authorize('update', $transactionCategorySubgroup);

        $request->validate([

        ]);

        $transactionCategorySubgroup->update($request->validated());

        return $transactionCategorySubgroup;
    }

    public function destroy(TransactionCategorySubgroup $transactionCategorySubgroup)
    {
        $this->authorize('delete', $transactionCategorySubgroup);

        $transactionCategorySubgroup->delete();

        return response()->json();
    }
}
