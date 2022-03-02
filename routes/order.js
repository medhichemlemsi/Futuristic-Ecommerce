const express =require('express') ;
const {
    addOrderItems,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid,
} =require('../controllers/orderController') ;
const { admin, protect } =require('../middlewares/authAdmin') ;

const router = express.Router();

router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
router.route('/:id').get(protect, getOrderById);
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

module.exports= router;