<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function index(Request $request): Response
    {
        $user = Auth::user();
        if ($user->hasPermission('view-any-customer')) {
            $customers = Customer::with('company')
                ->when($request->input('companyId'), function ($query, $companyId) {
                return $query->where('company_id', $companyId);
                })
                ->paginate(10);
        } else {
            $customers = collect();
        }
        return Inertia::render('Dashboard/Customer/Index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'customers' => $customers
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Dashboard/Customer/Create', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function store(Request $request)
    {
        $customer = new Customer([
            'name' => $request->input('name'),
            'short_name' => $request->input('short_name'),
            'tax_id' => $request->input('tax_id'),
        ]);

        $customer->save();

        return redirect()->route('customer.index');
    }

    public function edit(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);

        return Inertia::render('Dashboard/Customer/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'customer' => $customer
        ]);
    }

    public function update($id, Request $request): RedirectResponse
    {
        $customer = Customer::findOrFail($id);
        $customer->name = $request->input('name');
        $customer->short_name = $request->input('short_name');
        $customer->tax_id = $request->input('tax_id');
        $customer->save();

        return redirect()->route('customer.index');
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $customer = Customer::findOrFail($id);
            $customer->delete();
            return redirect()->route('customer.index')->with('message', 'Record deleted successfully');
        } catch (\Exception $e) {
            return redirect()->route('customer.index')->with('message', 'Erro ao excluir cliente');
        }
    }
}
