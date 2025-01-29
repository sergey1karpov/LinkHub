<?php
declare(strict_types=1);

namespace App\Models;

use Database\Factories\LinkStyleFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LinkStyle extends Model
{
    /** @use HasFactory<LinkStyleFactory> */
    use HasFactory;

    protected $table = 'link_style';

    public $timestamps = false;

    protected $fillable = [
        'link_id',
        'link_font',
        'link_font_size',
        'link_font_color',
        'link_font_strong',
        'link_font_shadow_offset_x',
        'link_font_shadow_offset_y',
        'link_font_shadow_blur_radius',
        'link_font_shadow_color',
        'card_background_color_hex',
        'card_background_color_transparency',
        'card_shadow_offset_x',
        'card_shadow_offset_y',
        'card_shadow_blur_radius',
        'card_shadow_color',
        'card_border_width',
        'card_border_color',
        'card_border_radius_left_top',
        'card_border_radius_left_bottom',
        'card_border_radius_right_top',
        'card_border_radius_right_bottom',
        'card_animation',
    ];
}
