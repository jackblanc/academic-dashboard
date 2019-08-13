import {
  convertCategoriesToNumeric,
  convertAssignmentsToPercent,
  convertNumericGradeToGPA,
  percentageSignUtil
} from "./util";

describe("Testing utility functions", () => {
  it("converts categories to a percentage score", () => {
    const sampleCategories = {
      "Final Exam": {
        assignments: {
          "Final Exam": {
            pointsEarned: 100,
            pointsPossible: 100
          }
        },
        weight: 50
      },
      "Midterm Exam": {
        assignments: {
          "Midterm Exam": {
            pointsEarned: 90,
            pointsPossible: 100
          }
        },
        weight: 50
      }
    };
    expect(convertCategoriesToNumeric(sampleCategories)).toBe(95);
    expect(convertCategoriesToNumeric()).toMatch("No Grade Data");
  });

  it("converts assignments to an average", () => {
    const sampleAssignments = {
      PS1: {
        pointsEarned: 80,
        pointsPossible: 100
      },
      PS2: {
        pointsEarned: 90,
        pointsPossible: 100
      },
      PS3: {
        pointsEarned: 100,
        pointsPossible: 100
      }
    };
    expect(convertAssignmentsToPercent(sampleAssignments)).toBe(90);
    expect(convertAssignmentsToPercent()).toMatch("No Assignment Data");
  });

  it("converts a numeric grade to a GPA score (default breakdowns)", () => {
    expect(convertNumericGradeToGPA(93)).toBe(4);
    expect(convertNumericGradeToGPA(90)).toBe(3.6667);
    expect(convertNumericGradeToGPA(87)).toBe(3.3333);
    expect(convertNumericGradeToGPA(83)).toBe(3);
    expect(convertNumericGradeToGPA(80)).toBe(2.6667);
    expect(convertNumericGradeToGPA(77)).toBe(2.3333);
    expect(convertNumericGradeToGPA(73)).toBe(2);
    expect(convertNumericGradeToGPA(70)).toBe(1.6667);
    expect(convertNumericGradeToGPA(67)).toBe(1.3333);
    expect(convertNumericGradeToGPA(63)).toBe(1);
    expect(convertNumericGradeToGPA(60)).toBe(0.6667);
    expect(convertNumericGradeToGPA(57)).toBe(0.3333);
    expect(convertNumericGradeToGPA(53)).toBe(0);
  });

  it("handles adding a percentage properly", () => {
    expect(percentageSignUtil(20)).toBe("20%");
    expect(percentageSignUtil("No Grade Data")).toBe("No Grade Data");
  });
});
