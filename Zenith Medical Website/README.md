# Zenith Medical Centre — Website

A static, responsive, three-tier information-architecture website for Zenith
Medical Centre, a fictional/placeholder family medical clinic in Ottawa,
Ontario. No build tools or frameworks are required — open `index.html` in a
browser, or deploy the folder as-is to any static host.

## Folder structure

```
index.html                 Home
services.html               Services overview + detail sections
doctors.html                 Physician roster (Our Doctors)
doctors/doctor-one.html      Individual physician profile (repeat pattern per doctor)
doctors/doctor-two.html
doctors/doctor-three.html
new-patients.html            Registration status + steps
patient-resources.html       Booking, prescriptions, forms, referrals, etc.
faqs.html                    Accessible FAQ accordion
contact.html                 Contact details, map, contact form
privacy.html                 PHIPA-based privacy policy
accessibility.html           AODA / WCAG 2.1 AA accessibility statement
terms.html                   Terms of use
css/styles.css                Design system (colours, spacing, components)
js/content.js                 ALL editable clinic content (see below)
js/main.js                    Site behaviour (nav, accordion, forms, rendering)
robots.txt, sitemap.xml       SEO
netlify.toml, .htaccess       Optional clean-URL configs for common hosts
```

## Updating content (no code changes required)

Almost everything clinic staff need to change lives in **`js/content.js`**:

- **Clinic hours** — edit the `hours` array.
- **Phone, fax, email, address, parking** — edit the `contact` object. These
  values automatically populate the header, footer, homepage, contact page,
  and Google Map embed everywhere they appear.
- **New patient registration status** — set `registrationStatus` to
  `"accepting"`, `"waitlist"`, or `"closed"`. This updates the homepage CTA
  and the New Patients page automatically.
- **Announcements** — add/edit entries in the `announcements` array. Only the
  first entry with `active: true` is shown in the site-wide banner. Set the
  old one to `active: false` when it's no longer relevant.
- **Physician roster** — add/edit entries in the `doctors` array (name,
  credentials, role, clinical interests, languages, accepting status, bio).
  To add a new doctor's full profile page, copy `doctors/doctor-one.html`,
  rename it to match a new `slug`, and update `data-slug="..."` in that file.

All `[PLACEHOLDER ...]` text must be replaced with real, clinic-confirmed
information before the site goes live. Nothing about the clinic's real
address, phone number, staff, or services has been invented.

## Photos

No real or stock photographs are included. Physician cards use generated
placeholder avatars (initials) and the homepage hero uses an original flat
illustration (inline SVG) — both avoid using any third party's proprietary
photography. Replace them with the clinic's own licensed/consented photos by
adding image files to `/images` and swapping the relevant `<svg>`/avatar
markup for an `<img loading="lazy" alt="...">` tag.

## Forms & spam protection

The contact form (`contact.html`) includes:
- Required-field + format validation (client-side)
- A honeypot field invisible to real users
- A simple arithmetic CAPTCHA

This is a **static front end** — it does not transmit or store data anywhere
yet. Before going live, connect the form to a real backend endpoint (a
serverless function, form service, etc.) that performs **server-side**
validation and spam filtering. No personal health information should ever be
collected through this form or stored in the browser.

## Accessibility & SEO

- Semantic landmarks, skip link, visible focus states, labelled form fields,
  and an accessible accordion/nav built to WCAG 2.1 AA.
- Each page has a unique title/meta description, canonical URL, and
  OpenGraph tags. `MedicalClinic` and `FAQPage` structured data are included.
- `robots.txt` and `sitemap.xml` are included; update the placeholder domain
  (`zenithmedicalcentre.example`) throughout once a real domain is assigned.

## Map

The contact page and homepage embed a keyless Google Maps iframe driven by
`contact.mapQuery` in `content.js`. Update that field with the clinic's full
address once confirmed, and the map + "Get Directions" link update
automatically.
