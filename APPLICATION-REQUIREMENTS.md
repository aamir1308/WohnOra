# WohnOra-Germany

**Created:** 2026-02-17 12:30:45.560703
**Type:** web

---

PRODUCT REQUIREMENTS DOCUMENT (OPEN SOURCE ONLY)
Product Working Name
WohnOra Germany

1. PRODUCT VISION
Build a Germany-focused real estate marketplace that combines:
Property listings (rent, buy, build)
Map-based search
Amenity intelligence (schools, banks, plumbers, etc.)
Owner dashboards
Messaging system
Appointment booking
All using:
Open source stack
Free data sources
Self-hostable infrastructure
No proprietary APIs

2. TARGET USERS
Seeker (18+)
Rent
Buy
Build
Temporary living
Shared living
Senior living
Owner
Private landlord
Agent
Developer

3. LANDING PAGE REQUIREMENTS
Hero Section
Full-width German neighbourhood image
Branding statement
Language dropdown (EN / DE)
Toggle:
“I am a Seeker”
“I am an Owner”
Search bar:
Location input (city / zip)
Rent / Buy / Build dropdown
Property type dropdown

4. PROPERTY SEARCH SYSTEM
Filters
Mandatory:
Price range
Living space (sqm)
Rooms
Furnished
Balcony
Parking
Elevator
Pets allowed
Availability date
Advanced:
Energy class
Construction year
Floor
Barrier-free

5. MAP SYSTEM (OPEN SOURCE)
Map Provider
OpenStreetMap tiles
Leaflet.js frontend
PostGIS backend geo queries
Map Features
Clustered markers
Radius search
Highlight selected property
Smooth zoom
Lazy loading tiles

6. AMENITIES & SERVICES LAYER (OPEN DATA ONLY)
Data Sources
OpenStreetMap Overpass API
OpenStreetMap Nominatim
Self-cached local service table
Amenity Categories
Banks
Schools
Kindergartens
Hospitals
Supermarkets
Public transport
Plumbers
Electricians
Carpenters
Movers
Functional Requirements
When property selected:
Query amenities within configurable radius (default 1.5km)
Show:
Name
Address
Phone (if available)
Website (if available)
Overlay icons on map
Category toggle system
Lazy load by category

7. PROPERTY DETAIL PAGE
Includes:
Image gallery (self-hosted)
Description
Price breakdown
Map with amenities
Key features
Contact owner
Book viewing
Explore banks

8. WORKFLOWS
8.1 Appointment Booking
Form fields:
Name
Email
Phone
Employment status
Income bracket
Move-in date
Document upload
OTP verification using:
Email-based OTP (self-hosted SMTP)

8.2 Bank Section
Static list of major German banks
External redirect only
No API integration

8.3 Utility Service Click
If OSM website exists → open
Else → show contact details

9. ACCOUNT SYSTEM
Authentication
Email + OTP
Password login (bcrypt)
JWT tokens
Role-based access
Seeker Dashboard
Saved properties
Saved searches
Appointments
Documents
Chat messages
Owner Dashboard
Create listing
Upload images
Manage appointments
Chat with seekers

10. CHAT SYSTEM (OPEN SOURCE)
WebSocket (Socket.io)
Redis (optional for scaling)
Stored in PostgreSQL

11. TECHNOLOGY STACK (100% OPEN SOURCE)
Frontend
Next.js
TypeScript
TailwindCSS
Leaflet.js
i18next
Axios
Zustand (state)

Backend
Node.js
NestJS
PostgreSQL
PostGIS
Redis
Socket.io
Multer (file uploads)

Database
PostgreSQL
PostGIS extension
Full-text search using:
PostgreSQL tsvector

Search
No Elasticsearch.
Use:
PostgreSQL GIN indexes
Geo indexes
FTS search

Maps
OpenStreetMap tiles
Leaflet.js
Overpass API
Nominatim

File Storage
Option A (Free):
Local disk storage
Option B:
MinIO self-hosted (S3 compatible)

Email
Self-hosted SMTP (Postfix)
or
Free tier Mailgun alternative

Deployment
Option 1 (Cheapest):
Hetzner Cloud (Germany)
Docker + Docker Compose
Option 2:
Self-hosted VPS

12. SECURITY
JWT authentication
bcrypt hashing
HTTPS (Let's Encrypt)
GDPR compliance
Role-based access
Rate limiting
CSRF protection
Input validation (Zod)

13. NON-FUNCTIONAL REQUIREMENTS
WCAG 2.1 compliant
Mobile-first design
Server-side rendering
<2s page load
Support 500k listings

14. MVP SCOPE
Include:
Property CRUD
Search
Map
Amenity overlay
Dashboard
Chat
Appointment booking
Exclude:
Payments
Premium listings
AI features


1️⃣ EXACT DATABASE SCHEMA (PostgreSQL + PostGIS)
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role VARCHAR(20) CHECK (role IN ('seeker', 'owner', 'admin')),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone VARCHAR(30),
    language VARCHAR(5) DEFAULT 'de',
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- PROPERTIES
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    type VARCHAR(50),
    category VARCHAR(50),
    price NUMERIC,
    warm_price NUMERIC,
    size_sqm NUMERIC,
    rooms INT,
    furnished BOOLEAN DEFAULT FALSE,
    balcony BOOLEAN DEFAULT FALSE,
    parking BOOLEAN DEFAULT FALSE,
    elevator BOOLEAN DEFAULT FALSE,
    pets_allowed BOOLEAN DEFAULT FALSE,
    available_from DATE,
    address TEXT,
    city TEXT,
    postal_code VARCHAR(10),
    location GEOGRAPHY(Point, 4326),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_properties_location ON properties USING GIST(location);

-- PROPERTY IMAGES
CREATE TABLE property_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL
);

-- APPOINTMENTS
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    seeker_id UUID REFERENCES users(id),
    appointment_date TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending'
);

-- MESSAGES
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES users(id),
    receiver_id UUID REFERENCES users(id),
    property_id UUID REFERENCES properties(id),
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- SAVED PROPERTIES
CREATE TABLE saved_properties (
    user_id UUID REFERENCES users(id),
    property_id UUID REFERENCES properties(id),
    PRIMARY KEY (user_id, property_id)
);

-- DOCUMENTS
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    file_path TEXT,
    uploaded_at TIMESTAMP DEFAULT NOW()
);


2️⃣ FULL SYSTEM ARCHITECTURE DIAGRAM DESCRIPTION
Client Layer
Next.js frontend
Leaflet map
i18n system
JWT storage
Communicates via HTTPS REST API + WebSocket

Backend Layer (NestJS)
Modules:
Auth Module
User Module
Property Module
Search Module
Amenity Module
Appointment Module
Chat Module
File Upload Module

Data Layer
PostgreSQL + PostGIS:
Geo queries
FTS search
GIN indexes
Redis:
Session cache
WebSocket pub/sub

External Services (Open Source Only)
OpenStreetMap tiles
Overpass API
Nominatim API
Self-hosted SMTP

Deployment Layer
Docker containers:
frontend
backend
postgres
redis
nginx
Reverse proxy:
Nginx
SSL via Let's Encrypt

3️⃣ REPLIT / CURSOR SUPER PROMPT
Paste this into Replit or Cursor:

PROMPT START
You are a senior full-stack architect.
Build a production-ready real estate marketplace using:
Frontend:
Next.js
TypeScript
TailwindCSS
Leaflet.js
i18next
Backend:
NestJS
PostgreSQL
PostGIS
Redis
Socket.io
Requirements:
Implement role-based authentication using JWT.
Implement email/password login.
Implement property CRUD.
Implement PostGIS geo radius search.
Implement OpenStreetMap integration.
Implement Overpass API amenity fetch.
Implement dashboard for seeker and owner.
Implement WebSocket chat.
Implement appointment booking.
Implement file upload using Multer.
Use Docker Compose for deployment.
Create .env config structure.
Implement SSR pages.
Implement pagination.
Implement Postgres full-text search.
Create responsive UI.
Add map clustering.
Create i18n support EN and DE.
Write clean folder structure.
Include README and setup instructions.
Generate:
Full folder structure
All backend modules
Frontend pages
API routes
Database migrations
Docker files
Ensure project runs with:
docker-compose up --build
Return full working codebase.
PROMPT END

Use the images attached for reference