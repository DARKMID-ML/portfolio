<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CvController extends Controller
{
    /**
     * Télécharge le CV PDF déposé depuis le back-office.
     */
    public function __invoke(): StreamedResponse
    {
        $profile = Profile::current();

        abort_unless(
            $profile->cv_path !== null && Storage::disk('public')->exists($profile->cv_path),
            404,
            'CV introuvable.',
        );

        return Storage::disk('public')->download(
            $profile->cv_path,
            'CV-Mohamed-Idrissa-Diallo.pdf',
        );
    }
}
