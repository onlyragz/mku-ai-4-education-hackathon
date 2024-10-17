# Import necessary libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.tree import DecisionTreeRegressor
from sklearn.linear_model import LinearRegression
from sklearn.neighbors import KNeighborsRegressor
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_percentage_error

# Encode categorical variables
label_encoder = LabelEncoder()

df['Peer Study Group Participation'] = label_encoder.fit_transform(df['Peer Study Group Participation'])
df['Health Status'] = label_encoder.fit_transform(df['Health Status'])
df['COURSE'] = label_encoder.fit_transform(df['COURSE'])
df['UNIT'] = label_encoder.fit_transform(df['UNIT'])

# Select all viable features (input) and target (output)
X = df[['Study Duration (mins)', 'Unit Description Corpus Value', 
        'Class Concepts Corpus Value', 'Assignment Concepts Corpus Value',
        'Comprehension Rating', 'Difficult Concepts', 'Tutor Delivery Rating', 'Practice Questions Completed', 'Peer Study Group Participation', 'Attended Classes', 
        'Missed Classes', 'Health Status', 'Motivation Level', 'Aimed Exam Score', 'Stress Level', 'CAT 1 Score', 'CAT 2 Score']]
y = df['Exam Score']

# Split data into training and test sets
X_train, X_test, y_train, y_test = X[:7], X[7:], y[:7], y[7:]

# Define the models to evaluate
models = {
    "Random Forest": RandomForestRegressor(),
    "Decision Tree": DecisionTreeRegressor(),
    "Linear Regression": LinearRegression(),
    "K-Nearest Neighbors": KNeighborsRegressor()
}

# Initialize a results dictionary
results = {}

# Loop through the models, train, predict, and evaluate
for model_name, model in models.items():
    print(f"\nTraining {model_name}...")
    
    # Train the model
    model.fit(X_train, y_train)
    
    # Make predictions on the test set
    y_pred = model.predict(X_test)
    
    # Evaluate the model
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    mape = mean_absolute_percentage_error(y_test, y_pred)
    
    # Store results
    results[model_name] = {
        "MAPE": mape * 100,
        "MSE": mse
    }
    
    # Display the results for this model
    print(f"{model_name} - MAPE: {mape * 100:.2f}%, MSE: {mse:.2f}")

# Display a summary of all model results
print("\nModel Evaluation Results:")
for model_name, metrics in results.items():
    print(f"{model_name}:")
    print(f"  - MAPE: {metrics['MAPE']:.2f}%")
    print(f"  - MSE: {metrics['MSE']:.2f}")
