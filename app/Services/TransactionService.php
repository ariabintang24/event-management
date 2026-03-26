<?php

namespace App\Services;

use App\Models\Transaction;
use App\Models\Event;
use Illuminate\Support\Str;

class TransactionService
{
    public function create($user, $eventId)
    {
        $event = Event::findOrFail($eventId);

        return Transaction::create([
            'user_id' => $user->id,
            'order_id' => 'ORD-' . Str::uuid(),
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
