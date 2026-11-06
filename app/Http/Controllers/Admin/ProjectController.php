<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Liste les projets.
     */
    public function index(): Response
    {
        return Inertia::render('admin/projects/index', [
            'projects' => Project::query()
                ->orderBy('sort_order')
                ->orderBy('title')
                ->get(),
        ]);
    }

    /**
     * Affiche le formulaire de création d'un projet.
     */
    public function create(): Response
    {
        return Inertia::render('admin/projects/create');
    }

    /**
     * Enregistre un nouveau projet.
     */
    public function store(Request $request): RedirectResponse
    {
        Project::query()->create($this->validated($request));

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Projet créé.');
    }

    /**
     * Affiche le formulaire de modification d'un projet.
     */
    public function edit(Project $project): Response
    {
        return Inertia::render('admin/projects/edit', [
            'project' => $project,
        ]);
    }

    /**
     * Met à jour un projet.
     */
    public function update(Request $request, Project $project): RedirectResponse
    {
        $project->update($this->validated($request));

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Projet mis à jour.');
    }

    /**
     * Supprime un projet.
     */
    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Projet supprimé.');
    }

    /**
     * Valide les données d'un projet.
     *
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:120'],
            'description' => ['required', 'string', 'max:2000'],
            'tech' => ['required', 'array', 'min:1'],
            'tech.*' => ['string', 'max:50'],
            'gradient' => ['required', 'string', 'max:80'],
            'demo_url' => ['nullable', 'url', 'max:255'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'sort_order' => ['required', 'integer', 'min:0', 'max:9999'],
            'is_published' => ['sometimes', 'boolean'],
        ]);

        $data['is_published'] = $request->boolean('is_published');

        return $data;
    }
}
