<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Liste les services.
     */
    public function index(): Response
    {
        return Inertia::render('admin/services/index', [
            'services' => Service::query()
                ->orderBy('sort_order')
                ->orderBy('title')
                ->get(),
        ]);
    }

    /**
     * Affiche le formulaire de création d'un service.
     */
    public function create(): Response
    {
        return Inertia::render('admin/services/create');
    }

    /**
     * Enregistre un nouveau service.
     */
    public function store(Request $request): RedirectResponse
    {
        Service::query()->create($this->validated($request));

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service créé.');
    }

    /**
     * Affiche le formulaire de modification d'un service.
     */
    public function edit(Service $service): Response
    {
        return Inertia::render('admin/services/edit', [
            'service' => $service,
        ]);
    }

    /**
     * Met à jour un service.
     */
    public function update(Request $request, Service $service): RedirectResponse
    {
        $service->update($this->validated($request));

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service mis à jour.');
    }

    /**
     * Supprime un service.
     */
    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service supprimé.');
    }

    /**
     * Valide les données d'un service.
     *
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:120'],
            'description' => ['required', 'string', 'max:2000'],
            'icon' => ['required', 'string', Rule::in([
                'globe',
                'shopping-cart',
                'app-window',
                'shield-check',
                'map-pin',
                'smartphone',
                'globe-2',
                'badge-percent',
            ])],
            'features' => ['required', 'array', 'min:1'],
            'features.*' => ['string', 'max:60'],
            'sort_order' => ['required', 'integer', 'min:0', 'max:9999'],
            'is_published' => ['sometimes', 'boolean'],
        ]);

        $data['is_published'] = $request->boolean('is_published');

        return $data;
    }
}
