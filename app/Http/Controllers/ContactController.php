<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * POST /api/contact — reçoit le formulaire de contact du site.
     *
     * Mêmes règles de validation que l'ancien schéma Zod :
     * name 2-80, email valide max 120, subject 2-120, message 10-2000.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'min:2', 'max:80'],
            'email' => ['required', 'string', 'email', 'max:120'],
            'subject' => ['required', 'string', 'min:2', 'max:120'],
            'message' => ['required', 'string', 'min:10', 'max:2000'],
        ], [
            'name.required' => 'Le nom est requis',
            'name.min' => 'Le nom est requis',
            'email.email' => 'E-mail invalide',
            'subject.required' => 'Le sujet est requis',
            'subject.min' => 'Le sujet est requis',
            'message.min' => 'Le message doit contenir au moins 10 caractères',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first(),
            ], 400);
        }

        $message = ContactMessage::create($validator->validated());

        return response()->json([
            'ok' => true,
            'id' => $message->id,
        ], 201);
    }
}
