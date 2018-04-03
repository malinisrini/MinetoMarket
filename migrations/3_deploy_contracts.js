var Certificate = artifacts.require("./Certificate.sol");
var MineToMarket = artifacts.require("./MineToMarket.sol");
//var TestMiner = artifacts.require("./TestMiner.sol");


module.exports = function(deployer) {
  deployer.deploy(Certificate);
   deployer.deploy(MineToMarket);
//deployer.deploy(TestMiner);
};
