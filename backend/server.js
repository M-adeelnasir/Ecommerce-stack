const app = require('./app');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const routes = fs.readdirSync('./routes')
const connectDB = require('./config/db')
dotenv.config({ path: './config/config.env' })



connectDB()
const PORT = process.env.PORT || 5000;
app.use(cors());
if (process.env.NODE_ENV = "development") {
    app.use(morgan("dev"))
}

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
//routes
routes.map((r) => app.use('/api/v1', require('./routes/' + r)))



const server = app.listen(PORT, console.log(`Backend is listening ${process.env.NODE_ENV} at port ${PORT}`.brightCyan.bold))

process.on('unhandledRejection', (err, promise) => {
    console.log(`ERROR ===> ${err.message}`);
    server.close(process.exit(1))
})