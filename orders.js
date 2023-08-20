const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('./dbconfig');

//get orders
router.get('/orders', async (req, res) => {
    try {
      await sql.connect(config);
  
      const result = await sql.query`SELECT * FROM Orders`;
  
      res.json(result.recordset);
    } catch (error) {
      console.error('Error retrieving orders:', error.message);
      res.status(500).json({ error: 'An error occurred while fetching orders' });
    } finally {
      sql.close();
    }
  });

  //add orders
  router.post('/orders', async (req, res) => {
    try {
      const { UserID, OrderDate, TotalAmount } = req.body;
  
      await sql.connect(config);
  
      const result = await sql.query`
        INSERT INTO Orders (UserID, OrderDate, TotalAmount)
        VALUES (${UserID}, ${OrderDate}, ${TotalAmount});
      `;
  
      res.json({ message: 'Order added successfully' });
    } catch (error) {
      console.error('Error adding order:', error.message);
      res.status(500).json({ error: 'An error occurred while adding the order' });
    } finally {
      sql.close();
    }
  });

  //edit orders
  router.put('/orders/:id', async (req, res) => {
    try {
      const orderID = req.params.id;
      const { UserID, OrderDate, TotalAmount } = req.body;
  
      await sql.connect(config);
  
      const result = await sql.query`
        UPDATE Orders
        SET UserID = ${UserID}, OrderDate = ${OrderDate}, TotalAmount = ${TotalAmount}
        WHERE OrderID = ${orderID};
      `;
  
      res.json({ message: 'Order updated successfully' });
    } catch (error) {
      console.error('Error updating order:', error.message);
      res.status(500).json({ error: 'An error occurred while updating the order' });
    } finally {
      sql.close();
    }
  });

  //delete orders
  router.delete('/orders/:id', async (req, res) => {
    try {
      const orderID = req.params.id;
  
      await sql.connect(config);
  
      const result = await sql.query`
        DELETE FROM Orders WHERE OrderID = ${orderID};
      `;
  
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error.message);
      res.status(500).json({ error: 'An error occurred while deleting the order' });
    } finally {
      sql.close();
    }
  });
  
  
  
  

module.exports = router;