<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\ExecutableFinder;

class TranslateController extends Controller
{
      public function translate(Request $request)
    {
        $text = $request->input('text');
        $targetLang = $request->input('targetLang', 'en');

        $executableFinder = new ExecutableFinder();
        $node = $executableFinder->find('node') ?? '/usr/bin/node'; // sesuaikan path

        $scriptPath = base_path('translate.js');

        // Jalankan proses Node.js
        $process = new Process([$node, $scriptPath, $text, $targetLang]);
        $process->run();

        if (!$process->isSuccessful()) {
            // Bisa debug error: $process->getErrorOutput()
            return response()->json([
                'error' => 'Translation failed',
                'details' => $process->getErrorOutput()
            ], 500);
        }

        $result = trim($process->getOutput());
        return response()->json(['text' => $result]);
    }
}
