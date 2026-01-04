from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI(title="EV Charging Stations API")

# CORS (important for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load stations data
with open("data/stations.json", "r", encoding="utf-8") as f:
    stations = json.load(f)

@app.get("/")
def root():
    return {"message": "EV Charging API running"}

@app.get("/stations")
def get_stations():
    return stations