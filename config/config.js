/**
 * Created by Caim03 on 28/11/17.
 */

/**
 * File di configurazione
 * @type {{ipGateway: string, portGateway: string, apiGateway: string, portMaster: string, delayPing: number, apiMasterTree: string, apiMasterUpload: string, apiMasterGetFile: string, apiMasterDeleteFile: string, apiSlaveNewGuid: string, apiSlaveNewChunk: string, apiSlaveGetFile: string, apiRegistration: string, apiLogin: string}}
 */

var config = {
    ipGateway: "34.195.19.72",
    portGateway: "6602",
    apiGateway: "/api/lb/edge/subscribe",
    portMaster: "6601",
    delayPing: 60000,
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
