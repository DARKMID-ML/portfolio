<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Affiche le formulaire de modification du profil et du CV.
     */
    public function edit(): Response
    {
        $profile = Profile::current();

        return Inertia::render('admin/profile/edit', [
            'profile' => $profile,
            'cvUrl' => $profile->cv_path ? route('cv.download') : null,
        ]);
    }

    /**
     * Met à jour les informations du profil.
     */
    public function update(Request $request): RedirectResponse
    {
        $profile = Profile::current();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'initials' => ['required', 'string', 'max:4'],
            'role' => ['required', 'string', 'max:120'],
            'education' => ['nullable', 'string', 'max:160'],
            'profile_summary' => ['nullable', 'string', 'max:300'],
            'location' => ['required', 'string', 'max:120'],
            'timezone' => ['required', 'string', 'max:60'],
            'tagline' => ['required', 'string', 'max:300'],
            'bio' => ['required', 'string', 'max:5000'],
            'email' => ['required', 'string', 'email', 'max:120'],
            'phone' => ['required', 'string', 'max:40'],
            'whatsapp' => ['nullable', 'string', 'max:255'],
            'linkedin' => ['nullable', 'url', 'max:255'],
            'github' => ['nullable', 'url', 'max:255'],
            'available' => ['sometimes', 'boolean'],
            'availability_text' => ['required', 'string', 'max:120'],
            'roles' => ['nullable', 'string', 'max:1000'],
            'languages' => ['nullable', 'string', 'max:1000'],
        ]);

        $profile->update([
            ...$validated,
            'bio' => $this->paragraphs($request->string('bio')->toString()),
            'roles' => $this->listFromText($request->string('roles')->toString()),
            'languages' => $this->languages($request->string('languages')->toString()),
            'whatsapp' => $request->filled('whatsapp') ? $request->string('whatsapp')->toString() : null,
            'linkedin' => $request->filled('linkedin') ? $request->string('linkedin')->toString() : null,
            'github' => $request->filled('github') ? $request->string('github')->toString() : null,
            'available' => $request->boolean('available'),
        ]);

        return back()->with('success', 'Profil mis à jour.');
    }

    /**
     * Remplace le CV PDF.
     */
    public function uploadCv(Request $request): RedirectResponse
    {
        $request->validate([
            'cv' => ['required', 'file', 'mimes:pdf', 'max:5120'],
        ], [
            'cv.mimes' => 'Le CV doit être un fichier PDF.',
            'cv.max' => 'Le CV ne doit pas dépasser 5 Mo.',
        ]);

        $profile = Profile::current();
        $file = $request->file('cv');

        abort_if($file === null, 422, 'Aucun fichier reçu.');

        $path = $file->store('cv', 'public');

        abort_if($path === false, 500, 'Impossible d’enregistrer le CV.');

        if ($profile->cv_path !== null) {
            Storage::disk('public')->delete($profile->cv_path);
        }

        $profile->update(['cv_path' => $path]);

        return back()->with('success', 'CV mis à jour.');
    }

    /**
     * Supprime le CV actuel.
     */
    public function destroyCv(): RedirectResponse
    {
        $profile = Profile::current();

        if ($profile->cv_path !== null) {
            Storage::disk('public')->delete($profile->cv_path);
            $profile->update(['cv_path' => null]);
        }

        return back()->with('success', 'CV supprimé.');
    }

    /**
     * Change le mot de passe de l'administrateur connecté.
     */
    public function updatePassword(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'string', 'current_password'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ], [
            'current_password.current_password' => 'Le mot de passe actuel est incorrect.',
            'password.confirmed' => 'La confirmation du nouveau mot de passe ne correspond pas.',
        ]);

        $request->user()?->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with('success', 'Mot de passe modifié.');
    }

    /**
     * Découpe un texte en paragraphes (une ligne = un paragraphe).
     *
     * @return array<int, string>
     */
    private function paragraphs(string $value): array
    {
        return collect(preg_split('/\R+/', trim($value)) ?: [])
            ->map(fn (string $line): string => trim($line))
            ->filter()
            ->values()
            ->all();
    }

    /**
     * Transforme une liste séparée par des virgules ou des retours ligne en tableau.
     *
     * @return array<int, string>
     */
    private function listFromText(string $value): array
    {
        return collect(preg_split('/[,;\n]+/', trim($value)) ?: [])
            ->map(fn (string $item): string => trim($item))
            ->filter()
            ->values()
            ->all();
    }

    /**
     * Transforme des lignes « Langue | Niveau » en tableau de langues.
     *
     * @return array<int, array{name: string, level: string}>
     */
    private function languages(string $value): array
    {
        return collect(preg_split('/\R+/', trim($value)) ?: [])
            ->map(function (string $line): array {
                [$name, $level] = array_pad(array_map('trim', explode('|', $line, 2)), 2, '');

                return [
                    'name' => $name,
                    'level' => $level !== '' ? $level : '—',
                ];
            })
            ->filter(fn (array $language): bool => $language['name'] !== '')
            ->values()
            ->all();
    }
}
