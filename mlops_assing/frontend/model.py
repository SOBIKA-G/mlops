import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import pickle as pk

# Read CSV data
data = pd.read_csv(r'C:\Users\sobik\OneDrive\Documents\mlops_assing\milknew.csv')

# Split data into features (X) and target (y)
X = data.drop('Grade', axis=1)
y = data['Grade']

# Split data into train and test sets
x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.8, random_state=32)

# Initialize and train logistic regression model
lr = LogisticRegression()
lr.fit(x_train, y_train)

# Make predictions on test set
y_pred = lr.predict(x_test)

# Evaluate model performance
from sklearn.metrics import confusion_matrix, accuracy_score, classification_report
print("Confusion matrix:\n", confusion_matrix(y_test, y_pred))
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Classification report:\n", classification_report(y_test, y_pred))

# Save trained model using pickle
with open("model.pkl", "wb") as f:
    pk.dump(lr, f)
