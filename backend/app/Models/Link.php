<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Link extends Model
{
    use HasFactory;

    protected $table = 'links';

    public const BASE_LINK_FIELD = [
        'link_text',
        'link_url',
        'link_content',
        'img_href',
        'img_src'
    ];

    protected $fillable = [
        'link_text',
        'link_url',
        'link_content',
        'img_src',
        'img_href',
        'position',
        'user_id'
    ];

    public function styles(): HasOne
    {
        return $this->hasOne(LinkStyle::class, 'link_id', 'id');
    }
}
