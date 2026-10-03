# beckmannklaus.com

One-page site for Klaus Beckmann – Personal Training. Built with Jekyll and served
from GitHub Pages (classic branch build, custom domain via `CNAME`). No CSS or JS
framework; fonts are self-hosted, so no third-party requests.

## Edit content

| What | Where |
|---|---|
| Contact details, address, description | `_config.yml` → `contact`, `description` |
| Leistungen (services) | `_data/services.yml` |
| Referenzen | `_data/references.yml` (`featured: true` = shown under the hero) |
| Partner | `_data/partners.yml` |
| Impressum, Datenschutz | `impressum.md`, `datenschutz.md` |
| Home page sections | `index.html` |
| Styles / script | `assets/css/main.css`, `assets/js/main.js` |

## Images

Originals live in `_source/img/` (not published). Responsive AVIF + JPEG variants
in `assets/img/` are generated:

```sh
cd _source && npm install && npm run images
```

To add an image, put the original in `_source/img/`, add a job to
`_source/images.mjs`, run the script, and reference it with
`{% include picture.html name="…" alt="…" sizes="…" %}`.

## Local preview

GitHub Pages builds with the `github-pages` gem (Jekyll 3.10). Mirror it with:

```sh
bundle install
PAGES_REPO_NWO=cdrcqnts/beckmannklaus bundle exec jekyll serve
```
