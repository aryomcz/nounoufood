<?php

if (!function_exists('notif_success')) {
    function notif_success($message, $title = 'Sukses')
    {
        return back()->with('notification', [
            'title'   => $title,
            'message' => $message,
            'color'   => 'green',
        ]);
    }
}

if (!function_exists('notif_error')) {
    function notif_error($message, $title = 'Gagal')
    {
        return back()->with('notification', [
            'title'   => $title,
            'message' => $message,
            'color'   => 'red',
        ]);
    }
}

if (!function_exists('notif_custom')) {
    function notif_custom($title, $message, $color = 'blue')
    {
        return back()->with('notification', [
            'title'   => $title,
            'message' => $message,
            'color'   => $color,
        ]);
    }
}
