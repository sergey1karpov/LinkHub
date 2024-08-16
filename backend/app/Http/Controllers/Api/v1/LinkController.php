<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddLinkRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LinkController extends Controller
{
    public function addLink (User $user, AddLinkRequest $request): JsonResponse
    {
        $user->links()->create($request->validated());

        return response()->json(['message' => 'Link added successfully.'], 201);
    }
}
