# Velora & Vale

Velora & Vale is a fictional wedding guest site for a Hudson Valley celebration—story, schedule, travel, RSVP, gallery, and FAQ in a single editorial layout. One HTML file, Tailwind via CDN, and a small `main.js` for countdown, navigation, FAQ, and RSVP demo state. The couple, venue, and contact details are invented; the goal was a realistic guest experience without a build pipeline.

## Live Demo — [🔗](https://veloravale.netlify.app/)

## Overview

The page centers on what guests need before the day: when and where to arrive, dress code, parking, dietary and accessibility notes, and a clear RSVP path. Story and gallery sit alongside that logistics-first structure rather than replacing it.

## Highlights

- Hero with date, venue, CTAs, and live countdown to ceremony
- Vertical schedule timeline from guest arrival through optional Sunday brunch
- Venue and travel cards (arrival, hotels, dress code) with map link
- RSVP form with attendance, meal, dietary, and accessibility fields
- FAQ accordion, image gallery, mobile nav, and smooth scroll with header offset

## Tech Stack

- HTML5 (single page)
- Tailwind CSS 3 (CDN)
- Vanilla JavaScript
- Google Fonts (Cormorant Garamond, DM Sans)
- Unsplash images (remote URLs)

## Run Locally

```bash
# Option 1: open index.html directly in a browser

# Option 2: local server (Python)
python -m http.server 8080

# Option 3: local server (Node)
npx serve .
```

## Scope Note

 SFictional couple and venue.ubmission flow is demo-only—RSVP does not send email or save data; the registry link is a placeholder. Tailwind loads from the CDN, so an internet connection is required on first load.