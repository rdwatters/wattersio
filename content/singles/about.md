---
title: About Me
subtitle:
date: 2016-07-20
modified: false
tags: [about]
categories:
ori_date:
description: Information about me, Ryan Watters. I'm flattered that you're interested in reading about my favorite subject to talk about.
removefromsearch:
aliases: [/about/]
---

## Me

My name is Ryan. I am a content strategist, content marketer, front-end developer, editor, writer, web publisher, unabashed nerd, Japanophile, ramen aficionado, and (arguably the worst[^1]) guitarist in Chicago, IL. If you're interested in reaching out professionally, please see my [résumé][].

A couple items of note, if I may:

1. The first friend to implore me to create a blog did so in 2005. This site's first round of published content is scheduled for July 2016. Thank you for your patience.
2. Admittedly, this site is classier and cleaner than my apartment.

## Site Content

I am building this site to share what I've learned over the last 8 years as writer, editor, and web professional. The [Articles][] section focuses on content marketing, content strategy, and web publishing best practices. [Tutorials][] are geared towards front-end developers, particularly those interested in leveraging a [static site generator][] for blazing performance, negligible hosting costs, and flexible markup that addresses the continually changing SEO landscape.

All content is written in [GitHub Flavored][] [markdown](https://daringfireball.net/projects/markdown/), version controlled with git, and hosted on [GitHub][]. I make an effort to observe the latest [commonmark spec][] whenever possible. The aim of plain text--based content is to remain CMS independent and technology agnostic so as to be easily ported to any [static site generator][] with built-in support for `.md` files with embedded `yaml` front matter. This allows me to single source content that can be easily distributed across multiple channels.

Where markdown falls short, the syntax is extended via a handful of [JavaScript functions][] on the client and [Hugo Shortcodes][] at build time.

All content is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

[![Creative Commons Attribution 4.0 License icon. $=creative-commons](/assets/icons/cc-by.svg)](//creativecommons.org/licenses/by/4.0/)

## Site Development

Suffice it to say that I built this site with [performance][] in mind. With the exception of [bigfoot.js][] (jQuery dependency), I did not use a single CSS/front-end framework.

Here is a shortlist of tools I used when developing this site:

* [Gulp][]: compiling, concatenating, uglifying, and optimizing static assets; this includes [Babel][] for ES6 transpilation
* [GitHub][]: version/source control
* [Hugo][]: static site generation
* [GitHub Pages][]: static hosting
<!-- * [Amazon Simple Storage Service (S3)][]: hosting (static bucket) -->
* [Wercker][]: automated deployments
<!-- * [Amazon Web Services CLI][]: local deployments -->
* [CloudFlare][]: content delivery (CDN), SSL, and reverse proxy
* [lunr.js][]: Full-text, client-side search
* [Disqus][]: commenting
* [Jotform][]: forms solution

All source code is available under [MIT license][]. You are free to shamelessly steal my design, layout, type treatment, templating, etc. without the burden of guilt hitching a slug trail on your soul. If you do decide to purloin the fruits of my labor, let me just say that you have *excellent* taste.

[Amazon Simple Storage Service (S3)]:https://aws.amazon.com/s3/
[Amazon Web Services CLI]: https://aws.amazon.com/cli/
[Articles]: /articles
[Babel]: https://babeljs.io/
[bigfoot.js]: http://www.bigfootjs.com/
[CloudFlare]: https://www.cloudflare.com
[colophon]: /colophon
[commonmark spec]: http://spec.commonmark.org/
[Disqus]:https://disqus.com/
[Jotform]:http://www.jotform.com/
[GitHub]:https://github.com/rdwatters/ryanwattersme
[GitHub Flavored]:https://help.github.com/articles/basic-writing-and-formatting-syntax/
[GitHub Pages]: https://pages.github.com/
[Gulp]:http://gulpjs.com/
[available on GitHub]:https://www.github.com/rdwatters/ryanwattersme
[Hugo]:http://gohugo.io/
[Hugo Shortcodes]:http://gohugo.io/extras/shortcodes/
[JavaScript Functions]:https://github.com/rdwatters/ryanwattersme/tree/master/assets/js/modules
[lunr.js]:http://lunrjs.com/
[MIT License]:https://opensource.org/licenses/MIT
[parse]:https://www.parse.com
[performance]:https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fryanwatters.io
[résumé]: /resume/
[static site generator]:https://www.staticgen.com/
[tutorials]: /tutorials
[wercker]:http://wercker.com/

[^1]: Seriously. I'm terrible.