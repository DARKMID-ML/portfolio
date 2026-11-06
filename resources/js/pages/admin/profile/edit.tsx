import { Head, useForm } from '@inertiajs/react';
import {
    Download,
    FileText,
    KeyRound,
    Loader2,
    Save,
    Upload,
} from 'lucide-react';
import { useRef } from 'react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { DeleteButton } from '@/components/admin/delete-button';
import { FormField } from '@/components/admin/form-field';
import { PageHeader } from '@/components/admin/page-header';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { AdminProfile } from '@/types/admin';

type ProfileForm = {
    name: string;
    initials: string;
    role: string;
    education: string;
    profile_summary: string;
    location: string;
    timezone: string;
    tagline: string;
    bio: string;
    email: string;
    phone: string;
    whatsapp: string;
    linkedin: string;
    github: string;
    available: boolean;
    availability_text: string;
    roles: string;
    languages: string;
};

export default function ProfileEdit({
    profile,
    cvUrl,
}: {
    profile: AdminProfile;
    cvUrl: string | null;
}) {
    const form = useForm<ProfileForm>({
        name: profile.name,
        initials: profile.initials,
        role: profile.role,
        education: profile.education ?? '',
        profile_summary: profile.profile_summary ?? '',
        location: profile.location,
        timezone: profile.timezone,
        tagline: profile.tagline,
        bio: profile.bio.join('\n'),
        email: profile.email,
        phone: profile.phone,
        whatsapp: profile.whatsapp ?? '',
        linkedin: profile.linkedin ?? '',
        github: profile.github ?? '',
        available: profile.available,
        availability_text: profile.availability_text,
        roles: profile.roles.join(', '),
        languages: profile.languages
            .map((language) => `${language.name} | ${language.level}`)
            .join('\n'),
    });

    const cvForm = useForm<{ cv: File | null }>({ cv: null });
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });
    const fileInput = useRef<HTMLInputElement>(null);

    const submitProfile = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.put('/admin/profil', { preserveScroll: true });
    };

    const submitCv = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        cvForm.post('/admin/profil/cv', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                cvForm.reset();
                if (fileInput.current) {
                    fileInput.current.value = '';
                }
            },
        });
    };

    const submitPassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        passwordForm.put('/admin/profil/mot-de-passe', {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    };

    return (
        <AdminLayout>
            <Head title="Profil & CV — Administration" />
            <PageHeader
                title="Profil & CV"
                description="Ces informations alimentent directement la page publique du portfolio."
            />

            <form onSubmit={submitProfile} className="space-y-6">
                <section className="glass rounded-2xl p-5 sm:p-6">
                    <h2 className="mb-4 text-base font-semibold text-zinc-100">
                        Identité
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                            label="Nom complet"
                            htmlFor="name"
                            error={form.errors.name}
                        >
                            <Input
                                id="name"
                                value={form.data.name}
                                onChange={(event) =>
                                    form.setData('name', event.target.value)
                                }
                            />
                        </FormField>
                        <FormField
                            label="Initiales"
                            htmlFor="initials"
                            error={form.errors.initials}
                            hint="2 à 4 caractères, affichés dans le logo."
                        >
                            <Input
                                id="initials"
                                maxLength={4}
                                value={form.data.initials}
                                onChange={(event) =>
                                    form.setData(
                                        'initials',
                                        event.target.value.toUpperCase(),
                                    )
                                }
                            />
                        </FormField>
                        <FormField
                            label="Rôle affiché"
                            htmlFor="role"
                            error={form.errors.role}
                        >
                            <Input
                                id="role"
                                value={form.data.role}
                                onChange={(event) =>
                                    form.setData('role', event.target.value)
                                }
                            />
                        </FormField>
                        <FormField
                            label="Formation"
                            htmlFor="education"
                            error={form.errors.education}
                        >
                            <Input
                                id="education"
                                value={form.data.education}
                                onChange={(event) =>
                                    form.setData(
                                        'education',
                                        event.target.value,
                                    )
                                }
                            />
                        </FormField>
                        <FormField
                            label="Localisation"
                            htmlFor="location"
                            error={form.errors.location}
                        >
                            <Input
                                id="location"
                                value={form.data.location}
                                onChange={(event) =>
                                    form.setData('location', event.target.value)
                                }
                            />
                        </FormField>
                        <FormField
                            label="Fuseau horaire"
                            htmlFor="timezone"
                            error={form.errors.timezone}
                        >
                            <Input
                                id="timezone"
                                value={form.data.timezone}
                                onChange={(event) =>
                                    form.setData('timezone', event.target.value)
                                }
                            />
                        </FormField>
                    </div>
                </section>

                <section className="glass rounded-2xl p-5 sm:p-6">
                    <h2 className="mb-4 text-base font-semibold text-zinc-100">
                        Accroche & biographie
                    </h2>
                    <div className="space-y-4">
                        <FormField
                            label="Phrase d’accroche"
                            htmlFor="tagline"
                            error={form.errors.tagline}
                        >
                            <Textarea
                                id="tagline"
                                rows={3}
                                value={form.data.tagline}
                                onChange={(event) =>
                                    form.setData('tagline', event.target.value)
                                }
                            />
                        </FormField>
                        <FormField
                            label="Résumé du profil"
                            htmlFor="profile_summary"
                            error={form.errors.profile_summary}
                            hint="Affiché dans la carte « Profil » de la section À propos."
                        >
                            <Textarea
                                id="profile_summary"
                                rows={2}
                                value={form.data.profile_summary}
                                onChange={(event) =>
                                    form.setData(
                                        'profile_summary',
                                        event.target.value,
                                    )
                                }
                            />
                        </FormField>
                        <FormField
                            label="Biographie"
                            htmlFor="bio"
                            error={form.errors.bio}
                            hint="Une ligne = un paragraphe."
                        >
                            <Textarea
                                id="bio"
                                rows={6}
                                value={form.data.bio}
                                onChange={(event) =>
                                    form.setData('bio', event.target.value)
                                }
                            />
                        </FormField>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <FormField
                                label="Statut de disponibilité"
                                htmlFor="availability_text"
                                error={form.errors.availability_text}
                            >
                                <Input
                                    id="availability_text"
                                    value={form.data.availability_text}
                                    onChange={(event) =>
                                        form.setData(
                                            'availability_text',
                                            event.target.value,
                                        )
                                    }
                                />
                            </FormField>
                            <label className="flex items-center gap-3 self-end rounded-xl border border-white/10 px-4 py-3 text-sm text-zinc-300">
                                <input
                                    type="checkbox"
                                    checked={form.data.available}
                                    onChange={(event) =>
                                        form.setData(
                                            'available',
                                            event.target.checked,
                                        )
                                    }
                                    className="h-4 w-4 rounded border-white/20 bg-white/5 accent-emerald-400"
                                />
                                Afficher le badge « disponible »
                            </label>
                        </div>
                    </div>
                </section>

                <section className="glass rounded-2xl p-5 sm:p-6">
                    <h2 className="mb-4 text-base font-semibold text-zinc-100">
                        Coordonnées
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                            label="E-mail"
                            htmlFor="email"
                            error={form.errors.email}
                        >
                            <Input
                                id="email"
                                type="email"
                                value={form.data.email}
                                onChange={(event) =>
                                    form.setData('email', event.target.value)
                                }
                            />
                        </FormField>
                        <FormField
                            label="Téléphone"
                            htmlFor="phone"
                            error={form.errors.phone}
                        >
                            <Input
                                id="phone"
                                value={form.data.phone}
                                onChange={(event) =>
                                    form.setData('phone', event.target.value)
                                }
                            />
                        </FormField>
                        <FormField
                            label="Lien WhatsApp"
                            htmlFor="whatsapp"
                            error={form.errors.whatsapp}
                            hint="URL complète, ex. https://wa.me/22383049479"
                        >
                            <Input
                                id="whatsapp"
                                value={form.data.whatsapp}
                                onChange={(event) =>
                                    form.setData('whatsapp', event.target.value)
                                }
                            />
                        </FormField>
                        <FormField
                            label="GitHub"
                            htmlFor="github"
                            error={form.errors.github}
                            hint="URL complète, laisser vide pour masquer."
                        >
                            <Input
                                id="github"
                                value={form.data.github}
                                onChange={(event) =>
                                    form.setData('github', event.target.value)
                                }
                            />
                        </FormField>
                        <FormField
                            label="LinkedIn"
                            htmlFor="linkedin"
                            error={form.errors.linkedin}
                            hint="URL complète, laisser vide pour masquer."
                        >
                            <Input
                                id="linkedin"
                                value={form.data.linkedin}
                                onChange={(event) =>
                                    form.setData('linkedin', event.target.value)
                                }
                            />
                        </FormField>
                    </div>
                </section>

                <section className="glass rounded-2xl p-5 sm:p-6">
                    <h2 className="mb-4 text-base font-semibold text-zinc-100">
                        Rôles & langues
                    </h2>
                    <div className="space-y-4">
                        <FormField
                            label="Rôles du texte animé"
                            htmlFor="roles"
                            error={form.errors.roles}
                            hint="Séparés par des virgules."
                        >
                            <Input
                                id="roles"
                                value={form.data.roles}
                                onChange={(event) =>
                                    form.setData('roles', event.target.value)
                                }
                            />
                        </FormField>
                        <FormField
                            label="Langues"
                            htmlFor="languages"
                            error={form.errors.languages}
                            hint="Une langue par ligne, au format « Langue | Niveau »."
                        >
                            <Textarea
                                id="languages"
                                rows={3}
                                value={form.data.languages}
                                onChange={(event) =>
                                    form.setData(
                                        'languages',
                                        event.target.value,
                                    )
                                }
                            />
                        </FormField>
                    </div>
                </section>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={form.processing}
                        className="glow-green inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-2.5 text-sm font-medium text-zinc-950 transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                        {form.processing ? (
                            <Loader2
                                className="h-4 w-4 animate-spin"
                                aria-hidden="true"
                            />
                        ) : (
                            <Save className="h-4 w-4" aria-hidden="true" />
                        )}
                        Enregistrer le profil
                    </button>
                </div>
            </form>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <section className="glass rounded-2xl p-5 sm:p-6">
                    <h2 className="mb-1 text-base font-semibold text-zinc-100">
                        CV PDF
                    </h2>
                    <p className="mb-4 text-xs text-zinc-500">
                        Le fichier est proposé au téléchargement sur le site
                        public.
                    </p>

                    {cvUrl ? (
                        <div className="mb-4 flex flex-col gap-3 rounded-xl border border-white/10 p-3 sm:flex-row sm:items-center sm:justify-between">
                            <a
                                href={cvUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-emerald-300 hover:text-emerald-200"
                            >
                                <FileText
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                />
                                CV actuel
                                <Download
                                    className="h-3.5 w-3.5"
                                    aria-hidden="true"
                                />
                            </a>
                            <DeleteButton
                                url="/admin/profil/cv"
                                message="Supprimer le CV actuel ?"
                                label="Supprimer"
                            />
                        </div>
                    ) : (
                        <p className="mb-4 rounded-xl border border-dashed border-white/10 p-3 text-sm text-zinc-500">
                            Aucun CV déposé pour le moment.
                        </p>
                    )}

                    <form onSubmit={submitCv} className="space-y-3">
                        <FormField
                            label="Remplacer le CV"
                            htmlFor="cv"
                            error={cvForm.errors.cv}
                            hint="PDF uniquement, 5 Mo maximum."
                        >
                            <input
                                ref={fileInput}
                                id="cv"
                                type="file"
                                accept="application/pdf"
                                onChange={(event) =>
                                    cvForm.setData(
                                        'cv',
                                        event.target.files?.[0] ?? null,
                                    )
                                }
                                className="block w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-400/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-emerald-300"
                            />
                        </FormField>
                        <button
                            type="submit"
                            disabled={cvForm.processing || !cvForm.data.cv}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-4 py-2 text-sm font-medium text-zinc-950 transition-opacity hover:opacity-90 disabled:opacity-50"
                        >
                            <Upload className="h-4 w-4" aria-hidden="true" />
                            Téléverser le CV
                        </button>
                    </form>
                </section>

                <section className="glass rounded-2xl p-5 sm:p-6">
                    <h2 className="mb-1 text-base font-semibold text-zinc-100">
                        Mot de passe
                    </h2>
                    <p className="mb-4 text-xs text-zinc-500">
                        Modifiez le mot de passe de votre compte administrateur.
                    </p>

                    <form onSubmit={submitPassword} className="space-y-3">
                        <FormField
                            label="Mot de passe actuel"
                            htmlFor="current_password"
                            error={passwordForm.errors.current_password}
                        >
                            <Input
                                id="current_password"
                                type="password"
                                autoComplete="current-password"
                                value={passwordForm.data.current_password}
                                onChange={(event) =>
                                    passwordForm.setData(
                                        'current_password',
                                        event.target.value,
                                    )
                                }
                            />
                        </FormField>
                        <FormField
                            label="Nouveau mot de passe"
                            htmlFor="password"
                            error={passwordForm.errors.password}
                        >
                            <Input
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                value={passwordForm.data.password}
                                onChange={(event) =>
                                    passwordForm.setData(
                                        'password',
                                        event.target.value,
                                    )
                                }
                            />
                        </FormField>
                        <FormField
                            label="Confirmer le mot de passe"
                            htmlFor="password_confirmation"
                        >
                            <Input
                                id="password_confirmation"
                                type="password"
                                autoComplete="new-password"
                                value={passwordForm.data.password_confirmation}
                                onChange={(event) =>
                                    passwordForm.setData(
                                        'password_confirmation',
                                        event.target.value,
                                    )
                                }
                            />
                        </FormField>
                        <button
                            type="submit"
                            disabled={passwordForm.processing}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-emerald-400/30 hover:text-emerald-300 disabled:opacity-50"
                        >
                            <KeyRound className="h-4 w-4" aria-hidden="true" />
                            Modifier le mot de passe
                        </button>
                    </form>
                </section>
            </div>
        </AdminLayout>
    );
}
