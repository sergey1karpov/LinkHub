<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LinkRequest;
use App\Http\Requests\EditLinkRequest;
use App\Http\Services\ImageSaveService;
use App\Models\Link;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class LinkController extends Controller
{
    public function __construct(private ImageSaveService $imageSaveService) {}

    /**
     * Create new link
     *
     * @param User $user
     * @param LinkRequest $request
     * @return JsonResponse
     */
    public function addLink (User $user, LinkRequest $request): JsonResponse
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

    /**
     * Get link
     *
     * @param Link $link
     * @return JsonResponse
     */
    public function getLink(Link $link): JsonResponse
    {
        return response()->json([$link]);
    }

    /**
     * Get all user links
     *
     * @param User $user
     * @return JsonResponse
     */
    public function allLinks(User $user): JsonResponse
    {
        return response()->json($user->links);
    }

    /**
     * Update link
     *
     * @param Link $link
     * @param LinkRequest $request
     * @return JsonResponse
     */
    public function editLink(Link $link, LinkRequest $request): JsonResponse
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

    /**
     * Clear link image - delete uploaded image and giphy
     *
     * @param Link $link
     * @return JsonResponse
     */
    public function deleteImage(Link $link): JsonResponse
    {
        $link->update([
            'img_src' => null,
            'img_href' => null
        ]);

        return response()->json(['message' => 'Image deleted.'], 201);
    }

    /**
     * If upload giphy, we delete image
     *
     * @param Link $link
     * @return JsonResponse
     */
    public function clearImage(Link $link): JsonResponse
    {
        $link->update([
            'img_src' => null,
        ]);

        return response()->json(['message' => 'Image deleted.'], 201);
    }

    /**
     * If upload image, we delete giphy
     *
     * @param Link $link
     * @return JsonResponse
     */
    public function clearGiphy(Link $link): JsonResponse
    {
        $link->update([
            'img_href' => null,
        ]);

        return response()->json(['message' => 'Giphy deleted.'], 201);
    }

    /**
     * Delete link
     *
     * @param Link $link
     * @return JsonResponse
     */
    public function deleteLink(Link $link): JsonResponse
    {
        $link->delete();

        return response()->json(['message' => 'Link deleted successfully.'], 204);
    }

    public function linkPosition(Link $link): JsonResponse
    {

    }
}
