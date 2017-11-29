/**
 * Created by Caim03 on 29/11/17.
 */

var ipMaster = null;

exports.setIpMaster = setIpMasterFn;
exports.getIpMaster = getIpMasterFn;

function setIpMasterFn(master) {
    ipMaster = master;
}

function getIpMasterFn() {
    return ipMaster;
}