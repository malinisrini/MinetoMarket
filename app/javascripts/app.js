// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
/*
 * When you compile and deploy your MineToMarket contract,
 * truffle stores the abi and deployed address in a json
 * file in the build directory. We will use this information
 * to setup a MineToMarket abstraction. We will use this abstraction
 * later to create an instance of the MineToMarket contract.
 * Compare this against the index.js from our previous tutorial to see the difference
 * https://gist.github.com/maheshmurthy/f6e96d6b3fff4cd4fa7f892de8a1a1b4#file-index-js
 */

import mineToMarket_artifacts from '../../build/contracts/MineToMarket.json'
import miner_artifacts from '../../build/contracts/Miner.json'
import rt_artifacts from '../../build/contracts/RoughTrader.json';

let buffer = require('buffer/');

var MineToMarket = contract(mineToMarket_artifacts);
var Miner = contract(miner_artifacts);
var RoughTrader = contract(rt_artifacts);
var MinerInstance = Miner.at('0x121c38589c4ea535c3498e52b7904b8e35ff4176');
var RTInstance = RoughTrader.at('0x309e32eb6eef15aaddde53866ff05693aed94c64');
var MTMInstance;

var 	ipfsHost = 'localhost',
	ipfsAPIPort = '5001',
	ipfsWebPort = '8080',
	web3Host = 'localhost',
	web3Port = '8545';

var ipfs = window.IpfsApi(ipfsHost, ipfsAPIPort);
alert ("ipfs : " + ipfs);
alert ("ipfs Swam Peers " + ipfs.swarm.peers); 

window.sellToRT = function(sellTransaction) {
	alert ("alert Inside SellToRT");
 	let parcelID = $("#parcelID").val();
	let dCarat = $("#dCarat").val();
	let dValue = $("#dValue").val();
	
	alert ("Parcel ID " + parcelID + " " + "dCarat " + dCarat + " " + "dValue " + dValue);

    //$("#msg").html("Your contract is being created in block chain. Please wait.")
    //$("#parcelID").val("");

    /* MineToMarket.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
    */
    alert("MineToMarket " + MineToMarket);
    alert("Account: " + web3.eth.accounts[0]);
   MineToMarket.new("0x121c38589c4ea535c3498e52b7904b8e35ff4176", {from:web3.eth.accounts[0]}).then(instance => {
       		alert("MTM Instance Address: " + instance.address);
		$("#MTMAddress").html(instance.address);
		MTMInstance = instance;
		MTMInstance.addMtMRoughTraderToChain("0x309e32eb6eef15aaddde53866ff05693aed94c64", {from:web3.eth.accounts[0]}).then(function () {
			alert ("Rough Trader added to chain");
			MTMInstance.updateParcel(parcelID, dCarat, dValue, {from:web3.eth.accounts[0]}).then(function () {
				MTMInstance.getParcelValue.call().then(function(val){
					//alert ("Parcel Value " + val);
				});
			});
		});
		alert ("all done");
		}).catch(err => {
           			alert ("ERROR " + err);
    			}); 
	
    window.ipfs = ipfs;
     window.ipfsDataHost = "http://" + ipfsHost + ":" + ipfsWebPort + "/ipfs";
     //var url = $("#fileurl").val();
     var fileinput = document.getElementById('fileurl');
     var files = fileinput.files;
     var imgHash;
     console.log(files);
     const reader = new FileReader();
     
     reader.onloadend = function() {
	window.ipfs = ipfs;
        window.ipfsDataHost = "http://" + ipfsHost + ":" + ipfsWebPort + "/ipfs";
	const buf = buffer.Buffer(reader.result)
        console.log(window.ipfs.add);
	window.ipfs.add(buf, (err, result) =>{
		if (err){
		   console.error(err);
		   
		}
		let url = 'https://ipfs.io/ipfs/' + result[0].Hash;
		let imgHash = result[0].Hash;
		console.log('url --> '+ url)
	})
     }
     reader.readAsArrayBuffer(files[0]);
     MinerInstance.setimgIPFSHash(imgHash , {from:web3.eth.accounts[0]}).then(function (){

     });
     //alert ("url: "+ url );
    /* window.ipfs.add(url, function(err, result) {
                console.error('Error sending file: ', err);
                    if (err) {
                    return null;
                } else if (result && result[0] && result[0].Hash) {
                    var imageURL = window.ipfsDataHost + "/" + result[0].Hash;
                    console.log('File: ', result[0].Hash);
                    console.log(imageURL);
                } else {
                    console.error('No file for you...');
                    return null;
                }
            });
*/ 

}


$(document).ready(function() {
//window.ready = $(document).ready(function() {
  if (typeof web3 !== 'undefined') {
    alert("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	alert("web3 defaulted" + " " + window.web3);
	//web3.eth.defaultAccount = web3.eth.accounts[0];
  }
  alert ("i am here");
  MineToMarket.setProvider(web3.currentProvider);
  Miner.setProvider(web3.currentProvider);
  RoughTrader.setProvider(web3.currentProvider);
  //Miner.at("0xdafed05da5a6139aac70fa0a8822a4edcdfea74f").then(function(MinerInstance){
 		MinerInstance.GetMinerName.call().then(function(_m_name) {
			MinerInstance.bytes32ToString.call(_m_name).then(function (fname){
			alert ('miner name: ' + fname);
			$('#minername').html(fname.toString());
			})
		});
		MinerInstance.GetMinerCountry.call().then( function(_m_address) {
			MinerInstance.bytes32ToString.call(_m_address).then(function (faddress){
			$('#mineraddress').html(faddress.toString());
			})
		});
		RTInstance.GetRoughTraderName.call().then(function(_rt_name) {
			RTInstance.bytes32ToString.call(_rt_name).then(function (rtfname){
			$('#rtname').html(rtfname.toString());
			})
		});
		RTInstance.GetRoughTraderCountry.call().then( function(_rt_address) {
			RTInstance.bytes32ToString.call(_rt_address).then(function (rtfaddress){
			$('#rtcountry').html(rtfaddress.toString());
			})
	  	});

ipfs.swarm.peers(function(err, response) {
	alert ("i am here -2");
	alert ("Response :" + response);
	if (err) {
		alert("ERR: " + err);
	} else {
	 	//alert("IPFS - Connected to " + response.Strings.length + " peers");	
		console.log(response);
	}
	});
  	//});
  }
);

