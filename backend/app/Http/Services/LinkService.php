<?php

declare(strict_types=1);

namespace App\Http\Services;

use App\Http\Dto\LinkDto;
use App\Http\Dto\LinkStylesDto;
use App\Models\Link;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

final readonly class LinkService
{
    public function __construct(
        private ImageSaveService $imageSaveService
    ) {}

    /**
     * Increment position field all previous links, because new user link must have first position
     */
    public function updateLinkPosition(): void
    {
        DB::table('links')->increment('position');
    }

    public function createNewLink(LinkDto $dto, LinkStylesDto $linkDto, User $user): void
    {
        /** @var Link $link */
        $link = $user->links()->create([
            'link_text' => $dto->link_text,
            'link_url' => $dto->link_url,
            'link_content' => $dto->link_content,
            'img_src' => $dto->img_src ?
                $this->imageSaveService->saveImage($dto->img_src, LINK::IMAGE_PATH) :
                null,
            'img_href' => $dto->img_href,
            'position' => 1,
        ]);

        $link->styles()->create($linkDto->toArray());
    }

    public function updateLink(LinkDto $dto, LinkStylesDto $linkDto, Link $link): void
    {
        $link->update([
            'link_text' => $dto->link_text,
            'link_url' => $dto->link_url,
            'link_content' => $dto->link_content,
            'img_src' => $dto->img_src ?
                $this->imageSaveService->saveImage($dto->img_src, LINK::IMAGE_PATH) :
                $link->img_src,
            'img_href' => $dto->img_href ? $dto->img_href : $link->img_href,
        ]);

        $link->styles()->update($linkDto->toArray());
    }

    public function clearAllImagesField(Link $link): void
    {
        $link->update([
            'img_src' => null,
            'img_href' => null,
        ]);
    }

    public function clearSrcField(Link $link): void
    {
        $link->update([
            'img_src' => null,
        ]);
    }

    public function clearGiphyField(Link $link): void
    {
        $link->update([
            'img_href' => null,
        ]);
    }

    public function changeLinkPosition(User $user, Request $request): void
    {
        /** @var array<Link> $links */
        $links = $request->data;

        foreach ($links as $link) {
            Link::where('user_id', $user->id)
                ->where('id', $link['id'])
                ->update(['position' => $link['position']]);
        }
    }
}
