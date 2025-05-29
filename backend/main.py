from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from typing import List
import os
from dotenv import load_dotenv
from models import User, Goal, CheckIn, PartnerCheckIn

load_dotenv()

app = FastAPI(title="BetterPath API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
client = AsyncIOMotorClient(os.getenv("MONGODB_URI", "mongodb://localhost:27017"))
db = client.betterpath

# Dependency to get database
async def get_database():
    return db

# Routes
@app.post("/checkin", response_model=CheckIn)
async def create_checkin(checkin: CheckIn, db=Depends(get_database)):
    result = await db.checkins.insert_one(checkin.dict(by_alias=True))
    checkin.id = result.inserted_id
    return checkin

@app.get("/goals/{user_id}", response_model=List[Goal])
async def get_goals(user_id: str, db=Depends(get_database)):
    goals = await db.goals.find({"user_id": user_id}).to_list(length=100)
    return goals

@app.post("/goals", response_model=Goal)
async def create_goal(goal: Goal, db=Depends(get_database)):
    result = await db.goals.insert_one(goal.dict(by_alias=True))
    goal.id = result.inserted_id
    return goal

@app.get("/partner/{user_id}", response_model=List[PartnerCheckIn])
async def get_partner_checkins(user_id: str, db=Depends(get_database)):
    user = await db.users.find_one({"_id": user_id})
    if not user or not user.get("partner_id"):
        raise HTTPException(status_code=404, detail="User or partner not found")
    
    checkins = await db.partner_checkins.find({
        "$or": [
            {"user_id": user_id},
            {"partner_id": user_id}
        ]
    }).to_list(length=100)
    return checkins

@app.post("/partner/checkin", response_model=PartnerCheckIn)
async def create_partner_checkin(checkin: PartnerCheckIn, db=Depends(get_database)):
    result = await db.partner_checkins.insert_one(checkin.dict(by_alias=True))
    checkin.id = result.inserted_id
    return checkin

# Seed data
@app.post("/seed")
async def seed_data(db=Depends(get_database)):
    # Create test user
    user = User(
        name="Test User",
        email="test@example.com",
        partner_id=None
    )
    user_result = await db.users.insert_one(user.dict(by_alias=True))
    user_id = str(user_result.inserted_id)

    # Create sample goals
    goals = [
        Goal(
            user_id=user_id,
            type="fitness",
            target=10000,  # steps per day
            progress=7500
        ),
        Goal(
            user_id=user_id,
            type="finance",
            target=2000,  # monthly savings
            progress=1500
        ),
        Goal(
            user_id=user_id,
            type="mental",
            target=30,  # minutes of meditation
            progress=20
        )
    ]
    
    for goal in goals:
        await db.goals.insert_one(goal.dict(by_alias=True))

    # Create sample check-in
    checkin = CheckIn(
        user_id=user_id,
        moved=True,
        mood=4,
        spent=25.50
    )
    await db.checkins.insert_one(checkin.dict(by_alias=True))

    return {"message": "Seed data created successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 