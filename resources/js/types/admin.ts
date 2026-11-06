export type AuthUser = {
    id: number;
    name: string;
    email: string;
};

export type SharedData = {
    name: string;
    auth: {
        user: AuthUser | null;
    };
    flash: {
        success: string | null;
    };
    unreadMessages: number;
};

export type ContactMessage = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    read: boolean;
    created_at: string;
};

export type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    prev_page_url: string | null;
    next_page_url: string | null;
};

export type AdminProfile = {
    id: number;
    name: string;
    initials: string;
    role: string;
    education: string | null;
    profile_summary: string | null;
    location: string;
    timezone: string;
    tagline: string;
    bio: string[];
    email: string;
    phone: string;
    whatsapp: string | null;
    linkedin: string | null;
    github: string | null;
    available: boolean;
    availability_text: string;
    roles: string[];
    languages: { name: string; level: string }[];
    cv_path: string | null;
};

export type AdminProject = {
    id: number;
    title: string;
    description: string;
    tech: string[];
    gradient: string;
    demo_url: string | null;
    github_url: string | null;
    sort_order: number;
    is_published: boolean;
};

export type AdminSkillCategory = {
    id: number;
    title: string;
    description: string;
    icon: string;
    skills: string[];
    sort_order: number;
};

export type AdminTimelineEntry = {
    id: number;
    year: string;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    sort_order: number;
};

export type AdminService = {
    id: number;
    title: string;
    description: string;
    icon: string;
    features: string[];
    sort_order: number;
    is_published: boolean;
};
