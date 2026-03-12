# WAKASAFE - Nigerian Road Safety Platform

A premium Progressive Web App for real-time transit safety tracking, emergency response, and incident management on Nigerian highways.

## Features

### Core Features
- **Real-time Incident Tracking**: Live map of accidents, traffic, hazards, and checkpoints across Aba and surrounding highways
- **Emergency SOS Button**: Long-press activated emergency button (3 seconds) with automatic location sharing to emergency contacts
- **Live Route Tracking**: Track your ride in real-time with colored highway status indicators
- **Safety Score System**: Personalized safety score based on route selection and incident history
- **Incident Feed**: Pull-up Waka Sheet showing safety score and real-time incident notifications
- **Multi-language Support**: English, Igbo, and Nigerian Pidgin interfaces

### Authentication
- **Phone Number Authentication**: Firebase Phone Auth with OTP verification
- **Google OAuth**: Alternative sign-in with Google account
- **User Type Toggle**: Switch between Individual Traveler and Logistics Partner modes

### Safety Features
- **Highway Status Visualization**: Green (Safe) → Yellow (Caution) → Red (Danger) color coding
- **Pulsing Incident Markers**: Dynamic SVG markers with severity-based animations
- **Emergency Contact Management**: Add and manage emergency contacts for SOS alerts
- **Automatic Location Sharing**: Share your location with contacts during SOS activation

### PWA (Progressive Web App)
- **Offline Support**: Cache critical pages and work offline
- **Mobile Installable**: Add to home screen on iOS and Android
- **Service Worker**: Background sync and offline functionality
- **Responsive Design**: Optimized for mobile-first experience

### UI/UX Design
- **Dark Mode with Glassmorphism**: Premium slate-950 background with backdrop-blur effects
- **High-end Aesthetic**: Gradient accents (green/blue/yellow/red) with smooth animations
- **Language Switcher**: Top-right language toggle (EN | Igbo | Pidgin)
- **Cinematic Imagery**: Dark-filtered Nigerian highway and transit hub photos

## Tech Stack

### Frontend
- **Next.js 16**: React framework with App Router
- **React 19.2**: UI library with latest features
- **Tailwind CSS 4**: Utility-first CSS framework
- **shadcn/ui**: High-quality accessible components
- **react-map-gl**: Uber's React wrapper for Mapbox GL JS
- **Zustand**: Lightweight state management
- **Lucide React**: Beautiful icon library

### Backend Services (for production)
- **Firebase Phone Auth**: OTP-based phone authentication
- **Firebase Firestore**: Real-time database for incidents
- **Google OAuth**: Third-party authentication
- **Mapbox GL JS**: Interactive maps and incident visualization

### PWA & Caching
- **Service Worker**: Offline support and background sync
- **Web App Manifest**: Installable PWA configuration
- **Workbox**: Service worker tooling (optional for production)

## Project Structure

```
wakasafe/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Landing page
│   ├── auth/
│   │   └── onboarding/page.tsx # Authentication flow
│   ├── dashboard/page.tsx       # Main app dashboard
│   ├── profile/page.tsx         # User profile and emergency contacts
│   └── settings/page.tsx        # User settings and preferences
├── components/
│   ├── landing-page.tsx         # Landing page component
│   ├── auth-view.tsx            # Phone + Google auth UI
│   ├── dashboard.tsx            # Main dashboard layout
│   ├── map-view.tsx             # Interactive Mapbox map with incidents
│   ├── waka-sheet.tsx           # Pull-up incident feed sheet
│   ├── sos-button.tsx           # 3-second long-press SOS button
│   └── language-switcher.tsx    # Language selection dropdown
├── lib/
│   ├── auth-context.tsx         # Authentication context
│   ├── language-context.tsx     # i18n translations
│   ├── map-context.tsx          # Map state and incidents
│   └── register-sw.tsx          # Service worker registration
├── public/
│   ├── manifest.json            # PWA manifest
│   ├── sw.js                    # Service worker
│   ├── offline.html             # Offline fallback page
│   ├── highway-dark.jpg         # Hero image
│   └── transit-hub.jpg          # Transit hub image
├── app/globals.css              # Global styles with animations
├── .env.local                   # Local environment variables
└── next.config.mjs              # Next.js configuration
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm
- Mapbox account (free tier available)
- Firebase project (for production auth)

### Installation

1. **Clone or download the project**
```bash
git clone <repository-url>
cd wakasafe
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Add Mapbox token** (optional for basic testing)
- Get a free token from https://account.mapbox.com/tokens/
- Add to `.env.local`:
```env
NEXT_PUBLIC_MAPBOX_TOKEN=your-token-here
```

5. **Run development server**
```bash
pnpm dev
# or
npm run dev
```

6. **Open browser**
Visit http://localhost:3000

### Firebase Setup (Production Auth)

1. **Create Firebase project**
   - Go to https://console.firebase.google.com/
   - Create a new project named "WAKASAFE"
   - Enable Phone Authentication in Authentication methods
   - Enable Firestore Database

2. **Add Firebase credentials to .env.local**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

3. **Update auth-context.tsx** to use Firebase SDK (currently using mock implementation)

### Google OAuth Setup (Production)

1. **Create OAuth credentials**
   - Go to Google Cloud Console
   - Create OAuth 2.0 Client ID
   - Add localhost:3000 as authorized redirect

2. **Add credentials to .env.local**
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

## Usage Guide

### User Flows

#### For Individual Travelers
1. Land on homepage
2. Click "Get Started" → Select "Individual Traveler"
3. Choose authentication (Phone OTP or Google)
4. Access dashboard with live map
5. View incidents in real-time
6. Use SOS button in emergencies
7. Manage emergency contacts in profile

#### For Logistics Partners
1. Same onboarding but select "Logistics Partner"
2. Access logistics-specific features (vehicle tracking, fleet management)
3. Monitor multiple routes simultaneously

### SOS Button Usage
- Long-press the red SOS button for 3 seconds
- Circular progress indicator shows completion
- Automatically sends location to emergency contacts
- SOS modal appears showing alert status

### Language Switching
- Click globe icon in top-right corner
- Select EN, Igbo, or Pidgin
- UI updates immediately
- Selection saved locally

### Offline Usage
- App caches critical pages on first load
- Works offline after caching (limited functionality)
- Service Worker handles cache updates
- Manual refresh syncs when back online

## PWA Installation

### On Mobile (iOS/Android)
1. Open WAKASAFE in browser
2. Tap Share button (iOS) or Menu (Android)
3. Select "Add to Home Screen"
4. App installs like native app
5. Works offline and supports notifications

### On Desktop (Chrome/Edge/Brave)
1. Visit the app URL
2. Click install icon in address bar
3. App opens in standalone window
4. Works offline

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t wakasafe .
docker run -p 3000:3000 wakasafe
```

### Custom Server
```bash
npm run build
npm run start
```

## Map Coordinates

**Center: Aba, Nigeria**
- Latitude: 5.1098°
- Longitude: 7.3667°
- Zoom level: 10 (default)

**Mock Incident Locations:**
- Aba Market: 5.5°, 7.0°
- Onitsha Road: 6.0°, 6.8°
- Port Harcourt Road: 4.95°, 7.15°

## Animation & Styling

### Color Scheme
- **Background**: Slate-950 (`#020617`)
- **Primary**: Green-400 to Blue-400 (gradients)
- **Danger/Alert**: Red-500 to Red-600
- **Caution**: Yellow-400
- **Safe**: Green-500

### Animations
- **pulse-glow**: Glowing outline on incident markers
- **pulse-marker**: Pulsing scale animation
- **long-press-ring**: SVG ring animation on SOS button
- **slide-in-from-bottom**: Modal entrance animation

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Performance Optimizations

- Image optimization with Next.js Image component
- Service Worker caching strategy
- Code splitting with Next.js dynamic imports
- Mapbox GL optimization for mobile
- Lazy loading of components

## Known Limitations

- Mock authentication (connect Firebase for production)
- Mock incident data (connect real API)
- Mapbox token required for map functionality
- Phone auth SMS not actually sending (Firebase required)

## Development Notes

### Adding New Incidents
Edit `lib/map-context.tsx` MOCK_INCIDENTS array

### Modifying Highways
Edit `lib/map-context.tsx` MOCK_HIGHWAYS array

### Adding Languages
Edit `lib/language-context.tsx` translations object

### Customizing Theme
Edit `app/globals.css` design tokens and colors

## Future Enhancements

- [ ] Real Firestore integration for incidents
- [ ] Real-time WebSocket updates
- [ ] Driver verification system
- [ ] Ride booking and payment integration
- [ ] In-app calling and SMS
- [ ] Advanced analytics dashboard
- [ ] AI-powered route recommendations
- [ ] Community reporting system
- [ ] Insurance integration

## Support & Troubleshooting

### Map not showing?
- Check `.env.local` has valid MAPBOX_TOKEN
- Visit https://account.mapbox.com/tokens/ for new token

### Service Worker not registering?
- Check browser DevTools > Application > Service Workers
- Enable PWA in Chrome flags for testing

### Phone auth not working?
- Use mock credentials for development
- Set up Firebase for production auth

### Performance issues?
- Clear browser cache and rebuild
- Check network tab in DevTools
- Reduce map zoom level on slower devices

## License

WAKASAFE © 2024. All rights reserved.

## Contact & Support

For issues, feature requests, or deployment help, reach out to the development team.

---

**Built with ❤️ for Nigerian Road Safety**
