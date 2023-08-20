const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('./dbconfig');

//get reviews
router.get('/orderreviews', async (req, res) => {
    try {
      await sql.connect(config);
  
      const result = await sql.query`SELECT * FROM OrderReviews`;
  
      res.json(result.recordset);
    } catch (error) {
      console.error('Error retrieving order reviews:', error.message);
      res.status(500).json({ error: 'An error occurred while fetching order reviews' });
    } finally {
      sql.close();
    }
  });

//add reviews
router.post('/orderreviews', async (req, res) => {
    try {
      const { OrderID, UserID, Rating, Comment } = req.body;
  
      await sql.connect(config);
  
      const result = await sql.query`
        INSERT INTO OrderReviews (OrderID, UserID, Rating, Comment)
        VALUES (${OrderID}, ${UserID}, ${Rating}, ${Comment});
      `;
  
      res.json({ message: 'Order review added successfully' });
    } catch (error) {
      console.error('Error adding order review:', error.message);
      res.status(500).json({ error: 'An error occurred while adding the order review' });
    } finally {
      sql.close();
    }
  });

//edit reviews
router.put('/orderreviews/:id', async (req, res) => {
    try {
      const reviewID = req.params.id;
      const { OrderID, UserID, Rating, Comment } = req.body;
  
      await sql.connect(config);
  
      const result = await sql.query`
        UPDATE OrderReviews
        SET OrderID = ${OrderID}, UserID = ${UserID}, Rating = ${Rating}, Comment = ${Comment}
        WHERE ReviewID = ${reviewID};
      `;
  
      res.json({ message: 'Order review updated successfully' });
    } catch (error) {
      console.error('Error updating order review:', error.message);
      res.status(500).json({ error: 'An error occurred while updating the order review' });
    } finally {
      sql.close();
    }
  });
  
//delete reviews
router.delete('/orderreviews/:id', async (req, res) => {
    try {
      const reviewID = req.params.id;
  
      await sql.connect(config);
  
      const result = await sql.query`
        DELETE FROM OrderReviews WHERE ReviewID = ${reviewID};
      `;
  
      res.json({ message: 'Order review deleted successfully' });
    } catch (error) {
      console.error('Error deleting order review:', error.message);
      res.status(500).json({ error: 'An error occurred while deleting the order review' });
    } finally {
      sql.close();
    }
  });
  

module.exports = router;