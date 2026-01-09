import Note from "../models/Note.js";

//Print All Notes (GET)
export async function getAllNotes(_, res) {
  // Since we don't use req parameter in the function , we use '_' to skip it
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //.find() fetches all the notes
    // createdAt: - 1  is used to sort the notes in order of latest created date ( desc )
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller.", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//Print Specific Note By id (GET)
export async function getSpecificNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ message: "Note not found!" });
    }

    res.status(200).send(note);
  } catch (error) {
    console.error("Error in getSpecificNote controller.", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//Add A Note (POST)
export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller.", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//Edit A Note (UPDATE)
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found!" });

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).error({ message: "Server error", error });
  }
}

//Delete a Note (DELETE)
export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found!" });
    }

    res.status(200).json(`Note: ${deletedNote} deleted successfully!`);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
