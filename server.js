const path=require('path')
const express = require('express');
const cors = require('cors')
const passport = require('passport')
// const path = require('path');
require('dotenv').config() 
const connectDB = require('./config/ConnectDB')
//initialize express
const app = express();
const { errorHandler, notFound }=require('./middlewares/errorHandler') ;
//parse data
app.use(express.json());

app.use(cors());

//Initialize Passport Startegy
app.use(passport.initialize())


//import Routes
const userRoutes = require('./routes/user');
const productRoutes= require('./routes/item');
const uploadRoutes=require('./routes/upload')
const orderRoutes = require('./routes/order');



//use routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/orders', orderRoutes);

// connect to database
connectDB()



app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
);
const _dirname = path.resolve();
app.use('/uploads', express.static(path.join(_dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(_dirname, '/client/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}
app.use(notFound);
app.use(errorHandler);

//PORT allocation
const port=process.env.PORT || 5000;
app.listen(port,(err)  => {
    err?console.log('Server connection failed',err) 
    :console.log(`Server is runnning on port ${port}`);
})