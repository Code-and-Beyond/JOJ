import mongoose, { Schema } from "mongoose";
import validator from 'validator';

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(val: string) {
                if (!validator.isEmail(val)) {
                    throw new Error("Invalid  Email");
                }
            },
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            trim: true
        },
        age: {
            type: Number,
            validate(val: number) {
                if (val <= 0) {
                    throw new Error("Age must be a postive number");
                }
            },
            required: true
        },
        contact: {
            type: String,
            minlength: 10,
            maxlength: 10,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin']
        },
        bookings: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Ticket'
            }
        ],
    },
    {
        timestamps: true
    }
);

const Student = mongoose.model<IStudent>("Student", studentSchema);
export default Student;