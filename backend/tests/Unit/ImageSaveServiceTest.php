<?php

namespace Tests\Unit;

use App\Http\Services\ImageSaveService;
use App\Models\Link;
use Illuminate\Http\UploadedFile;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use ReflectionClass;
use Tests\TestCase;

class ImageSaveServiceTest extends TestCase
{
    public function test_save_image()
    {
        $fakePhoto = UploadedFile::fake()->image('fake-photo.jpg');

        $imageSaveService = new ImageSaveService;
        $imagePath = $imageSaveService->saveImage($fakePhoto, Link::IMAGE_PATH);

        $this->assertEquals(
            $imagePath,
            ImageSaveService::SAVE_DIRECTORY_PATH.Link::IMAGE_PATH.str_replace(
                'uploads/images/links/',
                '',
                $imagePath
            )
        );

        unlink('public/'.$imagePath);
    }

    public function test_is_scale_image()
    {
        $this->runIsScaleImageTest('gif', 500, 500, 150, 150);
        $this->runIsScaleImageTest('jpg', 500, 500, 300, 300);
    }

    private function runIsScaleImageTest(string $mimeType, int $origWidth, int $origHeight, int $expectedWidth, int $expectedHeight): void
    {
        $fakePhoto = UploadedFile::fake()->image("fake-photo.{$mimeType}", $origWidth, $origHeight);

        $driver = new Driver;
        $imgManager = new ImageManager($driver);

        $imageManagerReflectionClass = new ReflectionClass(ImageManager::class);
        $method = $imageManagerReflectionClass->getMethod('read');
        $fakeImage = $method->invoke($imgManager, $fakePhoto);

        $imageSaveService = new ImageSaveService;

        $reflectionClass = new ReflectionClass(ImageSaveService::class);
        $method = $reflectionClass->getMethod('isScaleImage');
        $updatedImage = $method->invoke($imageSaveService, $mimeType, $fakeImage);

        $this->assertEquals($expectedWidth, $updatedImage->width());
        $this->assertEquals($expectedHeight, $updatedImage->height());
    }
}
