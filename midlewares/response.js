// Response midleware: Manipulates Response 
const responseFormatter = (req, res, next) => {

    var send = res.json;
    res.json = function (body) {
        send.call(this, { status: 'success', message: 'Request was successful', dateAndTime: new Date(), ...body });
    };
    next()
};

module.exports = responseFormatter;