export type Language = {
    name: string;
    level: string;
};

export type Profile = {
    name: string;
    initials: string;
    role: string;
    education: string | null;
    profileSummary: string | null;
    location: string;
    timezone: string;
    tagline: string;
    bio: string[];
    contact: {
        email: string;
        phone: string;
        whatsapp: string | null;
        linkedin: string | null;
        github: string | null;
    };
    languages: Language[];
    available: boolean;
    availabilityText: string;
    roles: string[];
    cvUrl: string | null;
};

export type Project = {
    id: number;
    title: string;
    description: string;
    tech: string[];
    gradient: string;
    demoUrl: string | null;
    githubUrl: string | null;
};

export type SkillCategory = {
    id: number;
    title: string;
    description: string;
    icon: string;
    skills: string[];
};

export type TimelineEntry = {
    id: number;
    year: string;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
};

export type Service = {
    id: number;
    title: string;
    description: string;
    icon: string;
    features: string[];
};

export type MarketPoint = {
    title: string;
    description: string;
    icon: string;
};

export type LocalMarket = {
    title: string;
    description: string;
    points: MarketPoint[];
};

export type PortfolioProps = {
    profile: Profile;
    projects: Project[];
    skillCategories: SkillCategory[];
    timeline: TimelineEntry[];
    services: Service[];
};
