<?php

namespace Tests\Unit;

use App\Http\Services\FontService;
use Mockery;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Finder\SplFileInfo;

class FontServiceTest extends TestCase
{
    public function test_getPreparedFonts()
    {
        $whatWeExcept = [
            [
                "font_name" => "BleekerCyrillic",
                "font_path" => "http://localhost/fonts/BleekerCyrillic.ttf",
            ]
        ];

        $file[] = Mockery::mock(SplFileInfo::class, ['BleekerCyrillic.ttf', '../Files/BleekerCyrillic.ttf', '../Files/BleekerCyrillic.ttf'])
            ->shouldReceive('getFilename')
            ->andReturn('BleekerCyrillic.ttf')
            ->shouldReceive('getRealPath')
            ->andReturn('http://localhost/fonts/BleekerCyrillic.ttf')
            ->getMock();

        $fontService = new FontService();
        $fonts = $fontService->getPreparedFonts($file);

        $this->assertEquals($whatWeExcept, $fonts);
    }
}
