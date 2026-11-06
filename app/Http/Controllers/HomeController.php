<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\Project;
use App\Models\Service;
use App\Models\SkillCategory;
use App\Models\TimelineEntry;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Affiche le portfolio public avec le contenu géré depuis le back-office.
     */
    public function __invoke(): Response
    {
        $profile = Profile::current();

        return Inertia::render('home', [
            'profile' => [
                'name' => $profile->name,
                'initials' => $profile->initials,
                'role' => $profile->role,
                'education' => $profile->education,
                'profileSummary' => $profile->profile_summary,
                'location' => $profile->location,
                'timezone' => $profile->timezone,
                'tagline' => $profile->tagline,
                'bio' => $profile->bio,
                'contact' => [
                    'email' => $profile->email,
                    'phone' => $profile->phone,
                    'whatsapp' => $profile->whatsapp,
                    'linkedin' => $profile->linkedin,
                    'github' => $profile->github,
                ],
                'languages' => $profile->languages,
                'available' => $profile->available,
                'availabilityText' => $profile->availability_text,
                'roles' => $profile->roles,
                'cvUrl' => $profile->cv_path ? route('cv.download') : null,
            ],
            'projects' => Project::query()
                ->where('is_published', true)
                ->orderBy('sort_order')
                ->orderBy('title')
                ->get()
                ->map(fn (Project $project): array => [
                    'id' => $project->id,
                    'title' => $project->title,
                    'description' => $project->description,
                    'tech' => $project->tech,
                    'gradient' => $project->gradient,
                    'demoUrl' => $project->demo_url,
                    'githubUrl' => $project->github_url,
                ])
                ->values()
                ->all(),
            'skillCategories' => SkillCategory::query()
                ->orderBy('sort_order')
                ->orderBy('title')
                ->get()
                ->map(fn (SkillCategory $category): array => [
                    'id' => $category->id,
                    'title' => $category->title,
                    'description' => $category->description,
                    'icon' => $category->icon,
                    'skills' => $category->skills,
                ])
                ->values()
                ->all(),
            'timeline' => TimelineEntry::query()
                ->orderBy('sort_order')
                ->orderBy('year')
                ->get()
                ->map(fn (TimelineEntry $entry): array => [
                    'id' => $entry->id,
                    'year' => $entry->year,
                    'title' => $entry->title,
                    'subtitle' => $entry->subtitle,
                    'description' => $entry->description,
                    'tags' => $entry->tags,
                ])
                ->values()
                ->all(),
            'services' => Service::query()
                ->where('is_published', true)
                ->orderBy('sort_order')
                ->orderBy('title')
                ->get()
                ->map(fn (Service $service): array => [
                    'id' => $service->id,
                    'title' => $service->title,
                    'description' => $service->description,
                    'icon' => $service->icon,
                    'features' => $service->features,
                ])
                ->values()
                ->all(),
        ]);
    }
}
