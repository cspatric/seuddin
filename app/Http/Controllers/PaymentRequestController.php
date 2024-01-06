<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\PaymentRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PaymentRequestController extends Controller
{
    /**
     * Display the companies listing.
     */
    public function index(Request $request): Response
    {
        $user = Auth::user();
        if ($user->hasPermission('view-any-payment-request')) {
            $paymentRequests = PaymentRequest::with('company')->paginate(10);
        } elseif ($user->hasPermission('view-payment-request')) {
            $paymentRequests = PaymentRequest::where('company_id', $user->company_id)->with('company')->paginate(10);
        } else {
            $paymentRequests = collect();
        }

        return Inertia::render('Dashboard/PaymentRequest/Index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'paymentRequests' => $paymentRequests ?? []
        ]);
    }

    public function create(Request $request)
    {
        $user = Auth::user();
        if ($user->hasPermission('create-payment-request')) {
            return Inertia::render('Dashboard/PaymentRequest/Create', [
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

            $paymentRequest = new PaymentRequest([
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
        $paymentRequest = PaymentRequest::findOrFail($id);

        return Inertia::render('Dashboard/PaymentRequest/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'paymentRequest' => $paymentRequest
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
