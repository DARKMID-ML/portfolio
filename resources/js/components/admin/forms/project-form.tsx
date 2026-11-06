import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { FormField } from '@/components/admin/form-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { AdminProject } from '@/types/admin';

const gradients = [
    { value: 'from-clay to-cobalt', label: 'Violet → Lime' },
    { value: 'from-clay to-moss', label: 'Violet → Forêt' },
    { value: 'from-cobalt to-moss', label: 'Lime → Forêt' },
    { value: 'from-soot to-clay', label: 'Encre → Violet' },
    { value: 'from-moss to-clay', label: 'Forêt → Violet' },
    { value: 'from-cobalt to-clay', label: 'Lime → Violet' },
];

type ProjectFormData = {
    title: string;
    description: string;
    tech: string;
    gradient: string;
    demo_url: string;
    github_url: string;
    sort_order: number;
    is_published: boolean;
};

export function ProjectForm({ project }: { project?: AdminProject }) {
    const form = useForm<ProjectFormData>({
        title: project?.title ?? '',
        description: project?.description ?? '',
        tech: project?.tech.join(', ') ?? '',
        gradient: project?.gradient ?? gradients[0].value,
        demo_url: project?.demo_url ?? '',
        github_url: project?.github_url ?? '',
        sort_order: project?.sort_order ?? 1,
        is_published: project?.is_published ?? true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        form.transform((data) => ({
            ...data,
            tech: data.tech
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean),
            sort_order: Number(data.sort_order),
        }));

        if (project) {
            form.put(`/admin/projects/${project.id}`);
        } else {
            form.post('/admin/projects');
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <section className="glass rounded-2xl p-5 sm:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <FormField
                            label="Titre du projet"
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
                    </div>
                    <div className="sm:col-span-2">
                        <FormField
                            label="Description"
                            htmlFor="description"
                            error={form.errors.description}
                        >
                            <Textarea
                                id="description"
                                rows={4}
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
                            label="Technologies"
                            htmlFor="tech"
                            error={form.errors.tech}
                            hint="Séparées par des virgules."
                        >
                            <Input
                                id="tech"
                                value={form.data.tech}
                                onChange={(event) =>
                                    form.setData('tech', event.target.value)
                                }
                            />
                        </FormField>
                    </div>
                    <FormField
                        label="URL de démo"
                        htmlFor="demo_url"
                        error={form.errors.demo_url}
                        hint="Laisser vide si aucune démo."
                    >
                        <Input
                            id="demo_url"
                            type="url"
                            value={form.data.demo_url}
                            onChange={(event) =>
                                form.setData('demo_url', event.target.value)
                            }
                        />
                    </FormField>
                    <FormField
                        label="URL GitHub"
                        htmlFor="github_url"
                        error={form.errors.github_url}
                        hint="Laisser vide si aucun dépôt public."
                    >
                        <Input
                            id="github_url"
                            type="url"
                            value={form.data.github_url}
                            onChange={(event) =>
                                form.setData('github_url', event.target.value)
                            }
                        />
                    </FormField>
                    <FormField
                        label="Dégradé de la carte"
                        htmlFor="gradient"
                        error={form.errors.gradient}
                    >
                        <select
                            id="gradient"
                            value={form.data.gradient}
                            onChange={(event) =>
                                form.setData('gradient', event.target.value)
                            }
                            className="h-9 w-full rounded-md border border-white/10 bg-[#12121a] px-3 text-sm text-zinc-200 focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none"
                        >
                            {gradients.map((gradient) => (
                                <option
                                    key={gradient.value}
                                    value={gradient.value}
                                >
                                    {gradient.label}
                                </option>
                            ))}
                        </select>
                    </FormField>
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

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <label className="flex items-center gap-3 text-sm text-zinc-300">
                        <input
                            type="checkbox"
                            checked={form.data.is_published}
                            onChange={(event) =>
                                form.setData(
                                    'is_published',
                                    event.target.checked,
                                )
                            }
                            className="h-4 w-4 rounded border-white/20 bg-white/5 accent-emerald-400"
                        />
                        Publier ce projet sur le site
                    </label>

                    <div
                        className={`h-12 w-full max-w-[180px] rounded-xl bg-gradient-to-br ${form.data.gradient}`}
                        aria-hidden="true"
                    />
                </div>
            </section>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <Link
                    href="/admin/projects"
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
                    {project ? 'Enregistrer' : 'Créer le projet'}
                </button>
            </div>
        </form>
    );
}
