<?php
declare(strict_types=1);

namespace App\Http\Dto;

readonly final class UserCreateDto
{
    /**
     * @param string $firstname
     * @param string $lastname
     * @param string $username
     * @param string $slug
     * @param string $email
     * @param string $password
     */
     public function __construct(
         public string $firstname,
         public string $lastname,
         public string $username,
         public string $slug,
         public string $email,
         public string $password,
     ){}
}
