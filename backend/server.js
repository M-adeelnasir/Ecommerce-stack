const app = require('./app');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' })


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server is running up on port ${PORT}`.cyan))

process.on('unhandledRejection', (err, promise) => {
    console.log(`ERROR ===> ${err.message}`);
    server.close(process.exit(1))
})