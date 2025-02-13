<?php

namespace Tests\Unit;

use App\Http\Services\ImageSaveService;
use Illuminate\Http\UploadedFile;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Mockery;
use PHPUnit\Framework\TestCase;

class ImageSaveServiceTest extends TestCase
{
    public function test_saveImage()
    {
        $fakePhoto = UploadedFile::fake()->image('fake-photo.jpg');
        $fakePath = 'links/';

        $imageSaveService = new ImageSaveService();
        $imagePath = $imageSaveService->saveImage($fakePhoto, $fakePath);

        dd($imagePath);
    }
}
