<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string $icon
 * @property array<int, string> $features
 * @property int $sort_order
 * @property bool $is_published
 */
class Service extends Model
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
        'features',
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
            'features' => 'array',
            'is_published' => 'boolean',
        ];
    }
}
