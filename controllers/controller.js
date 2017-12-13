/**
 * Created by Caim03 on 28/11/17.
 */

var config = require('../config/config');
var request = require('request');
var syncRequest = require('sync-request');
var master = require('../model/masterModel');
var fs = require('fs');

exports.getMaster = getMasterFn;
exports.getDirectoryTree = getDirectoryTreeFn;
exports.getFile = getFileFn;
exports.uploadFile = uploadFileFn;
exports.deleteFile = deleteFileFn;
exports.addUser = addUserFn;
exports.login = loginFn;
exports.verifyConnection = verifyConnectionFn;


function getMasterFn() {
    console.log("Searching master server...");

    var data = {
        url: 'http://' + config.getConfig().ipGateway + ':' + config.getConfig().portGateway + config.getConfig().apiGateway,
        method: 'GET'
    };

    var res = syncRequest(data.method, data.url);
    master.setIpMaster(JSON.parse(res.getBody('utf8')).masterIp);  // utf8 convert body from buffer to string
    console.log(master.getIpMaster());
}

function getDirectoryTreeFn(req, res) {
    console.log("Connecting master...");

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

function getFileFn(req, res) {
    console.log("Getting file...");

    var data = {
        url: 'http://' + master.getIpMaster() + ':' + config.getConfig().portMaster + config.getConfig().apiMasterGetFile,
        method: 'POST',
        json: {
            guid: req.body.guid,
            user: req.body.user
        }
    };

    var fileReq = {
        user: req.body.user,
        path: req.body.path
    };

    //fs.createReadStream("/Users/Caim03/Documents/prova.txt").pipe(res);
    /*res.write(file, 'binary');
    res.end();*/

    request(data, function(err, response) {
        if (err) {
            console.log(err);
        }
        else {
            var slaves = response.body;
            var i = 0;
            var data = {
                url: 'http://' + slaves[i].slaveIp + ':' + config.getConfig().portMaster + config.getConfig().apiSlaveGetFile,
                method: 'POST',
                json: fileReq
            };
            request(data, function(err, response2) {
                if (err) {
                    console.log(err);
                }
                else {
                    //console.log(response2.body);
                    res.send(response2.body);
                    res.end();
                    return;
                    }
            });
        }
    })
}

function uploadFileFn(req, response) {
    console.log("Uploading file...");

    console.log(req.files.file);
    console.log(req.body.username);
    console.log(req.body.path);

    var file = req.files.file;
    var username = req.body.username;
    var destPath = req.body.path;

    console.log("Sending metadata to master...");

    var obj = {
        url: 'http://' + master.getIpMaster() + ':' + config.getConfig().portMaster + config.getConfig().apiMasterUpload,
        method: 'POST',
        json: {
            type: "METADATA",
            fileName: file.name,
            origAbsPath: file.path, // path temporaneo, non indicativo!!!
            destRelPath: destPath,
            sizeFile: file.size,
            idUser: username
        }
    };

    request(obj, function(err, res){
        if(err){
            console.log(err);
        }

        if(res.body.type === 'UPINFO') {
            var guid = res.body.guid;

            res.body.ipSlaves.forEach(function (ip) {
                console.log("->  Sending (" + guid + " - " + username + ") to " + ip);
                var objGuidUser = {
                    url: 'http://' + ip + ':' + config.getConfig().portMaster + config.getConfig().apiSlaveNewGuid,
                    method: 'POST',
                    json: {
                        type: "GUID_CLIENT",
                        guid: guid,
                        idUser: username
                    }
                };

                //Sending guid-idClient to slaves
                request(objGuidUser, function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    if (res.body.type === 'ACK_PENDING') {
                        console.log("Received ack to upload file from "+ip);

                        console.log("Sending to " + ip +'\n');
                        var formData = {
                            guid: guid,
                            idUser: username,
                            destRelPath: destPath,
                            my_file: fs.createReadStream(file.path)
                        };

                        request.post({url:'http://'+ ip + ':' + config.getConfig().portMaster + config.getConfig().apiSlaveNewChunk, formData: formData}, function optionalCallback(err, res) {
                            if (err) {
                                return console.error('Upload failed:', err);
                            }
                            else if(res.statusCode === 200)
                            {
                                var jsonRes = JSON.parse(res.body);
                                if(jsonRes.type === 'FILE_SAVED_SUCCESS')
                                {
                                    console.log("Uploading "+jsonRes.nameFile+" SUCCESS!!!!!\n");
                                    response.status(200);
                                    response.send({
                                        type: "UPLOAD",
                                        state: "Success"
                                    })
                                }
                            }
                        });
                    }
                });
            });
        }

    })
}

function deleteFileFn(req, response) {
    console.log("DELETE");
    var metadata = {
        url: 'http://' + master.getIpMaster() + ':' + config.getConfig().portMaster + config.getConfig().apiMasterDeleteFile,
        method: 'POST',
        json: {
            type: "REMOVAL",
            relPath: req.body.path,
            idUser: req.body.idUser
        }
    };

    request(metadata, function(err, res) {
        if(err) {
            console.log(err);
        }
        else {
            if (res.body.type === "DELETE_SUCCESS") {
                response.send(res.body);
            }
            else {
                response.send(res.body.type);
            }
        }
    })
}

function addUserFn(req, response) {

  console.log("Registration request: ("+req.body.username+", "+req.body.password+")");

  var obj = {
    url: 'http://' + config.getConfig().ipGateway + ':' + config.getConfig().portGateway + config.getConfig().apiRegistration,
    method: 'POST',
    json: {
      type: "REGISTRATION",
      idUser: req.body.username,
      password: req.body.password
    }
  };

  console.log(obj);

  request(obj, function (err, res) {
    if (err) {
      console.log(err);
    }
    else if(res.body.status === "REGISTRATION_SUCCESS") {
      console.log("Registration success!");
      response.send({type: "REGISTRATION_SUCCESS"});
    }
    else if(res.body.status === 'USER_ID_EXISTS') {
        console.log("Id User " + req.body.username + " already exists!");
        response.send({type: "FAILURE"});
    }
  });
}


function loginFn(req, response) {
  console.log(req.body.username+" wants to login.");

  var obj = {
    url: 'http://' + config.getConfig().ipGateway + ':' + config.getConfig().portGateway + config.getConfig().apiLogin,
    method: 'POST',
    json: {
      type: "LOGIN",
      idUser: req.body.username,
      password: req.body.password
    }
  };

  request(obj, function (err, res) {

    if (err) {
      console.log(err);
    }
    else if (res.body.status === "LOGIN_SUCCESS") {
      console.log("Login success for "+req.body.idUser+"!");
      response.send({type: "LOGIN_SUCCESS"});
    }
    else if(res.body.status === "WRONG_USER_ID")
    {
      console.log("User id "+req.body.idUser+" does not exist!");
      response.send({type: "WRONG_USER_ID"});
    }
    else if(res.body.status === "WRONG_PASSWORD")
    {
      console.log("Wrong password for "+req.body.idUser+"!");
      response.send({type: "WRONG_PASSWORD"});
    }
  });
  response.send({type: "LOGIN_SUCCESS"});

}

function verifyConnectionFn() {
    setInterval(function () {
        var data = {
            url: 'http://' + config.getConfig().ipGateway + ':' + config.getConfig().portGateway + config.getConfig().apiGateway,
            method: 'GET'
        };

        request(data, function(err, res){
            console.log(JSON.parse(res.body).masterIp);
            master.setIpMaster(JSON.parse(res.body).masterIp);
            console.log(master.getIpMaster());
        })
    }, config.getConfig().delayPing);
}
