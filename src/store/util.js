export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const convertCourseToQualityPoints

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
  ans = ans.toFixed(2);
  return ans;
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
  value = value.toFixed(2);
  return value;
};
