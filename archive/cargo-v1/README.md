# FXRXH → Cargo

Hybrid build: the site structure lives natively in Cargo so it stays editable in
the visual editor, and the two signature effects from the Astro build are ported
as custom code.

## Files

| File | Goes where in Cargo |
| :--- | :--- |
| `site-css.css` | Site Settings → CSS/HTML → **CSS** tab → paste → Update |
| `site-html.html` | Site Settings → CSS/HTML → **HTML** tab → paste → Update |
| `preview.html` | Nothing — local sanity check. Open it in a browser to see both effects without touching Cargo. |

Paste the CSS first. The script reads `--grey-light`, `--grey-mid` and
`--font-mono` off `:root`, so without the CSS the field renders with fallback
colours.

## Page structure

Mirrors the Astro routes. Build these as Cargo pages:

| Cargo page | Was | Density |
| :--- | :--- | :--- |
| Index | `/` — scattered wordmark | `1` |
| About | `/about` | `0.4` |
| Graphic Design | `/work/graphic-design` | `0.4` |
| Content & Photography | `/work/content-photography` | `0.4` |
| Art Direction | `/work/art-direction` | `0.4` |

Each work section holds an image gallery of projects. If a project needs its own
page, make it a child page of its section and keep density at `0.4`.

### Setting density per page

The ASCII field thins out as density drops. In a page's **Code View**, put the
attribute on the outermost element:

```html
<div data-ascii-density="0.4">
  <!-- page content -->
</div>
```

No attribute means the `--ascii-density` default in `site-css.css` (`0.45`).

### Quiet zones

The field clears space around text so it stays legible. Any element matching
`.wordmark`, `.lead`, `.kicker` or carrying `data-quiet-zone` gets a clearing.
The value is the padding in px:

```html
<h1 class="wordmark" data-quiet-zone="90">FARAH</h1>
```

Add gallery captions or any other text to `CONFIG.quietSelector` at the top of
`site-html.html` if they need the same treatment.

### Scramble on hover

Add `class="scramble"` (or `data-scramble`) to any link or text in Code View:

```html
<a href="/about" class="scramble">ABOUT</a>
```

It also fires a pulse in the ASCII field at the element's position, same as the
Astro build.

## Carried over vs. dropped

**Ported:** ASCII texture field (`ascii-field.js`, `ascii-field-controller.js`),
text scramble (`text-scramble.js`), the full colour/type token set, quiet zones,
hover pulses, `prefers-reduced-motion` handling.

**Dropped, per the hybrid decision:** custom cursor (`cursor.js`), page
transition overlay (`transitions.js`), Lenis smooth scroll (`lenis-init.js`),
live clock (`clock.js`), the work switcher. Cargo has its own page transitions
and scroll behaviour; replacing them means fighting the editor for little gain.
The source is still in `src/scripts/` if any of these get revived later.

**Also dropped:** the global reset (`*{margin:0;padding:0}`). A blanket reset
breaks Cargo's own layout system. Anything that relied on it — link underlines,
for one — is now handled explicitly in `site-css.css`.

## Fonts

`src/styles/global.css` declares *Cofo Sans Pixel* and *Acumin Variable Concept*
from `/fonts/`, but **`public/fonts/` does not exist** — the Astro site is
rendering system fallbacks today. Two options in Cargo:

1. Upload the licensed `.woff2` files in Cargo's font manager (needs a webfont
   licence for both faces), then keep the stacks in `site-css.css` as-is.
2. Pick equivalents from Cargo's built-in font library and swap the first name in
   `--font-mono` / `--font-sans`.

The mono face carries most of the identity — the ASCII field draws with it too,
via `--font-mono`.

## Domain

`fxrxh.com` is registered at Name.com and currently delegated to Vercel. To point
it at Cargo: add the domain under Publish Settings → Add a Domain → Use an
existing Domain, then at Name.com replace the nameservers with `ns1.cargo.site`
and `ns2.cargo.site`. Note there are no MX records on the domain today, so
`hello@fxrxh.com` will not receive mail until they're added in Cargo's DNS editor.
