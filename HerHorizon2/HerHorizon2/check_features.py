import joblib

# Load trained model
artifact = joblib.load("models/herhorizon_ensemble.pkl")

model = artifact["model"]

print("\n========== HERHORIZON MODEL ==========")

print("Model loaded successfully!")

print("\nExpected Features:")
print(artifact["features"])


def inspect(obj):

    if hasattr(obj, "named_steps"):

        for name, step in obj.named_steps.items():

            print("\nPipeline Step:", name)
            inspect(step)

    if hasattr(obj, "transformers_"):

        for name, transformer, columns in obj.transformers_:

            print("\nTransformer:", name)
            print("Columns:", columns)

            inspect(transformer)

    if hasattr(obj, "categories_"):

        print("\nENCODER CATEGORIES:")

        for category in obj.categories_:
            print(category)


for name, estimator in model.named_estimators_.items():

    print("\n\n==========", name, "==========")

    inspect(estimator)


print("\n========== CHECK COMPLETE ==========")