<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SupplierController extends Controller
{
    /**
     * Display the companies listing.
     */
    public function index(Request $request): Response
    {
        $user = Auth::user();
        if ($user->hasPermission('view-any-supplier')) {
            $suppliers = Supplier::when($request->input('companyId'), function ($query, $companyId) {
                return $query->where('company_id', $companyId);
            })->paginate(10);
        } else {
            $suppliers = collect();
        }
        return Inertia::render('Dashboard/Supplier/Index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'suppliers' => $suppliers
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Dashboard/Supplier/Create', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function store(Request $request)
    {
        $supplier = new Supplier([
            'name' => $request->input('name'),
            'short_name' => $request->input('short_name'),
            'tax_id' => $request->input('tax_id'),
        ]);

        $supplier->save();

        return redirect()->route('supplier.index');
    }

    public function edit(Request $request, $id)
    {
        $supplier = Supplier::findOrFail($id);

        return Inertia::render('Dashboard/Supplier/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'supplier' => $supplier
        ]);
    }

    public function update($id, Request $request): RedirectResponse
    {
        $supplier = Supplier::findOrFail($id);
        $supplier->name = $request->input('name');
        $supplier->short_name = $request->input('short_name');
        $supplier->tax_id = $request->input('tax_id');
        $supplier->save();

        return redirect()->route('supplier.index');
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $supplier = Supplier::findOrFail($id);
            $supplier->delete();
            return redirect()->route('supplier.index')->with('message', 'Record deleted successfully');
        } catch (\Exception $e) {
            return redirect()->route('supplier.index')->with('message', 'Erro ao excluir fornecedor');
        }
    }
}
