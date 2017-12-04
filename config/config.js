/**
 * Created by Caim03 on 28/11/17.
 */

var config = {
    ipGateway: /*"10.220.215.244", */ "34.206.63.183",
    portGateway: "6602",
    apiGateway: "/api/lb/edge/subscribe",
    portMaster: "6601",
    apiMasterTree: "/api/master/getDirectoryTree",
    apiMasterUpload: "/api/master/newFileData",
    apiMasterGetFile: "/",
    apiSlaveNewGuid: "/api/chunk/newChunkGuidClient",
    apiSlaveNewChunk: "/api/chunk/newChunk"
};

exports.getConfig = getConfigFn;

function getConfigFn() {
    return config;
}
