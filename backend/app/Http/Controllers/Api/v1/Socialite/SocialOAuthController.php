<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\v1\Socialite;

use App\Http\Controllers\Api\v1\Socialite\Drivers\GoogleDriver;
use Exception;
use Illuminate\Http\JsonResponse;

readonly class SocialOAuthController
{
    public function __construct(
        private GoogleDriver $googleDriver
    ) {}

    /**
     * @throws Exception
     */
    public function redirect(string $driver): JsonResponse
    {
        return match ($driver) {
            'google' => $this->googleDriver->redirect(),
            default => throw new Exception("Unsupported driver: $driver"),
        };
    }

    /**
     * @throws Exception
     */
    public function callback(string $driver): JsonResponse
    {
        return match ($driver) {
            'google' => $this->googleDriver->callback(),
            default => throw new Exception("Unsupported driver: $driver"),
        };
    }
}
