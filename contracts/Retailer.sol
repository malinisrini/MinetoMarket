pragma solidity ^0.4.0;

contract Retailer {

	bytes32 RetailerName;
	bytes32 RetailerCountry;
	bytes32 RetailerBusRegNum;
	address RetailerAddress;
	
	//event RetailerDetails(address _Retaileraddress, bytes32 _Retailername,bytes32 _Retailercountry, bytes32 _Retailerbusregnum);
	
	function Retailer(bytes32 _retname, bytes32 _retcountry, bytes32 _retbusregnum) {
  		RetailerName = _retname;
  		RetailerCountry = _retcountry;
  		RetailerBusRegNum = _retbusregnum;
  		RetailerAddress = msg.sender;
  		//RetailerDetails(RetailerAddress, RetailerName, RetailerCountry, RetailerBusRegNum);
  	}
  	
  	function GetRetailerName() returns (bytes32 _Retailer_name) {
  		return RetailerName;
  	}
  	
  	function GetRetailerCountry() returns (bytes32 _Retailer_country) {
  		return RetailerCountry;
  	}

  	function GetRetailerOriginAddress() returns (address _Retailer_originaddress){
  		return RetailerAddress;
  	}

	function GetRetailerBusRegNum() returns (bytes32 _Retailer_busregnum){
  		return RetailerBusRegNum;
  	}
  	
    function GetRetailerDeployedAddress() returns (address){
        return this;    
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
