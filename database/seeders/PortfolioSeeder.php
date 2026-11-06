<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\Project;
use App\Models\Service;
use App\Models\SkillCategory;
use App\Models\TimelineEntry;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class PortfolioSeeder extends Seeder
{
    /**
     * Remplit le portfolio avec les informations du CV de Mohamed Idrissa Diallo.
     *
     * Le seeder ne remplit que les tables vides afin de ne jamais écraser
     * les modifications effectuées depuis le back-office.
     */
    public function run(): void
    {
        $this->seedProfile();
        $this->seedProjects();
        $this->seedSkills();
        $this->seedTimeline();
        $this->seedServices();
    }

    private function seedProfile(): void
    {
        if (Profile::query()->exists()) {
            return;
        }

        $cvPath = 'cv/mohamed-idrissa-diallo-cv.pdf';

        Profile::query()->create([
            ...Profile::defaults(),
            'cv_path' => Storage::disk('public')->exists($cvPath) ? $cvPath : null,
        ]);
    }

    private function seedProjects(): void
    {
        if (Project::query()->exists()) {
            return;
        }

        Project::query()->create([
            'title' => 'Portfolio personnel',
            'description' => 'Site vitrine développé pour présenter mon parcours, mes compétences et mes coordonnées, avec un espace d’administration pour gérer le contenu.',
            'tech' => ['Laravel', 'Inertia.js', 'React', 'Tailwind CSS'],
            'gradient' => 'from-clay to-cobalt',
            'demo_url' => null,
            'github_url' => null,
            'sort_order' => 1,
            'is_published' => true,
        ]);
    }

    private function seedSkills(): void
    {
        if (SkillCategory::query()->exists()) {
            return;
        }

        $categories = [
            [
                'title' => 'Bureautique',
                'description' => 'Les outils du pack Office utilisés au quotidien',
                'icon' => 'wrench',
                'skills' => ['Excel', 'Word', 'Access', 'PowerPoint', 'Outlook'],
                'sort_order' => 1,
            ],
            [
                'title' => 'Programmation',
                'description' => 'Les bases acquises pendant le DUT et en pratique',
                'icon' => 'layout',
                'skills' => ['Python (bases)', 'HTML5', 'CSS3'],
                'sort_order' => 2,
            ],
            [
                'title' => 'Savoir-être',
                'description' => 'Les qualités développées pendant la formation et le stage',
                'icon' => 'sparkles',
                'skills' => [
                    'Travail d’équipe',
                    'Rigueur',
                    'Adaptabilité',
                    'Apprentissage rapide',
                    'Sens pratique',
                ],
                'sort_order' => 3,
            ],
        ];

        foreach ($categories as $category) {
            SkillCategory::query()->create($category);
        }
    }

    private function seedTimeline(): void
    {
        if (TimelineEntry::query()->exists()) {
            return;
        }

        $entries = [
            [
                'year' => '2020',
                'title' => 'Certificat d’Études Fondamentales',
                'subtitle' => 'École Cheick Modibo Diarra',
                'description' => 'Obtention du DEF, première étape de mon parcours scolaire.',
                'tags' => ['DEF'],
                'sort_order' => 1,
            ],
            [
                'year' => '2022–2023',
                'title' => 'Stage pratique',
                'subtitle' => 'Cyber BK-Tic Services',
                'description' => 'Découverte du support informatique, de l’accueil des utilisateurs et du travail en équipe au sein d’un cybercafé.',
                'tags' => ['Stage', 'Support'],
                'sort_order' => 2,
            ],
            [
                'year' => '2023',
                'title' => 'Baccalauréat',
                'subtitle' => 'École Cheick Modibo Diarra',
                'description' => 'Baccalauréat malien, série Sciences expérimentales.',
                'tags' => ['Bac', 'Sciences'],
                'sort_order' => 3,
            ],
            [
                'year' => '2025',
                'title' => 'DUT Informatique de gestion',
                'subtitle' => 'ESCAE',
                'description' => 'Diplôme universitaire de technologie en informatique de gestion.',
                'tags' => ['DUT', 'Informatique de gestion'],
                'sort_order' => 4,
            ],
        ];

        foreach ($entries as $entry) {
            TimelineEntry::query()->create($entry);
        }
    }

    private function seedServices(): void
    {
        if (Service::query()->exists()) {
            return;
        }

        $services = [
            [
                'title' => 'Intégration web',
                'description' => 'Création de pages web simples en HTML et CSS, avec une mise en page adaptée aux mobiles.',
                'icon' => 'globe',
                'features' => ['HTML / CSS', 'Mise en page responsive', 'Intégration de contenus'],
                'sort_order' => 1,
                'is_published' => true,
            ],
            [
                'title' => 'Bureautique',
                'description' => 'Mise en forme de documents, tableaux et présentations pour les besoins administratifs.',
                'icon' => 'app-window',
                'features' => ['Word', 'Excel', 'PowerPoint', 'Access'],
                'sort_order' => 2,
                'is_published' => true,
            ],
            [
                'title' => 'Assistance informatique',
                'description' => 'Support de premier niveau et accompagnement des utilisateurs, dans l’esprit de mon stage en cyber.',
                'icon' => 'shield-check',
                'features' => ['Accueil utilisateurs', 'Support de base', 'Maintenance simple'],
                'sort_order' => 3,
                'is_published' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::query()->create($service);
        }
    }
}
