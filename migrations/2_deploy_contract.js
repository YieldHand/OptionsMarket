const Core = artifacts.require("Core");
const Usdc = artifacts.require("Usdc");
const Dai = artifacts.require("Dai");

module.exports = function (deployer) {
  deployer.deploy(Core);
  deployer.deploy(Usdc);
  deployer.deploy(Dai);
};
