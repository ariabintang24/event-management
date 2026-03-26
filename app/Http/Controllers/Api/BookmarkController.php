<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
    public function index()
    {
        return auth()->user()
            ->bookmarkedEvents()
            ->with('images')
            ->get();
    }

    public function toggle($eventId)
    {
        $user = auth()->user();

        if ($user->bookmarkedEvents()->where('event_id', $eventId)->exists()) {
            $user->bookmarkedEvents()->detach($eventId);

            return response()->json(['message' => 'Bookmark removed']);
        }

        $user->bookmarkedEvents()->attach($eventId);

        return response()->json(['message' => 'Bookmarked']);
    }
}
