const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('./dbconfig');

//get ingredients
router.get('/ingredients', async (req, res) => {
    try {
      await sql.connect(config);
  
      const result = await sql.query`SELECT * FROM Ingredients`;
  
      res.json(result.recordset);
    } catch (error) {
      console.error('Error retrieving ingredients:', error.message);
      res.status(500).json({ error: 'An error occurred while fetching ingredients' });
    } finally {
      sql.close();
    }
  });

//send ingredients
router.post('/ingredients', async (req, res) => {
    try {
      const { IngredientName, Price, Description, ImageURL, CategoryID } = req.body;
  
      await sql.connect(config);
  
      const result = await sql.query`
        INSERT INTO Ingredients (IngredientName, Price, Description, ImageURL, CategoryID)
        VALUES (${IngredientName}, ${Price}, ${Description}, ${ImageURL}, ${CategoryID});
      `;
  
      res.json({ message: 'Ingredient added successfully' });
    } catch (error) {
      console.error('Error adding ingredient:', error.message);
      res.status(500).json({ error: 'An error occurred while adding the ingredient' });
    } finally {
      sql.close();
    }
  });

  //delete ingredients
  router.delete('/ingredients/:id', async (req, res) => {
    try {
      const ingredientID = req.params.id;
  
      await sql.connect(config);
  
      const result = await sql.query`
        DELETE FROM Ingredients WHERE IngredientID = ${ingredientID};
      `;
  
      res.json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
      console.error('Error deleting ingredient:', error.message);
      res.status(500).json({ error: 'An error occurred while deleting the ingredient' });
    } finally {
      sql.close();
    }
  });

  //edit products
  router.put('/ingredients/:id', async (req, res) => {
    try {
      const ingredientID = req.params.id;
      const { IngredientName, Price, Description, ImageURL, CategoryID } = req.body;
  
      await sql.connect(config);
  
      const result = await sql.query`
        UPDATE Ingredients
        SET IngredientName = ${IngredientName}, Price = ${Price}, Description = ${Description}, ImageURL = ${ImageURL}, CategoryID = ${CategoryID}
        WHERE IngredientID = ${ingredientID};
      `;
  
      res.json({ message: 'Ingredient updated successfully' });
    } catch (error) {
      console.error('Error updating ingredient:', error.message);
      res.status(500).json({ error: 'An error occurred while updating the ingredient' });
    } finally {
      sql.close();
    }
  });
  
  
module.exports = router;