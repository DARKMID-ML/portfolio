<!DOCTYPE html>
<html lang="fr" class="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#341b86">

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link
            rel="preload"
            href="{{ Vite::asset('resources/fonts/anybody-800-latin.woff2') }}"
            as="font"
            type="font/woff2"
            crossorigin
        >

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col">
        <x-inertia::app />
    </body>
</html>
