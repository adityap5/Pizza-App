function cartController(params) {    //factory function
    return {
        index(req,res){
            res.render('customers/cart')
        }
    }
}

module.exports = cartController;