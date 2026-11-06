<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class HealthController extends Controller
{
    /**
     * GET /api/health — vérifie que la base de données répond.
     *
     * 200 {"status":"ok","database":"up",...} ou 503 {"database":"down"}.
     */
    public function __invoke(): JsonResponse
    {
        $database = 'up';

        try {
            DB::select('select 1');
        } catch (\Throwable $e) {
            report($e);
            $database = 'down';
        }

        $status = $database === 'up' ? 'ok' : 'error';

        return response()->json([
            'status' => $status,
            'database' => $database,
            'timestamp' => now()->toIso8601String(),
        ], $database === 'up' ? 200 : 503);
    }
}
