<?php

use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\Category\CategoryController;
use App\Http\Controllers\API\Order\OrderController;
use App\Http\Controllers\API\Product\ProductController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', function () {
    Auth::logout();
});

Route::apiResource('categories', CategoryController::class);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', [AuthController::class, 'getUser']);

    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index']);
        Route::post('/add-item', [OrderController::class, 'addProduct']);
        Route::post('/remove-item', [OrderController::class, 'removeProduct']);
        Route::get('/cart', [OrderController::class, 'cartProducts']);
        Route::get('/finish', [OrderController::class, 'finish']);
    });

    Route::prefix('admin')->group(function () {
        Route::apiResource('products', ProductController::class);
        Route::post('/removeProduct', [OrderController::class, 'removeProduct']);
    });
});
