def recommend_counseling(row):
    counseling_reasons = []
    
    if row['Stress Level'] > 7:  # High stress level
        counseling_reasons.append("High stress level")
    
    if row['Motivation Level'] < 4:  # Low motivation
        counseling_reasons.append("Low motivation level")
    
    if row['Missed Classes'] > 5:  # Missed many classes
        counseling_reasons.append("Frequent absenteeism")
    
    if row['CAT 1 Score'] < 8 or row['CAT 2 Score'] < 10:  # Low performance in assessments
        counseling_reasons.append("Low performance in assessments")
    
    if len(counseling_reasons) > 0:
        return "Recommended for counseling due to: " + ", ".join(counseling_reasons)
    else:
        return "No counseling recommended"
df['Counseling Recommendation'] = df.apply(recommend_counseling, axis=1)