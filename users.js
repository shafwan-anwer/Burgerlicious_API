const express = require('express');
const router = express.Router();
const dbConfig = require('./dbconfig'); // Import the dbconfig (corrected variable name)

const sql = require('mssql');
const config = {
  ...dbConfig,
  options: {
    ...dbConfig.options,
    enableArithAbort: true, // Add this line to avoid arithabort issues
  },
};


// Get all items
// GET endpoint to retrieve users
router.get('/users', async (req, res) => {
    try {
      // Connect to the database
      await sql.connect(config);
  
      // Query to fetch users
      const result = await sql.query`SELECT * FROM Users`;
  
      // Send the user data as the response
      res.json(result.recordset);
    } catch (error) {
      console.error('Error retrieving users:', error.message);
      res.status(500).json({ error: 'An error occurred while fetching users' });
    } finally {
      // Close the database connection
      sql.close();
    }
  });


  //add users
  router.post('/users', async (req, res) => {
    try {
      const { username, email, passwordHash, contact, createdAt } = req.body;
  
      await sql.connect(config);
  
      const result = await sql.query`
        INSERT INTO Users (Username, Email, PasswordHash, Contact, CreatedAt)
        VALUES (${username}, ${email}, ${passwordHash}, ${contact}, ${createdAt});
      `;
  
      res.json({ message: 'User added successfully' });
    } catch (error) {
      console.error('Error adding user:', error.message);
      res.status(500).json({ error: 'An error occurred while adding the user' });
    } finally {
      sql.close();
    }
  });

  //edit users
  router.put('/users/:id', async (req, res) => {
    try {
      const userID = req.params.id;
      const { username, email, passwordHash, contact, createdAt } = req.body;
  
      await sql.connect(config);
  
      const result = await sql.query`
        UPDATE Users
        SET Username = ${username}, Email = ${email}, PasswordHash = ${passwordHash}, Contact = ${contact}, CreatedAt = ${createdAt}
        WHERE UserID = ${userID};
      `;
  
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error.message);
      res.status(500).json({ error: 'An error occurred while updating the user' });
    } finally {
      sql.close();
    }
  });

  //delete users
  router.delete('/users/:id', async (req, res) => {
    try {
      const userID = req.params.id;
  
      await sql.connect(config);
  
      const result = await sql.query`
        DELETE FROM Users WHERE UserID = ${userID};
      `;
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error.message);
      res.status(500).json({ error: 'An error occurred while deleting the user' });
    } finally {
      sql.close();
    }
  });
  

module.exports = router;
