<?php

namespace App\Http\Services;

use Illuminate\Http\UploadedFile;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageSaveService
{
    public function saveImage(UploadedFile $photo): string
    {
        $manager = new ImageManager(new Driver());
        $imgName = hexdec(uniqid()).'.'.$photo->getClientOriginalExtension();
        $img = $manager->read($photo);
        $img = $img->scale(100);
        $img->save(base_path('public/uploads/images/'.$imgName));
        return 'uploads/images/'.$imgName;
    }
}
