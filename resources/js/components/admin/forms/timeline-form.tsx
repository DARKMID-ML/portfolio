import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { FormField } from '@/components/admin/form-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { AdminTimelineEntry } from '@/types/admin';

type TimelineFormData = {
    year: string;
    title: string;
    subtitle: string;
    description: string;
    tags: string;
    sort_order: number;
};

export function TimelineForm({ entry }: { entry?: AdminTimelineEntry }) {
    const form = useForm<TimelineFormData>({
        year: entry?.year ?? '',
        title: entry?.title ?? '',
        subtitle: entry?.subtitle ?? '',
        description: entry?.description ?? '',
        tags: entry?.tags.join(', ') ?? '',
        sort_order: entry?.sort_order ?? 1,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        form.transform((data) => ({
            ...data,
            tags: data.tags
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean),
            sort_order: Number(data.sort_order),
        }));

        if (entry) {
            form.put(`/admin/timeline/${entry.id}`);
        } else {
            form.post('/admin/timeline');
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <section className="glass rounded-2xl p-5 sm:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                        label="Année ou période"
                        htmlFor="year"
                        error={form.errors.year}
                        hint="Exemple : 2025 ou 2022–2023."
                    >
                        <Input
                            id="year"
                            value={form.data.year}
                            onChange={(event) =>
                                form.setData('year', event.target.value)
                            }
                        />
                    </FormField>
                    <FormField
                        label="Titre"
                        htmlFor="title"
                        error={form.errors.title}
                    >
                        <Input
                            id="title"
                            value={form.data.title}
                            onChange={(event) =>
                                form.setData('title', event.target.value)
                            }
                        />
                    </FormField>
                    <div className="sm:col-span-2">
                        <FormField
                            label="Sous-titre"
                            htmlFor="subtitle"
                            error={form.errors.subtitle}
                            hint="Établissement, entreprise ou structure concernée."
                        >
                            <Input
                                id="subtitle"
                                value={form.data.subtitle}
                                onChange={(event) =>
                                    form.setData('subtitle', event.target.value)
                                }
                            />
                        </FormField>
                    </div>
                    <div className="sm:col-span-2">
                        <FormField
                            label="Description"
                            htmlFor="description"
                            error={form.errors.description}
                        >
                            <Textarea
                                id="description"
                                rows={3}
                                value={form.data.description}
                                onChange={(event) =>
                                    form.setData(
                                        'description',
                                        event.target.value,
                                    )
                                }
                            />
                        </FormField>
                    </div>
                    <div className="sm:col-span-2">
                        <FormField
                            label="Étiquettes"
                            htmlFor="tags"
                            error={form.errors.tags}
                            hint="Séparées par des virgules."
                        >
                            <Input
                                id="tags"
                                value={form.data.tags}
                                onChange={(event) =>
                                    form.setData('tags', event.target.value)
                                }
                            />
                        </FormField>
                    </div>
                    <FormField
                        label="Ordre d’affichage"
                        htmlFor="sort_order"
                        error={form.errors.sort_order}
                    >
                        <Input
                            id="sort_order"
                            type="number"
                            min={0}
                            value={form.data.sort_order}
                            onChange={(event) =>
                                form.setData(
                                    'sort_order',
                                    Number(event.target.value),
                                )
                            }
                        />
                    </FormField>
                </div>
            </section>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <Link
                    href="/admin/timeline"
                    className="glass inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:text-emerald-300"
                >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Annuler
                </Link>
                <button
                    type="submit"
                    disabled={form.processing}
                    className="glow-green inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-2.5 text-sm font-medium text-zinc-950 transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                    {form.processing ? (
                        <Loader2
                            className="h-4 w-4 animate-spin"
                            aria-hidden="true"
                        />
                    ) : (
                        <Save className="h-4 w-4" aria-hidden="true" />
                    )}
                    {entry ? 'Enregistrer' : 'Créer l’étape'}
                </button>
            </div>
        </form>
    );
}
