const GRADE_POINTS = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    E: 1,
    F: 0,
};

export const calculateGPA = (courses) => {
    let totalPoints = 0;
    let totalUnits = 0;

    for (const course of courses) {
        const { unit, grade } = course;

        const gradePoint = GRADE_POINTS[grade.toUpperCase()];

        if (gradePoint === undefined) {
            throw new Error(`Invalid grade '${grade}' for course '${course.code}'`);
        }

        totalUnits += unit;
        totalPoints += unit * gradePoint;
    }

    const gpa = totalUnits === 0 ? 0 : totalPoints / totalUnits;

    return {
       semesterGPA: Number(gpa.toFixed(2)),
       totalUnits,
    };
};