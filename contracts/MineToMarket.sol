pragma solidity ^0.4.0;

import {Miner} from "./Miner.sol"; 
import {RoughTrader} from "./RoughTrader.sol"; 
import {CuttingPolisher} from "./CuttingPolisher.sol"; 
import {Manufacturer} from "./Manufacturer.sol"; 
import {Retailer} from "./Retailer.sol"; 
import {Certificate} from "./Certificate.sol";
//import {Consumer} from "./Consumer.sol"; 

contract MineToMarket { 

	address public owner; 
	address public kpcs; 
	//address MtM_miner = msg.sender;
	
	Miner MtM_miner;
	RoughTrader MtM_roughTrader;
	CuttingPolisher MtM_cuttingPolisher;
	Manufacturer MtM_manufacturer;
	Retailer MtM_retailer;
	Certificate MtM_kcCertificate;
	
	enum State { 
   	    /* 
   	    State : State - Mined
		Sold to RT	Exported to Cutting
		Polisher	Polished
		Sold to Manufacturer	Manufactured
		Sold to Retailer
		Selling to Customer
		*/
		Created, Mined, RoughTraded, Polished, Manufactured, Retailed
		
	}
	
	State private _state = State.Created;
	
	struct Dates { 
         //date mined 
         uint mined; 
 
         //date rough traded
         uint roughTraded; 
 
         //date Polished 
         uint polished; 
 
         //date manufactured 
         uint manufactured; 

         //date retailed 
         uint retailed; 

    } 
    Dates public dates = Dates(now, 0, 0, 0, 0); 
    
    struct Parcel { 
         uint parcelID;
         uint carats; 
         uint value; 
        // address[] origins; 
     } 
     //Parcel[] public parcels; 
     Parcel public parcel;
     
    
    event _Display (string, string, address);
    event _owner (string, address, address);

	function MineToMarket(address _addr){
		MtM_miner = Miner(_addr);
		owner = msg.sender;
		_state = State.Mined;
	        dates.mined = now;    
		//_owner("DEBUG", owner, MtM_miner.GetMinerOriginAddress());
        }

	
	/*if ((owner == _MtM_miner.GetMinerOriginAddress()) && (_state == State.Created) ){
            _state = State.Mined;
	        dates.mined = now;    
	        updateParcel(_parcelID, _carat, _dvalue);
        } else {
           _Display("Miner", bytes32ToString(_MtM_miner.GetMinerName()), _addr ); 
        }*/
	
	function updateParcel(uint _parcelID, uint _carat, uint _dvalue){
	    parcel = Parcel(_parcelID, _carat, _dvalue);
	}
	
	function getOwner() returns (address) {
	    return owner;
	}
	

	function getMtMMiner() returns (address) {
	    return MtM_miner.GetMinerOriginAddress();
    }
    
    function getMtMMinerName() returns (string) {
        return(bytes32ToString(MtM_miner.GetMinerName()));
    }
    
    function getMtMMinerCountry() returns (string) {
        return(bytes32ToString(MtM_miner.GetMinerCountry()));
    }
    
    function getMtMMinerBusRegNum() returns (string) {
        return(bytes32ToString(MtM_miner.GetMinerBusRegNum()));
    } 
	
	function addMtMRoughTraderToChain(address _RTAddr) {
		MtM_roughTrader = RoughTrader(_RTAddr);
		 _state = State.RoughTraded;
	        dates.roughTraded = now;    
	}    
	
    /*if ((owner == _MtM_roughTrader.GetRoughTraderOriginAddress()) && (_state == State.Mined) ){
            _state = State.RoughTraded;
	        dates.roughTraded = now;    
	        updateParcel(_parcelID, _carat, _dvalue);
        } else {
           _Display("RoughTrader", bytes32ToString(_MtM_roughTrader.GetRoughTraderName()), _RTAddr ); 
        } */
    
   function getMtMRoughTrader() returns (address) {
       	return MtM_roughTrader.GetRoughTraderOriginAddress();
    }
    
    function getMtMRoughTraderName() returns (string) {
        return(bytes32ToString(MtM_roughTrader.GetRoughTraderName()));
    }
    
    function getMtMRoughTraderCountry() returns (string) {
        return (bytes32ToString(MtM_roughTrader.GetRoughTraderCountry()));
    }
    
    function getMtMRoughTraderBusRegNum() returns (string) {
        return(bytes32ToString(MtM_roughTrader.GetRoughTraderBusRegNum())); 
    } 
    
    function addMtMCuttingPolisherToChain(address _CPAddr) {
		MtM_cuttingPolisher = CuttingPolisher(_CPAddr);
		_state = State.Polished;
	        dates.polished = now;    
	       // updateParcel(_parcelID, _carat, _dvalue);
	
	}    
    
	/*
		if ((owner == MtM_cuttingPolisher.GetCuttingPolisherOriginAddress()) && (_state == State.RoughTraded) ){
            _state = State.Polished;
	        dates.polished = now;    
	        updateParcel(_parcelID, _carat, _dvalue);
        } else {
           _Display("Polisher", bytes32ToString(_MtM_cuttingPolisher.GetCuttingPolisherName()), _CPAddr ); 
        } */
   function getMtMCuttingPolisher() returns (address) {
       	return MtM_cuttingPolisher.GetCuttingPolisherOriginAddress();
    }
    
    function getMtMCuttingPolisherName() returns (string) {
        return(bytes32ToString(MtM_cuttingPolisher.GetCuttingPolisherName()));
    }
    
    function getMtMCuttingPolisherCountry() returns (string) {
        return(bytes32ToString(MtM_cuttingPolisher.GetCuttingPolisherCountry()));
    }
    
    function getMtMCuttingPolisherBusRegNum() returns (string) {
        return(bytes32ToString(MtM_cuttingPolisher.GetCuttingPolisherBusRegNum()));
    } 
    
    function addMtMManufacturerToChain(address _manufacturerAddr) {
	        MtM_manufacturer = Manufacturer(_manufacturerAddr);
		_state = State.Manufactured;
	        dates.polished = now;    
	        //updateParcel(_parcelID, _carat, _dvalue);
	}    
	
	/*
		if ((owner == MtM_manufacturer.GetManufacturerOriginAddress()) && (_state == State.Polished) ){
            _state = State.Manufactured;
	        dates.polished = now;    
	        updateParcel(_parcelID, _carat, _dvalue);
        } else {
           _Display("Manufacturer", bytes32ToString(_MtM_manufacturer.GetManufacturerName()), _manufacturerAddr ); 
        } */
    
   function getMtMManufacturer() returns (address) {
       	return MtM_manufacturer.GetManufacturerOriginAddress();
    }
    
    function getMtMManufacturerName() returns (string) {
        return(bytes32ToString(MtM_manufacturer.GetManufacturerName()));
    }
    
    function getMtMManufacturerCountry() returns (string) {
        return(bytes32ToString(MtM_manufacturer.GetManufacturerCountry()));
    }
    
    function getMtMManufacturerBusRegNum() returns (string) {
        return(bytes32ToString(MtM_manufacturer.GetManufacturerBusRegNum()));
    } 
    
    function addMtMRetailerToChain(address _retailerAddr) {
		Retailer MtM_retailer = Retailer(_retailerAddr);
		_state = State.Retailed;
	        dates.retailed = now;    
	       // updateParcel(_parcelID, _carat, _dvalue);
	}    
	
	/*
	if ((owner == _MtM_retailer.GetRetailerOriginAddress()) && (_state == State.Manufactured) ){
            _state = State.Retailed;
	        dates.retailed = now;    
	        updateParcel(_parcelID, _carat, _dvalue);
        } else {
           _Display("Retailer", bytes32ToString(_MtM_retailer.GetRetailerName()), _retailerAddr ); 
        } */
    
    function getParcelID() returns (uint) {
        return parcel.parcelID;
    }
    
    function getParcelCaratInfo() returns (uint) {
        return parcel.carats;
    }
    
    function getParcelValue() returns (uint) {
        return parcel.value;
    }
    
   function getMtMRetailer() returns (address) {
       	return(MtM_retailer.GetRetailerOriginAddress());
    }
    
    function getMtMRetailerName() returns (string) {
        return(bytes32ToString(MtM_retailer.GetRetailerName()));
    }
    
    function getMtMRetailerCountry() returns (string) {
        return(bytes32ToString(MtM_retailer.GetRetailerCountry()));
    }
    
    function getMtMRetailerBusRegNum() returns (string) {
	return(bytes32ToString(MtM_retailer.GetRetailerBusRegNum()));
    }
    
    function createKCPSCertificate(address _mtmrtaddress, address _mtmcpaddress, string _mtmkcAuthority, string _mtmkcOriginCountry){
    	MtM_kcCertificate = new Certificate( _mtmrtaddress, _mtmcpaddress, _mtmkcAuthority, _mtmkcOriginCountry);
    }
    
     
    function bytes32ToString(bytes32 x) constant returns (string) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }
    
}
