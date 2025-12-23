import mongoose from "mongoose";

//1-create schema
//1- model based on that schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Name of model = Note as first parameter
//Schema/ Structure of model = noteSchema defined above as second parameter
const Note = mongoose.model("Note", noteSchema);
export default Note;
