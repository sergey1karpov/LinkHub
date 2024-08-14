<?php

namespace App\Http\Controllers\Api\v1\Auth;

use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\RestorePasswordRequest;
use App\Mail\RestorePasswordMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class RestorePasswordController
{
    public function restorePassword(RestorePasswordRequest $request): void
    {
        $user = User::where('email', $request->email)->firstOrFail();

        $token = Str::random(60);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $user->email],
            ['token' => $token, 'created_at' => now('Europe/Ulyanovsk')]
        );

        $resetLink = 'http://localhost:3000/auth/change-password?token=' . $token;

        Mail::to($request->email)->send(new RestorePasswordMail($user, $resetLink));
    }

    public function changePassword(ChangePasswordRequest $request): JsonResponse
    {
        $resetToken = DB::table('password_reset_tokens')->where('token', $request->token)->first();

        if(!$resetToken) {
            return response()->json([
                'error' => "The password recovery link has expired or the recovery request was not found",
            ],401);
        }

        if ($this->timeDiff(Carbon::parse($resetToken->created_at), Carbon::parse($request->timeToClickLink))) {
            return response()->json([
                'error' => "Unfortunately, the link to change your password has expired",
            ],401);
        }

        User::where('email', $resetToken->email)->update([
            'password' => Hash::make($request->password)
        ]);

        return response()->json('Password reset successfully');
    }

    private function timeDiff(Carbon $date1, Carbon $date2): bool
    {
        $minuteDiff = $date1->diffInMinutes($date2);
        if($minuteDiff > 15) {
            return true;
        }
        return false;
    }
}
