import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Loader2, Lock, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Connexion — Administration" />

            <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
                <div
                    className="grid-pattern absolute inset-0"
                    aria-hidden="true"
                />
                <div
                    className="orb absolute top-[10%] left-[10%] h-72 w-72 bg-emerald-500/15"
                    aria-hidden="true"
                />
                <div
                    className="orb absolute right-[8%] bottom-[8%] h-80 w-80 bg-teal-500/10"
                    style={{ animationDelay: '-5s' }}
                    aria-hidden="true"
                />

                <div className="relative w-full max-w-md">
                    <div className="mb-6 text-center">
                        <p className="font-mono text-sm text-emerald-300">
                            &lt;MD /&gt; admin
                        </p>
                        <h1 className="mt-3 text-2xl font-bold tracking-tight">
                            Espace d’administration
                        </h1>
                        <p className="mt-2 text-sm text-zinc-500">
                            Connectez-vous pour gérer le contenu du portfolio.
                        </p>
                    </div>

                    <form
                        onSubmit={submit}
                        className="glass glow-card space-y-5 rounded-2xl p-6 sm:p-8"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="email">Adresse e-mail</Label>
                            <div className="relative">
                                <Mail
                                    className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500"
                                    aria-hidden="true"
                                />
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    autoFocus
                                    className="pl-10"
                                    value={data.email}
                                    onChange={(event) =>
                                        setData('email', event.target.value)
                                    }
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs font-medium text-rose-400">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <div className="relative">
                                <Lock
                                    className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500"
                                    aria-hidden="true"
                                />
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="pl-10"
                                    value={data.password}
                                    onChange={(event) =>
                                        setData('password', event.target.value)
                                    }
                                />
                            </div>
                            {errors.password && (
                                <p className="text-xs font-medium text-rose-400">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <label className="flex items-center gap-2 text-sm text-zinc-400">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(event) =>
                                    setData('remember', event.target.checked)
                                }
                                className="h-4 w-4 rounded border-white/20 bg-white/5 accent-emerald-400"
                            />
                            Se souvenir de moi
                        </label>

                        <button
                            type="submit"
                            disabled={processing}
                            className="glow-green inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-3 text-sm font-medium text-zinc-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? (
                                <>
                                    <Loader2
                                        className="h-4 w-4 animate-spin"
                                        aria-hidden="true"
                                    />
                                    Connexion…
                                </>
                            ) : (
                                'Se connecter'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-emerald-300"
                        >
                            <ArrowLeft
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                            />
                            Retour au site
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
