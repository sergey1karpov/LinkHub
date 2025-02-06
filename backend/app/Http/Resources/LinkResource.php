<?php

namespace App\Http\Resources;

use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Link
 */
class LinkResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'link_text' => $this->link_text,
            'link_url' => $this->link_url,
            'img_src' => $this->img_src,
            'img_href' => $this->img_href,
            'position' => $this->position,
        ];
    }
}
