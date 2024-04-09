import pickle as pk
import streamlit as st
import numpy as np

# Specify the file path of the trained model
pickle_file_path = "C:\\Users\\sobik\\Downloads\\trained_models.sav"
# Replace with your actual file path

# Load the trained model from the pickle file
with open(pickle_file_path, 'rb') as f:
    loaded_model = pk.load(f)

# Streamlit app title and description
st.title("Milk Quality Predictor")
st.write("This app predicts the quality of milk based on various attributes.")

# Center-align input fields
st.markdown("<h2 style='text-align: center;'>Enter Milk Attributes</h2>", unsafe_allow_html=True)

# Input fields for user input
pH = st.slider("pH", min_value=0.0, max_value=14.0, step=0.1, value=7.0)
temperature = st.slider("Temperature (°C)", min_value=0, max_value=100, step=1, value=25)
taste = st.selectbox("Taste", ["Tasteless", "Tasty"])
odor = st.selectbox("Odor", ["No Odor", "Odor Present"])
fat = st.selectbox("Fat Content", ["Low Fat", "High Fat"])
turbidity = st.selectbox("Turbidity", ["Clear", "Turbid"])
colour = st.slider("Colour (RGB)", min_value=0, max_value=255, step=1, value=128)

# Predict button
if st.button("Predict"):
    # Convert user input into array for prediction
    taste_value = 1 if taste == "Tasty" else 0
    odor_value = 1 if odor == "Odor Present" else 0
    fat_value = 1 if fat == "High Fat" else 0
    turbidity_value = 1 if turbidity == "Turbid" else 0
    input_data = np.array([[pH, temperature, taste_value, odor_value, fat_value, turbidity_value, colour]])
    
    # Make prediction
    prediction = loaded_model.predict(input_data)

    # Map prediction to quality labels
    quality_labels = {0: "High Quality", 1: "Low Quality", 2: "Medium Quality"}
    predicted_quality = quality_labels.get(prediction[0], "Unknown")

    # Display prediction result
    st.success(f"Predicted Milk Quality: {predicted_quality}")
