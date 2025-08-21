import mongoose, { Schema, Document } from "mongoose";

export interface IExample {
    input: string;
    output: string;
    explanation?: string;
    imageUrl?: string;
}

export interface IProblem extends Document {
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    topics: string[];
    companies?: string[];
    hints?: string[];
    statement: string;
    notice?: string;
    examples: IExample[];
    constraints: string[];
}

const ExampleSchema: Schema = new Schema({
    input: { type: String, required: true },
    output: { type: String, required: true },
    explanation: { type: String },
    imageUrl: { type: String },
});

const ProblemSchema: Schema = new Schema(
    {
        title: {
             type: String, 
             required: true 
        },
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true,
        },
        topics: [{ type: String }],
        companies: [{ type: String }],
        hints: [{ type: String }],
        statement: { type: String, required: true },
        notice: { type: String },
        examples: [ExampleSchema],
        constraints: [{ type: String }],
    },
    { timestamps: true }
);

const Problem = mongoose.model<IProblem>("Problem", ProblemSchema);

export default Problem
