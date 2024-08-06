# server.py
from fastapi import FastAPI
from pydantic import BaseModel
import openai

app = FastAPI()

openai.api_key = 'your_openai_api_key'

class ArtRequest(BaseModel):
    style: str
    theme: str

@app.post("/generate")
async def generate_art(request: ArtRequest):
    response = openai.Image.create(
        prompt=f"Create art in {request.style} style with the theme {request.theme}",
        n=1,
        size="512x512"
    )
    return {"image_url": response['data'][0]['url']}
