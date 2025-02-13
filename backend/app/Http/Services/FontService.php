<?php

namespace App\Http\Services;

use Symfony\Component\Finder\SplFileInfo;

class FontService
{
    /**
     * @param  array<SplFileInfo>  $fonts
     * @return list<array<string, string>>
     */
    public function getPreparedFonts(array $fonts): array
    {
        $fontCollection = [];

        foreach ($fonts as $font) {
            $fontCollection[] = [
                'font_name' => pathinfo($font->getFilename(), PATHINFO_FILENAME),
                'font_path' => str_replace('/var/www/public', 'http://localhost', $font->getRealPath()),
            ];
        }

        return $fontCollection;
    }
}
