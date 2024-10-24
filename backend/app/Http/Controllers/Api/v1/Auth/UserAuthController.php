<?php

namespace App\Http\Controllers\Api\v1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegistrationRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class UserAuthController extends Controller
{
    /**
     * Register new user
     *
     * @param UserRegistrationRequest $request
     * @return JsonResponse
     */
    public function registration(UserRegistrationRequest $request): JsonResponse
    {
        $user = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'username' => $request->username,
            'slug' => $request->slug,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'userId' => $user->id,
            'username' => $user->username,
            'token' => $user->createToken("Bearer TOKEN")->plainTextToken
        ]);
    }

    /**
     * Login user
     *
     * @param UserLoginRequest $request
     * @return JsonResponse
     */
    public function login(UserLoginRequest $request): JsonResponse
    {
        /**
         * Login to the service by email or username
         */
        $user = User::where('email', $request->emailOrUsername)
            ->orWhere('username', $request->emailOrUsername)
            ->first();

        if(!$user) {
            return response()->json([
                'error' => 'User not found',
            ],401);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'error' => 'Invalid password',
            ],401);
        }

        return response()->json([
            'userId' => $user->id,
            'username' => $user->username,
            'token' => $user->createToken("Bearer TOKEN")->plainTextToken
        ]);
    }

    public function logout(): JsonResponse
    {
        auth()->user()->tokens()->delete();

        return response()->json('Bye');
    }
}
