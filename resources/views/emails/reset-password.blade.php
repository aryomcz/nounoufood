@php
    $color = '#FAB12F';
@endphp

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Reset Password - Nounoufood</title>
</head>
<body style="font-family:Arial, sans-serif; background:#f5f5f5; padding:40px;">
<div style="max-width:500px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;">
    
    <div style="text-align:center;padding:30px;">
        <img src="{{ url('/logo/logo.png') }}" alt="Nounoufood" style="height:70px;margin-bottom:20px;" />
        <h2 style="margin:0;font-size:24px;font-weight:700;color:#333;">Reset Password</h2>
    </div>

    <div style="padding:0 25px 30px 25px;color:#444;font-size:15px; line-height:1.6;">
        <p>Anda melakukan permintaan reset password di <b>Nounoufood</b>.</p>
        
        <p style="text-align:center;margin:30px 0;">
            <a href="{{ $url }}" 
               style="background:{{ $color }};color:#fff;text-decoration:none;padding:12px 28px;border-radius:50px;font-weight:bold;font-size:15px;display:inline-block;">
               Reset Password
            </a>
        </p>

        <p>Jika Anda tidak meminta reset password, abaikan email ini.</p>
    </div>

    <div style="text-align:center;padding:20px;background:#fafafa;border-top:1px solid #eee;">
        <p style="font-size:12px;color:#999;">© {{ date('Y') }} - <b>Nounoufood</b></p>
    </div>

</div>
</body>
</html>
