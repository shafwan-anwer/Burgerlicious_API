const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('./dbconfig');

//post categories
router.post('/categories', async (req, res) => {
  try {
    const { CategoryName } = req.body;

    await sql.connect(config);

    const result = await sql.query`
      INSERT INTO Categories (CategoryName)
      VALUES (${CategoryName});
    `;

    res.json({ message: 'Category added successfully' });
  } catch (error) {
    console.error('Error adding category:', error.message);
    res.status(500).json({ error: 'An error occurred while adding the category' });
  } finally {
    sql.close();
  }
});

//get categories
router.get('/categories', async (req, res) => {
    try {
      await sql.connect(config);
  
      const result = await sql.query`SELECT * FROM Categories`;
  
      res.json(result.recordset);
    } catch (error) {
      console.error('Error retrieving categories:', error.message);
      res.status(500).json({ error: 'An error occurred while fetching categories' });
    } finally {
      sql.close();
    }
  });

//edit categories
router.put('/categories/:id', async (req, res) => {
    try {
      const categoryID = req.params.id;
      const { CategoryName } = req.body;
  
      await sql.connect(config);
  
      const result = await sql.query`
        UPDATE Categories
        SET CategoryName = ${CategoryName}
        WHERE CategoryID = ${categoryID};
      `;
  
      res.json({ message: 'Category updated successfully' });
    } catch (error) {
      console.error('Error updating category:', error.message);
      res.status(500).json({ error: 'An error occurred while updating the category' });
    } finally {
      sql.close();
    }
  });

  //delete categories
  router.delete('/categories/:id', async (req, res) => {
    try {
      const categoryID = req.params.id;
  
      await sql.connect(config);
  
      const result = await sql.query`
        DELETE FROM Categories WHERE CategoryID = ${categoryID};
      `;
  
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error deleting category:', error.message);
      res.status(500).json({ error: 'An error occurred while deleting the category' });
    } finally {
      sql.close();
    }
  });
  
  
  

module.exports = router;