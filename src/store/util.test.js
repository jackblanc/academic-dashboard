import {
  convertCategoriesToNumeric,
  convertAssignmentsToPercent
} from "./util";

describe("Testing utility functions", () => {
  it("converts categories to a percentage score", () => {
    const sampleCategories = {
      "Final Exam": {
        assignments: {
          "Final Exam": "90/100"
        },
        weight: 50
      },
      "Midterm Exam": {
        assignments: {
          "Midterm Exam": "80/100"
        },
        weight: 50
      }
    };
    expect(convertCategoriesToNumeric(sampleCategories)).toBe("85.00");
  });

  it("converts assignments to an average", () => {
    const sampleAssignments = {
      PS1: "80/100",
      PS2: "90/100",
      PS3: "100/100"
    };
    expect(convertAssignmentsToPercent(sampleAssignments)).toBe("90.00");
  });
});
