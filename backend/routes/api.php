<?php

use App\Http\Controllers\Api\v1\Auth\RestorePasswordController;
use App\Http\Controllers\Api\v1\Auth\UserAuthController;
use App\Http\Controllers\Api\v1\UserController;
use Illuminate\Support\Facades\Route;

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:sanctum');

Route::post('/registration', [UserAuthController::class, 'registration'])->name('registration');
Route::post('/login', [UserAuthController::class, 'login'])->name('login');
Route::post('/restore-password', [RestorePasswordController::class, 'restorePassword'])->name('restorePassword');
Route::post('/change-password', [RestorePasswordController::class, 'changePassword'])->name('changePassword');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix('/profile')->group(function () {
        Route::get('/{user}', [UserController::class, 'getUser'])->name('getUser');
    });
});
