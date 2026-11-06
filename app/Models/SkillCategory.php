<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string $icon
 * @property array<int, string> $skills
 * @property int $sort_order
 */
class SkillCategory extends Model
{
    /**
     * Les attributes mass-assignables.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'icon',
        'skills',
        'sort_order',
    ];

    /**
     * Les attributes castés.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'skills' => 'array',
        ];
    }
}
