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

            <div className="flex min-h-screen items-center justify-center bg-[#100d19] px-4 py-10 text-[#f4f0e6]">
                <div className="w-full max-w-md">
                    <Link
                        href="/"
                        className="mb-8 inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6ff3f]"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d6ff3f] font-display text-sm font-extrabold text-[#17112d]">
                            MD
                        </span>
                        <span>
                            <span className="block font-display text-base font-bold tracking-tight">
                                MID / 223
                            </span>
                            <span className="block text-xs text-[#b8b0d1]">
                                Administration
                            </span>
                        </span>
                    </Link>

                    <form
                        onSubmit={submit}
                        className="space-y-5 rounded-2xl border border-white/10 bg-[#171421] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8"
                    >
                        <div className="mb-7">
                            <h1 className="font-display text-2xl font-bold tracking-tight">
                                Connexion
                            </h1>
                            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                                Connectez-vous pour gérer le contenu du
                                portfolio.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-sm text-zinc-200"
                            >
                                Adresse e-mail
                            </Label>
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
                                    className="min-h-11 border-white/10 bg-white/[0.04] pl-10 text-zinc-100 focus-visible:ring-[#d6ff3f]/50"
                                    value={data.email}
                                    onChange={(event) =>
                                        setData('email', event.target.value)
                                    }
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs font-medium text-rose-300">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="text-sm text-zinc-200"
                            >
                                Mot de passe
                            </Label>
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
                                    className="min-h-11 border-white/10 bg-white/[0.04] pl-10 text-zinc-100 focus-visible:ring-[#d6ff3f]/50"
                                    value={data.password}
                                    onChange={(event) =>
                                        setData('password', event.target.value)
                                    }
                                />
                            </div>
                            {errors.password && (
                                <p className="text-xs font-medium text-rose-300">
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
                                className="h-4 w-4 rounded border-white/20 bg-white/5 accent-[#d6ff3f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6ff3f]"
                            />
                            Se souvenir de moi
                        </label>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#d6ff3f] px-5 py-3 text-sm font-semibold text-[#17112d] transition-colors hover:bg-[#e3ff75] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6ff3f] disabled:cursor-not-allowed disabled:opacity-60"
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

                    <p className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-500">
                        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                        <Link
                            href="/"
                            className="transition-colors hover:text-[#d6ff3f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6ff3f]"
                        >
                            Retour au site
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
