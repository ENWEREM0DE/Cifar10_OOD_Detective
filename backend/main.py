from imagePredictor import ImageClassifier
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import io
from PIL import Image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)


@app.post("/predict")
async def predictImage(file: UploadFile = File(...)):
    print("backend called")
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data))
    cnn = ImageClassifier()
    return cnn.predictImage(image)
