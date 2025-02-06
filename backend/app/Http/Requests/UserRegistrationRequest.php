<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRegistrationRequest extends FormRequest
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
     * @return array<string>
     */
    public function rules(): array
    {
        return [
            'firstname' => 'required|min:5|max:100',
            'lastname' => 'required|min:5|max:100',
            'username' => 'required|min:5|max:100|unique:users,username',
            'slug' => 'required|alpha_dash|min:5|max:100|unique:users,slug',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
        ];
    }
}
