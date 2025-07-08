import Beat from '../models/beat.js';

export const createBeat = async (req, res) => {
  try {
    const beat = new Beat(req.body);
    await beat.save();
    res.status(201).json(beat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getBeats = async (req, res) => {
  try {
    const beats = await Beat.find().populate('artista');
    res.json(beats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};