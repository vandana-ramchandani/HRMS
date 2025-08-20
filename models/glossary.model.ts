import mongoose, { Schema, Document } from "mongoose";

export interface IGlossary extends Document {
    term: string;
    definition: string;
    category: string; 
}

const GlossarySchema: Schema = new Schema(
    {
        term: { type: String, required: true, unique: true },
        definition: { type: String, required: true },
        category: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IGlossary>("Glossary", GlossarySchema);