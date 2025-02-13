<?php

declare(strict_types=1);

namespace App\Http\Services;

use Illuminate\Http\UploadedFile;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Intervention\Image\Interfaces\ImageInterface;

class ImageSaveService
{
    public function saveImage(UploadedFile $photo, string $imagePath): string
    {
        $manager = new ImageManager(new Driver);
        $imgName = hexdec(uniqid()).'.'.$photo->getClientOriginalExtension();
        $img = $manager->read($photo);

        $img = $this->isScaleImage($photo->getClientOriginalExtension(), $img);

        $this->isDirectoryExist('uploads/images/'.$imagePath);

        $img->save(public_path('uploads/images/'.$imagePath.$imgName));

        return 'uploads/images/'.$imagePath.$imgName;
    }

    private function isScaleImage(string $mimeType, ImageInterface $image): ImageInterface
    {
        return match ($mimeType) {
            'gif' => $image->scale(150),
            default => $image->cover(300, 300),
        };
    }

    private function isDirectoryExist(string $path): void
    {
        if (! is_dir(public_path($path))) {
            mkdir(public_path($path));
        }
    }
}
