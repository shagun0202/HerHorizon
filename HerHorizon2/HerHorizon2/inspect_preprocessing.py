import joblib

# Load trained model
artifact = joblib.load("models/herhorizon_ensemble.pkl")

model = artifact["model"]

print("\n========== PREPROCESSING INSPECTION ==========")


def inspect_pipeline(obj, path="Model"):

    # Check Pipeline
    if hasattr(obj, "named_steps"):

        for name, step in obj.named_steps.items():

            print(f"\nChecking: {path} -> {name}")

            inspect_pipeline(step, f"{path} -> {name}")

    # Check ColumnTransformer
    elif hasattr(obj, "transformers_"):

        for name, transformer, columns in obj.transformers_:

            print(f"\nTransformer: {name}")
            print("Columns:", columns)

            inspect_pipeline(
                transformer,
                f"{path} -> {name}"
            )

    # Check OneHotEncoder
    elif hasattr(obj, "categories_"):

        print("\nOneHotEncoder Categories:")

        for category in obj.categories_:
            print(category)


# Inspect all ensemble models
for name, estimator in model.named_estimators_.items():

    print("\n\n================================")
    print("ALGORITHM:", name)
    print("================================")

    inspect_pipeline(estimator, name)


print("\n========== INSPECTION COMPLETED ==========")