import Record from "../models/record.models.js";
import { calculateGPA } from "../services/gpa.service.js";

export const createRecord = async (req, res) => {
    try {
        const { level, semester, courses } = req.body;

        // Initial Validation
        if (!level || !semester || !courses || !Array.isArray(courses) || courses.length === 0) {
            return res.status(400).json({ message: "Level, semester, and courses are required." });
        }

        // Calculate GPA
        const { semesterGPA, totalUnits } = calculateGPA(courses);

        // Create a Record attached to the authenticated user
        const record = await Record.create({
            user: req.user._id,
            level,
            semester,
            courses,
            semesterGPA,
            totalUnits,
        });

        return res.status(201).json({ message: "Academic Record created successfully.", record });
    } catch (error) {
        console.error("Error creating record:", error);
        return res.status(500).json({ message: "Internal Server Error. Please try again later." });
    };
};