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
use stdClass;

class RestorePasswordController
{
    /**
     * This method generate unique restore link and sent email by user
     *
     * @param RestorePasswordRequest $request
     * @return void
     */
    public function restorePassword(RestorePasswordRequest $request): void
    {
        //Search user in database by email
        $user = User::where('email', $request->email)->firstOrFail();

        //Generate token
        $token = Str::random(60);

        //ToDo: Connect queue
        //ToDo: Make transaction

        //Inserts to 'password_reset_tokens' new row with email, token, and time, where token has been generated
        //If db already has row with email, we updated token with new time
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $user->email],
            ['token' => $token, 'created_at' => now('Europe/Ulyanovsk')]
        );

        //A password change link that will be sent to the user by email.
        $resetLink = 'http://localhost:3000/auth/change-password?token=' . $token;

        //Send email
        Mail::to($request->email)->send(new RestorePasswordMail($user, $resetLink));
    }

    /**
     * Change password
     *
     * @param ChangePasswordRequest $request
     * @return JsonResponse
     */
    public function changePassword(ChangePasswordRequest $request): JsonResponse
    {
        //Search row in db with token
        /** @var stdClass|null $resetToken */
        $resetToken = DB::table('password_reset_tokens')->where('token', $request->token)->first();

        //If token not found
        if(!$resetToken) {
            return response()->json([
                'error' => "The password recovery link has expired or the recovery request was not found",
            ],401);
        }

        //If token lifetime is over(15 minutes)
        if ($this->timeDiff(
            Carbon::parse($resetToken->created_at),
            Carbon::parse($request->string('timeToClickLink')->toString())
        )) {
            return response()->json([
                'error' => "Unfortunately, the link to change your password has expired",
            ],401);
        }

        //If we haven't got errors, we set new password
        User::where('email', $resetToken->email)->update([
            'password' => Hash::make($request->string('password')->toString())
        ]);

        return response()->json('Password reset successfully');
    }

    /**
     * Time comparison
     *
     * @param Carbon $date1 Time, where token has been generated
     * @param Carbon $date2 Time, where the user clicked the link
     * @return bool
     */
    private function timeDiff(Carbon $date1, Carbon $date2): bool
    {
        $minuteDiff = $date1->diffInMinutes($date2);

        //If the difference is more than 15 minutes, the token is considered valid
        if($minuteDiff > 15) {
            return true;
        }
        return false;
    }
}
