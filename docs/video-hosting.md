# Hosting the Hero Video

The product demo video on the homepage lives at `/videos/demo.mp4` (about 8.9 MB).

## What's currently shipping

**Self-hosted on Netlify.** The video file is committed to the repo at `videos/demo.mp4` and embedded with a native HTML5 `<video>` tag:

```html
<video
  src="/videos/demo.mp4"
  controls
  playsinline
  preload="metadata"
  poster="/images/flyer.jpg"
  title="AddressIt LED — Product Demo">
</video>
```

This is the simplest setup — no third-party account, no API keys, no embed iframe. Netlify's CDN serves the file globally.

## Why self-hosting works for this video

| Factor | Detail |
|---|---|
| File size | 8.9 MB — small enough that loading time isn't a concern |
| Plays count | One video on a landing page, not a long tail of content |
| Bandwidth cost | Netlify free tier includes 100 GB/month. Even 10,000 views/month at 9 MB each = 90 GB — within free tier. |
| Control | Full control over autoplay, looping, poster image, controls — no third-party branding |
| Privacy | No third-party tracker on the page |
| Reliability | One less external dependency that can break |

**Self-hosting stops being a good choice when:**
- The video grows past ~30 MB (mobile users on slow connections start dropping)
- Traffic exceeds Netlify's bandwidth tier (100 GB free, 1 TB on Pro)
- You need adaptive bitrate streaming for multiple resolutions (HLS / DASH)
- You want analytics on plays / completion / engagement

If any of those become true, switch to one of the options below.

## When to switch to a streaming service

### Option A — YouTube (free)

**Best for:** zero cost, easy upload, search discoverability (the video itself becomes findable on Google/YouTube).

**Trade-offs:**
- Branded YouTube player with logo, suggested videos at the end (the `rel=0` flag only shows videos from the same channel, no longer hides them entirely)
- "Watch on YouTube" button always visible
- Tracks viewer behavior, drops cookies, harder to make GDPR-friendly
- Aspect ratio constraints — your video must fit YouTube's player

**Embed:**
```html
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID?rel=0&modestbranding=1&playsinline=1"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen></iframe>
```

**Setup:**
1. Upload to YouTube (unlisted is fine — visible to anyone with the link, hidden from search)
2. Copy the video ID (the 11-character code in the URL)
3. Paste the iframe above into `index.html`, replace `VIDEO_ID`

### Option B — Vimeo (paid: $12-$20/mo)

**Best for:** a professional, branded experience on a product page. No suggested videos, no YouTube logo, clean player.

**Trade-offs:**
- Free tier is too limited (500 MB/week upload cap, basic player)
- Plus ($12/mo) removes most branding; Pro ($20/mo) gives custom player colors, analytics, password protection
- One more bill to track

**Embed:**
```html
<iframe
  src="https://player.vimeo.com/video/VIDEO_ID?title=0&byline=0&portrait=0"
  frameborder="0"
  allow="autoplay; fullscreen; picture-in-picture"
  allowfullscreen></iframe>
```

**Setup:**
1. Sign up at vimeo.com, upgrade to Plus or higher
2. Upload the video
3. Privacy → "Hide from Vimeo" and allow embedding only on `addressitled.com`
4. Copy embed code, paste into `index.html`

### Option C — Cloudflare Stream ($5/mo flat + usage)

**Best for:** if you want adaptive streaming, low latency, no third-party branding, and analytics — at a lower price than Vimeo.

**Trade-offs:**
- $5/month minimum (1,000 minutes of stored video)
- Slightly more complex setup — uses Cloudflare's player or HLS URL
- Requires a Cloudflare account

**Embed:**
```html
<iframe
  src="https://customer-XXX.cloudflarestream.com/VIDEO_ID/iframe"
  frameborder="0"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
  allowfullscreen></iframe>
```

**Setup:**
1. Sign up for Cloudflare, enable Stream
2. Upload the video via dashboard or `curl` to their API
3. Copy the iframe embed
4. Optionally restrict embed origin to `addressitled.com` via Stream settings

### Option D — Bunny Stream ($1/mo + bandwidth)

**Best for:** lowest-cost streaming with adaptive bitrate. Good for a side project that needs to scale.

**Trade-offs:**
- Less polished UI than Cloudflare
- Bandwidth is $0.005-$0.01/GB depending on region

Embed and setup similar to Cloudflare Stream.

## Recommendation matrix

| Scenario | Pick |
|---|---|
| Video stays small (under 15 MB), one video, free tier traffic | **Self-host on Netlify** (current setup) |
| Need a polished, ad-free, branded player and willing to pay | **Vimeo Plus** |
| Want SEO from YouTube discovery, OK with branding | **YouTube unlisted** |
| Multiple videos / longer videos / scaling traffic, want adaptive bitrate | **Cloudflare Stream** |
| Lowest cost adaptive streaming for hobby/small project | **Bunny Stream** |

## How to change the video

### Update the self-hosted video

1. Drop the new MP4 into `videos/demo.mp4` (overwrite the existing file)
2. Keep it under 10 MB if possible — encode with H.264 at 1080p, target ~5 Mbps:
   ```sh
   ffmpeg -i input.mov -c:v libx264 -preset slow -crf 23 -c:a aac -b:a 128k -movflags +faststart videos/demo.mp4
   ```
   The `+faststart` flag moves the metadata to the front of the file so playback starts immediately while the rest streams.
3. Commit and push — Netlify auto-deploys.

### Switch to a streamed embed

1. Pick a provider above and upload the video
2. Open `index.html`, find the `<!-- VIDEO -->` block (search for `id="video"`)
3. Replace the `<video src="/videos/demo.mp4" ...>` element with the provider's `<iframe>` embed code
4. Commit and push

### Want a poster (thumbnail) on the self-hosted version?

Already set up — the `poster` attribute points to `/images/flyer.jpg`. To change it, replace that path with any image in the repo (e.g. `/images/example.jpg`) or a dedicated poster you generate from the video:

```sh
# Grab a frame at 2 seconds in
ffmpeg -i videos/demo.mp4 -ss 00:00:02 -vframes 1 -q:v 2 images/video-poster.jpg
```

Then change `poster="/images/flyer.jpg"` → `poster="/images/video-poster.jpg"` in `index.html`.
