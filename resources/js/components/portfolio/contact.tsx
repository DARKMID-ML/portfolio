import { AnimatePresence } from 'framer-motion';
import { m } from 'framer-motion';
import {
    ArrowUpRight,
    Download,
    Github,
    Linkedin,
    Loader2,
    Mail,
    MapPin,
    MessageCircle,
    Send,
    type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { EASE_OUT, Reveal } from '@/components/portfolio/motion/reveal';
import { SectionHeading } from '@/components/portfolio/section-heading';
import { useLocalTime } from '@/hooks/use-local-time';
import { useToast } from '@/hooks/use-toast';
import type { Profile } from '@/types/portfolio';

type Channel = {
    icon: LucideIcon;
    label: string;
    value: string;
    href: string;
};

export function Contact({ profile }: { profile: Profile }) {
    const { toast } = useToast();
    const localTime = useLocalTime();
    const [submitting, setSubmitting] = useState(false);
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error ?? 'Une erreur est survenue');
            }

            toast({
                title: 'Message envoyé !',
                description:
                    'Merci pour votre message. Je vous répondrai dans les plus brefs délais.',
            });
            setForm({ name: '', email: '', subject: '', message: '' });
            setSent(true);
            window.setTimeout(() => setSent(false), 4500);
        } catch {
            toast({
                title: 'Échec de l’envoi',
                description:
                    'Le message n’a pas pu être envoyé. Réessayez ou contactez-moi directement sur WhatsApp.',
                variant: 'destructive',
            });
        } finally {
            setSubmitting(false);
        }
    };

    const channels: Channel[] = [];

    if (profile.contact.whatsapp) {
        channels.push({
            icon: MessageCircle,
            label: 'WhatsApp — le plus rapide',
            value: profile.contact.phone,
            href: profile.contact.whatsapp,
        });
    }

    channels.push({
        icon: Mail,
        label: 'E-mail',
        value: profile.contact.email,
        href: `mailto:${profile.contact.email}`,
    });

    if (profile.contact.linkedin) {
        channels.push({
            icon: Linkedin,
            label: 'LinkedIn',
            value: 'Connectons-nous professionnellement',
            href: profile.contact.linkedin,
        });
    }

    if (profile.contact.github) {
        channels.push({
            icon: Github,
            label: 'GitHub',
            value: 'Découvrez mon code',
            href: profile.contact.github,
        });
    }

    const fieldClass =
        'mt-2 w-full rounded-none border-0 border-b-2 border-ink/20 bg-transparent px-0 pb-2 text-[14px] text-ink placeholder:text-ink/60 transition-colors focus:border-violet focus:outline-none focus:ring-0';
    const labelClass = 'font-code text-[9px] tracking-[0.08em] text-ink/65';

    return (
        <section
            id="contact"
            className="relative overflow-hidden bg-lilac py-20 text-ink sm:py-28"
            aria-label="Contact"
        >
            <div
                className="weave-grid-ink pointer-events-none absolute inset-0 opacity-40"
                aria-hidden="true"
            />
            <div
                className="halftone pointer-events-none absolute inset-0 opacity-[0.18]"
                aria-hidden="true"
            />
            <span
                className="text-outline-ink pointer-events-none absolute -top-8 -right-4 font-display text-[28vw] leading-none font-extrabold select-none lg:-right-8"
                aria-hidden="true"
            >
                05
            </span>

            <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
                <SectionHeading
                    index="05 /"
                    label="Contact"
                    title="Une idée"
                    accent="à mettre en route ?"
                    description="Un projet, une question ou une opportunité ? Écrivez-moi : je réponds généralement sous 24 heures."
                />

                <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
                    <div>
                        <Reveal>
                            <a
                                href={`mailto:${profile.contact.email}`}
                                className="group block border-b-2 border-ink/20 pb-5"
                            >
                                <span className="font-code text-[9px] tracking-[0.08em] text-ink/65">
                                    ÉCRIRE DIRECTEMENT
                                </span>
                                <span className="mt-2 flex items-start justify-between gap-4 font-display text-[clamp(1.25rem,4.5vw,2.35rem)] leading-[0.95] font-extrabold tracking-[-0.04em] break-words text-ink transition-colors group-hover:text-violet">
                                    {profile.contact.email}
                                    <ArrowUpRight
                                        className="mt-1 h-6 w-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                        aria-hidden="true"
                                    />
                                </span>
                            </a>
                        </Reveal>

                        <div className="mt-2">
                            {channels.map((channel, index) => (
                                <m.a
                                    key={channel.label}
                                    href={channel.href}
                                    target={
                                        channel.href.startsWith('http')
                                            ? '_blank'
                                            : undefined
                                    }
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-5%' }}
                                    transition={{
                                        duration: 0.55,
                                        delay: index * 0.06,
                                        ease: EASE_OUT,
                                    }}
                                    className="group flex items-center gap-4 border-b border-ink/20 py-3.5"
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-ink/25 text-ink/70 transition-colors group-hover:border-violet group-hover:bg-violet group-hover:text-bone">
                                        <channel.icon
                                            className="h-3.5 w-3.5"
                                            aria-hidden="true"
                                        />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block font-code text-[8px] tracking-[0.08em] text-ink/65">
                                            {channel.label}
                                        </span>
                                        <span className="mt-0.5 block truncate text-[13px] text-ink/80 transition-colors group-hover:text-violet">
                                            {channel.value}
                                        </span>
                                    </span>
                                    <ArrowUpRight
                                        className="h-3.5 w-3.5 text-ink/55 transition-colors group-hover:text-violet"
                                        aria-hidden="true"
                                    />
                                </m.a>
                            ))}
                        </div>

                        {profile.cvUrl ? (
                            <Reveal delay={0.08}>
                                <a
                                    href={profile.cvUrl}
                                    className="group mt-6 flex items-center justify-between gap-4 border border-ink/25 p-4 transition-colors hover:border-violet"
                                >
                                    <span className="flex items-center gap-3">
                                        <Download
                                            className="h-4 w-4 text-violet"
                                            aria-hidden="true"
                                        />
                                        <span>
                                            <span className="block text-[13px] font-semibold text-ink">
                                                Mon CV en PDF
                                            </span>
                                            <span className="mt-0.5 block font-code text-[8px] text-ink/65">
                                                Parcours, formation et
                                                compétences
                                            </span>
                                        </span>
                                    </span>
                                    <ArrowUpRight
                                        className="h-4 w-4 text-ink/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet"
                                        aria-hidden="true"
                                    />
                                </a>
                            </Reveal>
                        ) : null}

                        <div className="mt-8 flex flex-wrap items-center gap-4 font-code text-[8px] tracking-[0.06em] text-ink/65">
                            <span className="flex items-center gap-1.5">
                                <MapPin
                                    className="h-3 w-3 text-violet"
                                    aria-hidden="true"
                                />
                                {profile.location}
                            </span>
                            <span>{localTime} GMT</span>
                            <span className="h-1.5 w-1.5 bg-violet" />
                            <span>{profile.availabilityText}</span>
                        </div>
                    </div>

                    <Reveal delay={0.1} y={34}>
                        <div
                            className="ticket border-2 border-ink bg-bone text-ink shadow-[10px_10px_0_0_var(--color-violet)]"
                            style={
                                {
                                    '--ticket-notch': 'var(--color-lilac)',
                                } as React.CSSProperties
                            }
                        >
                            <div className="flex items-center justify-between gap-3 bg-ink px-4 py-3 text-bone">
                                <span className="font-code text-[8px] tracking-[0.1em]">
                                    FORMULAIRE / MESSAGE
                                </span>
                                <span className="flex items-center gap-2 font-code text-[8px] tracking-[0.08em] text-lime">
                                    <span className="h-1.5 w-1.5 bg-lime" />
                                    OUVERT
                                </span>
                            </div>

                            <div className="halftone relative border-b-2 border-ink px-4 py-3 sm:px-6">
                                <div className="flex items-end justify-between gap-4">
                                    <div>
                                        <p className="font-code text-[8px] tracking-[0.08em] text-ink/65">
                                            À L’ATTENTION DE
                                        </p>
                                        <p className="mt-0.5 font-display text-xl font-extrabold tracking-[-0.04em] uppercase">
                                            Mohamed I. Diallo
                                        </p>
                                    </div>
                                    <span className="font-code text-[8px] tracking-[0.06em] text-ink/65">
                                        RÉPONSE &lt; 24 H
                                    </span>
                                </div>
                                <AnimatePresence>
                                    {sent ? (
                                        <m.span
                                            className="absolute top-2 right-3 rotate-[-8deg] border-2 border-violet px-2 py-1 font-code text-[9px] tracking-[0.08em] text-violet"
                                            initial={{ opacity: 0, scale: 1.4 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                        >
                                            ENVOYÉ / 223
                                        </m.span>
                                    ) : null}
                                </AnimatePresence>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5 px-4 py-5 sm:px-6 sm:py-6"
                                aria-label="Formulaire de contact"
                            >
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className={labelClass}
                                        >
                                            VOTRE NOM *
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            required
                                            maxLength={80}
                                            autoComplete="name"
                                            placeholder="Ex : Aïcha Diallo"
                                            value={form.name}
                                            onChange={(event) =>
                                                setForm({
                                                    ...form,
                                                    name: event.target.value,
                                                })
                                            }
                                            className={fieldClass}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className={labelClass}
                                        >
                                            VOTRE E-MAIL *
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            maxLength={120}
                                            autoComplete="email"
                                            placeholder="vous@exemple.com"
                                            value={form.email}
                                            onChange={(event) =>
                                                setForm({
                                                    ...form,
                                                    email: event.target.value,
                                                })
                                            }
                                            className={fieldClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="subject"
                                        className={labelClass}
                                    >
                                        SUJET *
                                    </label>
                                    <input
                                        id="subject"
                                        name="subject"
                                        required
                                        maxLength={120}
                                        placeholder="Ex : Opportunité de stage"
                                        value={form.subject}
                                        onChange={(event) =>
                                            setForm({
                                                ...form,
                                                subject: event.target.value,
                                            })
                                        }
                                        className={fieldClass}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className={labelClass}
                                    >
                                        VOTRE MESSAGE *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        maxLength={2000}
                                        rows={5}
                                        placeholder="Décrivez votre besoin en quelques lignes…"
                                        value={form.message}
                                        onChange={(event) =>
                                            setForm({
                                                ...form,
                                                message: event.target.value,
                                            })
                                        }
                                        className={`${fieldClass} resize-none`}
                                    />
                                </div>

                                <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="font-code text-[8px] tracking-[0.06em] text-ink/65">
                                        CHAMPS OBLIGATOIRES *
                                    </p>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="group inline-flex w-full items-center justify-between gap-4 bg-ink px-4 py-3 font-code text-[10px] tracking-[0.04em] text-bone transition-colors hover:bg-violet disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[220px]"
                                    >
                                        <span>
                                            {submitting
                                                ? 'Envoi en cours…'
                                                : 'Envoyer le message'}
                                        </span>
                                        {submitting ? (
                                            <Loader2
                                                className="h-4 w-4 animate-spin"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <Send
                                                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
