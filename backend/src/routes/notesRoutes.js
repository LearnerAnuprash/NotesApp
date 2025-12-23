import express from "express";
import {
  createNote,
  getSpecificNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controllers/notesController.js";

// Call Router() method
const router = express.Router();

//GET All Notes
router.get("/", getAllNotes);

//GET Specific Note
router.get("/:id", getSpecificNote);

//CREATE Notes
router.post("/", createNote);

//UPDATE Notes
router.put("/:id", updateNote);

//DELETE Notes
router.delete("/:id", deleteNote);

export default router;
