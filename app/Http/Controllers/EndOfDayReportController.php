<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\EndOfDayReport;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class EndOfDayReportController extends Controller
{
    /**
     * Display the companies listing.
     */
    public function index(Request $request): Response
    {
        $user = Auth::user();
        if ($user->hasPermission('view-any-end-of-day-report')) {
            $endOfDayReports = EndOfDayReport::with('company')->paginate(10);
        } elseif ($user->hasPermission('view-end-of-day-report')) {
            $endOfDayReports = EndOfDayReport::where('company_id', $user->company_id)->with('company')->paginate(10);
        } else {
            $endOfDayReports = collect();
        }

        return Inertia::render('Dashboard/EndOfDayReport/Index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'endOfDayReports' => $endOfDayReports ?? []
        ]);
    }

    public function create(Request $request)
    {
        $user = Auth::user();
        if ($user->hasPermission('create-end-of-day-report')) {
            return Inertia::render('Dashboard/EndOfDayReport/Create', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        }
        return Inertia::location('/dashboard');
    }

    public function store(Request $request)
    {
        $request->validate([
            'request_date' => 'required|date',
            'payment_type' => 'required|string',
            'amount' => 'required|numeric',
            'payment_date' => 'required|date',
            'file' => 'file|mimes:pdf,jpg,jpeg,png',
        ]);

        try {
            $path = $request->file('file')->store('paymentRequests', 's3');

            $paymentRequest = new EndOfDayReport([
                'request_date' => $request->input('request_date'),
                'payment_type' => $request->input('payment_type'),
                'pix_key' => $request->input('pix_key'),
                'key_type' => $request->input('key_type'),
                'recipient_name' => $request->input('recipient_name'),
                'amount' => $request->input('amount'),
                'payment_date' => $request->input('payment_date'),
                'remarks' => $request->input('remarks'),
                'barcode_number' => $request->input('barcode_number'),
                'file_url' => null
            ]);

            $paymentRequest->save();

            return redirect()->route('paymentRequest.index');
        } catch (\Exception $exception) {
            // If an exception occurs, delete the file from S3
            if (isset($path) && Storage::disk('s3')->exists($path)) {
                Storage::disk('s3')->delete($path);
            }

            // Handle the error, log it, or return a response as needed
            return redirect()->back()->with('error', 'An error occurred while processing your request.');
        }
    }

    public function edit(Request $request, $id)
    {
        $endOfDayReport = EndOfDayReport::findOrFail($id);
        $company = Company::findOrFail($id);
        $users = User::where('company_id', $id)->paginate(10);

        return Inertia::render('Dashboard/EndOfDayReport/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'endOfDayReport' => $endOfDayReport,
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
