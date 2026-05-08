# WohnOra-Germany

A German real estate platform for property listings, search, and management with DE/EN language toggle.

## Features

- **Property Listings** - Browse apartments, houses, studios, penthouses for rent or buy
- **Interactive Map** - OpenStreetMap-based search with markers and filters
- **Advanced Search** - Filter by city, type, category, price range, rooms, amenities
- **User Authentication** - Role-based login (Seeker/Owner)
- **Dashboards** - Separate dashboards for property seekers and owners
- **Messaging System** - Direct communication between seekers and property owners
- **Appointments** - Schedule and manage property viewing appointments
- **Document Upload** - Upload required documents for property applications
- **Amenities Discovery** - Find nearby amenities (schools, supermarkets, hospitals)
- **DE/EN Toggle** - Full German and English language support

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar.jsx       # Navigation bar with language toggle
│   ├── PropertyCard.jsx # Property listing card
│   ├── Icons.jsx       # Lucide React icon exports
│   ├── ErrorBoundary.jsx # Error handling wrapper
│   └── Skeleton.jsx    # Loading skeleton component
├── pages/               # Page components (routes)
│   ├── Landing.jsx      # Home/landing page
│   ├── Properties.jsx   # Property listings with filters
│   ├── PropertyDetail.jsx # Single property view
│   ├── Search.jsx      # Search page
│   ├── Map.jsx         # Map-based property search
│   ├── Login.jsx       # User login
│   ├── Register.jsx     # User registration
│   ├── Dashboard.jsx   # Main dashboard
│   ├── SeekerDashboard.jsx # Seeker dashboard
│   ├── OwnerDashboard.jsx # Owner dashboard
│   ├── Messages.jsx    # Messaging interface
│   ├── Appointments.jsx # Appointment management
│   ├── Amenities.jsx   # Nearby amenities search
│   └── Upload.jsx      # Document upload
├── store/               # Zustand state management
│   └── authStore.js    # Authentication state
├── services/            # API and constants
│   ├── api.js          # Axios API client
│   └── constants.js    # App constants
├── data/                # Mock data for development
│   └── mockData.js     # Properties, messages, appointments
├── i18n/                # Internationalization
│   ├── LanguageContext.jsx # Language provider
│   └── translations.js  # DE/EN translations
└── utils/               # Utility functions
    └── validation.js    # Form validation
```

## Available Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/properties` | Property listings with filters |
| `/propertydetail/:id` | Single property detail |
| `/search` | Text-based search |
| `/map` | Map-based property search |
| `/login` | User login |
| `/register` | User registration |
| `/ownerdashboard` | Owner dashboard |
| `/seekerdashboard` | Seeker dashboard |
| `/messages` | Messages |
| `/appointments` | Appointments |
| `/amenities` | Nearby amenities |
| `/upload` | Document upload |

## Tech Stack

- **Frontend**: React 18 + Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4 + CSS Variables
- **State**: Zustand with localStorage persistence
- **Maps**: Leaflet + React-Leaflet + OpenStreetMap
- **Icons**: Lucide React
- **HTTP**: Axios

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Red | `#C1121f` | Buttons, accents |
| Navy | `#003049` | Headers, text |
| Light Blue | `#669bbc` | Hover states, accents |
| Cream | `#fdf0d5` | Background |
| Dark Red | `#780000` | Dark accents |

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLIC_KEY=pk_test_
VITE_GOOGLE_MAPS_API_KEY=your-key
```

## Demo Login

For testing purposes:
- Enter any email with "owner" or "vermieter" → Owner dashboard
- Other emails → Seeker dashboard

## License

MIT