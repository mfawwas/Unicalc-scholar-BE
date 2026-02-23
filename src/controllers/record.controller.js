import { parse } from "dotenv";
import Record from "../models/record.models.js";
import { calculateGPA } from "../services/gpa.service.js";
import { getClassification } from "../services/classification.service.js";

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

export const getMyRecords = async (req, res) => {
    try {
        const records = await Record.find({ user: req.user._id })
        .sort({ createdAt: -1 });

        return res.status(200).json({ records });
    } catch (error) {
        console.error("Error fetching records:", error);
        return res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
};

export const getMyCGPA = async (req, res) => {
    try {
        const records = await Record.find({ user: req.user._id });

        if (records.length === 0) {
            return res.status(404).json({ message: "No academic records found for the user." });
        }

        let totalGradePoints = 0;
        let totalUnits = 0;

        records.forEach((record) => {
            const semesterGPA = parseFloat(record.semesterGPA);
            const units = parseFloat(record.totalUnits); 

            totalGradePoints += semesterGPA * units;
            totalUnits += units;
        });

        const cgpa = totalGradePoints / totalUnits;
        const finalCGPA = Number(cgpa.toFixed(2));
        const classification = getClassification(finalCGPA);

        return res.status(200).json({
            totalSemesters: records.length,
            totalUnits,
            cgpa: finalCGPA,
            classification,
        });
    } catch (error) {
        console.error("Error calculating CGPA:", error);
        return res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
};