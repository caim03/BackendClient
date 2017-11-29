/**
 * Created by Caim03 on 28/11/17.
 */

var config = {
    ipGateway: "192.168.1.9", //"34.206.63.183",
    portGateway: "6602",
    apiGateway: "/api/lb/edge/subscribe",
    portMaster: "6601",
    apiMasterTree: "/api/master/getDirectoryTree"
};

exports.getConfig = getConfigFn;

function getConfigFn() {
    return config;
}
