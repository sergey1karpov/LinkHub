<?php
declare(strict_types=1);

namespace App\Http\Controllers\Api\v1\Socialite\Drivers;

use Illuminate\Http\JsonResponse;

interface SocialOAuth
{
    public function redirect(): JsonResponse;

    public function callback(): JsonResponse;
}
