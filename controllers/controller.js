/**
 * Created by Caim03 on 28/11/17.
 */

var config = require('../config/config');
var request = require('request');
var syncRequest = require('sync-request');
var master = require('../model/masterModel');

exports.getMaster = getMasterFn;
exports.getDirectoryTree = getDirectoryTreeFn;

function getMasterFn() {
    console.log("Searching master server...");

    var data = {
        url: 'http://' + config.getConfig().ipGateway + ':' + config.getConfig().portGateway + config.getConfig().apiGateway,
        method: 'GET'
    };

    var res = syncRequest(data.method, data.url);
    master.setIpMaster(res.getBody('utf8'));  // utf8 convert body from buffer to string

    console.log(master.getIpMaster());
}

function getDirectoryTreeFn(req, res) {
    console.log("Connecting gateway...");

    var data = {
        url: 'http://' + master.getIpMaster() + ':' + config.getConfig().portMaster + config.getConfig().apiMasterTree,
        method: 'POST',
        json: {
            username: req.body.username
        }
    };

    request(data, function(err, response) {
        if (err) {
            console.log(err);
            return null;
        }
        else {
            res.send(response.body);
        }
    });
}