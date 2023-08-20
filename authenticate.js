const express = require('express');
const router = express.Router();
const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    try {
      const { username, password, email } = req.body;
  
      await sql.connect(config);
  
      // Check if the user already exists
      const existingUser = await sql.query`SELECT * FROM Users WHERE Username = ${username}`;
      if (existingUser.recordset.length > 0) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the new user into the database
      const result = await sql.query`
        INSERT INTO Users (Username, PasswordHash, Email) VALUES (${username}, ${hashedPassword}, ${email});
      `;
  
      res.json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error signing up:', error.message);
      res.status(500).json({ error: 'An error occurred while signing up' });
    } finally {
      sql.close();
    }
  });

  router.post('/signin', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      await sql.connect(config);
  
      // Retrieve user by username
      const user = await sql.query`SELECT * FROM Users WHERE Username = ${username}`;
      if (user.recordset.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.recordset[0].PasswordHash);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Create and send JWT token
      const token = jwt.sign({ userId: user.recordset[0].UserID }, 'yourSecretKey');
      res.json({ token });
    } catch (error) {
      console.error('Error signing in:', error.message);
      res.status(500).json({ error: 'An error occurred while signing in' });
    } finally {
      sql.close();
    }
  });
  

  module.exports = router;