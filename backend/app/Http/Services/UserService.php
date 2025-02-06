<?php

declare(strict_types=1);

namespace App\Http\Services;

use App\Http\Dto\UserCreateDto;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function createNewUser(UserCreateDto $dto): User
    {
        return User::create([
            'firstname' => $dto->firstname,
            'lastname' => $dto->lastname,
            'username' => $dto->username,
            'slug' => $dto->slug,
            'email' => $dto->email,
            'password' => Hash::make($dto->password),
        ]);
    }

    /**
     * Get user by email or username
     */
    public function getUserByEmailOrUsername(string $emailOrUsername): ?User
    {
        return User::where('email', $emailOrUsername)
            ->orWhere('username', $emailOrUsername)
            ->first();
    }
}
