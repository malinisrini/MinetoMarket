
let fs = require("fs");
let solc = require("solc");
let Web3 = require('web3');

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));


const input = fs.readFileSync('../contracts/Miner.sol');
const output = solc.compile(input.toString(), 1);
//console.log(output.contracts['Miner'].bytecode);
//console.log (output);
const bytecode = output.contracts[':Miner'].bytecode;
const abi = JSON.parse(output.contracts[':Miner'].interface);

const minerContract = web3.eth.contract(abi);
console.log (minerContract);


console.log ("Creating Contract");

const minerInstance = minerContract.new ("Orapa", "Botswana", {
	data: '0x' + bytecode,
	from: web3.eth.accounts[0],
	//from: '0x9df54fafcea2126463b29ebb9a46807e63e8507c',
        gas: 1500000	

}, (err, res) => {
        if (err) {
	console.log ("Sorry Error");
	console.log(err);
	return;
	}

	console.log ("Hash"+res.transactionHash);

	if (res.address) {
		console.log ('Miner Contract 1 Address: ' + res.address);
		console.log ('SUCCCCESSSSSSSSSSSSSSSSFUL MINER CONTRACT DEPLOYMENT - CONGRAAAAAAAAAAAAAAAATS');
	}

}); 

const minerInstance2 = minerContract.new ("Dominion", "Canada", {
	data: '0x' + bytecode,
	from: web3.eth.accounts[0],
	//from: '0x9df54fafcea2126463b29ebb9a46807e63e8507c',
        gas: 1500000	

}, (err, res) => {
        if (err) {
	console.log ("Sorry Error");
	console.log(err);
	return;
	}

	console.log ("Hash"+res.transactionHash);

	if (res.address) {
		console.log ('Miner Contract 2 Address: ' + res.address);
		console.log ('SUCCCCESSSSSSSSSSSSSSSSFUL MINER CONTRACT DEPLOYMENT - CONGRAAAAAAAAAAAAAAAATS');
	}

});

/*console.log ("Interacting with contract Miner" + minerContract);
minerInstance = minerContract.at("0xc9eeaf62333de21c547f578534d2defdf15cd957");
console.log ("Miner Contract:" + minerInstance.address);
minername = minerInstance.GetMinerName.call().toString();
console.log ("Miner Name: " + minername);*/






