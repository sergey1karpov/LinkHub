<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\LinkFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Link extends Model
{
    /** @use HasFactory<LinkFactory> */
    use HasFactory;

    protected $table = 'links';

    public const IMAGE_PATH = 'links/';

    /** @var list<string> */
    public const BASE_LINK_FIELD = [
        'link_text',
        'link_url',
        'link_content',
        'img_href',
        'img_src',
    ];

    /** @var list<string> */
    protected $fillable = [
        'link_text',
        'link_url',
        'link_content',
        'img_src',
        'img_href',
        'position',
        'user_id',
    ];

    /** @return HasOne<LinkStyle, $this> */
    public function styles(): HasOne
    {
        return $this->hasOne(LinkStyle::class, 'link_id', 'id');
    }
}
