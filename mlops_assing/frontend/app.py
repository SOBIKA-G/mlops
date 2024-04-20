from flask import Flask, request, jsonify
import pickle as pk
import pandas as pd

# Load the saved model
with open("model.pkl", "rb") as f:
    loaded_model = pk.load(f)

# Define quality labels
quality_labels = {
    0: "Low Quality",
    1: "Medium Quality",
    2: "High Quality"
}

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    # Get the data from the POST request
    data = request.get_json(force=True)

    # Convert the data into a DataFrame
    data_df = pd.DataFrame.from_dict([data])

    # Make predictions
    predictions = loaded_model.predict(data_df)

    # Map predictions to quality labels
    predicted_labels = [quality_labels[prediction] for prediction in predictions]

    # Return the predictions as JSON
    return jsonify(predicted_labels)

if __name__ == '__main__':
    app.run(debug=True)
