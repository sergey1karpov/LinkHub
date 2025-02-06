<?php

declare(strict_types=1);

namespace App\Http\Dto;

final readonly class UserCreateDto
{
    public function __construct(
        public string $firstname,
        public string $lastname,
        public string $username,
        public string $slug,
        public string $email,
        public string $password,
    ) {}
}
