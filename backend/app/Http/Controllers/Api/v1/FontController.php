<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Services\FontService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File;

class FontController extends Controller
{
    public function __construct(private FontService $fontService) {}

    public function getFonts(): JsonResponse
    {
        $fontsPath = public_path('fonts');
        $fonts = File::files($fontsPath);
        $fonts = $this->fontService->getPreparedFonts($fonts);

        return response()->json($fonts);
    }
}
