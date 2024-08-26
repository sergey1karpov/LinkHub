<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    /**
     * Get current user
     *
     * @param User $user
     * @return JsonResponse
     */
    public function getUser(User $user): JsonResponse
    {
        return response()->json($user);
    }
}
