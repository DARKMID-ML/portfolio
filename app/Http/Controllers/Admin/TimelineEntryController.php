<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TimelineEntry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TimelineEntryController extends Controller
{
    /**
     * Liste les étapes du parcours.
     */
    public function index(): Response
    {
        return Inertia::render('admin/timeline/index', [
            'entries' => TimelineEntry::query()
                ->orderBy('sort_order')
                ->orderBy('year')
                ->get(),
        ]);
    }

    /**
     * Affiche le formulaire de création d'une étape.
     */
    public function create(): Response
    {
        return Inertia::render('admin/timeline/create');
    }

    /**
     * Enregistre une nouvelle étape.
     */
    public function store(Request $request): RedirectResponse
    {
        TimelineEntry::query()->create($this->validated($request));

        return redirect()
            ->route('admin.timeline.index')
            ->with('success', 'Étape créée.');
    }

    /**
     * Affiche le formulaire de modification d'une étape.
     */
    public function edit(TimelineEntry $timeline): Response
    {
        return Inertia::render('admin/timeline/edit', [
            'entry' => $timeline,
        ]);
    }

    /**
     * Met à jour une étape.
     */
    public function update(Request $request, TimelineEntry $timeline): RedirectResponse
    {
        $timeline->update($this->validated($request));

        return redirect()
            ->route('admin.timeline.index')
            ->with('success', 'Étape mise à jour.');
    }

    /**
     * Supprime une étape.
     */
    public function destroy(TimelineEntry $timeline): RedirectResponse
    {
        $timeline->delete();

        return redirect()
            ->route('admin.timeline.index')
            ->with('success', 'Étape supprimée.');
    }

    /**
     * Valide les données d'une étape.
     *
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        return $request->validate([
            'year' => ['required', 'string', 'max:20'],
            'title' => ['required', 'string', 'max:120'],
            'subtitle' => ['required', 'string', 'max:160'],
            'description' => ['required', 'string', 'max:2000'],
            'tags' => ['required', 'array', 'min:1'],
            'tags.*' => ['string', 'max:50'],
            'sort_order' => ['required', 'integer', 'min:0', 'max:9999'],
        ]);
    }
}
