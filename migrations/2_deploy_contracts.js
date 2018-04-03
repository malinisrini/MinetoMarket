//var MineToMarket = artifacts.require("./MineToMarket.sol");
var Miner = artifacts.require("./Miner.sol");
//var TestMiner = artifacts.require("./TestMiner.sol");
var RoughTrader = artifacts.require("./RoughTrader.sol");
var CuttingPolisher = artifacts.require("./CuttingPolisher.sol");
var Certificate = artifacts.require("./Certificate.sol");
var Manufacturer = artifacts.require("./Manufacturer.sol");
var Retailer = artifacts.require("./Retailer.sol");

module.exports = function(deployer) {
  //deployer.deploy(MineToMarket);
  deployer.deploy(Miner);
  //deployer.deploy(TestMiner);
  deployer.deploy(RoughTrader);
  deployer.deploy(CuttingPolisher);
  deployer.deploy(Certificate);
  deployer.deploy(Manufacturer);
  deployer.deploy(Retailer);

};
