pragma solidity ^0.4.0;

contract CuttingPolisher {

	bytes32 CuttingPolisherName;
	bytes32 CuttingPolisherCountry;
	bytes32 CuttingPolisherBusRegNum;
	address CuttingPolisherAddress;
	
	//event CuttingPolisherDetails(address _CuttingPolisheraddress, bytes32 _CuttingPolishername,bytes32 _CuttingPolishercountry, bytes32 _CuttingPolisherbusregnum);
	
	function CuttingPolisher(bytes32 _cpname, bytes32 _cpcountry, bytes32 _cpbusregnum) {
  		CuttingPolisherName = _cpname;
  		CuttingPolisherCountry = _cpcountry;
  		CuttingPolisherBusRegNum = _cpbusregnum;
  		CuttingPolisherAddress = msg.sender;
  		//CuttingPolisherDetails(CuttingPolisherAddress, CuttingPolisherName, CuttingPolisherCountry, CuttingPolisherBusRegNum);
  	}
  	
  	function GetCuttingPolisherName() returns (bytes32 _CuttingPolisher_name) {
  		return CuttingPolisherName;
  	}
  	
  	function GetCuttingPolisherCountry() returns (bytes32 _CuttingPolisher_country) {
  		return CuttingPolisherCountry;
  	}

  	function GetCuttingPolisherOriginAddress() returns (address _CuttingPolisher_originaddress){
  		return CuttingPolisherAddress;
  	}

	function GetCuttingPolisherBusRegNum() returns (bytes32 _CuttingPolisher_busregnum){
  		return CuttingPolisherBusRegNum;
  	}
  	
    function GetCuttingPolisherDeployedAddress() returns (address){
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
