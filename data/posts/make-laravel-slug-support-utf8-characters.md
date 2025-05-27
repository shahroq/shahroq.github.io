---
id: 106
title: "Make Laravel slug support utf8 characters"
excerpt: "If you ever wanted to use Laravel Str:slug() method, you maybe noticed it only supports Latin characters."
published_date: "2014-11-17"
tags: ["Laravel"]
---

If you ever wanted to use Laravel `Str:slug()` method, you might notice it only supports Latin characters. By looking at `Str` class `\vendor\laravel\framework\src\Illuminate\Support\Str.php` you see:

```php
public static function slug($title, $separator = '-')
{
  $title = static::ascii($title);

  // Convert all dashes/underscores into separators
  $flip = $separator == '-' ? '_' : '-';
  $title = preg_replace('!['.preg_quote($flip).']+!u', $separator, $title);

  // Remove all characters that are not the separator, letters, numbers, or whitespace.
  $title = preg_replace('![^'.preg_quote($separator).'\pL\pN\s]+!u', '', mb_strtolower($title));

  // Replace all separator characters and whitespace by a single separator
  $title = preg_replace('!['.preg_quote($separator).'\s]+!u', $separator, $title);

  return trim($title, $separator);
}
```

At the very first line, the string is converted to ANSI. That's why you cannot use UTF-8 characters on return. You can comment the line out and see the result. But editing the Laravel source is not the best solution

To change the slug method functionality, it's best to extend or override this method. For doing so, first create a file named `app/macros.php`, then copy/paste the main slug method into this file and convert it to a closure method:

```php
Str::macro('slug_utf8', function($title, $separator = '-')
{
    //$title = static::ascii($title); //comment it out to suport farsi

    // Convert all dashes/underscores into separators
    $flip = $separator == '-' ? '_' : '-';

    $title = preg_replace('!['.preg_quote($flip).']+!u', $separator, $title);

    // Remove all characters that are not the separator, letters, numbers, or whitespace.
    $title = preg_replace('![^'.preg_quote($separator).'\pL\pN\s]+!u', '', mb_strtolower($title));

    // Replace all separator characters and whitespace by a single separator
    $title = preg_replace('!['.preg_quote($separator).'\s]+!u', $separator, $title);

    return trim($title, $separator);
});
```

Before this method is used in your application, you should add this `macro.php` file to the `app/start/global.php`, open this file and at the end of the file, add this line of code:

```php
require app_path().'/macros.php';
```

Now you have a new `slug_utf8` method that can be used in your applications:

```php
$slug = Str::slug_utf8($value);
```
