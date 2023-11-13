<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CompanyController extends Controller
{
    /**
     * Display the companies listing.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Dashboard/Company/Index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'companies' => Company::select('id', 'name', 'short_name', 'tax_id')->paginate(10)
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Dashboard/Company/Create', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function store(Request $request)
    {
        $company = new Company([
            'name' => $request->input('name'),
            'short_name' => $request->input('short_name'),
            'tax_id' => $request->input('tax_id'),
        ]);

        $company->save();

        return redirect()->route('company.index');
    }

    public function edit(Request $request, $id)
    {
        $company = Company::findOrFail($id);
        $users = User::where('company_id', $id)->paginate(10);

        return Inertia::render('Dashboard/Company/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'company' => $company,
            'users' => $users
        ]);
    }

    public function update($id, Request $request): RedirectResponse
    {
        $company = Company::findOrFail($id);
        $company->name = $request->input('name');
        $company->short_name = $request->input('short_name');
        $company->tax_id = $request->input('tax_id');
        $company->save();

        return redirect()->route('company.index');
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $company = Company::findOrFail($id);
            $company->delete();
            return redirect()->route('company.index')->with('message', 'Record deleted successfully');
        } catch (\Exception $e) {
            return redirect()->route('company.index')->with('message', 'Erro ao excluir empresa');
        }
    }
}
