<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Midtrans\Notification;
use App\Models\Transaction;
use App\Services\TransactionService;
use App\Services\TicketService;

class MidtransController extends Controller
{
    public function callback(Request $request)
    {
        $notif = new Notification();

        $transactionStatus = $notif->transaction_status;
        $orderId = $notif->order_id;

        $transaction = Transaction::where('order_id', $orderId)->first();

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        // ✅ SUCCESS
        if ($transactionStatus == 'settlement') {
            $transaction->update(['status' => 'paid']);

            // 🎟️ generate ticket
            app(TicketService::class)->generate(null, $transaction->event, $transaction);
        }

        // ⏳ PENDING
        if ($transactionStatus == 'pending') {
            $transaction->update(['status' => 'pending']);
        }

        // ❌ FAILED
        if (in_array($transactionStatus, ['cancel', 'expire', 'deny'])) {
            $transaction->update(['status' => 'failed']);
        }

        return response()->json(['message' => 'OK']);
    }
}
