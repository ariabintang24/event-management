<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Services\CheckInService;
use Illuminate\Http\Request;


class TicketController extends Controller
{
    public function index(Request $request)
    {

        return Ticket::with('event.images')->get();

        // return $request->user()
        //     ->tickets()
        //     ->with('event.images')
        //     ->get();
    }

    public function checkIn(Request $request, CheckInService $service)
    {
        return response()->json(
            $service->handle($request->code)
        );
    }
}
