<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $year
 * @property string $title
 * @property string $subtitle
 * @property string $description
 * @property array<int, string> $tags
 * @property int $sort_order
 */
class TimelineEntry extends Model
{
    /**
     * Les attributes mass-assignables.
     *
     * @var list<string>
     */
    protected $fillable = [
        'year',
        'title',
        'subtitle',
        'description',
        'tags',
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
            'tags' => 'array',
        ];
    }
}
