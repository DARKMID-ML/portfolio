import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { FormField } from '@/components/admin/form-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { AdminSkillCategory } from '@/types/admin';

const icons = [
    { value: 'layout', label: 'Mise en page (Layout)' },
    { value: 'server', label: 'Serveur (Server)' },
    { value: 'wrench', label: 'Outils (Wrench)' },
    { value: 'sparkles', label: 'Étoiles (Sparkles)' },
];

type SkillFormData = {
    title: string;
    description: string;
    icon: string;
    skills: string;
    sort_order: number;
};

export function SkillForm({ category }: { category?: AdminSkillCategory }) {
    const form = useForm<SkillFormData>({
        title: category?.title ?? '',
        description: category?.description ?? '',
        icon: category?.icon ?? 'layout',
        skills: category?.skills.join(', ') ?? '',
        sort_order: category?.sort_order ?? 1,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        form.transform((data) => ({
            ...data,
            skills: data.skills
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean),
            sort_order: Number(data.sort_order),
        }));

        if (category) {
            form.put(`/admin/skills/${category.id}`);
        } else {
            form.post('/admin/skills');
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <section className="glass rounded-2xl p-5 sm:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
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
                    <FormField
                        label="Icône"
                        htmlFor="icon"
                        error={form.errors.icon}
                    >
                        <select
                            id="icon"
                            value={form.data.icon}
                            onChange={(event) =>
                                form.setData('icon', event.target.value)
                            }
                            className="h-9 w-full rounded-md border border-white/10 bg-[#12121a] px-3 text-sm text-zinc-200 focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none"
                        >
                            {icons.map((icon) => (
                                <option key={icon.value} value={icon.value}>
                                    {icon.label}
                                </option>
                            ))}
                        </select>
                    </FormField>
                    <div className="sm:col-span-2">
                        <FormField
                            label="Description"
                            htmlFor="description"
                            error={form.errors.description}
                        >
                            <Textarea
                                id="description"
                                rows={2}
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
                            label="Compétences"
                            htmlFor="skills"
                            error={form.errors.skills}
                            hint="Séparées par des virgules."
                        >
                            <Input
                                id="skills"
                                value={form.data.skills}
                                onChange={(event) =>
                                    form.setData('skills', event.target.value)
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
                    href="/admin/skills"
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
                    {category ? 'Enregistrer' : 'Créer la catégorie'}
                </button>
            </div>
        </form>
    );
}
