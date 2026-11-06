<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SkillCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class SkillCategoryController extends Controller
{
    /**
     * Liste les catégories de compétences.
     */
    public function index(): Response
    {
        return Inertia::render('admin/skills/index', [
            'categories' => SkillCategory::query()
                ->orderBy('sort_order')
                ->orderBy('title')
                ->get(),
        ]);
    }

    /**
     * Affiche le formulaire de création d'une catégorie.
     */
    public function create(): Response
    {
        return Inertia::render('admin/skills/create');
    }

    /**
     * Enregistre une nouvelle catégorie.
     */
    public function store(Request $request): RedirectResponse
    {
        SkillCategory::query()->create($this->validated($request));

        return redirect()
            ->route('admin.skills.index')
            ->with('success', 'Catégorie créée.');
    }

    /**
     * Affiche le formulaire de modification d'une catégorie.
     */
    public function edit(SkillCategory $skill): Response
    {
        return Inertia::render('admin/skills/edit', [
            'category' => $skill,
        ]);
    }

    /**
     * Met à jour une catégorie.
     */
    public function update(Request $request, SkillCategory $skill): RedirectResponse
    {
        $skill->update($this->validated($request));

        return redirect()
            ->route('admin.skills.index')
            ->with('success', 'Catégorie mise à jour.');
    }

    /**
     * Supprime une catégorie.
     */
    public function destroy(SkillCategory $skill): RedirectResponse
    {
        $skill->delete();

        return redirect()
            ->route('admin.skills.index')
            ->with('success', 'Catégorie supprimée.');
    }

    /**
     * Valide les données d'une catégorie.
     *
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:80'],
            'description' => ['required', 'string', 'max:160'],
            'icon' => ['required', 'string', Rule::in(['layout', 'server', 'wrench', 'sparkles'])],
            'skills' => ['required', 'array', 'min:1'],
            'skills.*' => ['string', 'max:60'],
            'sort_order' => ['required', 'integer', 'min:0', 'max:9999'],
        ]);
    }
}
