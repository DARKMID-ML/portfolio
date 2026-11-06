import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { local } from 'laravel-vite-plugin/fonts';
import { defineConfig, lazyPlugins } from 'vite-plus';

export default defineConfig({
    plugins: lazyPlugins(() => [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
            // WOFF2-only local files: fewer requests and no redundant WOFF1
            // faces. See resources/fonts/README.md.
            fonts: [
                local('Instrument Sans', {
                    variants: [
                        {
                            src: 'resources/fonts/instrument-sans-400.woff2',
                            weight: 400,
                        },
                        {
                            src: 'resources/fonts/instrument-sans-500.woff2',
                            weight: 500,
                        },
                        {
                            src: 'resources/fonts/instrument-sans-600.woff2',
                            weight: 600,
                        },
                    ],
                    fallbacks: ['system-ui', 'sans-serif'],
                    optimizedFallbacks: false,
                }),
                local('Bricolage Grotesque', {
                    alias: 'bricolage',
                    variants: [
                        {
                            src: 'resources/fonts/bricolage-grotesque-400.woff2',
                            weight: 400,
                        },
                        {
                            src: 'resources/fonts/bricolage-grotesque-500.woff2',
                            weight: 500,
                        },
                        {
                            src: 'resources/fonts/bricolage-grotesque-600.woff2',
                            weight: 600,
                        },
                        {
                            src: 'resources/fonts/bricolage-grotesque-700.woff2',
                            weight: 700,
                        },
                        {
                            src: 'resources/fonts/bricolage-grotesque-800.woff2',
                            weight: 800,
                        },
                    ],
                    preload: [{ weight: 700 }],
                    fallbacks: ['system-ui', 'sans-serif'],
                    optimizedFallbacks: false,
                }),
                local('DM Mono', {
                    alias: 'dm-mono',
                    variants: [
                        {
                            src: 'resources/fonts/dm-mono-400.woff2',
                            weight: 400,
                        },
                        {
                            src: 'resources/fonts/dm-mono-500.woff2',
                            weight: 500,
                        },
                    ],
                    preload: [{ weight: 400 }],
                    fallbacks: ['system-ui', 'sans-serif'],
                    optimizedFallbacks: false,
                }),
            ],
        }),
        inertia(),
        react(),
        babel({
            presets: [reactCompilerPreset()],
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ]),
    server: {
        watch: {
            ignored: [
                '**/.agents/**',
                '**/.claude/**',
                '**/.cursor/**',
                '**/.junie/**',
                '**/vendor/**',
            ],
        },
    },
    lint: {
        ignorePatterns: [
            'vendor/**',
            'node_modules/**',
            'public/**',
            'bootstrap/ssr/**',
            'tailwind.config.js',
            'resources/js/actions/**',
            'resources/js/components/ui/*',
            'resources/js/routes/**',
            'resources/js/wayfinder/**',
        ],
        options: {
            denyWarnings: true,
            typeAware: true,
        },
    },
    fmt: {
        printWidth: 80,
        tabWidth: 4,
        singleQuote: true,
        semi: true,
        singleAttributePerLine: false,
        htmlWhitespaceSensitivity: 'css',
        ignorePatterns: [
            '.github/**',
            'composer.json',
            'resources/js/components/ui/*',
            'resources/views/mail/*',
        ],
        sortTailwindcss: {
            functions: ['clsx', 'cn', 'cva'],
            stylesheet: 'resources/css/app.css',
        },
    },
});
