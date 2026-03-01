This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🔧 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and set your values:

```env
BACKEND_API=https://your-backend-api.com
BACKEND_API_TOKEN=your-api-token-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_PRODUCTION_URL=https://your-production-domain.com
NODE_ENV=development
```

## 🚀 Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🔒 Security Features

This project includes multiple layers of API security:

- **CORS Protection**: Restricts API access to specified domains only
- **Rate Limiting**: Prevents abuse with configurable request limits
  - `/api/models-dropdown`: 20 requests/minute
  - `/api/predict`: 15 requests/minute
- **Input Validation**: Validates all request parameters
- **Security Headers**: Implements best-practice HTTP security headers
- **Request Timeouts**: Prevents hanging requests
- **Error Message Protection**: Hides sensitive information in production

### Testing Security

Run the security test suite:

```bash
./test-security.sh
```

For detailed security documentation, see [SECURITY.md](SECURITY.md).

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router
│   ├── api/         # API routes with security middleware
│   └── components/  # React components
├── lib/
│   └── security/    # Security utilities
│       ├── middleware.ts    # Security middleware
│       ├── rateLimiter.ts  # Rate limiting logic
│       └── types.ts        # TypeScript types
├── hooks/           # Custom React hooks
└── stores/          # State management
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
