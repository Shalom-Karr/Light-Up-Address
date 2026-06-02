# AddressIt LED by Illumicor

Marketing/order site for **AddressIt LED** illuminated house number signs, manufactured by Illumicor. Lead-generation funnel: visitors learn about the product, customize an order, and submit. Illumicor (the merchant of record) contacts them to confirm and take payment by phone. The site never collects payment data.

**Live:** https://addressitled.com  
**Sales contact:** Shmuly Neuman — 216.701.3492 — htz.addressled@gmail.com

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Hero, product info, demo video, gallery, model lineup, FAQ, custom order form |
| `pricing.html` | Full 2026 price list — every SKU with prices |
| `builder.html` | Visual sign builder — pick style/color/size and get the SKU to order |
| `contact.html` | Contact form + direct call/email |
| `thanks.html` | Post-submit confirmation. Shows order reference for orders, generic thanks for contact |

All pages share: fixed nav with logo + page links + mobile hamburger drawer; navy/red footer with brand, contact, internal links, and other pages.

## Product families

The order form supports both Illumicor product families. The form shows the relevant fields based on which family the visitor picks.

### MDR Series — lit backplate signs
Numbers (and optional street name) illuminated from behind on a backplate.

| Model | Size | Style |
|---|---|---|
| MDR | 10" | Number only |
| MDR-100 | 14" or 17" | Number only |
| MDR-101 | 14" or 17" | Number + street name |
| MDR-200 | 14" or 17" | Number with thin border |
| MDR-301 | 14" or 17" | Number + street name with line |

Options: background color (Black/White), font (Futura/Iowan Old), illumination color (White/Red), number position (Left/Center/Right).

### IBL Series — 3D dimensional numbers
Raised physical numbers in black, silver, or white finish.

| Model | Size | Style |
|---|---|---|
| IBL-8 / 10 / 12 / 14 | 8"–14" | 3D single number |
| IBLL-14 / 17 | 14" or 17" | 3D numbers on a line |
| IBLP-14 / 17 | 14" or 17" | 3D numbers on a plate (Black or Silver) |

Options: number color (Black/Silver/White), illumination color temperature (3000K Warm White / 4000K Day White / 6000K Cool White). For IBLP only: plate color (Black/Silver).

### Both families
Power option: Adaptor (plug-in) or Hard wired.

## Order flow

```
Visitor reads product info / sees gallery
        ↓
(Optional) opens /builder.html to design visually
        ↓
Picks MDR or IBL family, customizes
        ↓
Enters payment details (card provider, number, expiration, CVV)
        ↓
Submits form via Netlify Forms
        ↓
Netlify Function generates order ref (AIL-XXXXX-XXX style)
        ↓
Redirect to /thanks.html?ref=...
        ↓
Lead is forwarded to Illumicor (via Netlify Forms notification)
        ↓
Card is charged after order confirmation
        ↓
Charge shows as "ILLUMICOR" on statement
        ↓
Sign is custom built and shipped
```

## Payment collection

Payment card details are collected on the order form (Step 4). The card is charged after Illumicor confirms the order.

## Hosting & DNS

- **Hosted on Netlify** (site ID `4a3b4bf7-b57e-4344-a63f-b7fe0de66cb1`, project `addressitled`)
- **Custom domain** `addressitled.com` — apex CNAME on Cloudflare → `apex-loadbalancer.netlify.com` (DNS-only / gray cloud)
- **SSL** Let's Encrypt cert covering both `addressitled.com` + `www.addressitled.com`, auto-renewed by Netlify
- `addressitled.netlify.app` redirects to `addressitled.com` via `netlify.toml` redirect rule
- DNS is on **Cloudflare** (not Netlify DNS), proxy off

## Tech

- Static HTML, no build step
- TailwindCSS via CDN (custom palette: navy `#1A3A6E` + red `#D8252E`)
- Google Fonts: Inter (sans) + Fraunces (display serif)
- Vanilla JS for: order-form steps, mobile hamburger menu, visual builder canvas, hero video click-to-play
- Self-hosted demo video at `/videos/demo.mp4`
- Netlify Forms for both order + contact forms (no card data — see above)
- Netlify Function `netlify/functions/order-ref.mjs` generates sequential order refs via Netlify Blobs, served at `/api/order-ref`

## SEO

- `sitemap.xml` + `robots.txt` at repo root
- Each page has JSON-LD: `Product` + `AggregateOffer` (with real review/aggregateRating on `index.html`) + `BreadcrumbList`
- Open Graph + Twitter Card meta on every page
- **Google:** submitted via Google Search Console
- **Bing/Yahoo/DuckDuckGo/Ecosia:** submitted via IndexNow — key file at `/{key}.txt` in repo root; re-submit any time with a POST to `https://api.indexnow.org/IndexNow` (see "Re-submitting to IndexNow" below)

## Files

```
index.html                          — main landing page with order form
pricing.html                        — full 2026 price list
builder.html                        — visual sign builder
contact.html                        — contact page with form + direct call/email
thanks.html                         — post-submit confirmation page
logo.jpg                            — AddressIt LED logo (navy/red)
images/flyer.jpg                    — product marketing flyer
images/example.jpg                  — MDR series product showcase
images/examples.jpg                 — installed examples + color options
videos/demo.mp4                     — self-hosted hero demo video
netlify/functions/order-ref.mjs     — order ref generator (Netlify Blobs)
netlify.toml                        — build/dev/function config + .netlify.app → .com redirect
package.json                        — pins @netlify/blobs
robots.txt + sitemap.xml            — SEO basics
{key}.txt                           — IndexNow verification key file (do not delete)
```

## Local development

```sh
npm install              # one-time, installs @netlify/blobs
netlify login            # one-time
netlify link             # one-time, link this repo to the Netlify site
netlify dev              # serves the site + functions at http://localhost:8888
```

Form submissions only land in the Netlify dashboard when deployed (or when running `netlify dev` linked to a real site). Test locally for layout/flow, deploy to verify end-to-end.

## Re-submitting to IndexNow

When pages change or new ones are added, ping IndexNow so Bing/Yahoo/DuckDuckGo re-crawl:

```powershell
$key = (Get-ChildItem -Path . -Filter "*.txt" | Where-Object { $_.BaseName.Length -ge 32 } | Select-Object -First 1).BaseName
$body = @{
  host = "addressitled.com"
  key = $key
  keyLocation = "https://addressitled.com/$key.txt"
  urlList = @(
    "https://addressitled.com/",
    "https://addressitled.com/pricing.html",
    "https://addressitled.com/builder.html",
    "https://addressitled.com/contact.html"
  )
} | ConvertTo-Json
Invoke-WebRequest -Uri "https://api.indexnow.org/IndexNow" -Method POST -Body $body -ContentType "application/json; charset=utf-8"
```

HTTP 200/202 = accepted.

## Repo

GitHub: <https://github.com/Shalom-Karr/AddressItLED>

---

Built by [Shalom Karr](https://shalomkarr.pages.dev/).
