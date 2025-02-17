<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserJwtRequest extends FormRequest
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
            "name"=>"string|max:50|required",
            "email"=>"email|min:6|required|unique:utilisateurs,email",
            "password"=>"min:4|required|confirmed"
        ];
    }
}
