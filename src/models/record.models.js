import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        uppercase: true,
    },
    unit: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    grade: {
        type: String,
        required: true,
        uppercase: true,
    },
});

const recordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, 
    level: {
        type: String,
        required: true,
    }, 
    semester: {
        type: String,
        required: true,
    }, 
    courses: [courseSchema],
    semesterGPA: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    }, 
    totalUnits: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0,
    },
}, {timestamps: true, versionKey: false});

const Record = mongoose.model("Record", recordSchema);

export default Record;