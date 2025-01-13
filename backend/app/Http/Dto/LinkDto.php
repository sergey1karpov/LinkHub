<?php
declare(strict_types=1);

namespace App\Http\Dto;

use Illuminate\Http\UploadedFile;

readonly final class LinkDto
{
    /**
     * @param string $link_text
     * @param string $link_url
     * @param string|null $link_content
     * @param string|null $img_href
     * @param UploadedFile|null $img_src
     */
    public function __construct(
        public string        $link_text,
        public string        $link_url,
        public ?string       $link_content = null,
        public ?string       $img_href = null,
        public ?UploadedFile $img_src = null,
    ) {}
}
