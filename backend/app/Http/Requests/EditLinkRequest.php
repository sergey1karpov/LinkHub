<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditLinkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'link_text' => 'required|string|max:255',
            'link_url' => 'required|url',
            'link_content' => 'nullable|string',
            'img_src' => 'nullable',
            'img_href' => 'nullable|string|url',
        ];
    }
}
