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
import cp_artifacts from '../../build/contracts/CuttingPolisher.json'
import certificate_artifacts from '../../build/contracts/Certificate.json'
import manufacturer_artifacts from '../../build/contracts/Manufacturer.json'

var MineToMarket = contract(mineToMarket_artifacts);
var CuttingPolisher = contract(cp_artifacts);
var Certificate = contract(certificate_artifacts);
var Manufacturer = contract(manufacturer_artifacts);
var MTMInstance = MineToMarket.at('0x04b403805652d630ae51c319fdb0d32573286f00');
var CPInstance = CuttingPolisher.at('0xb80de97cb1d72a431a2c490535a5f50ad9d646e9');
var ManInstance = Manufacturer.at('0xafce19b17a9f1cbd1097aae6e91a050e74b8f47e');


window.sellToManufacturer = function(sellTransaction) {
   	let parcelID = $("#parcelID").val();
	let dCarat = $("#dCarat").val();
	let dValue = $("#dValue").val();
	
  try {
   	MTMInstance.addMtMManufacturerToChain(ManInstance.address, {from:web3.eth.accounts[0]}).then(function () {
			alert ("Manufacturer Added to Chain");
			MTMInstance.updateParcel(parcelID, dCarat, dValue, {from:web3.eth.accounts[0]}).then(function () {
				MTMInstance.getParcelValue.call().then(function(val){
					//alert ("Parcel Value " + val);
				});
			});
		});

	//$("#MTMAddress").html(MTMInstance.address);
       
  } catch (err) {
	alert ("Error " + err);
   // console.log(err); 0xEa07025eB5Ff3A57b7B39004a8Bd65A0beb66675
  }
}

$(document).ready(function() {
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
  CuttingPolisher.setProvider(web3.currentProvider);
  Certificate.setProvider(web3.currentProvider);
  Manufacturer.setProvider(web3.currentProvider);
  $("#MTMAddress").html(MTMInstance.address);
  MTMInstance.getMtMCuttingPolisherName.call().then(function(cpval){
	$('#cpname').html(cpval.toString());
  }).then( function() {
	MTMInstance.getMtMCuttingPolisherCountry.call().then(function(cpval1){
		$('#cpaddress').html(cpval1.toString());
	}).then( function(){
		MTMInstance.getMtMCuttingPolisherBusRegNum.call().then(function(cpval2){
			$('#cpbusregnum').html(cpval12.toString());
		});
	});

  });

  MTMInstance.getMtMRoughTraderName.call().then(function(rtval){
	$('#rtname').html(rtval.toString());
  }).then( function() {
	MTMInstance.getMtMRoughTraderCountry.call().then(function(rtval1){
		$('#rtaddress').html(rtval1.toString());
	}).then( function(){
		MTMInstance.getMtMRoughTraderBusRegNum.call().then(function(rtval2){
			$('#rtbusregnum').html(rtval12.toString());
		});
	});

  });

  ManInstance.GetManufacturerName.call().then(function(mval){
	ManInstance.bytes32ToString.call(mval).then(function(fval){
		$('#manname').html("Manufacturer: "+fval.toString());
	}).then( function (){
		ManInstance.GetManufacturerCountry.call().then(function(mval2){
			ManInstance.bytes32ToString.call(mval2).then(function(fval2){
				$('#manaddress').html(fval2.toString());	
			}).then(function(){
				ManInstance.GetManufacturerBusRegNum.call().then(function(mval3){
					ManInstance.bytes32ToString.call(mval3).then(function(fval3){
						//alert("Manufacturer Bus Reg Num: "+fval3);
						$('#manbusregnum').html(fval3.toString());
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
	
 
  
  
});

