import numpy as np
import joblib

# Load the trained model
model = joblib.load('decision_tree_model.joblib')

# Define the input features for prediction
def get_user_input():
    print("Enter the following details for prediction:")
    study_duration = float(input("Study Duration (mins): "))
    unit_description_value = float(input("Unit Description Corpus Value: "))
    class_concepts_value = float(input("Class Concepts Corpus Value: "))
    assignment_concepts_value = float(input("Assignment Concepts Corpus Value: "))
    comprehension_rating = float(input("Comprehension Rating: "))
    difficult_concepts_value = float(input("Difficult Concepts Corpus Value: "))
    tutor_delivery_rating = float(input("Tutor Delivery Rating: "))
    practice_questions = int(input("Practice Questions Completed: "))
    peer_study_group = int(input("Peer Study Group Participation (0 or 1): "))
    attended_classes = int(input("Attended Classes: "))
    missed_classes = int(input("Missed Classes: "))
    health_status = int(input("Health Status (0 or 1): "))
    motivation_level = float(input("Motivation Level: "))
    aimed_exam_score = float(input("Aimed Exam Score: "))
    stress_level = float(input("Stress Level: "))
    cat1_score = float(input("CAT 1 Score: "))
    cat2_score = float(input("CAT 2 Score: "))

    # Return as a numpy array for prediction
    return np.array([[study_duration, unit_description_value, class_concepts_value, 
                      assignment_concepts_value, comprehension_rating, difficult_concepts_value,
                      tutor_delivery_rating, practice_questions, peer_study_group, 
                      attended_classes, missed_classes, health_status, motivation_level, 
                      aimed_exam_score, stress_level, cat1_score, cat2_score]])

# Get user input
user_input = get_user_input()

# Make prediction
predicted_score = model.predict(user_input)

# Display the predicted exam score
print(f"\nPredicted Exam Score: {predicted_score[0]:.2f}")