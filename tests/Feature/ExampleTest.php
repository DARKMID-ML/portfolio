<?php

test('returns a successful response', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
});

test('uses the forwarded HTTPS scheme for assets behind Render proxy', function () {
    $response = $this
        ->withServerVariables([
            'HTTP_X_FORWARDED_PROTO' => 'https',
        ])
        ->get(route('home'));

    $response
        ->assertOk();

    expect(url('/build/assets/app.css'))->toStartWith('https://');
});
