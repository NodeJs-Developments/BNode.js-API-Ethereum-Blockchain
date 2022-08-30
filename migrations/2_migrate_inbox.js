var IPFSInbox = artifacts.require("../contracts/Inbox");
module.exports = function(deployer) {
    deployer.deploy(IPFSInbox);
};