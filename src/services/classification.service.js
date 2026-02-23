export const getClassification = (cgpa) => {
  if (cgpa >= 4.5 && cgpa <= 5.0) {
    return "First Class";
  }

  if (cgpa >= 3.5 && cgpa <= 4.49) {
    return "Second Class Upper";
  }

  if (cgpa >= 2.4 && cgpa <= 3.49) {
    return "Second Class Lower";
  }

  if (cgpa >= 1.5 && cgpa <= 2.39) {
    return "Third Class";
  }

  return "Pass";
};
