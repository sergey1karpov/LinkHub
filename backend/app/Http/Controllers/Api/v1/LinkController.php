<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddLinkRequest;
use App\Http\Requests\EditLinkRequest;
use App\Http\Services\ImageSaveService;
use App\Models\Link;
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

    public function getLink(Link $link): JsonResponse
    {
        return response()->json([$link]);
    }

    public function allLinks(User $user): JsonResponse
    {
        return response()->json($user->links);
    }

    public function editLink(Link $link, AddLinkRequest $request): JsonResponse
    {
        $link->update([
            'link_text' => $request->link_text,
            'link_url' => $request->link_url,
            'link_content' => $request->link_content,
            'img_src' => $request->file('img_src') ?
                $this->imageSaveService->saveImage($request->img_src) :
                $link->img_src,
            'img_href' => $request->img_href ? $request->img_href : $link->img_href,
        ]);

        return response()->json(['message' => 'Link updated successfully.'], 201);
    }

    public function deleteImage(Link $link): JsonResponse
    {
        $link->update([
            'img_src' => null,
            'img_href' => null
        ]);

        return response()->json(['message' => 'Image deleted.'], 201);
    }

    public function clearImage(Link $link): JsonResponse
    {
        $link->update([
            'img_src' => null,
        ]);

        return response()->json(['message' => 'Image deleted.'], 201);
    }

    public function clearGiphy(Link $link): JsonResponse
    {
        $link->update([
            'img_href' => null,
        ]);

        return response()->json(['message' => 'Giphy deleted.'], 201);
    }

    public function deleteLink(Link $link): JsonResponse
    {
        $link->delete();

        return response()->json(['message' => 'Link deleted successfully.'], 204);
    }
}
