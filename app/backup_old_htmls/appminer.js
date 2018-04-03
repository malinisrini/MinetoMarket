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
import rt_artifacts from '../../build/contracts/RoughTrader.json'

var MineToMarket = contract(mineToMarket_artifacts);
var Miner = contract(miner_artifacts);
var RoughTrader = contract(rt_artifacts);
var MinerInstance = Miner.at('0x296a3bc5414a152c3d5180ac4b7c14c4c4cc37aa');
var RTInstance = RoughTrader.at('0x75d35796887008eaef28c31c88157c333b9147cd');
var MTMInstance;

window.sellToRT = function(sellTransaction) {
 	let parcelID = $("#parcelID").val();
	let dCarat = $("#dCarat").val();
	let dValue = $("#dValue").val();
	
  try {
    //$("#msg").html("Your contract is being created in block chain. Please wait.")
    //$("#parcelID").val("");

    /* MineToMarket.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
    */
    MineToMarket.new("0x296a3bc5414a152c3d5180ac4b7c14c4c4cc37aa", {from: web3.eth.accounts[0]}).then(instance => {
       		alert("MTM Instance Address: " + instance.address);
		$("#MTMAddress").html(instance.address);
		MTMInstance = instance;
		MTMInstance.addMtMRoughTraderToChain("0x75d35796887008eaef28c31c88157c333b9147cd", {from:web3.eth.accounts[0]}).then(function () {
			alert ("Rough Trader added to chain");
			MTMInstance.updateParcel(parcelID, dCarat, dValue, {from:web3.eth.accounts[0]}).then(function () {
				MTMInstance.getParcelValue.call().then(function(val){
					//alert ("Parcel Value " + val);
				});
			});
		});

		}).catch(err => {
           			alert ("ERROR " + err);
    			})
  
  } catch (err) {
	alert ("Error " + err);
   }
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

  MineToMarket.setProvider(web3.currentProvider);
  Miner.setProvider(web3.currentProvider);
  RoughTrader.setProvider(web3.currentProvider);
  //Miner.at("0xdafed05da5a6139aac70fa0a8822a4edcdfea74f").then(function(MinerInstance){
 		MinerInstance.GetMinerName.call().then(function(_m_name) {
			MinerInstance.bytes32ToString.call(_m_name).then(function (fname){
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
			$('#rtname').html("Rough Trader: "+rtfname.toString());
			})
		});
		RTInstance.GetRoughTraderCountry.call().then( function(_rt_address) {
			RTInstance.bytes32ToString.call(_rt_address).then(function (rtfaddress){
			$('#rtcountry').html(rtfaddress.toString());
			})
	  	});
  

  	//});
  }
);

