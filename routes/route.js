/**
 * Created by Caim03 on 12/09/17.
 */
module.exports = function (app) {

    var controller = require('../controllers/controller');

    app.post('/api/backend/getDirectory', controller.getDirectoryTree);
};
