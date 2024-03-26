<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    public function index(Request $request): Response
    {
        $user = Auth::user();
        if ($user->hasPermission('view-any-employee')) {
            $employees = Employee::when($request->input('companyId'), function ($query, $companyId) {
                return $query->where('company_id', $companyId);
            })->paginate(10);
        } else {
            $employees = collect();
        }
        return Inertia::render('Dashboard/Employee/Index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'employees' => $employees
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Dashboard/Employee/Create', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function store(Request $request)
    {
        $employee = new Employee([
            'name' => $request->input('name'),
            'short_name' => $request->input('short_name'),
            'tax_id' => $request->input('tax_id'),
        ]);

        $employee->save();

        return redirect()->route('employee.index');
    }

    public function edit(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);

        return Inertia::render('Dashboard/Employee/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'employee' => $employee
        ]);
    }

    public function update($id, Request $request): RedirectResponse
    {
        $employee = Employee::findOrFail($id);
        $employee->name = $request->input('name');
        $employee->short_name = $request->input('short_name');
        $employee->tax_id = $request->input('tax_id');
        $employee->save();

        return redirect()->route('employee.index');
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $employee = Employee::findOrFail($id);
            $employee->delete();
            return redirect()->route('employee.index')->with('message', 'Record deleted successfully');
        } catch (\Exception $e) {
            return redirect()->route('employee.index')->with('message', 'Erro ao excluir funcionário');
        }
    }
}
