<?php

use App\Http\Controllers\Api\BookmarkController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\MidtransController;
use App\Http\Controllers\Api\TicketController;
use App\Http\Controllers\Api\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{id}', [EventController::class, 'show']);

// Route::post('/checkout', [TransactionController::class, 'checkout']);
Route::post('/checkout', [CheckoutController::class, 'checkout']);

Route::post('/midtrans/callback', [MidtransController::class, 'callback']);

Route::get('/my-tickets', [TicketController::class, 'index']);

Route::post('/check-in', [TicketController::class, 'checkIn']);

Route::get('/history', [TransactionController::class, 'myTransactions']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/bookmarks', [BookmarkController::class, 'index']);
    Route::post('/bookmarks/{eventId}', [BookmarkController::class, 'toggle']);
});




Route::middleware('auth:sanctum')->group(function () {});
