# AffordMed URL Shortener - Test Submission

A complete URL shortener application built with React, TypeScript, and Material UI, featuring a custom logging middleware that integrates with the AffordMed evaluation service.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- AffordMed evaluation service credentials

### Setup & Run

1. **Install dependencies and build logging middleware:**
   ```bash
   pnpm install
   cd logging-middleware
   pnpm build
   cd ..
   ```

2. **Configure environment variables:**
   ```bash
   cd frontend-test-submission
   cp env.example .env.local
   # Edit .env.local with your credentials:
   # VITE_CLIENT_ID=your_client_id_here
   # VITE_CLIENT_SECRET=your_client_secret_here
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   ```
   
   The app will be available at [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture

### Repository Structure
```
├── logging-middleware/          # Reusable TS logging package
│   ├── src/
│   │   ├── types.ts            # Log interfaces and types
│   │   ├── http.ts             # HTTP utility functions
│   │   └── index.ts            # Main logger factory
│   ├── package.json
│   └── tsconfig.json
├── frontend-test-submission/    # React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Route components
│   │   ├── models.ts           # Data interfaces
│   │   ├── storage.ts          # localStorage utilities
│   │   ├── utils.ts            # Helper functions
│   │   ├── logger.ts           # Logger configuration
│   │   ├── api.ts              # Business logic
│   │   ├── App.tsx             # Main app shell
│   │   ├── routes.tsx          # Routing configuration
│   │   └── main.tsx            # App entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

### Routing Structure
- **`/`** - URL Shortener page (main form)
- **`/stats`** - Statistics page (view all links and clicks)
- **`/:code`** - Redirect page (handles short URL clicks)

## 📊 Data Model

### Core Interfaces
```typescript
interface ShortLink {
  code: string;           // Unique shortcode
  longUrl: string;        // Original long URL
  createdAt: string;      // ISO timestamp
  expiresAt: string;      // ISO timestamp
  clicks: ClickEvent[];   // Array of click events
}

interface ClickEvent {
  ts: string;             // Click timestamp
  referrer?: string;      // Referrer URL
  locale?: string;        // Browser locale
  timezone?: string;      // User timezone
  userAgent?: string;     // Browser user agent
}
```

### Storage Strategy
- **localStorage**: Persistent storage using key `affordmed.urlshortener.v1`
- **Session-based**: Data persists across browser sessions
- **No authentication**: Assumes pre-authorized access

## 🔧 Features

### URL Shortening
- **Up to 5 URLs** can be shortened simultaneously
- **Custom validity**: Configurable expiry time (default: 30 minutes)
- **Custom shortcodes**: Optional alphanumeric codes (3-20 chars)
- **Auto-collision resolution**: Generates new codes if duplicates exist

### Validation & Error Handling
- **URL validation**: Ensures valid HTTP/HTTPS URLs
- **Shortcode validation**: Alphanumeric + underscore/hyphen only
- **Client-side validation**: Immediate feedback with Material UI components
- **Error handling**: Comprehensive error messages via snackbars

### Click Tracking
- **Comprehensive analytics**: Timestamp, referrer, locale, timezone
- **Real-time updates**: Click data stored immediately
- **Expiry handling**: Automatic expiration check on redirect

## 📝 Logging Strategy

### Integration with AffordMed Service
The app uses a custom logging middleware that sends structured logs to the evaluation service:

```typescript
// Log levels: debug, info, warn, error, fatal
// Stack: frontend (for this app)
// Packages: api, auth, config, middleware, utils

await Log('frontend', 'info', 'api', 'creating 3 short links');
await Log('frontend', 'warn', 'api', 'shortcode collision: abc123');
await Log('frontend', 'info', 'api', 'click abc123');
```

### Logging Points
- **URL creation**: Info logs for successful operations
- **Collision handling**: Warning logs for duplicate codes
- **Click tracking**: Info logs for each redirect
- **Error scenarios**: Error logs for validation failures
- **System events**: Info logs for middleware operations

### Configuration
- **Endpoint**: Configurable via `VITE_LOG_ENDPOINT`
- **Headers**: Customizable header names for client ID/secret
- **Fallback**: Graceful handling of network failures

## 🎨 UI/UX Design

### Material UI Components
- **AppBar**: Clean navigation with tabs
- **Cards**: Organized content layout
- **Grid**: Responsive form layout
- **Snackbars**: Non-intrusive notifications
- **Typography**: Consistent text hierarchy

### Responsive Design
- **Mobile-first**: Optimized for small screens
- **Grid system**: Adaptive layouts
- **Touch-friendly**: Appropriate button sizes and spacing

### User Experience
- **Immediate feedback**: Real-time validation
- **Clear navigation**: Intuitive tab structure
- **Visual hierarchy**: Consistent spacing and typography
- **Error handling**: Helpful error messages

## 🔒 Security & Assumptions

### Authentication
- **Pre-authorized**: Assumes client credentials are valid
- **Header-based**: Uses custom headers for API authentication
- **Environment variables**: Credentials stored in `.env.local`

### Data Privacy
- **Local storage**: All data stored client-side
- **No external persistence**: No server-side storage
- **Click analytics**: Basic browser information only

### Input Validation
- **URL sanitization**: Ensures valid URL format
- **Code validation**: Prevents malicious shortcodes
- **XSS protection**: React's built-in XSS protection

## 🚀 Deployment

### Build Process
```bash
# Build logging middleware
cd logging-middleware
pnpm build

# Build frontend
cd ../frontend-test-submission
pnpm build
```

### Production Considerations
- **Static hosting**: Can be deployed to any static host
- **Environment variables**: Configure production credentials
- **HTTPS**: Required for production deployment
- **CORS**: Ensure evaluation service allows your domain

## 🧪 Testing

### Manual Testing Checklist
- [ ] URL shortening with custom codes
- [ ] Multiple URL submission (up to 5)
- [ ] Custom validity periods
- [ ] Shortcode collision handling
- [ ] Click tracking and statistics
- [ ] Expired link handling
- [ ] Responsive design on mobile/desktop
- [ ] Logging to evaluation service

### Browser Compatibility
- **Modern browsers**: Chrome, Firefox, Safari, Edge
- **Mobile browsers**: iOS Safari, Chrome Mobile
- **ES2020 features**: Requires modern JavaScript support

## 📱 Screenshots

*Screenshots will be added after running the application*

## 🔄 Future Enhancements

### Potential Improvements
- **QR code generation**: For mobile sharing
- **Analytics dashboard**: Enhanced click analytics
- **Bulk operations**: Import/export URL lists
- **Custom domains**: Support for custom short domains
- **API endpoints**: RESTful API for external integration
- **Rate limiting**: Prevent abuse
- **Link categories**: Organize links by purpose

### Scalability Considerations
- **Database integration**: Replace localStorage with proper database
- **User authentication**: Multi-user support
- **Caching**: Redis for high-traffic scenarios
- **CDN**: Global content delivery
- **Monitoring**: Application performance monitoring

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

This is a test submission for AffordMed evaluation. For questions or issues, please refer to the evaluation guidelines.

---

**Built with ❤️ using React, TypeScript, and Material UI**
