<?php

namespace App\Services;

use App\Models\Ticket;
use Illuminate\Support\Str;

class TicketService
{
    public function generate($user, $event, $transaction)
    {
        return Ticket::create([
            'user_id' => $user->id,
            'event_id' => $event->id,
            'transaction_id' => $transaction->id,
            'qr_code' => 'TICKET-' . Str::uuid(),
            'status' => 'unused',
        ]);
    }
}
