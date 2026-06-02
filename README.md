# AddressIt LED by Illumicor

Marketing/order site for **AddressIt LED** illuminated house number signs, manufactured by Illumicor. Lead-generation funnel: visitors learn about the product, customize an order, and submit. Illumicor (the merchant of record) contacts them to confirm and take payment by phone. The site never collects payment data.

Sales contact: **Shmuly Neuman** — 216.701.3492 — htz.addressled@gmail.com

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Product info, hero video, gallery, model lineup, FAQ, and the custom order form |
| `contact.html` | Contact form (name / phone / email / message) + direct call/email options |
| `thanks.html` | Post-submit confirmation. Shows order reference for orders, generic thanks for contact submissions |

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
Picks MDR or IBL family, customizes
        ↓
Enters payment details (card provider, number, expiration, CVV)
        ↓
Submits form via Netlify Forms
        ↓
Netlify Function generates order ref (LUM-XXXXX-XXX style)
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

## Tech

- Static HTML, no build step
- TailwindCSS via CDN (custom palette: navy `#1A3A6E` + red `#D8252E`)
- Google Fonts: Inter, Fraunces
- Vimeo iframe embed for hero video (placeholder — swap when real video is ready)
- Netlify Forms for both order + contact forms
- Netlify Function `netlify/functions/order-ref.mjs` generates sequential order refs via Netlify Blobs, served at `/api/order-ref`

## Files

```
index.html                          — main landing page with order form
contact.html                        — contact page with form + direct call/email
thanks.html                         — post-submit confirmation page
logo.jpg                            — AddressIt LED logo (navy/red)
images/flyer.jpg                    — product marketing flyer
images/example.jpg                  — MDR series product showcase
images/examples.jpg                 — installed examples + color options
netlify/functions/order-ref.mjs     — order ref generator
netlify.toml                        — build/dev/function config
package.json                        — pins @netlify/blobs
robots.txt + sitemap.xml            — SEO basics
```

## Local development

```sh
npm install              # one-time, installs @netlify/blobs
netlify login            # one-time
netlify link             # one-time, link this repo to your Netlify site
netlify dev              # serves the site + functions at http://localhost:8888
```

Form submissions only land in the Netlify dashboard when deployed (or when running `netlify dev` linked to a real site). Test locally for layout/flow, deploy to verify end-to-end.

## Pre-launch checklist

- [ ] Replace placeholder Vimeo embed URL with real product video
- [ ] Connect repo to Netlify site (`netlify link`)
- [ ] Set up form notification → forward leads to `htz.addressled@gmail.com` + a backup inbox
- [ ] Buy and connect custom domain (e.g. `addressitled.com`)
- [ ] Confirm statement descriptor with Illumicor (currently shown as `ILLUMICOR`)
- [ ] Confirm warranty length on each model (currently 3 years across the board, per flyer)
- [ ] Add real product photos for individual MDR models if available
- [ ] Add real customer testimonials once we have them

## Repo

GitHub: <https://github.com/Shalom-Karr/Light-Up-Address>

---

Built by [Shalom Karr](https://shalomkarr.pages.dev/).
