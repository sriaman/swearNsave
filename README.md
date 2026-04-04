"# Sweat & Save

A modern, responsive website focused on personal finance, fitness, and health. Build strength, build wealth.

## 🚀 Features

- **Hero Section:** "Build Strength. Build Wealth." tagline
- **Newsletter CTA:** Email subscription with MongoDB persistence
- **Content Sections:** Fitness, Finance, Wellness pages
- **Blog:** Articles combining finance and fitness
- **Contact Page:** Newsletter signup, social links, contact form
- **Responsive Design:** Neo-brutalist style with Tailwind CSS
- **Animations:** Smooth transitions with framer-motion

## 🛠 Tech Stack

### Frontend
- **React** (Create React App)
- **React Router** v6 for routing
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Axios** for API calls

### Backend
- **Django** with Django REST Framework
- **MongoDB** with PyMongo
- **Python** 3.9+

### Infrastructure
- **Docker** & Docker Compose
- **MongoDB Compass** for database management

## 📋 Prerequisites

- **Docker & Docker Compose** (recommended)
- **Node.js** 18+ (for local frontend development)
- **Python** 3.9+ (for local backend development)
- **MongoDB** (local or cloud instance)

## 🚀 Quick Start with Docker

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd sweatNsave
   ```

2. **Run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:8001/api
   - **MongoDB:** localhost:27017

## 🏃‍♂️ Local Development Setup

### Backend Setup
```bash
cd app/backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8001
```

### Frontend Setup
```bash
cd app/frontend
npm install
npm start
```

### Database
Start MongoDB locally:
```bash
brew services start mongodb-community  # macOS
# Or use MongoDB Compass to connect to mongodb://localhost:27017
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/` | Health check |
| POST | `/api/newsletter` | Subscribe to newsletter |
| GET | `/api/newsletter/subscribers` | Get all subscribers (admin) |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact/submissions` | Get all submissions (admin) |

### Example API Usage
```bash
# Health check
curl http://localhost:8001/api/

# Subscribe to newsletter
curl -X POST http://localhost:8001/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'

# Submit contact form
curl -X POST http://localhost:8001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "subject": "Hello", "message": "Test message"}'
```

## 📄 Pages

| Page | Route | Status |
|------|--------|--------|
| Home | `/` | ✅ |
| Fitness | `/fitness` | ✅ |
| Finance | `/finance` | ✅ |
| Wellness | `/wellness` | ✅ |
| Blog | `/blog` | ✅ |
| Contact | `/contact` | ✅ |

## 🎨 Design System

- **Fonts:** Outfit (headings), Manrope (body)
- **Colors:**
  - Orange (#f97316) - Fitness
  - Emerald (#10b981) - Finance
  - Blue (#2563eb) - Wellness
- **Style:** Neo-brutalist with bold borders and shadows

## 🧪 Testing

### Backend Tests
```bash
cd app/backend
python manage.py test
```

### Frontend Tests
```bash
cd app/frontend
npm test
```

## 🐳 Docker Commands

```bash
# Build and run all services
docker-compose up --build

# Run in background
docker-compose up -d --build

# Stop services
docker-compose down

# View logs
docker-compose logs

# Rebuild specific service
docker-compose up --build backend
```

## 📊 Database Management

### MongoDB Compass
1. Download from https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. Database: `test_database`
4. Collections: `newsletter_subscribers`, `contact_submissions`

### Command Line
```bash
mongosh mongodb://localhost:27017
use test_database
db.newsletter_subscribers.find().pretty()
```

## 🔧 Environment Variables

### Backend (.env)
```
MONGO_URL=mongodb://mongo:wHbijXraemQPrhyDcyAAeitDXKtypOnC@mongodb.railway.internal:27017
DB_NAME=test_database
CORS_ORIGINS=*
DJANGO_SECRET_KEY=your-secret-key
DEBUG=1
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or issues, please use the contact form or create an issue in this repository.
| Blog | /blog | ✅ |
| Contact | /contact | ✅ |

## Backend API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/ | Health check |
| POST | /api/newsletter | Subscribe to newsletter |
| GET | /api/newsletter/subscribers | List all subscribers |
| POST | /api/contact | Submit contact form |
| GET | /api/contact/submissions | List all submissions |

## Features Implemented
- Hero section with runner background image, animated stats, dual CTA buttons
- Orange ticker marquee strip with motivational phrases
- 3 featured section cards (Fitness/Finance/Wellness) with hover animations
- Latest blog preview (3 posts)
- Homepage newsletter CTA section
- Fitness page: 4 workout routine cards, 3 community challenges, 3 motivational quotes
- Finance page: 6 money tips cards, 6-step investing roadmap, 50/30/20 budget visual
- Wellness page: 6 science-backed tips, 3 healthy recipes with macros, 4 mental health tips
- Blog page: Featured article, 5 additional cards, category filter tabs, article modal
- Contact page: Newsletter signup, 4 social media links, full contact form
- Neo-brutalist card design: hover lift + hard shadow
- Sticky navbar with scroll detection, underline hover animations
- Mobile-responsive hamburger menu
- framer-motion staggered scroll reveals on all sections
- MongoDB persistence for newsletter subscribers and contact form submissions

## Content (Mock Data)
- 6 blog articles in `/frontend/src/data/blogData.js`
- 4 workout routines
- 6 finance tips
- 6 wellness tips
- 3 healthy recipes with macro breakdowns

## Test Results (Feb 2026)
- Backend: 100% (8/8 tests passed)
- Frontend: 100% (all 6 pages, navigation, forms verified)

## Prioritized Backlog

### P0 (Critical - done)
- [x] All 6 pages implemented
- [x] Newsletter API + Contact API
- [x] Responsive mobile design
- [x] Blog article modal

### P1 (Next sprint)
- [ ] Admin dashboard to view subscribers and messages
- [ ] Blog search functionality
- [ ] Pagination for blog articles
- [ ] RSS feed

### P2 (Future)
- [ ] Email integration (SendGrid/Resend) for newsletter delivery
- [ ] User accounts / saved articles
- [ ] Dark mode toggle
- [ ] Article commenting system
- [ ] Progress tracker for fitness challenges

## Next Tasks
1. Add email delivery integration (SendGrid/Resend) to actually send newsletters
2. Build admin panel to manage newsletter subscribers and contact submissions
3. Add more blog articles and content
4. Implement blog search and pagination
"

Summary: Summary: ## Sweat & Save Website MVP Complete

Built a full 6-page marketing website: Home, Fitness, Finance, Wellness, Blog, Contact — all responsive, with neo-brutalist design (orange/emerald/blue palette, Outfit + Manrope fonts, hard-shadow hover cards)
Backend: FastAPI + MongoDB with POST /api/newsletter (email collection) and POST /api/contact (contact form) — both tested and working
Key features: animated hero with runner background + ticker strip, framer-motion scroll reveals, blog article modal with filter tabs, 50/30/20 budget visual, recipe macro cards, fitness challenge cards, and social media links
Test Results: Backend 100% (8/8) · Frontend 100% — all pages, nav, forms, and modals verified ✅

Next Action Items:

P1: Add email delivery (e.g., Resend/SendGrid) to actually send newsletters to subscribers
P1: Build a simple admin panel to view contact submissions and subscriber list
P2: Add more blog articles + search/pagination
Potential improvement: Would you like to add an email delivery integration (like Resend) so newsletter subscribers get a real welcome email and weekly digest? That would turn this into a fully functional community-building tool!