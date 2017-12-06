/**
 * Created by Caim03 on 28/11/17.
 */

var config = {
    ipGateway: "34.195.19.72",
    portGateway: "6602",
    apiGateway: "/api/lb/edge/subscribe",
    portMaster: "6601",
    apiMasterTree: "/api/master/getDirectoryTree",
    apiMasterUpload: "/api/master/newFileData",
    apiMasterGetFile: "/api/master/readFile",
    apiMasterDeleteFile: "/api/master/deleteFile",
    apiSlaveNewGuid: "/api/chunk/newChunkGuidClient",
    apiSlaveNewChunk: "/api/chunk/newChunk",
    apiSlaveGetFile: "/api/chunk/readFile"
};

exports.getConfig = getConfigFn;

function getConfigFn() {
    return config;
}
