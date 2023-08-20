const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('./dbconfig');

//get orderCustomization
router.get('/ordercustomizations', async (req, res) => {
    try {
      await sql.connect(config);
  
      const result = await sql.query`SELECT * FROM OrderCustomizations`;
  
      res.json(result.recordset);
    } catch (error) {
      console.error('Error retrieving order customizations:', error.message);
      res.status(500).json({ error: 'An error occurred while fetching order customizations' });
    } finally {
      sql.close();
    }
  });

  //add order customization
  router.post('/ordercustomizations', async (req, res) => {
    try {
      const { OrderID, IngredientID } = req.body;
  
      await sql.connect(config);
  
      const result = await sql.query`
        INSERT INTO OrderCustomizations (OrderID, IngredientID)
        VALUES (${OrderID}, ${IngredientID});
      `;
  
      res.json({ message: 'Order customization added successfully' });
    } catch (error) {
      console.error('Error adding order customization:', error.message);
      res.status(500).json({ error: 'An error occurred while adding the order customization' });
    } finally {
      sql.close();
    }
  });

  //edit ordercustomization
  router.put('/ordercustomizations/:id', async (req, res) => {
    try {
      const orderCustomizationID = req.params.id;
      const { OrderID, IngredientID } = req.body;
  
      await sql.connect(config);
  
      const result = await sql.query`
        UPDATE OrderCustomizations
        SET OrderID = ${OrderID}, IngredientID = ${IngredientID}
        WHERE OrderCustomizationID = ${orderCustomizationID};
      `;
  
      res.json({ message: 'Order customization updated successfully' });
    } catch (error) {
      console.error('Error updating order customization:', error.message);
      res.status(500).json({ error: 'An error occurred while updating the order customization' });
    } finally {
      sql.close();
    }
  });

  //delete ordercustomization
  router.delete('/ordercustomizations/:id', async (req, res) => {
    try {
      const orderCustomizationID = req.params.id;
  
      await sql.connect(config);
  
      const result = await sql.query`
        DELETE FROM OrderCustomizations WHERE OrderCustomizationID = ${orderCustomizationID};
      `;
  
      res.json({ message: 'Order customization deleted successfully' });
    } catch (error) {
      console.error('Error deleting order customization:', error.message);
      res.status(500).json({ error: 'An error occurred while deleting the order customization' });
    } finally {
      sql.close();
    }
  });
  
  
  
  
  module.exports = router;