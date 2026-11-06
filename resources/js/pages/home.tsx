import { Head } from '@inertiajs/react';
import { domAnimation, LazyMotion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { About } from '@/components/portfolio/about';
import { Contact } from '@/components/portfolio/contact';
import { Footer } from '@/components/portfolio/footer';
import { Hero } from '@/components/portfolio/hero';
import { Intro } from '@/components/portfolio/motion/intro';
import { ScrollProgress } from '@/components/portfolio/motion/scroll-progress';
import { Navbar } from '@/components/portfolio/navbar';
import { Projects } from '@/components/portfolio/projects';
import { Services } from '@/components/portfolio/services';
import { Skills } from '@/components/portfolio/skills';
import { Toaster } from '@/components/ui/toaster';
import type { PortfolioProps } from '@/types/portfolio';

export default function Home({
    profile,
    projects,
    skillCategories,
    timeline,
    services,
}: PortfolioProps) {
    const [introReady, setIntroReady] = useState(false);
    const handleIntroDone = useCallback(() => setIntroReady(true), []);
    const title = `${profile.name} — ${profile.role} | Bamako, Mali`;
    const description = `${profile.tagline} Portfolio de ${profile.name}, ${profile.role.toLowerCase()} basé à ${profile.location}.`;

    return (
        <LazyMotion features={domAnimation}>
            <div className="public-site">
                <Intro onDone={handleIntroDone} name={profile.name} />
                <ScrollProgress />

                <Head title={title}>
                    <meta name="description" content={description} />
                    <meta
                        name="keywords"
                        content="portfolio Bamako, développeur web junior Mali, informatique de gestion, stage informatique Bamako, HTML CSS Python"
                    />
                    <meta name="author" content={profile.name} />
                    <meta property="og:type" content="website" />
                    <meta property="og:locale" content="fr_FR" />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                </Head>

                <Navbar profile={profile} />

                <main className="relative flex-1">
                    <Hero profile={profile} introReady={introReady} />
                    <About profile={profile} timeline={timeline} />
                    <Skills categories={skillCategories} />
                    <Projects projects={projects} />
                    <Services services={services} profile={profile} />
                    <Contact profile={profile} />
                </main>

                <Footer profile={profile} />
                <Toaster />
            </div>
        </LazyMotion>
    );
}
