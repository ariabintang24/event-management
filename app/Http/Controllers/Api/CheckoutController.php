<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Snap;
use App\Models\Event;

use App\Services\TransactionService;



class CheckoutController extends Controller
{
    protected $transactionService;

    public function __construct(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    public function checkout(Request $request)
    {
        try {
            Config::$serverKey = env('MIDTRANS_SERVER_KEY');
            Config::$isProduction = false;
            Config::$isSanitized = true;
            Config::$is3ds = true;

            $event = Event::findOrFail($request->event_id);

            // ✅ HANDLE FREE EVENT
            if ($event->price == 0) {
                return response()->json([
                    'message' => 'Free event'
                ]);
            }

            // ✅ ORDER ID
            $orderId = 'EVENNT-' . $event->id . '-' . time();

            // ✅ USER (boleh null dulu)
            $user = auth()->user();

            // ✅ SIMPAN TRANSACTION (PENDING)
            $transaction = $this->transactionService->create(
                $user,
                $event->id,
                $orderId
            );

            // ✅ MIDTRANS PARAMS
            $params = [
                'transaction_details' => [
                    'order_id' => $orderId,
                    'gross_amount' => (int) $event->price,
                ],
                'item_details' => [
                    [
                        'id' => $event->id,
                        'price' => (int) $event->price,
                        'quantity' => 1,
                        'name' => substr($event->title, 0, 50),
                    ]
                ],
                'customer_details' => [
                    'first_name' => 'Guest',
                    'email' => 'guest@example.com',
                ],
            ];

            $snapToken = Snap::getSnapToken($params);

            return response()->json([
                'token' => $snapToken
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
