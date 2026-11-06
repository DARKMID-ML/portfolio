<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $initials
 * @property string $role
 * @property string|null $education
 * @property string|null $profile_summary
 * @property string $location
 * @property string $timezone
 * @property string $tagline
 * @property array<int, string> $bio
 * @property string $email
 * @property string $phone
 * @property string|null $whatsapp
 * @property string|null $linkedin
 * @property string|null $github
 * @property bool $available
 * @property string $availability_text
 * @property array<int, string> $roles
 * @property array<int, array{name: string, level: string}> $languages
 * @property string|null $cv_path
 */
class Profile extends Model
{
    /**
     * Les attributes mass-assignables.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'initials',
        'role',
        'education',
        'profile_summary',
        'location',
        'timezone',
        'tagline',
        'bio',
        'email',
        'phone',
        'whatsapp',
        'linkedin',
        'github',
        'available',
        'availability_text',
        'roles',
        'languages',
        'cv_path',
    ];

    /**
     * Les attributes castés.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'bio' => 'array',
            'roles' => 'array',
            'languages' => 'array',
            'available' => 'boolean',
        ];
    }

    /**
     * Retourne le profil unique du portfolio, ou le crée avec les
     * informations du CV si la base est encore vide.
     */
    public static function current(): self
    {
        return static::query()->first() ?? static::query()->create(static::defaults());
    }

    /**
     * Valeurs de secours utilisées tant que le back-office n'a pas été rempli.
     *
     * @return array<string, mixed>
     */
    public static function defaults(): array
    {
        return [
            'name' => 'Mohamed Idrissa Diallo',
            'initials' => 'MD',
            'role' => 'Développeur web junior',
            'education' => 'DUT Informatique de gestion — ESCAE, 2025',
            'profile_summary' => 'Diplômé en informatique de gestion, orienté apprentissage et travail d’équipe.',
            'location' => 'Bamako, Mali',
            'timezone' => 'GMT (UTC+0)',
            'tagline' => 'Diplômé en informatique de gestion, je construis des interfaces web simples et utiles — et j’apprends à chaque projet.',
            'bio' => [
                'Diplômé d’un DUT en informatique de gestion à l’ESCAE (2025), je suis basé à Bamako et passionné par les nouvelles technologies.',
                'J’ai acquis les bases de la programmation en Python, HTML et CSS, ainsi qu’une bonne maîtrise du pack Office. Mon stage pratique au cyber BK-Tic Services (2022–2023) m’a permis de découvrir le travail en équipe et le support aux utilisateurs.',
                'Je cherche aujourd’hui à mettre mes compétences au service d’une équipe, à apprendre au contact de professionnels et à contribuer à des projets web concrets.',
            ],
            'email' => 'darkmid30@gmail.com',
            'phone' => '+223 83 04 94 79',
            'whatsapp' => 'https://wa.me/22383049479',
            'linkedin' => null,
            'github' => 'https://github.com/DARKMID-ML',
            'available' => true,
            'availability_text' => 'Ouvert aux stages et premières opportunités',
            'roles' => [
                'Développeur web junior',
                'Informaticien de gestion',
                'En apprentissage continu',
                'Basé à Bamako',
            ],
            'languages' => [
                ['name' => 'Français', 'level' => 'Courant'],
                ['name' => 'Bambara', 'level' => 'Courant'],
                ['name' => 'Anglais', 'level' => 'Bien'],
            ],
            'cv_path' => 'cv/mohamed-idrissa-diallo-cv.pdf',
        ];
    }
}
