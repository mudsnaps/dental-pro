<<<<<<< HEAD
# dental-pro
=======
# SmileCraft Dental — Project README
# Built by Ace Dev Studio

## Folder Structure

```
dental-pro/
├── index.html          ← Main page (edit this for content changes)
├── css/
│   ├── tokens.css      ← Design variables (colours, fonts, spacing)
│   ├── base.css        ← Reset, layout, buttons, forms, grids
│   └── components.css  ← Nav, hero, cards, footer, WhatsApp float
├── js/
│   └── main.js         ← All JS: nav, forms, WhatsApp, FAQ, hours, funnel
├── images/             ← Drop client photos here (replace Unsplash URLs)
│   ├── hero.jpg
│   ├── team/
│   └── services/
└── pages/              ← Optional future pages (about, services, blog)
    └── review.html     ← Standalone review funnel page (QR code target)
```

---

## Things to Change Before Going Live

### 1. WhatsApp Number
Search the whole project for `917000000000` and replace with
the real clinic's WhatsApp Business number (country code + number, no +).

### 2. Google Maps Embed
In index.html find the `<iframe>` in the location section.
Replace the `src` with the real embed URL:
1. Go to maps.google.com
2. Search the clinic address
3. Share → Embed a map → Copy iframe src

### 3. Google Review Link
In index.html find `YOUR_GOOGLE_REVIEW_LINK` and replace with
the clinic's actual Google review URL (from Google Business Profile
dashboard → Get more reviews → copy link).

### 4. Opening Hours in JS
Open js/main.js → find the `SCHEDULE` object at the top of OpeningHours module.
Edit the hours to match the clinic's real schedule.
Format: [openHour, openMin, closeHour, closeMin] in 24h

### 5. Clinic Details
Replace in index.html:
- `hello@smilecraftdental.in` → real email
- `123 Health Street, Bandra West` → real address
- `+91 70000 00000` → real phone
- Doctor names and qualifications in the team section

### 6. Photos
Replace Unsplash URLs with real clinic photos:
- Put photos in /images/ folder
- Change `src="https://images.unsplash.com/..."` to `src="images/filename.jpg"`

---

## Deployment (Netlify — Free)

1. Go to netlify.com → Log in → Add new site → Deploy manually
2. Drag the entire `dental-pro/` folder into the deploy box
3. Site goes live instantly on a free `.netlify.app` URL
4. To add custom domain: Site settings → Domain management → Add custom domain
5. Buy domain from GoDaddy India (.in ~₹700/yr, .com ~₹1000/yr)
6. Point GoDaddy nameservers to Netlify (Netlify gives you 2 NS addresses to copy)
7. Wait 30 min → site live on custom domain with free HTTPS

---

## Making the Form Send to WhatsApp

Already built. When patient submits the booking form it:
1. Collects all fields
2. Builds a formatted WhatsApp message
3. Shows success screen
4. Opens `wa.me/[number]?text=[pre-filled message]`

The clinic receives a neatly formatted message like:
```
🦷 New Appointment Request — SmileCraft Dental

👤 Patient: Priya Sharma
📞 Phone: +91 70000 00000
📧 Email: priya@email.com

🩺 Service: Teeth Whitening (from ₹6,000)
📅 Preferred Date: 15 Jan 2025
🕐 Preferred Time: Morning (9am – 12pm)

🔍 Heard via: Google Search
_Submitted via website_
```

---

## Customising Colours

Open css/tokens.css — change these variables only:
```css
--clr-teal:       #0d7377;   /* Primary brand colour */
--clr-teal-light: #14a8ae;   /* Hover states */
--clr-navy:       #0a1628;   /* Dark backgrounds */
```
Every element updates automatically. No need to touch anything else.

---

## Adding New Services

In index.html find the services section.
Copy one `<article class="service-card">` block and paste it.
Change: image URL, icon colour, name, type, description, price, tags.

---

## Client Handoff Checklist

- [ ] Replace WhatsApp number throughout
- [ ] Add real Google Maps embed
- [ ] Add real Google Review link
- [ ] Update opening hours in js/main.js
- [ ] Replace placeholder doctor names/photos
- [ ] Replace Unsplash images with real clinic photos
- [ ] Update address, phone, email in footer and location section
- [ ] Test form submission on mobile
- [ ] Test all WhatsApp links open correctly
- [ ] Confirm opening hours widget shows correct open/closed status
- [ ] Deploy to Netlify
- [ ] Point custom domain
- [ ] Test on real iPhone and Android
- [ ] Submit to Google Search Console (free — helps ranking)
- [ ] Set up Google Business Profile for the clinic (free)
>>>>>>> 394b0f6 (Initial commit)
