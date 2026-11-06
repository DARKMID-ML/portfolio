<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    /**
     * Liste les messages reçus via le formulaire de contact.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();
        $filter = $request->string('filter')->toString();

        $messages = ContactMessage::query()
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('subject', 'like', "%{$search}%");
                });
            })
            ->when($filter === 'unread', fn ($query) => $query->where('read', false))
            ->orderByDesc('created_at')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('admin/messages/index', [
            'messages' => $messages,
            'filters' => [
                'search' => $search,
                'filter' => $filter,
            ],
        ]);
    }

    /**
     * Affiche un message et le marque comme lu.
     */
    public function show(ContactMessage $message): Response
    {
        if (! $message->read) {
            $message->update(['read' => true]);
        }

        return Inertia::render('admin/messages/show', [
            'message' => $message->fresh(),
        ]);
    }

    /**
     * Met à jour l'état lu/non-lu d'un message.
     */
    public function update(Request $request, ContactMessage $message): RedirectResponse
    {
        $validated = $request->validate([
            'read' => ['required', 'boolean'],
        ]);

        $message->update(['read' => $validated['read']]);

        return back()->with('success', $validated['read'] ? 'Message marqué comme lu.' : 'Message marqué comme non lu.');
    }

    /**
     * Supprime un message.
     */
    public function destroy(ContactMessage $message): RedirectResponse
    {
        $message->delete();

        return redirect()
            ->route('admin.messages.index')
            ->with('success', 'Message supprimé.');
    }
}
