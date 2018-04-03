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
import rt_artifacts from '../../build/contracts/RoughTrader.json'
import cp_artifacts from '../../build/contracts/CuttingPolisher.json'
import certificate_artifacts from '../../build/contracts/Certificate.json'

var MineToMarket = contract(mineToMarket_artifacts);
var RoughTrader = contract(rt_artifacts);
var CuttingPolisher = contract(cp_artifacts);
var Certificate = contract(certificate_artifacts);
var RTInstance = RoughTrader.at('0x75d35796887008eaef28c31c88157c333b9147cd');
var MTMInstance = MineToMarket.at('0x04b403805652d630ae51c319fdb0d32573286f00');
var CPInstance = CuttingPolisher.at('0xb80de97cb1d72a431a2c490535a5f50ad9d646e9');
var rtcountry;
var cpcountry;

window.exportToCP = function(sellTransaction) {
   	let parcelID = $("#parcelID").val();
	let dCarat = $("#dCarat").val();
	let dValue = $("#dValue").val();
	
  try {
   	MTMInstance.addMtMCuttingPolisherToChain(CPInstance.address, {from:web3.eth.accounts[0]}).then(function () {
			alert ("CuttingPolisher Added to Chain");
			MTMInstance.updateParcel(parcelID, dCarat, dValue, {from:web3.eth.accounts[0]}).then(function () {
				MTMInstance.getParcelValue.call().then(function(val){
				//	alert ("Parcel Value " + val);
				});
			});
		});

	$("#MTMAddress").html(MTMInstance.address);
       
  } catch (err) {
	alert ("Error " + err);
  }
}

window.createKC = function(Transaction) {
	MTMInstance.getMtMRoughTraderCountry.call().then(function (val){
		rtcountry = val;
	}).then (function () {
		MTMInstance.getMtMCuttingPolisherCountry.call().then(function(val1){
			   cpcountry=val1;
			}).then( function() {
				alert ("creating KC");
				Certificate.new(RTInstance.address, CPInstance.address, rtcountry, cpcountry,  {from:web3.eth.accounts[0]}).then(instance => {
						alert("Certificate Instance: " + instance.address);
				}).catch(err => {
           				alert ("ERROR " + err);
    				})
			});

		});
}

$( document ).ready(function() {
  if (typeof web3 !== 'undefined') {
    alert ("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	alert("web3 defaulted" + " " + window.web3);
	//web3.eth.defaultAccount = web3.eth.accounts[1];
  }

  MineToMarket.setProvider(web3.currentProvider);
  RoughTrader.setProvider(web3.currentProvider);
  CuttingPolisher.setProvider(web3.currentProvider);
  Certificate.setProvider(web3.currentProvider);
  //Miner.at("0xdafed05da5a6139aac70fa0a8822a4edcdfea74f").then(function(MInstance){
  $("#MTMAddress").html(MTMInstance.address);
  RTInstance.GetRoughTraderName.call().then(function(_rt_name) {
	  RTInstance.bytes32ToString.call(_rt_name).then(function (rtfname){	
  		$('#rtname').html(rtfname.toString());
		})
   }).then(function(){
   		RTInstance.GetRoughTraderCountry.call().then( function(_rt_address) {
	  		RTInstance.bytes32ToString.call(_rt_address).then(function (rtfaddress){	
				$('#rtaddress').html(rtfaddress.toString());
	  		})
   		}).then( function(){
                         MTMInstance.getMtMRoughTraderBusRegNum.call().then(function(val){
				$('#rtbusregnum').html(val.toString());
				
	   		 });
   		});
     });

    CPInstance.GetCuttingPolisherName.call().then(function(cpval){
	CPInstance.bytes32ToString.call(cpval).then(function(fval){
		$('#cpname').html("Cutting Polisher: "+fval.toString());
	}).then( function (){
		CPInstance.GetCuttingPolisherCountry.call().then(function(cpval2){
			CPInstance.bytes32ToString.call(cpval2).then(function(fval2){
				$('#cpaddress').html(fval2.toString());	
			}).then(function(){
				CPInstance.GetCuttingPolisherBusRegNum.call().then(function(cpval3){
					CPInstance.bytes32ToString.call(cpval3).then(function(fval3){
						//alert("CuttingPolisher Bus Reg Num: "+fval3);
						$('#cpbusregnum').html(fval3.toString());
					});
				});
			
			});
		});
	});
    });

    MTMInstance.getMtMMinerName.call().then(function (val) {
	$('#minername').html(val.toString());
     }).then( function () {
		MTMInstance.getMtMMinerCountry.call().then (function (val1) {
		$('#mineraddress').html(val1.toString());	
		}).then(function() {
			MTMInstance.getParcelID.call().then (function(val2){
		    		//$('#parcelID').html(val2.toString());
				document.getElementById("parcelID").value = val2;
			}).then(function(){
				MTMInstance.getParcelCaratInfo.call().then(function(val3){
					//$('#dCarat').html(val3.toString());
					document.getElementById("dCarat").value = val3;
				}).then(function (){
					MTMInstance.getParcelValue.call().then(function(val4){
						//$('#dValue').html(val4.toString());
						document.getElementById("dValue").value = val4;
					});

		    		});
			});
		});
     });
	
 
  
  }
);

