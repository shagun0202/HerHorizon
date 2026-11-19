import joblib
import pandas as pd

# Load trained model
artifact = joblib.load("models/herhorizon_ensemble.pkl")

model = artifact["model"]
features = artifact["features"]
threshold = artifact["threshold"]

# Sample input for technical testing only
sample_data = {
    "age_yrs": 22,
    "weight_kg": 55,
    "heightcm": 160,
    "bmi": 21.48,
    "blood_group": 11,
    "cycleri": 2,
    "cycle_lengthdays": 30,
    "marraige_status_yrs": 0,
    "pregnantyn": 0,
    "no_of_aborptions": 0,
    "weight_gainyn": 0,
    "hair_growthyn": 0,
    "skin_darkening_yn": 0,
    "hair_lossyn": 0,
    "pimplesyn": 0,
    "fast_food_yn": 0,
    "regexerciseyn": 1
}

# Convert into DataFrame
input_df = pd.DataFrame([sample_data])

# Maintain exact feature order
input_df = input_df[features]

# Generate prediction
prediction = model.predict(input_df)[0]

probability = model.predict_proba(input_df)[0]

print("\n===== HERHORIZON TEST RESULT =====")

print("Prediction:", prediction)

print("Class Probabilities:", probability)

print("Threshold:", threshold)

print("\nTechnical prediction test completed!")