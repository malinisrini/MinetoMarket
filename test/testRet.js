
let fs = require("fs");
let solc = require("solc");
let Web3 = require('web3');

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));


const input = fs.readFileSync('../contracts/Retailer.sol');
const output = solc.compile(input.toString(), 1);

const bytecode = output.contracts[':Retailer'].bytecode;
const abi = JSON.parse(output.contracts[':Retailer'].interface);

const retContract = web3.eth.contract(abi);
console.log (retContract);


console.log ("Creating Retailer Contract");

const retInstance = retContract.new ("Blue Nile", "USA", "500",{
	data: '0x' + bytecode,
	from: web3.eth.accounts[4],
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
		console.log ('Retailer Contract Address 1: ' + res.address);
		console.log ('SUCCCCESSSSSSSSSSSSSSSSFUL RETAILER CONTRACT DEPLOYMENT - CONGRAAAAAAAAAAAAAAAATS');
	}

}); 

const retInstance2 = retContract.new ("Retailer TRader 2", "Botswana", "201",{
	data: '0x' + bytecode,
	from: web3.eth.accounts[4],
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
		console.log (' ');
		console.log ('Retailer Contract Address 2: ' + res.address);
		console.log (' ');
		console.log ('SUCCCCESSSSSSSSSSSSSSSSFUL RETAILER CONTRACT DEPLOYMENT - CONGRAAAAAAAAAAAAAAAATS');
	}

}); 

//var minerAddress = minerContract.at(minerInstance.address);
//console.log ('Miner Instance Address: ' minerInstance.address);


//const _status = minerContract.deploy({
  //  data: bytecode,
  //  arguments: ["Petra Diamonds", "Botswana", "BOTS123456"]
//})
//.send({
  //  from: '0x1234567890123456789012345678901234567891',
  //  gas: 1500000,
  //  gasPrice: '30000000000000'
//}, function(error, transactionHash){ }) v vbnn
//.on('error', function(error){  })
//.on('transactionHash', function(transactionHash){ })
//.on('receipt', function(receipt){
  // console.log(receipt.contractAddress) // contains the new contract address
//})
//.on('confirmation', function(confirmationNumber, receipt){ })
//.then(function(newContractInstance){
  //  console.log(newContractInstance.options.address) // instance with the new contract address
//0x9df54fafcea2126463b29ebb9a46807e63e8507c
//});



