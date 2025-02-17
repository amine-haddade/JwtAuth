<?php

use App\Http\Controllers\GroupeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserJwtController;
use App\Http\Middleware\JwtMiddlwere;
use App\Http\Middleware\UtilisateurMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// user  routes
Route::post('/user/register',[UserController::class,'register']);
Route::post('/user/login',[UserController::class,'login']);
Route::get('/user/logout',[UserController::class,'logout']);

Route::middleware(JwtMiddlwere::class)->group(function(){
    Route::get('/dashboard',[UserController::class,'dashboard']); 
    Route::delete('/destroy/{id}',[UserController::class,'destroy']); 
    Route::put('/user/update/{id}',[UserController::class,'update']);
    Route::apiResource('groups',GroupeController::class);
});
Route::get('/users',[UserController::class,'users']); 

Route::Post('test/register',[UserJwtController::class,'register']);
Route::Post('test/login',[UserJwtController::class,'login']);

Route::middleware(UtilisateurMiddleware::class)->group(function(){
    Route::get('test/Utilisateurs',[UserJwtController::class,'index']);
    Route::get('test/logout',[UserJwtController::class,'logout']);

});
