<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddLinkRequest;
use App\Http\Services\ImageSaveService;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class LinkController extends Controller
{
    public function __construct(private ImageSaveService $imageSaveService) {}

    public function addLink (User $user, AddLinkRequest $request): JsonResponse
    {
        $user->links()->create([
            'link_text' => $request->link_text,
            'link_url' => $request->link_url,
            'link_content' => $request->link_content,
            'img_src' => $request->file('img_src') ?
                $this->imageSaveService->saveImage($request->img_src) :
                null,
            'img_href' => $request->img_href,
        ]);

        return response()->json(['message' => 'Link added successfully.'], 201);
    }
}
