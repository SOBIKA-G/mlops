import requests

# Define the feature values
feature_values = {
    'pH': 6.6,
    'temperature': 35,
    'taste': 1,
    'odor': 0,
    'fat': 1,
    'turbidity': 0,
    'colour': 254
}

# URL of the Flask server
url = 'http://127.0.0.1:8000/predict'

# Send a POST request with the feature values as JSON
response = requests.post(url, json=feature_values)

# Print the predicted quality
print(response.json()["predicted_quality"])
