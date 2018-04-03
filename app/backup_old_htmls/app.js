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
import retailer_artifacts from '../../build/contracts/Retailer.json'

var MineToMarket = contract(mineToMarket_artifacts);
var Retailer = contract(retailer_artifacts);
var MTMInstance = MineToMarket.at('0x04b403805652d630ae51c319fdb0d32573286f00');
var RetInstance = Retailer.at('0xbe139dc23e9f1596c2b0c32c08a4a8777b505bed');

window.viewCertificate = function(transaction){
	alert ("view certificate");
	window.open("Certificate.html");
}


$(document).ready(function() {
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

  MineToMarket.setProvider(web3.currentProvider);
  Retailer.setProvider(web3.currentProvider);

  $("#MTMAddress").html(MTMInstance.address);

  MTMInstance.getMtMManufacturerName.call().then(function(manval){
	$('#manname').html(manval.toString());
  }).then( function() {
	MTMInstance.getMtMManufacturerCountry.call().then(function(manval1){
		$('#manaddress').html(manval1.toString());
	}).then( function(){
		MTMInstance.getMtMManufacturerBusRegNum.call().then(function(manval2){
			$('#manbusregnum').html(manval12.toString());
		});
	});

  });

    RetInstance.GetRetailerName.call().then(function(retval){
	RetInstance.bytes32ToString.call(retval).then(function(fval){
		$('#retname').html(fval.toString());
	}).then( function (){
		RetInstance.GetRetailerCountry.call().then(function(retval2){
			RetInstance.bytes32ToString.call(retval2).then(function(fval2){
				$('#retaddress').html(fval2.toString());	
			}).then(function(){
				RetInstance.GetRetailerBusRegNum.call().then(function(retval3){
					RetInstance.bytes32ToString.call(retval3).then(function(fval3){
						//$('#retbusregnum').html(fval3.toString());
					});
				});
			
			});
		});
	});
    });



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


  MTMInstance.getMtMMinerName.call().then(function (val) {
	$('#minername').html(val.toString());
     }).then( function () {
		MTMInstance.getMtMMinerCountry.call().then (function (val1) {
		$('#mineraddress').html(val1.toString());	
		}).then(function() {
			MTMInstance.getParcelID.call().then (function(val2){
				document.getElementById("parcelID").value = val2;
			}).then(function(){
				MTMInstance.getParcelCaratInfo.call().then(function(val3){
					document.getElementById("dCarat").value = val3;
				}).then(function (){
					MTMInstance.getParcelValue.call().then(function(val4){
						document.getElementById("dValue").value = val4;
					});

		    		});
			});
		});
     });
	
 
  
  
});

