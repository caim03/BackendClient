/**
 * Created by Caim03 on 28/11/17.
 */

var config = {
    ipGateway: "34.206.63.183",
    portGateway: "6602",
    apiGateway: "/api/lb/edge/subscribe",
    portMaster: "6601",
    apiMasterTree: "/api/master/getDirectoryTree",
    apiMasterUpload: "/api/master/newFileData",
    apiMasterGetFile: "/api/master/readFile",
    apiSlaveNewGuid: "/api/chunk/newChunkGuidClient",
    apiSlaveNewChunk: "/api/chunk/newChunk",
    apiSlaveGetFile: "/api/chunk/readFile"
};

exports.getConfig = getConfigFn;

function getConfigFn() {
    return config;
}
