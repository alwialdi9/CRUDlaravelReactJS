<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Laravel</title>
        
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        
        <script>window.Laravel = {csrfToken: '{{ csrf_token() }}'}</script>
    </head>
    <body>
        <div id="app" class="mt-3"></div>

        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
