from sklearn.tree import DecisionTreeRegressor
import joblib

# After training the DecisionTreeRegressor
decision_tree_model = DecisionTreeRegressor()
decision_tree_model.fit(X_train, y_train)

# Save the model to a file
joblib.dump(decision_tree_model, 'decision_tree_model.joblib')

print("Decision tree model saved.")
