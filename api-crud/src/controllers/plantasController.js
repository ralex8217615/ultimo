import { pool } from "../db.js";

// GET ALL 
export const getPlantas = async (req, res) => {
  try {
    // Crea la tabla
    await pool.query(`
      CREATE TABLE IF NOT EXISTS plantas (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        dificultad VARCHAR(20) NOT NULL,
        descripcion TEXT
      );
    `);

    const result = await pool.query("SELECT * FROM plantas ORDER BY id ASC");
    res.json(result.rows); 
  } catch (error) {
    console.error("Error en el query:", error.message);
    res.status(500).json({ error: error.message }); 
  }
};

// GET POR ID
export const getPlantaById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM plantas WHERE id = $1",
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ mensaje: "No encontrada" });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST
export const createPlanta = async (req, res) => {
  try {
    const { nombre, dificultad, descripcion } = req.body;
    const result = await pool.query(
      "INSERT INTO plantas(nombre, dificultad, descripcion) VALUES($1,$2,$3) RETURNING *",
      [nombre, dificultad, descripcion]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT
export const updatePlanta = async (req, res) => {
  try {
    const { nombre, dificultad, descripcion } = req.body;
    const result = await pool.query(
      "UPDATE plantas SET nombre=$1, dificultad=$2, descripcion=$3 WHERE id=$4 RETURNING *",
      [nombre, dificultad, descripcion, req.params.id]
    );
    res.json({ mensaje: "Actualizado", planta: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deletePlanta = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM plantas WHERE id=$1", [req.params.id]);
    res.json({ mensaje: "Eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};