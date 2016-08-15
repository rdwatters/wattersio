---
title: About Me
subtitle:
date: 2016-07-20
modified: false
tags: [about]
categories:
original_date:
description: Information about me, Ryan Watters. I'm flattered that you're interested in reading about my favorite subject to talk about.
removefromsearch:
aliases: [/about/]
---

## Me

My name is Ryan. I am a content strategist, content marketer, front-end developer, editor, writer, web publisher, unabashed nerd, Japanophile, ramen aficionado, and (arguably the worst[^1]) guitarist in Chicago, IL. If you're interested in reaching out professionally, please see my [résumé][].

A couple admissions, if I may:

1. The first friend to implore me to create a blog did so in 2005. This site's first round of published content is scheduled for September 2016. Thank you for your patience.
2. This site is classier and cleaner than my apartment.

## Site Content

I am building this site to share what I've learned over the last 8 years as writer, editor, and web professional. All [posts][] will focus on content marketing, content strategy, and web publishing best practices. Tutorials published in posts will be geared towards front-end developers, particularly those interested in leveraging a [static site generator][] for blazing performance, negligible hosting costs, and flexible markup that addresses the continually changing SEO landscape.

All content is written in [GitHub Flavored][] [markdown](https://daringfireball.net/projects/markdown/), version controlled with git, and hosted on [GitHub][]. I make an effort to observe the latest [commonmark spec][] whenever possible. The aim of plain text--based content is to remain CMS independent and technology agnostic so as to be easily ported to any [static site generator][] with built-in support for `.md` files with embedded `yaml` front matter. This allows me to single source content that can be easily distributed across multiple channels.

Where markdown falls short, the syntax is extended via a handful of [JavaScript functions][] on the client and [Hugo Shortcodes][] at build time.

All content is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

## Site Development

Suffice it to say that I built this site with [performance][] in mind. I did not use a single CSS/front-end framework (eg, Bootstrap, Foundation) in the development of this site.

Here is a shortlist of tools I used when developing this site:

* [Gulp][]: compiling, concatenating, uglifying, and optimizing static assets; this includes [Babel][] for ES6 transpilation
* [GitHub][]: version/source control
* [Hugo][]: static site generation
* [Netlify][]: static hosting, continuous deployment, CDN, SSL, and dev environments
<!-- * [Amazon Simple Storage Service (S3)][]: hosting (static bucket) -->
<!-- * [Wercker][]: automated deployments -->
<!-- * [Amazon Web Services CLI][]: local deployments -->
<!-- * [CloudFlare][]: content delivery (CDN), SSL, and reverse proxy -->
* [lunr.js][]: Full-text, client-side search
* [Disqus][]: commenting
* [velocity.js][]: animations and scrolling
<!-- * [Jotform][]: forms solution -->

All source code is available under [MIT license][]. You are free to shamelessly steal my design, layout, type treatment, templating, etc. without the burden of guilt hitching a slug trail on your soul. If you do decide to purloin the fruits of my labor, let me just say that you have *excellent* taste.

## Site Design

For an abridged visual style guide, see the [colophon][].

[Amazon Simple Storage Service (S3)]:https://aws.amazon.com/s3/
[Amazon Web Services CLI]: https://aws.amazon.com/cli/
[available on GitHub]:https://www.github.com/rdwatters/ryanwattersme
[Babel]: https://babeljs.io/
[bigfoot.js]: http://www.bigfootjs.com/
[CloudFlare]: https://www.cloudflare.com
[colophon]: /colophon
[commonmark spec]: http://spec.commonmark.org/
[Disqus]:https://disqus.com/
[GitHub Flavored]:https://help.github.com/articles/basic-writing-and-formatting-syntax/
[GitHub]:https://github.com/rdwatters/ryanwattersme
[Gulp]:http://gulpjs.com/
[Hugo Shortcodes]:http://gohugo.io/extras/shortcodes/
[Hugo]:http://gohugo.io/
[JavaScript Functions]:https://github.com/rdwatters/ryanwattersme/tree/master/assets/js/modules
[Jotform]:http://www.jotform.com/
[lunr.js]:http://lunrjs.com/
[MIT License]:https://opensource.org/licenses/MIT
[Netlify]: https://www.netlify.com/
[parse]:https://www.parse.com
[performance]:https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fryanwatters.io
[posts]: /posts/
[résumé]: /resume/
[static site generator]:https://www.staticgen.com/
[velocity.js]: http://velocityjs.org/
[wercker]:http://wercker.com/

[^1]: Seriously. I'm terrible.