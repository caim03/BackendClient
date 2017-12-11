/**
 * Created by Caim03 on 28/11/17.
 */

var config = {
    // ipGateway: "34.195.19.72",
    ipGateway:"172.17.0.2",
    portGateway: "6602",
    apiGateway: "/api/lb/edge/subscribe",
    portMaster: "6601",
    apiMasterTree: "/api/master/getDirectoryTree",
    apiMasterUpload: "/api/master/newFileData",
    apiMasterGetFile: "/api/master/readFile",
    apiMasterDeleteFile: "/api/master/deleteFile",
    apiSlaveNewGuid: "/api/chunk/newChunkGuidClient",
    apiSlaveNewChunk: "/api/chunk/newChunk",
    apiSlaveGetFile: "/api/chunk/readFile",
    apiRegistration: "/api/lb/edge/registration",
    apiLogin:"/api/lb/edge/login"

};

exports.getConfig = getConfigFn;

function getConfigFn() {
    return config;
}
