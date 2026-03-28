<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Services\TicketService;
use App\Services\TransactionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Midtrans\Notification;

class MidtransController extends Controller
{
    public function callback(Request $request)
    {
        Log::info('MIDTRANS RAW', $request->all());

        $data = $request->all();

        $orderId = $data['order_id'] ?? null;
        $status = $data['transaction_status'] ?? null;

        if (!$orderId) {
            Log::error('ORDER ID NOT FOUND');
            return response()->json(['message' => 'Invalid data'], 400);
        }

        $transaction = Transaction::where('order_id', $orderId)->first();

        if (!$transaction) {
            Log::error('TRANSACTION NOT FOUND', ['order_id' => $orderId]);
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        if (in_array($status, ['settlement', 'capture'])) {
            $transaction->update(['status' => 'paid']);
        } elseif ($status == 'pending') {
            $transaction->update(['status' => 'pending']);
        } elseif (in_array($status, ['cancel', 'expire', 'deny'])) {
            $transaction->update(['status' => 'failed']);
        }

        Log::info('TRANSACTION UPDATED', [
            'order_id' => $orderId,
            'status' => $status
        ]);

        return response()->json(['message' => 'OK']);
    }
}
