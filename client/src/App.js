import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import ProductScreen from './Components/ProductScreen';
import Cart from './Components/Cart';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Shipping from './Components/Shipping';
import Payment from './Components/Payment';
import PlaceOrder from './Components/PlaceOrder';
import Order from './Components/Order';
import UserList from './Components/UserList';
import OrderList from './Components/OrderList';
import ProductList from './Components/ProductList';
import ProductEdit from './Components/ProductEdit';

const App = () => {
    return (
        <Router>
            <Header />
            <main className='py-3'>
                <Container>
                    <Route path='/orders/:id' component={Order} />
                    <Route path='/shipping' component={Shipping} />
                    <Route path='/payment' component={Payment} />
                    <Route path='/placeorder' component={PlaceOrder} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/products/:id' component={ProductScreen} />
                    <Route path='/cart/:id?' component={Cart} />
                    <Route path='/admin/userlist' component={UserList} />
                    <Route
                        path='/admin/products/:id/edit'
                        component={ProductEdit}
                    />
                    <Route
                        path='/admin/productlist'
                        component={ProductList}
                    />
                    <Route
                        path='/admin/orderlist'
                        component={OrderList}
                    />
                    <Route path='/' component={Home} exact />
                </Container>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
