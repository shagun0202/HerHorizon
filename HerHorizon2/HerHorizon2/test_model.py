import joblib
import os

MODEL_PATH = "models/herhorizon_ensemble.pkl"

print("Loading HerHorizon Ensemble Model...")

artifact = joblib.load(MODEL_PATH)

model = artifact["model"]
features = artifact["features"]
threshold = artifact["threshold"]

print("\n========== MODEL INFORMATION ==========")

print("Model:", type(model))

print("Total Features:", len(features))

print("\nAll 17 Features:")

for i, feature in enumerate(features, 1):
    print(f"{i}. {feature}")

print("\nModel Classes:")
print(model.classes_)

print("\nVoting Estimators:")

for name, estimator in model.named_estimators_.items():

    print("\nAlgorithm:", name)

    print("Type:", type(estimator))

    print("Pipeline Steps:")

    if hasattr(estimator, "steps"):

        for step_name, step in estimator.steps:
            print(step_name, ":", type(step))

print("\nThreshold:", threshold)

print("\n=======================================")
print("MODEL VERIFICATION COMPLETED!")