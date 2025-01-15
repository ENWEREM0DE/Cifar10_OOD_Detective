import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.models import load_model

class ImageClassifier:
    def __init__(self):
        self.model1 = load_model("./cifar10_model_complex_78.keras") 
        self.model2 = load_model("./cifar10_model_simple_acc_69.keras") 
        self.class_names = ['Plane', 'Car', 'Bird', 'Cat', 'Deer', 'Dog', 'Frog', 'Horse', 'Ship', 'Truck']
        self.softmax_threshold = 0.90

    def preprocessImage(self, image):
        image = cv.resize(image, (32, 32))
        image = cv.cvtColor(image, cv.COLOR_BGR2RGB)
        image = image / 255.0
        image = np.expand_dims(image, axis=0)
        return image
    
    def predictImage(self, image):
        print("Got in herefkladjfnmdas jlfkna;msvljkmaksldmckjas njldkmklasmdkjcaksjcmklascmkldms;cklmdkcl;mlk;dmc;lkmas")
        image = np.array(image)
        image = self.preprocessImage(image)
        predictions1 = self.model1.predict(image)
        predictions2 = self.model2.predict(image)

        # Get the predicted class index
        predicted_class_index = np.argmax(predictions1, axis=1)[0]
        predicted_class_index2 = np.argmax(predictions2, axis=1)[0]
        # Map the index to the class name
        predicted_class_name = self.class_names[predicted_class_index]
        predicted_class_name2 = self.class_names[predicted_class_index2]
        print("__________PREDICTIONS__________")
        print("__________MODEL 1 (78% accuracy  )__________")
        print(predicted_class_name)
        print(predictions1[0][predicted_class_index])
        print("__________MODEL 2 (69% accuracy)__________")
        print(predicted_class_name2)
        print(predictions2[0][predicted_class_index2])

        if predictions1[0][predicted_class_index] > self.softmax_threshold:
            return {
                "isOOD": False,
                "prediction": f"The model predicts this is an image of {predicted_class_name}, it is {predictions1[0][predicted_class_index] * 100}% confident"
                }
        elif predictions2[0][predicted_class_index2] > self.softmax_threshold:
            return {
                "isOOD": False,
                "prediction": f"The model predicts this is an image of {predicted_class_name2}, it is {predictions2[0][predicted_class_index2] * 100}% confident"
                }
        else:
            return {
                "isOOD": True,
                "prediction": f"Neural Network is not confident in its prediction, however it thinks this is a {predicted_class_name2 if predictions2[0][predicted_class_index2] > predictions1[0][predicted_class_index] else predicted_class_name}"
                }
        

    
    def predictImageByPath(self, image_path):
        image = cv.imread(image_path)
        if image is None:
            print(f"Error: Unable to load image from path {image_path}")
            raise Exception(f"Error: Unable to load image from path {image_path}")
        
        print("image loaded successfully")
        print(f"Image shape: f{image.shape}")
        
        return self.predictImage(image)

    # def preprocess_image(self, image_path):
    #     """
    #     Preprocesses an image for prediction.

    # Args:
    #     image_path (str): Path to the image file.
    
    # Returns:    
    #     np.array: Preprocessed image ready for prediction.
    #     """
    #     # Load the image using OpenCV
    #     image = cv.imread(image_path)
        
    #     # Resize the image to 32x32 (CIFAR-10 input size)
    #     image = cv.resize(image, (32, 32))
        
    #     # Convert BGR to RGB (OpenCV loads images in BGR format)
    #     image = cv.cvtColor(image, cv.COLOR_BGR2RGB)
        
    #     # Normalize pixel values to [0, 1]
    #     image = image / 255.0
        
    #     # Expand dimensions to match the model's input shape (1, 32, 32, 3)
    #     image = np.expand_dims(image, axis=0)
        
    #     return image
    
    # def predict_image(self, image_path):
    #     """
    #     Predicts the class of an image using the saved model.
        
    # Args:
    #     image_path (str): Path to the image file.
    
    # Returns:
    #         str: Predicted class name.
    #         """
    #     # Preprocess the image
    #     image = self.preprocess_image(image_path)
        
    #     # Make a prediction
    #     predictions1 = self.model1.predict(image)
    #     predictions2 = self.model2.predict(image)

 
        
    #     # Get the predicted class index
    #     predicted_class_index = np.argmax(predictions1, axis=1)[0]
    #     predicted_class_index2 = np.argmax(predictions2, axis=1)[0]
    #     # Map the index to the class name
    #     predicted_class_name = self.class_names[predicted_class_index]
    #     predicted_class_name2 = self.class_names[predicted_class_index2]
    #     print("__________PREDICTIONS__________")
    #     print("__________MODEL 1 (78% accuracy  )__________")
    #     print(predicted_class_name)
    #     print(predictions1[0][predicted_class_index])
    #     print("__________MODEL 2 (69% accuracy)__________")
    #     print(predicted_class_name2)
    #     print(predictions2[0][predicted_class_index2])

    #     if predictions1[0][predicted_class_index] > self.softmax_threshold:
    #         return f"The model predicts this is an image of {predicted_class_name}, it is {predictions1[0][predicted_class_index] * 100}% confident"
    #     elif predictions2[0][predicted_class_index2] > self.softmax_threshold:
    #         return f"The model predicts this is an image of {predicted_class_name2}, it is {predictions2[0][predicted_class_index2] * 100}% confident"
    #     else:
    #         return f"Neural Network is not confident in its prediction, however it thinks this is a {predicted_class_name2 if predictions2[0][predicted_class_index2] > predictions1[0][predicted_class_index] else predicted_class_name}"

        
    




