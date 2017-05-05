'use strict';
function userDecorator(controller) {
    controller.request('post', function(req, res, next) {
        if (!req.body.password) {
            res.status(422).json({
                'message': 'password required.',
                'name': 'ValidationError',
                'type': 'required'
            });
            return;
        }
        next();
    });
}
module.exports = userDecorator;
