
module.exports = function setupRequest(req, res, next) {
    req.body=JSON.parse(req.body.data);
    req.body.images=[];
    next();
}
