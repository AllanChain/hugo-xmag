# HUGO XMAG Solarized

The original Hugo XMag theme description is below the separating line.

This fork will never be merge to the original one because I did so much modifications and most importantly, changed the colorscheme.

What I did:

- Re-toning XMag to solarized dark theme
- beautify 404 page with GitHub logo
- Use custom pagination rules and increase item padding to fit mobile devices
- Use custom toc to fix hugo's toc bug, namely that toc can only start from h1 tag
- Fix the image displaying to make sure whole image is seen
- Center the date span which is not in the center just by applying `justify-content: space-between`
- Move the javascript file hosted at the author's domain to the repo
- Add some hovering transition
- Use the same fancy blocks in tags and categories page, and order by Count
- Use a different index page which is configurable via `_index.md`
- Make use of hugo v0.62.0 feature to handle render-image, which means there is no need for `center-img.js`
- Use official MathJax instead of the R one and use typical `$` as math formular indicator
- Use Gitalk as a comment option

There is no screen shot for I am lazy to show all the fixes by adding screenshots. Just visit my blog page <https://allanchain.github.io/blog/>

![screenshot](/images/allanchain.github.io.png)
---

**XMag** is designed based on the Hugo theme [**XMin**](https://github.com/yihui/hugo-xmin), and similarly, features minimalism but with a magazine style on the homepage inspired by [The Signpost](https://en.wikipedia.org/wiki/Wikipedia:Wikipedia_Signpost) on Wikipedia.

This theme includes a few cool features:

- Responsive article summary blocks on homepage

- Thumbnails in summary blocks

- Magazine title in Blackletter (&Bfr;&Lfr;&Afr;&Cfr;&Kfr; &Lfr;&Efr;&Tfr;&Tfr;&Efr;&Rfr;)

- Github edit links

- Author info and site info at the bottom of an article

- MathJax for LaTeX math expressions

It also supports features that are probably not even worth mentioning:

- Google Analytics

- highlight.js for syntax highlighting of code blocks

- Display categories and tags on single pages

- Table of contents for single pages

Most features can be configured through `config.toml`, and a few can be enabled by custom layouts. Please see the detailed documentation on the [About](https://xmag.yihui.name/about/) page of the theme website. The source code is available [on Github](https://github.com/yihui/hugo-xmag) (MIT license).

![Screenshot](https://github.com/yihui/hugo-xmag/raw/master/images/screenshot.png)
