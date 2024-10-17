def recommend_learning_materials(row):
    learning_resources = []
    
    if row['Comprehension Rating'] < 5:  # Low comprehension
        learning_resources.append("Additional reading materials")
    
    if row['Difficult Concepts'] > 3:  # Struggling with concepts
        learning_resources.append("Extra tutorials for difficult concepts")
    
    if row['CAT 1 Score'] < 60 or row['CAT 2 Score'] < 60:  # Low scores
        learning_resources.append("Practice quizzes for better preparation")
    
    if len(learning_resources) > 0:
        return "Recommended resources: " + ", ".join(learning_resources)
    else:
        return "No extra learning materials recommended"

# Apply the learning material recommendation system to each student
df['Learning Material Recommendation'] = df.apply(recommend_learning_materials, axis=1)