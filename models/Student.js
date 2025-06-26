import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    matricNumber: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
// This schema defines the structure of a Student document in MongoDB.
// It includes fields for name, matriculation number, email, and password hash.
// Each field has validation rules such as required and uniqueness where applicable.
// The schema also includes timestamps to track when the document was created and last updated.
// The model is exported for use in other parts of the application, such as controllers or services.