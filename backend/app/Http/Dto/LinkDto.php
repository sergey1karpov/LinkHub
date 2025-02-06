<?php

declare(strict_types=1);

namespace App\Http\Dto;

use Illuminate\Http\UploadedFile;

final readonly class LinkDto
{
    public function __construct(
        public string $link_text,
        public string $link_url,
        public ?string $link_content = null,
        public ?string $img_href = null,
        public ?UploadedFile $img_src = null,
    ) {}
}
