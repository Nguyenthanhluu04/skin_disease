from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import os
from dotenv import load_dotenv
from app.model import SkinDiseaseModel
from app.utils import save_upload_file, cleanup_file
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=getattr(logging, os.getenv('LOG_LEVEL', 'INFO')),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Skin Disease Classification API",
    description="API for classifying skin diseases using Vision Transformer",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize model
model = None

@app.on_event("startup")
async def startup_event():
    """Load model on startup"""
    global model
    logger.info("Loading model...")
    try:
        model = SkinDiseaseModel()
        logger.info("Model loaded successfully!")
    except Exception as e:
        logger.error(f"Failed to load model: {str(e)}")
        raise

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Skin Disease Classification API",
        "status": "running",
        "model": "Vision Transformer (ViT)",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model_loaded": model is not None
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Predict skin disease from uploaded image
    
    Args:
        file: Image file (JPEG, PNG)
        
    Returns:
        JSON with prediction results
    """
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    # Validate file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(
            status_code=400,
            detail="File must be an image (JPEG, PNG)"
        )
    
    temp_file_path = None
    
    try:
        # Save uploaded file temporarily
        temp_file_path = await save_upload_file(file)
        logger.info(f"Processing image: {file.filename}")
        
        # Make prediction
        result = model.predict(temp_file_path)
        
        logger.info(f"Prediction complete: {result['predicted_class']} ({result['confidence']:.2%})")
        
        return JSONResponse(content={
            "success": True,
            "predicted_class": result['predicted_class'],
            "confidence": result['confidence'],
            "all_predictions": result['all_predictions']
        })
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
    
    finally:
        # Cleanup temporary file
        if temp_file_path:
            cleanup_file(temp_file_path)

@app.get("/classes")
async def get_classes():
    """Get all available disease classes"""
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    return {
        "classes": model.get_class_labels()
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=os.getenv("API_HOST", "0.0.0.0"),
        port=int(os.getenv("API_PORT", 8000)),
        reload=True
    )
