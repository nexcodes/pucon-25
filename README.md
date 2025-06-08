# EcoMate

A comprehensive sustainability platform that empowers communities to reduce their carbon footprint through collaborative tracking, goal setting, and environmental action.

## 🌱 Features

- **Carbon Footprint Calculator**: Track emissions from transport, electricity, gas, food consumption, and tree planting activities
- **Community Management**: Create and join sustainability-focused communities with different niches
- **Goal Setting & Tracking**: Set community-wide carbon reduction goals and track progress
- **Activity Logging**: Log eco-friendly activities and contribute to community goals
- **AI-Powered Insights**: Get intelligent recommendations using Google Gemini API
- **Leaderboards**: Gamified experience with carbon savings rankings
- **Real-time Analytics**: Comprehensive dashboards showing community performance
- **Social Features**: Activity feeds, community posts, and member management
- **Authentication**: Secure auth with Google OAuth integration

## 🚀 Installation

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google OAuth credentials
- Google Gemini API key

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pucon
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env` and fill in the required values:
   ```bash
   cp .env.example .env
   ```

4. **Database setup**
   ```bash
   npm run prisma:db
   npm run prisma:gen
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## ⚙️ Configuration

### Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_API_URL` - API base URL
- `NEXT_PUBLIC_APP_URL` - Application base URL
- `BETTER_AUTH_SECRET` - Authentication secret key
- `BETTER_AUTH_URL` - Base URL for authentication
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GOOGLE_GEMINI_API_KEY` - Google Gemini AI API key

### Community Niches

The platform supports various sustainability niches:
- Sustainable Transport
- Renewable Energy
- Zero Waste
- Eco-Friendly Diet
- Green Technology
- Sustainable Fashion
- Urban Gardening
- Water Conservation
- Climate Action

## 📱 Usage

### Personal Carbon Tracking

1. Navigate to the Carbon Calculator (`/calculator`)
2. Select activity type (Transport, Electricity, Gas, Food, Tree Planting)
3. Input activity details
4. View calculated emissions and suggestions for reduction

### Community Features

1. **Create Community**: Set up a community with a specific sustainability focus
2. **Join Communities**: Browse and join existing communities
3. **Set Goals**: Create carbon reduction targets for your community
4. **Log Activities**: Record eco-friendly actions and track progress
5. **View Analytics**: Monitor community performance and insights

### Activity Types

- **Transport**: Calculate emissions from various transportation methods
- **Electricity**: Track home energy consumption
- **Gas**: Monitor natural gas usage
- **Food**: Log dietary choices and their carbon impact
- **Tree Planting**: Record carbon offset activities

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (community)/       # Community features
│   ├── (root)/            # Public pages
│   └── api/               # API routes
├── components/            # Reusable UI components
├── lib/                   # Utility libraries
├── schema/                # Zod validation schemas
└── types/                 # TypeScript definitions
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Better Auth with Google OAuth
- **UI Framework**: React with Tailwind CSS
- **Component Library**: Radix UI primitives
- **State Management**: TanStack Query
- **Forms**: React Hook Form with Zod validation
- **AI Integration**: Google Gemini API
- **Charts**: Recharts for data visualization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) for the React framework
- [Prisma](https://prisma.io/) for database management
- [Better Auth](https://better-auth.com/) for authentication
- [Radix UI](https://radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Google Gemini](https://ai.google.dev/) for AI insights
- Environmental organizations for inspiration and carbon calculation methodologies

---

**EcoMate** - *Building a sustainable future, one community at a time* 🌍