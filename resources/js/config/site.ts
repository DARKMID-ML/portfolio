import type { LocalMarket } from '@/types/portfolio';

export const navLinks = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#a-propos', label: 'À propos' },
    { href: '#competences', label: 'Compétences' },
    { href: '#projets', label: 'Projets' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' },
];

export const localMarket: LocalMarket = {
    title: 'Ancré à Bamako, ouvert aux opportunités',
    description:
        'Je souhaite mettre mes compétences au service d’une équipe locale ou à distance, apprendre au contact de professionnels et continuer à progresser sur des projets concrets.',
    points: [
        {
            title: 'Formation solide',
            description: 'DUT en informatique de gestion — ESCAE, 2025',
            icon: 'map-pin',
        },
        {
            title: 'Première expérience',
            description: 'Stage pratique au cyber BK-Tic Services (2022–2023)',
            icon: 'shield-check',
        },
        {
            title: 'Apprentissage continu',
            description:
                'Une veille régulière et l’envie de progresser en équipe',
            icon: 'globe-2',
        },
    ],
};
