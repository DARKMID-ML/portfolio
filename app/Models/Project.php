<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property string $description
 * @property array<int, string> $tech
 * @property string $gradient
 * @property string|null $demo_url
 * @property string|null $github_url
 * @property int $sort_order
 * @property bool $is_published
 */
class Project extends Model
{
    /**
     * Les attributes mass-assignables.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'tech',
        'gradient',
        'demo_url',
        'github_url',
        'sort_order',
        'is_published',
    ];

    /**
     * Les attributes castés.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tech' => 'array',
            'is_published' => 'boolean',
        ];
    }
}
