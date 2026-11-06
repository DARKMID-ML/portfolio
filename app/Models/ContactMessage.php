<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasUuids;

    /**
     * La table ne possède pas de colonne updated_at
     * (fidélité à l'ancien schéma Drizzle).
     */
    public const UPDATED_AT = null;

    /**
     * Les attributes mass-assignables.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        'read',
    ];

    /**
     * Les attributes castés.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'read' => 'boolean',
            'created_at' => 'datetime',
        ];
    }
}
