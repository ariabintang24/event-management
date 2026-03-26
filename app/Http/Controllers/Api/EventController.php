<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        return Event::with('images')->latest()->get();
    }

    public function show($id)
    {
        return Event::with('images')->findOrFail($id);
    }
}
