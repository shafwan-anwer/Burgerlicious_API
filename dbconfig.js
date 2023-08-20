 const config = {
    user: 'sa',
    password: 'Shafwan@123',
    server: 'localhost', // Make sure this is set correctly to your SQL Server hostname or IP address
    database: 'Burgerlicious',
    options: {
      trustServerCertificate: true,
    },
    port: 1433,
    jwtSecret: '1234567890' // Add your secret key here
  };

  module.exports = config;
  