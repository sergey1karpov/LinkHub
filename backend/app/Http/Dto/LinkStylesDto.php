<?php
declare(strict_types=1);

namespace App\Http\Dto;

readonly final class LinkStylesDto
{
    /**
     * @param string|null $link_font
     * @param int|null    $link_font_size
     * @param string|null $link_font_color
     * @param bool|null   $link_font_strong
     * @param int|null    $link_font_shadow_offset_x
     * @param int|null    $link_font_shadow_offset_y
     * @param int|null    $link_font_shadow_blur_radius
     * @param string|null $link_font_shadow_color
     * @param string|null $card_background_color_hex
     * @param float|null  $card_background_color_transparency
     * @param int|null    $card_shadow_offset_x
     * @param int|null    $card_shadow_offset_y
     * @param int|null    $card_shadow_blur_radius
     * @param string|null $card_shadow_color
     * @param int|null    $card_border_width
     * @param string|null $card_border_color
     * @param int|null    $card_border_radius_left_top
     * @param int|null    $card_border_radius_left_bottom
     * @param int|null    $card_border_radius_right_top
     * @param int|null    $card_border_radius_right_bottom
     * @param string|null $card_animation
     */
    public function __construct(

        //Text
        public ?string $link_font = null,
        public ?int    $link_font_size = null,
        public ?string $link_font_color = null,
        public ?bool   $link_font_strong = null,

        //Link text "text-shadow"
        public ?int    $link_font_shadow_offset_x = null,
        public ?int    $link_font_shadow_offset_y = null,
        public ?int    $link_font_shadow_blur_radius = null,
        public ?string $link_font_shadow_color = null,

        //Card
        public ?string $card_background_color_hex = null, //transform # to hex
        public ?float  $card_background_color_transparency = null,
        public ?int    $card_shadow_offset_x = null,
        public ?int    $card_shadow_offset_y = null,
        public ?int    $card_shadow_blur_radius = null,
        public ?string $card_shadow_color = null,
        public ?int    $card_border_width = null,
        public ?string $card_border_color = null,
        public ?int    $card_border_radius_left_top = null,
        public ?int    $card_border_radius_left_bottom = null,
        public ?int    $card_border_radius_right_top = null,
        public ?int    $card_border_radius_right_bottom = null,

        //Animation
        public ?string $card_animation = null
    ) {}
}
