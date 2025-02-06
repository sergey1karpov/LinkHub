<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Email</title>
</head>
<body>
<h1>Reset Your Password</h1>
<p>Hello {{ $user->name }},</p>
<p>Click on the link below to reset your password:</p>
<a href="{{ $resetLink }}">Reset Password</a>
<br><br>
<p>If you did not request a password reset, please ignore this email.</p>
<hr>
<p>Thanks,</p>
<p>Your Website Team</p>
</body>
</html>
