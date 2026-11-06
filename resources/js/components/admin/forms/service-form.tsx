import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { FormField } from '@/components/admin/form-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { AdminService } from '@/types/admin';

const icons = [
    { value: 'globe', label: 'Globe' },
    { value: 'shopping-cart', label: 'Panier (Shopping cart)' },
    { value: 'app-window', label: 'Fenêtre (App window)' },
    { value: 'shield-check', label: 'Bouclier (Shield check)' },
    { value: 'map-pin', label: 'Localisation (Map pin)' },
    { value: 'smartphone', label: 'Téléphone (Smartphone)' },
    { value: 'globe-2', label: 'Globe alternatif (Globe 2)' },
    { value: 'badge-percent', label: 'Pourcentage (Badge percent)' },
];

type ServiceFormData = {
    title: string;
    description: string;
    icon: string;
    features: string;
    sort_order: number;
    is_published: boolean;
};

export function ServiceForm({ service }: { service?: AdminService }) {
    const form = useForm<ServiceFormData>({
        title: service?.title ?? '',
        description: service?.description ?? '',
        icon: service?.icon ?? 'globe',
        features: service?.features.join(', ') ?? '',
        sort_order: service?.sort_order ?? 1,
        is_published: service?.is_published ?? true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        form.transform((data) => ({
            ...data,
            features: data.features
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean),
            sort_order: Number(data.sort_order),
        }));

        if (service) {
            form.put(`/admin/services/${service.id}`);
        } else {
            form.post('/admin/services');
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
                            label="Points inclus"
                            htmlFor="features"
                            error={form.errors.features}
                            hint="Séparés par des virgules."
                        >
                            <Input
                                id="features"
                                value={form.data.features}
                                onChange={(event) =>
                                    form.setData('features', event.target.value)
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

                <div className="mt-4">
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
                        Publier ce service sur le site
                    </label>
                </div>
            </section>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <Link
                    href="/admin/services"
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
                    {service ? 'Enregistrer' : 'Créer le service'}
                </button>
            </div>
        </form>
    );
}
