<?php

namespace App\Services;

use App\Models\Transaction;
use App\Models\Event;
use Illuminate\Support\Str;

class TransactionService
{
    public function create($user, $eventId, $orderId)
    {
        $event = Event::findOrFail($eventId);

        return Transaction::create([
            'user_id' => $user ? $user->id : 1,
            'event_id' => $event->id,
            'order_id' => $orderId,
            'amount' => $event->price,
            'status' => 'pending',
        ]);
    }

    public function markAsPaid($transaction)
    {
        $transaction->update([
            'status' => 'paid'
        ]);

        return $transaction;
    }
}
