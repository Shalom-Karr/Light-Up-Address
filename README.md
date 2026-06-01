# Lumen Address — Light-Up House Number Signs

Single-page marketing/info site for solar-powered illuminated address signs. Visitors learn about the product, watch a hero video, and submit an order request form. Payment is handled separately by the manufacturer — this site is a lead-generation funnel for a commission-based referral arrangement, so no card data ever touches this site.

## What this site is

- **One page** (`index.html`) with hero video, why-it-matters, how-it-works, features, testimonial, FAQ, and order form
- **A thank-you page** (`thanks.html`) that displays the visitor's unique order reference number after form submission
- **No backend** — built with TailwindCSS via CDN, vanilla JS, and Netlify Forms for submissions

## Order flow

```
Visitor watches video / reads info
        ↓
Clicks "Order yours"
        ↓
Fills out order form (name, email, phone, address, house number, finish)
        ↓
Form submits via Netlify Forms (no card data collected)
        ↓
Thank-you page shows unique reference (e.g. LUM-48291-A7K2)
        ↓
We forward the lead to the manufacturer
        ↓
Manufacturer contacts customer to confirm + take payment directly
        ↓
Charge appears on customer statement as "LUMEN ADDRESS LLC"
        ↓
We get commission per closed sale
```

## Why no payment on this site

We're a referral / lead-gen partner, not a merchant of record. The manufacturer charges the customer directly. This keeps us entirely out of PCI DSS scope — no card data is ever collected, transmitted, or stored by this site. Customers see the manufacturer's name on their statement and deal with them for any payment questions or refunds.

## Tech stack

| Concern | Choice | Notes |
|---|---|---|
| Hosting | Netlify | Static + built-in form handling |
| Styling | TailwindCSS CDN | No build step |
| Fonts | Google Fonts (Inter, Fraunces) | |
| Video | Vimeo iframe embed | Swap `src` in `index.html` when real video is ready |
| Forms | Netlify Forms | 100 submissions/mo free, $19/mo for 1,000 |
| Spam | Netlify honeypot + Akismet | Built-in, no setup |
| Order reference | Client-side generated, passed via URL param | Format: `LUM-XXXXX-XXXX` |

## Files

```
index.html        — main landing page
thanks.html       — post-submit confirmation page with order reference
netlify.toml      — Netlify build/redirect config
README.md         — this file
```

## Local development

No build step. Open `index.html` directly in a browser, or serve the directory:

```sh
# Python
python -m http.server 8000

# Node
npx serve .
```

Then open `http://localhost:8000`.

Note: Netlify Forms won't work locally — submissions only register when deployed to Netlify. Test the form behavior locally, then deploy to verify end-to-end.

## Deployment

1. Push to GitHub (this repo).
2. Connect the repo to Netlify (one-time setup).
3. Netlify auto-deploys on every push to `main`.
4. Verify form submissions land in the Netlify dashboard → Forms tab.
5. Set up email notifications in Netlify → Forms → Notifications.

## Configuration to do before launch

- [ ] Replace placeholder Vimeo embed URL in `index.html` with real product video
- [ ] Update product name, price, and copy (currently uses "Lumen Address" / $89 as placeholders)
- [ ] Update statement descriptor on order form + thanks page (currently "LUMEN ADDRESS LLC")
- [ ] Update contact email in `thanks.html` (currently `hello@lumenaddress.com`)
- [ ] Confirm referral / commission terms with manufacturer
- [ ] Set up Netlify form notification → forward leads to manufacturer + internal inbox
- [ ] Add real testimonials once we have them
- [ ] Connect custom domain in Netlify dashboard
