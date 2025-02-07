<?php

use App\Http\Controllers\UserController;
use App\Http\Middleware\JwtMiddlwere;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// user  routes
Route::post('/user/register',[UserController::class,'register']);
Route::post('/user/login',[UserController::class,'login']);
Route::post('/user/logout',[UserController::class,'logout']);

Route::middleware(JwtMiddlwere::class)->group(function(){

    Route::get('/dashboard',[UserController::class,'dashboard']);
});

