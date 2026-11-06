<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Service;
use App\Models\SkillCategory;
use App\Models\TimelineEntry;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Affiche le tableau de bord du back-office.
     */
    public function __invoke(): Response
    {
        $profile = Profile::current();

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'unreadMessages' => ContactMessage::query()->where('read', false)->count(),
                'totalMessages' => ContactMessage::query()->count(),
                'projects' => Project::query()->count(),
                'skills' => SkillCategory::query()->count(),
                'timeline' => TimelineEntry::query()->count(),
                'services' => Service::query()->count(),
            ],
            'recentMessages' => ContactMessage::query()
                ->latest('created_at')
                ->limit(5)
                ->get(),
            'hasCv' => $profile->cv_path !== null,
        ]);
    }
}
