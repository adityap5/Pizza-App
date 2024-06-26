
const homeController =require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customer/cartController')
const orderController = require('../app/http/controllers/customer/orderController')
const guest = require('../app/http/middleware/guest')
function initroutes(app) {
  
    app.get('/',  homeController().index );
    app.get('/register',guest, authController().register);
    app.post('/register', authController().postRegister);

    app.get('/login',guest, authController().login);
    app.post('/login', authController().postLogin);
    app.post('/logout', authController().logout);
    
    app.get('/cart', cartController().index);
    app.post('/update-cart', cartController().update)
    app.post('/orders', orderController().store)
}

module.exports = initroutes;