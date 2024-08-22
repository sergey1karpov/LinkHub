<?php

use App\Http\Controllers\Api\v1\Auth\RestorePasswordController;
use App\Http\Controllers\Api\v1\Auth\UserAuthController;
use App\Http\Controllers\Api\v1\LinkController;
use App\Http\Controllers\Api\v1\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/registration', [UserAuthController::class, 'registration'])->name('registration');
Route::post('/login', [UserAuthController::class, 'login'])->name('login');
Route::post('/restore-password', [RestorePasswordController::class, 'restorePassword'])->name('restorePassword');
Route::post('/change-password', [RestorePasswordController::class, 'changePassword'])->name('changePassword');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix('/profile')->group(function () {
        Route::get('/{user}', [UserController::class, 'getUser'])->name('getUser');

        Route::post('/{user}/add-link', [LinkController::class, 'addLink'])->name('addLink');
        Route::get('/link/{link}', [LinkController::class, 'getLink'])->name('getLink');
        Route::get('/{user}/all-links', [LinkController::class, 'allLinks'])->name('allLinks');
        Route::post('/{link}/edit-link', [LinkController::class, 'editLink'])->name('editLink');
        Route::post('/{link}/delete-image', [LinkController::class, 'deleteImage'])->name('deleteImage');
        Route::post('/{link}/clear-image', [LinkController::class, 'clearImage'])->name('clearImage');
        Route::post('/{link}/clear-giphy', [LinkController::class, 'clearGiphy'])->name('clearGiphy');
        Route::delete('/{link}/delete-link', [LinkController::class, 'deleteLink'])->name('deleteLink');
    });
});
