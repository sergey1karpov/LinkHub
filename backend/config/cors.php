<?php

return [
    'paths' => ['*'], // Разрешаем доступ к шрифтам
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => ['*'], // Позволяет читать заголовки, такие как Content-Disposition
    'max_age' => 0,
    'supports_credentials' => false,
];
