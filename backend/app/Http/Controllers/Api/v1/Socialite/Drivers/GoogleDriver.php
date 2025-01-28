<?php
declare(strict_types=1);

namespace App\Http\Controllers\Api\v1\Socialite\Drivers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleDriver implements SocialOAuth
{
    /**
     * @return JsonResponse
     */
    public function redirect(): JsonResponse
    {
        return response()->json([
            'url' => Socialite::driver('google')
                ->stateless()
                ->redirect()
                ->getTargetUrl(),
        ]);
    }

    /**
     * @return JsonResponse
     */
    public function callback(): JsonResponse
    {
        $user = Socialite::driver('google')->stateless()->user();

        $user = User::firstOrCreate(
            ['email' => $user->getEmail()],
            [
                'email' => $user->getEmail(),
                'password' => Hash::make(Str::random(12)),
                'username' => $user->getName(),
                'slug' => 'id-' . $user->getId(),
                'firstname' => 'John',
                'lastname' => 'Doe',
                'avatar' => $user->getAvatar(),
            ]
        );

        return response()->json([
            'userId' => $user->id,
            'username' => $user->username,
            'token' => $user->createToken("Bearer TOKEN")->plainTextToken
        ]);
    }
}
