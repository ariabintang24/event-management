<?php

namespace App\Services;

use App\Models\Ticket;

class CheckInService
{
    public function handle($code)
    {
        $ticket = Ticket::where('qr_code', $code)->first();

        if (!$ticket) {
            return ['status' => 'error', 'message' => 'Invalid ticket'];
        }

        if ($ticket->status === 'used') {
            return ['status' => 'error', 'message' => 'Already used'];
        }

        $ticket->update([
            'status' => 'used',
            'checked_in_at' => now()
        ]);

        return ['status' => 'success', 'message' => 'Check-in success'];
    }
}
