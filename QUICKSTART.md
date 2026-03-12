# WAKASAFE - Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies (2 min)
```bash
cd wakasafe
pnpm install
```

### Step 2: Configure Environment (1 min)
```bash
# Copy example config
cp .env.example .env.local

# The default includes a mock Mapbox token for testing
# For real map, get free token: https://account.mapbox.com/tokens/
```

### Step 3: Run Development Server (1 min)
```bash
pnpm dev
```

### Step 4: Open in Browser (1 min)
```
http://localhost:3000
```

---

## 🎯 What You'll See

### Landing Page
- Hero section with "Get Started" button
- Feature cards (24/7 Safety, Instant SOS, Live Tracking, Alerts)
- Beautiful dark glassmorphism design

### Authentication Flow
1. Click "Get Started"
2. Choose user type: "Individual Traveler" or "Logistics Partner"
3. Select auth method: Phone (OTP) or Google
4. **For testing**: Use any phone number and any 6-digit code
5. Login redirects to Dashboard

### Dashboard (Main App)
- **Full-screen Map**: Interactive Mapbox showing Aba, Nigeria
- **Highway Polylines**: Green/Yellow/Red status colors
- **Incident Markers**: 4 mock incidents with glowing pulsing effects
- **Waka Sheet**: Pull-up panel with safety score (85/100) and incident feed
- **SOS Button**: Red button bottom-right - long-press 3 seconds to activate
- **Language Switcher**: Top-right globe icon (EN | Igbo | Pidgin)
- **Menu**: Profile, Settings, Logout options

### Profile Page
- View/edit user info
- Manage emergency contacts (add/remove)
- See safety score and statistics

### Settings Page
- Change language
- Toggle notifications
- Configure safety preferences

---

## 🧪 Test Scenarios

### Test Geolocation
```javascript
// Open DevTools Console on Dashboard
navigator.geolocation.getCurrentPosition((pos) => {
  console.log('Lat:', pos.coords.latitude, 'Lng:', pos.coords.longitude)
})
```

### Test SOS Button
1. Go to Dashboard
2. Long-press red SOS button for 3 seconds
3. Watch the circular progress ring
4. Modal shows "SOS Active" - alerts sending to emergency contacts

### Test Language Switching
1. Click globe icon (top-right)
2. Select "Igbo" or "Pidgin"
3. Entire UI translates immediately

### Test Offline Mode
1. Open DevTools (F12)
2. Network tab → Throttle to "Offline"
3. App still works with cached data
4. Close offline modal to see cached dashboard
5. Go back online → Full functionality returns

### Test PWA Installation
**Mobile:**
1. Open in mobile browser
2. Tap Share (iOS) or Menu (Android)
3. Select "Add to Home Screen"
4. App installs like native app

**Desktop (Chrome):**
1. Open app URL
2. Click install icon in address bar
3. Opens in standalone window

---

## 📍 Map Features

### Mock Incidents (View in Waka Sheet)
- **Aba Market (5.5°, 7.0°)**: Multi-vehicle collision - HIGH severity (Red)
- **Onitsha Road (6.0°, 6.8°)**: Heavy traffic - MEDIUM severity (Yellow)
- **Construction (5.3°, 7.2°)**: Road construction - MEDIUM severity (Yellow)
- **Checkpoint (4.95°, 7.15°)**: Police checkpoint - LOW severity (Green)

### Mock Highways
- **Aba → Onitsha**: Yellow (Caution) - 2 incidents
- **Aba → Enugu**: Green (Safe) - 0 incidents
- **Aba → Port Harcourt**: Red (Danger) - 4 incidents

### Map Interactions
- Scroll to zoom in/out
- Click incident markers to select
- Selected incident highlights in Waka Sheet
- Click incident cards in sheet to see on map

---

## 🎨 Dark Mode Design Features

### Theme Elements
- **Background**: Deep slate-950 (`#020617`)
- **Glass Cards**: Semi-transparent with backdrop blur
- **Gradients**: Green-400 to Blue-400 primary accents
- **Colors**:
  - Safe: Green-500
  - Caution: Yellow-400
  - Danger: Red-500
  - Emergency: Red-600

### Animations Visible
- Pulsing incident markers (breathing effect)
- Glowing outlines on hover
- SOS button circular progress ring
- Modal slide-in animations
- Smooth transitions throughout

---

## 🔑 Mock Authentication

### Phone Auth (Mock)
- **Phone**: Any number, e.g., "+234 801 234 5678"
- **OTP**: Any 6 digits, e.g., "123456"
- Auto-creates mock user session

### Google Auth (Mock)
- Click "Continue with Google"
- Simulates Google OAuth flow
- Creates mock user session

### Session
- Stored in browser localStorage
- Persists on page reload
- Clear: Logout button in Menu

---

## 🚀 Deployment Options

### Vercel (Recommended - 1 Click)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Your app is live!
```

### Local Docker
```bash
docker build -t wakasafe .
docker run -p 3000:3000 wakasafe
```

### Standard Node Server
```bash
pnpm build
pnpm start
```

---

## 🔧 Customization Quick Tips

### Change Landing Page Text
- Edit `components/landing-page.tsx` - top of file has all copy

### Add New Language
- Edit `lib/language-context.tsx` translations object
- Add new language code (e.g., 'pt' for Portuguese)

### Customize Map Center
- Edit `lib/map-context.tsx` - change `ABA_CENTER` coordinates
- Update mock highways coordinates to match

### Change Color Scheme
- Edit `app/globals.css` - update the `--primary`, `--secondary` CSS variables
- Edit `tailwind.config.ts` for theme adjustments

### Add New Incidents
- Edit `lib/map-context.tsx` - add to `MOCK_INCIDENTS` array
- Include: id, lat, lng, type, severity, description, timestamp

---

## 📚 File Guide for Customization

| File | Purpose | Easy Changes |
|------|---------|--------------|
| `app/page.tsx` | Landing page | Hero text, CTA button |
| `components/landing-page.tsx` | Hero section | Features, messaging |
| `components/auth-view.tsx` | Auth UI | Labels, error messages |
| `lib/auth-context.tsx` | Auth logic | Mock behavior |
| `lib/map-context.tsx` | Map data | Incidents, highways |
| `lib/language-context.tsx` | Translations | All text content |
| `components/map-view.tsx` | Map display | Colors, icons |
| `app/globals.css` | Theme colors | Dark mode palette |

---

## ❓ Troubleshooting

### Map not showing?
- Check browser console for errors
- Verify Mapbox token in `.env.local`
- Try refreshing the page

### SOS button not working?
- Long-press must be exactly 3+ seconds
- Check DevTools console for logs
- Try different browser

### Language switcher not changing?
- Check localStorage is enabled
- Try clearing browser cache
- Refresh the page

### Offline mode issues?
- Service Worker must be registered (check DevTools)
- Try hard refresh (Cmd/Ctrl + Shift + R)
- Clear site data and reload

### Build errors?
- Delete `node_modules` and `.next` folders
- Run `pnpm install` again
- Run `pnpm build` to verify

---

## 📞 Key Features to Try

1. **View Incident Feed**: Pull up Waka Sheet and see all incidents
2. **Check Safety Score**: View your 85/100 safety rating
3. **Switch Languages**: Change to Igbo or Pidgin
4. **Trigger SOS**: Long-press button for emergency alert
5. **Add Emergency Contact**: Go to Profile and add a contact
6. **Go Offline**: DevTools → Offline mode → see cached dashboard

---

## 🎓 Learning Resources

### Inside the Code
- `IMPLEMENTATION.md` - Complete technical details
- `WAKASAFE_README.md` - Full documentation
- Component files have detailed comments
- Type definitions in `lib/types.ts`

### External Links
- [Next.js 16 Docs](https://nextjs.org)
- [React 19 Docs](https://react.dev)
- [Mapbox GL Docs](https://docs.mapbox.com)
- [Tailwind CSS](https://tailwindcss.com)

---

## ✅ Success Checklist

- [ ] App running on localhost:3000
- [ ] Can see landing page
- [ ] Can login (phone or Google)
- [ ] Dashboard map loads with incidents
- [ ] Waka Sheet pulls up and shows incidents
- [ ] SOS button activates on long-press
- [ ] Language switcher works
- [ ] Can add emergency contact
- [ ] Offline mode works
- [ ] PWA installable on mobile

**Once all checked ✅ - You're ready to customize and deploy!**

---

## 🎉 Next Steps

1. **Deploy to Vercel** (1-click via `vercel deploy`)
2. **Get Mapbox Token** (https://account.mapbox.com)
3. **Set up Firebase** (optional, for real auth)
4. **Customize Styling** (edit globals.css theme)
5. **Add Your Content** (update incident data)
6. **Go Live!** Share the URL

---

## 💡 Pro Tips

- Use `console.log("[v0] ...")` for debugging
- Test PWA on real mobile device for best experience
- Try all 3 language translations
- Check DevTools Network tab to see caching
- Service Worker visible in DevTools > Application

---

**Happy Building! 🚀**
