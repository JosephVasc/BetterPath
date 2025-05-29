# BetterPath

A personal wellness and relationship tracking application built with Next.js, FastAPI, and MongoDB.

## Features

- User authentication with Clerk
- Daily check-ins for movement, mood, and spending
- Goal tracking and progress visualization
- Partner sync for relationship check-ins
- Beautiful and modern UI with Tailwind CSS

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Clerk Authentication
- React Query

### Backend
- FastAPI
- MongoDB
- Pydantic
- Python 3.11

## Prerequisites

- Node.js 18 or later
- Python 3.11 or later
- Docker and Docker Compose
- MongoDB (or use Docker)
- Clerk account for authentication

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/betterpath.git
   cd betterpath
   ```

2. Set up environment variables:
   - Create `.env.local` in the frontend directory:
     ```
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     CLERK_SECRET_KEY=your_clerk_secret_key
     NEXT_PUBLIC_API_URL=http://localhost:8000
     ```
   - Create `.env` in the backend directory:
     ```
     MONGODB_URI=mongodb://localhost:27017/betterpath
     CLERK_SECRET_KEY=your_clerk_secret_key
     CORS_ORIGINS=http://localhost:3000
     ```

3. Start the development environment with Docker Compose:
   ```bash
   docker-compose up
   ```

   Or start services individually:

   Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   Backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Development

### Frontend

The frontend is built with Next.js and uses the App Router. Key directories:

- `src/app`: Page components and API routes
- `src/components`: Reusable UI components
- `src/types`: TypeScript type definitions

### Backend

The backend is built with FastAPI and uses MongoDB for data storage. Key files:

- `main.py`: FastAPI application and routes
- `models.py`: Pydantic models for data validation
- `requirements.txt`: Python dependencies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. # BetterPath
