<?php
declare(strict_types=1);

namespace App\Http\Controllers\Api\v1\Socialite;

use App\Http\Controllers\Api\v1\Socialite\Drivers\GoogleDriver;
use Illuminate\Http\JsonResponse;

readonly class SocialOAuthController
{
    public function __construct(
        private GoogleDriver $googleDriver
    ) {}

    /**
     * @param string $driver
     * @return JsonResponse
     */
    public function redirect(string $driver): JsonResponse
    {
        return match ($driver) {
            'google' => $this->googleDriver->redirect(),
        };
    }

    /**
     * @param string $driver
     * @return JsonResponse
     */
    public function callback(string $driver): JsonResponse
    {
        return match ($driver) {
            'google' => $this->googleDriver->callback(),
        };
    }
}
