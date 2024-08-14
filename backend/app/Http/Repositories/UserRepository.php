<?php

namespace App\Http\Repositories;

use App\Http\Interfaces\UserRepositoryInterface;
use App\Models\User;

class UserRepository implements UserRepositoryInterface
{

    public function getUser()
    {
        User::exept(['created_at', 'updated_at', 'password', 'email_verified_at'])->first();
    }
}
