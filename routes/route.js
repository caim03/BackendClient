/**
 * Created by Caim03 on 12/09/17.
 */
module.exports = function (app) {

    var controller = require('../controllers/controller');
    var multiparty = require('connect-multiparty');
    var middleware = multiparty();

    app.post('/api/backend/getDirectory', controller.getDirectoryTree);
    app.post('/api/backend/getFile', controller.getFile);

    app.post('/api/backend/uploadFile', middleware, controller.uploadFile);
    app.post('/api/backend/deleteFile', controller.deleteFile);
};
