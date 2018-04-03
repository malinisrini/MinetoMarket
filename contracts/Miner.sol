pragma solidity ^0.4.0;

contract Miner {

	bytes32 MinerName;
	bytes32 MinerCountry;
	bytes32 imgIPFSHash;
	address MinerAddress;
	
	//event MinerDetails(address _mineraddress, bytes32 _minername,bytes32 _minercountry, bytes32 _minerbusregnum);
	
	function Miner(bytes32 _mname, bytes32 _mcountry) {
  		MinerName = _mname;
  		MinerCountry = _mcountry;
  		//MinerBusRegNum = _mbusregnum;
  		MinerAddress = msg.sender;
  		//MinerDetails(MinerAddress, MinerName, MinerCountry, MinerBusRegNum);
  	}
  	
  	function setimgIPFSHash(bytes32 v_img_hash){
  	    imgIPFSHash = v_img_hash;
  	    
  	}
  	
  	function GetMinerName() returns (bytes32 _miner_name) {
  		return MinerName;
  	}
  	
  	function GetMinerCountry() returns (bytes32 _miner_country) {
  		return MinerCountry;
  	}

  	function GetMinerOriginAddress() returns (address _originaddress){
  		return MinerAddress;
  	}

	function GetParcelImgHash() returns (bytes32 _imgHash){
  		return imgIPFSHash;
  	} 

    function GetMinerDeployedAddress() returns (address){
        return this;    
    }
}

