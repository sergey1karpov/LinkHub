<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Dto\LinkDto;
use App\Http\Dto\LinkStylesDto;
use App\Http\Requests\LinkRequest;
use App\Http\Resources\LinkResource;
use App\Http\Services\LinkService;
use App\Models\Link;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;

class LinkController extends Controller
{
    public function __construct(
        private readonly LinkService $linkService
    ) {}

    public function addLink(User $user, LinkRequest $request): JsonResponse
    {
        $linkDto = new LinkDto(...$request->only(Link::BASE_LINK_FIELD));
        $linkStylesDto = new LinkStylesDto(...$request->except(Link::BASE_LINK_FIELD));

        DB::transaction(function () use ($linkDto, $linkStylesDto, $user) {
            $this->linkService->updateLinkPosition();
            $this->linkService->createNewLink($linkDto, $linkStylesDto, $user);
        });

        return response()->json(['message' => 'Link added successfully.'], 201);
    }

    public function getLink(Link $link): LinkResource
    {
        return new LinkResource($link);
    }

    public function allLinks(User $user): AnonymousResourceCollection
    {
        return LinkResource::collection($user->links);
    }

    public function editLink(Link $link, LinkRequest $request): JsonResponse
    {
        $linkDto = new LinkDto(...$request->only(Link::BASE_LINK_FIELD));
        $linkStylesDto = new LinkStylesDto(...$request->except(Link::BASE_LINK_FIELD));

        $this->linkService->updateLink($linkDto, $linkStylesDto, $link);

        return response()->json(['message' => 'Link updated successfully.'], 201);
    }

    public function deleteImage(Link $link): JsonResponse
    {
        $this->linkService->clearAllImagesField($link);

        return response()->json(['message' => 'Image deleted.'], 201);
    }

    public function clearImage(Link $link): JsonResponse
    {
        $this->linkService->clearSrcField($link);

        return response()->json(['message' => 'Image deleted.'], 201);
    }

    public function clearGiphy(Link $link): JsonResponse
    {
        $this->linkService->clearGiphyField($link);

        return response()->json(['message' => 'Giphy deleted.'], 201);
    }

    public function deleteLink(Link $link): JsonResponse
    {
        $link->delete();

        return response()->json(['message' => 'Link deleted successfully.'], 204);
    }

    public function changePosition(User $user, Request $request): JsonResponse
    {
        $this->linkService->changeLinkPosition($user, $request);

        return response()->json(['message' => 'Position changed!'], 201);
    }
}
