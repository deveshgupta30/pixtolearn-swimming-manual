# PixToLearn Swimming - Multi-Language Instruction Manual

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for displaying PixToLearn Swimming instruction manuals in multiple languages.

## Features

- Multi-language support with 24 EU official languages
- Clean, professional design matching PixToLearn branding
- Language selection interface
- Responsive layout for mobile and desktop
- Print/PDF download functionality
- Language persistence using localStorage
- RESTful API for translation management
- TypeScript for type safety
- Tailwind CSS for styling
- Accessibility compliant

## Project Structure

```
pixtolearn-manual/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── LanguageSelector.tsx
│   │   │   ├── ManualContent.tsx
│   │   │   └── Layout.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   └── Manual.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── hooks/
│   │   │   └── useLanguage.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   └── public/
├── server/                 # Express backend
│   ├── models/
│   │   └── Translation.js
│   ├── routes/
│   │   └── translations.js
│   ├── controllers/
│   │   └── translationController.js
│   ├── config/
│   │   └── database.js
│   ├── seedDatabase.js
│   └── server.js
└── package.json
```

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (v5 or higher)

## Installation

### 1. Clone the repository

```bash
cd /path/to/your/projects
git clone <repository-url>
cd InstructionManual
```

### 2. Install dependencies

Install all dependencies for both client and server:

```bash
npm run install-all
```

Or install manually:

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Set up environment variables

#### Server (.env)

Create a `.env` file in the `server` directory:

```bash
cd server
cp .env.example .env
```

Edit the `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pixtolearn-manual
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

#### Client (.env)

Create a `.env` file in the `client` directory:

```bash
cd client
cp .env.example .env
```

Edit the `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000
```

### 4. Set up MongoDB

Ensure MongoDB is running on your system:

```bash
# On macOS (using Homebrew)
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
net start MongoDB
```

Verify MongoDB is running:

```bash
mongosh
```

### 5. Seed the database

Populate the database with initial content:

```bash
cd server
npm run seed
```

This will create:
- English translation with full content
- Placeholder entries for 23 other EU languages

## Running the Application

### Development Mode

Run both client and server concurrently:

```bash
# From root directory
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health check: http://localhost:5000/health

## API Endpoints

### Public Endpoints

- `GET /api/languages` - Get all available languages
- `GET /api/translations/:languageCode` - Get translation for specific language

### Admin Endpoints

- `POST /api/translations` - Create new translation
- `PUT /api/translations/:languageCode` - Update translation
- `DELETE /api/translations/:languageCode` - Delete translation

### Example API Requests

#### Get all languages

```bash
curl http://localhost:5000/api/languages
```

#### Get English translation

```bash
curl http://localhost:5000/api/translations/EN
```

#### Create new translation

```bash
curl -X POST http://localhost:5000/api/translations \
  -H "Content-Type: application/json" \
  -d '{
    "languageCode": "FR",
    "languageName": "French",
    "nativeName": "français",
    "isEUOfficial": true,
    "content": { ... }
  }'
```

## Building for Production

### Build the client

```bash
cd client
npm run build
```

This creates an optimized production build in the `client/build` directory.

### Production Environment Variables

Update your environment variables for production:

**Server (.env):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pixtolearn-manual
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

**Client (.env):**
```env
REACT_APP_API_URL=https://api.yourdomain.com
```

## Deployment

### Deploy Backend (Heroku/Railway)

1. Create a new app on Heroku or Railway
2. Set environment variables
3. Deploy using Git:

```bash
cd server
git init
heroku create pixtolearn-api
git add .
git commit -m "Initial commit"
git push heroku main
```

### Deploy Frontend (Vercel/Netlify)

1. Connect your repository to Vercel or Netlify
2. Set build command: `cd client && npm run build`
3. Set publish directory: `client/build`
4. Set environment variables
5. Deploy

### MongoDB Atlas Setup

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create database user
4. Whitelist IP addresses
5. Get connection string and update `MONGODB_URI`

## Available Languages

The application supports 24 EU official languages:

- Bulgarian (BG) - български
- Spanish (ES) - español
- Czech (CS) - čeština
- Danish (DA) - dansk
- German (DE) - Deutsch
- Estonian (ET) - eesti
- Greek (EL) - ελληνικά
- English (EN) - English
- French (FR) - français
- Irish (GA) - Gaeilge
- Croatian (HR) - hrvatski
- Italian (IT) - italiano
- Latvian (LV) - latviešu
- Lithuanian (LT) - lietuvių
- Hungarian (HU) - magyar
- Maltese (MT) - Malti
- Dutch (NL) - Nederlands
- Polish (PL) - polski
- Portuguese (PT) - português
- Romanian (RO) - română
- Slovak (SK) - slovenčina
- Slovenian (SL) - slovenščina
- Finnish (FI) - suomi
- Swedish (SV) - svenska

## Technologies Used

### Frontend
- React 18
- TypeScript
- React Router DOM
- Axios
- Tailwind CSS
- i18next (for future enhancements)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- Helmet (security)
- Compression
- Express Rate Limit

## Performance Optimization

- Lazy loading of translations
- Compression middleware
- Rate limiting
- Caching headers
- Optimized images
- Code splitting

## Security Features

- Helmet.js for HTTP headers
- CORS configuration
- Rate limiting
- Input validation
- MongoDB injection prevention
- XSS protection

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- Semantic HTML
- ARIA labels where needed

## Troubleshooting

### MongoDB Connection Issues

```bash
# Check if MongoDB is running
mongosh

# Restart MongoDB service
brew services restart mongodb-community  # macOS
sudo systemctl restart mongod            # Linux
```

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### Client Can't Connect to Server

1. Check if server is running
2. Verify CORS_ORIGIN in server .env
3. Check REACT_APP_API_URL in client .env
4. Check browser console for errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Copyright © 2024 PixToLearn Ltd. All rights reserved.

## Contact

PixToLearn Ltd
71–75 Shelton Street, Covent Garden
London, WC2H 9JQ, UK
- Website: pixtolearn.com
- Email: hello@pixtolearn.com

## Support

For issues and questions:
1. Check this README
2. Check existing GitHub issues
3. Create a new issue with detailed description
4. Contact support at hello@pixtolearn.com
