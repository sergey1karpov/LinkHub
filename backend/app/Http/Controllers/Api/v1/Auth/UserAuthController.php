<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\v1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Dto\UserCreateDto;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegistrationRequest;
use App\Http\Services\UserService;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class UserAuthController extends Controller
{
    public function registration(UserRegistrationRequest $request, UserService $userService): JsonResponse
    {
        $userDto = new UserCreateDto(...$request->all());

        $user = $userService->createNewUser($userDto);

        return response()->json([
            'userId' => $user->id,
            'username' => $user->username,
            'token' => $user->createToken('Bearer TOKEN')->plainTextToken,
        ]);
    }

    public function login(UserLoginRequest $request, UserService $userService): JsonResponse
    {
        $user = $userService->getUserByEmailOrUsername($request->string('emailOrUsername')->toString());

        if (! $user) {
            return response()->json([
                'error' => 'User not found',
            ], 401);
        }

        if (! Hash::check($request->string('password')->toString(), $user->password)) {
            return response()->json([
                'error' => 'Invalid password',
            ], 401);
        }

        return response()->json([
            'userId' => $user->id,
            'username' => $user->username,
            'token' => $user->createToken('Bearer TOKEN')->plainTextToken,
        ]);
    }

    public function logout(): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();

        $user->tokens()->delete();

        return response()->json('Bye');
    }
}
