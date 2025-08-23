# 🚀 Setup Instructions

## Quick Setup Guide

### 1. Install Dependencies

```bash
# Install logging middleware dependencies
cd logging-middleware
npm install
npm run build
cd ..

# Install frontend dependencies
cd frontend-test-submission
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the `frontend-test-submission` directory:

```bash
cd frontend-test-submission
cp env.example .env.local
```

Edit `.env.local` and add your AffordMed credentials:

```env
VITE_LOG_ENDPOINT=http://20.244.56.144/evaluation-service/logs
VITE_CLIENT_ID=your_actual_client_id
VITE_CLIENT_SECRET=your_actual_client_secret
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## 🔑 Getting Credentials

1. **Register with AffordMed service:**
   ```bash
   POST http://20.244.56.144/evaluation-service/register
   ```

2. **Save the returned clientID and clientSecret in your `.env.local` file**

## 📱 Testing the App

1. **URL Shortener Page (`/`)**: Create short links (up to 5 at once)
2. **Stats Page (`/stats`)**: View all created links and click analytics
3. **Redirect (`/:code`)**: Test short URL redirection

## 🐛 Troubleshooting

- **Build errors**: Ensure TypeScript is installed globally or locally
- **Import errors**: Make sure logging middleware is built (`npm run build` in logging-middleware/)
- **Network errors**: Check your `.env.local` configuration
- **Port conflicts**: Change port in `vite.config.ts` if 3000 is busy

## 📁 Project Structure

```
AffordMed/
├── logging-middleware/          # TS logging package
│   ├── dist/                   # Built JavaScript files
│   ├── src/                    # TypeScript source
│   └── package.json
├── frontend-test-submission/    # React app
│   ├── src/                    # React components
│   ├── .env.local             # Your credentials (create this)
│   └── package.json
└── README.md                   # Full documentation
```
