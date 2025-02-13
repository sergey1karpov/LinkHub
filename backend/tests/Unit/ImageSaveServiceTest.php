<?php

namespace Tests\Unit;

use App\Http\Services\ImageSaveService;
use App\Models\Link;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Mockery;
use Tests\TestCase;

class ImageSaveServiceTest extends TestCase
{
    public function test_saveImage()
    {
        $fakePhoto = UploadedFile::fake()->image('fake-photo.jpg');

        $imageSaveService = new ImageSaveService();
        $imagePath = $imageSaveService->saveImage($fakePhoto, Link::IMAGE_PATH);

        $this->assertEquals(
            $imagePath,
            ImageSaveService::SAVE_DIRECTORY_PATH.Link::IMAGE_PATH.str_replace(
                'uploads/images/links/',
                '',
                $imagePath
            )
        );
    }
}
