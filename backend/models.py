from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class MongoBaseModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)

    class Config:
        json_encoders = {ObjectId: str}
        populate_by_name = True

class User(MongoBaseModel):
    name: str
    email: str
    partner_id: Optional[str] = None

class Goal(MongoBaseModel):
    user_id: str
    type: str  # fitness, finance, mental
    target: float
    progress: float = 0.0
    created_at: datetime = Field(default_factory=datetime.utcnow)

class CheckIn(MongoBaseModel):
    user_id: str
    date: datetime = Field(default_factory=datetime.utcnow)
    moved: bool
    mood: int = Field(ge=1, le=5)  # 1-5 scale
    spent: float

class PartnerCheckIn(MongoBaseModel):
    user_id: str
    partner_id: str
    date: datetime = Field(default_factory=datetime.utcnow)
    note: str
    scores: dict  # e.g., {"communication": 4, "quality_time": 5} 