<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TransactionService;
use App\Services\TicketService;
use Illuminate\Http\Request;
use App\Models\Event;

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

    public function checkout(Request $request)
    {
        $user = $request->user();

        $transaction = $this->transactionService->create($user, $request->event_id);

        // sementara anggap langsung paid (dummy)
        $this->transactionService->markAsPaid($transaction);

        $event = Event::findOrFail($request->event_id);

        $ticket = $this->ticketService->generate($user, $event, $transaction);

        return response()->json([
            'transaction' => $transaction,
            'ticket' => $ticket
        ]);
    }
}
