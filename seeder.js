
const dotenv =require('dotenv') 
const users= require('./data/users') 
const products =require('./data/products') 
const User= require('./models/User');
const Product =require('./models/Product') 
const Order= require( './models/Order')
const connectDB = require( './config/ConnectDB')

dotenv.config();
connectDB();

const constData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((p) => ({ user: adminUser, ...p }));
        await Product.insertMany(sampleProducts);

        console.log('Data Consumed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    constData();
}