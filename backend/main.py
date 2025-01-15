import tensorflow
from imagePredictor import ImageClassifier

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
import io
from PIL import Image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (for development only, restrict in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.post("/predict")
async def predictImage(file: UploadFile = File(...)):
    print("backend called")
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data))
    cnn = ImageClassifier()
    return cnn.predictImage(image)
