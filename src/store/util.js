export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const convertNumericGradeToGPA = numericGrade => {
  const defaultBreakdowns = [
    { gpa: 4.0, minGrade: 93 },
    { gpa: 3.6667, minGrade: 90 },
    { gpa: 3.3333, minGrade: 87 },
    { gpa: 3.0, minGrade: 83 },
    { gpa: 2.6667, minGrade: 80 },
    { gpa: 2.3333, minGrade: 77 },
    { gpa: 2.0, minGrade: 73 },
    { gpa: 1.6667, minGrade: 70 },
    { gpa: 1.3333, minGrade: 67 },
    { gpa: 1.0, minGrade: 63 },
    { gpa: 0.6667, minGrade: 60 },
    { gpa: 0.3333, minGrade: 57 },
    { gpa: 0, minGrade: 53 }
  ];

  for (const key in defaultBreakdowns) {
    const obj = defaultBreakdowns[key];
    if (numericGrade >= obj.minGrade) {
      return obj.gpa;
    }
  }
};

// TODO: This doesn't work. Write tests and figure it out.
export const calculateGPA = courses => {
  let sumQualityPoints = 0;
  let sumCredits = 0;
  for (const key in courses) {
    const course = courses[key];
    const qualityPoints =
      convertNumericGradeToGPA(convertCategoriesToNumeric(course.categories)) *
      course.credits;
    if (!isNaN(qualityPoints)) {
      sumQualityPoints += qualityPoints;
      sumCredits += course.credits;
    }
  }
  return sumQualityPoints / sumCredits;
};

export const convertCategoriesToNumeric = categories => {
  let numerator = 0;
  let denominator = 0;
  for (const key in categories) {
    const category = categories[key];
    if (category.assignments) {
      numerator +=
        (convertAssignmentsToPercent(category.assignments) / 100) *
        category.weight;
      denominator += category.weight;
    }
  }
  let ans = (numerator / denominator) * 100;
  if (isNaN(ans)) {
    return "No Grade Data";
  } else {
    return ans;
  }
};

export const convertAssignmentsToPercent = assignments => {
  let sum = 0;
  let count = 0;
  for (const asg in assignments) {
    const asgRawScore =
      assignments[asg].pointsEarned / assignments[asg].pointsPossible;
    sum += asgRawScore;
    count += 1;
  }
  let value = (sum / count) * 100;
  if (isNaN(value)) {
    return "No Assignment Data";
  } else {
    return value;
  }
};

export const percentageSignUtil = data => {
  if (isNaN(data)) {
    return data;
  } else {
    return data + "%";
  }
};
