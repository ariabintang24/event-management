<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Transaction;
use App\Services\TicketService;
use App\Services\TransactionService;
use Illuminate\Http\Request;
use Midtrans\Snap;
use Midtrans\Config;

class TransactionController extends Controller
{
    protected $transactionService;
    protected $ticketService;

    public function __construct(
        TransactionService $transactionService,
        TicketService $ticketService
    ) {
        $this->transactionService = $transactionService;
        $this->ticketService = $ticketService;
    }

    public function myTransactions(Request $request)
    {
        $transactions = Transaction::with('event')
            // ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return response()->json($transactions);
    }

    public function show($id)
    {
        $transaction = \App\Models\Transaction::with('event')->find($id);

        if (!$transaction) {
            return response()->json([
                'message' => 'Transaction not found'
            ], 404);
        }

        return response()->json($transaction);
    }

    public function pay($id)
    {
        $trx = \App\Models\Transaction::findOrFail($id);

        // optional: validasi
        if (!$trx->snap_token) {
            return response()->json([
                'error' => 'Snap token not found'
            ], 400);
        }

        return response()->json([
            'token' => $trx->snap_token
        ]);
    }

    // public function callback(Request $request)
    // {
    //     $data = $request->all();

    //     $orderId = $data['order_id'];
    //     $status = $data['transaction_status'];

    //     $trx = \App\Models\Transaction::where('order_id', $orderId)->first();

    //     if (!$trx) {
    //         return response()->json(['message' => 'Transaction not found'], 404);
    //     }

    //     if ($status == 'settlement' || $status == 'capture') {
    //         $trx->status = 'paid';
    //     } elseif ($status == 'pending') {
    //         $trx->status = 'pending';
    //     } elseif ($status == 'expire') {
    //         $trx->status = 'expired';
    //     } elseif ($status == 'cancel' || $status == 'deny') {
    //         $trx->status = 'failed';
    //     }

    //     $trx->save();

    //     return response()->json(['message' => 'OK']);
    // }

    // public function checkout(Request $request)
    // {
    //     $user = $request->user();

    //     $transaction = $this->transactionService->create($user, $request->event_id);

    //     // sementara anggap langsung paid (dummy)
    //     $this->transactionService->markAsPaid($transaction);

    //     $event = Event::findOrFail($request->event_id);

    //     $ticket = $this->ticketService->generate($user, $event, $transaction);

    //     return response()->json([
    //         'transaction' => $transaction,
    //         'ticket' => $ticket
    //     ]);
    // }
}
