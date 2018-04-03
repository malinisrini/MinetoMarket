pragma solidity ^0.4.0;

contract RoughTrader {

	bytes32 RoughTraderName;
	bytes32 RoughTraderCountry;
	bytes32 RoughTraderBusRegNum;
	address RoughTraderAddress;
	
	//event RoughTraderDetails(address _RoughTraderaddress, bytes32 _RoughTradername,bytes32 _RoughTradercountry, bytes32 _RoughTraderbusregnum);
	
	function RoughTrader(bytes32 _rname, bytes32 _rcountry, bytes32 _rbusregnum) {
  		RoughTraderName = _rname;
  		RoughTraderCountry = _rcountry;
  		RoughTraderBusRegNum = _rbusregnum;
  		RoughTraderAddress = msg.sender;
  		//RoughTraderDetails(RoughTraderAddress, RoughTraderName, RoughTraderCountry, RoughTraderBusRegNum);
  	}
  	
  	function GetRoughTraderName() returns (bytes32 _RoughTrader_name) {
  		return RoughTraderName;
  	}
  	
  	function GetRoughTraderCountry() returns (bytes32 _RoughTrader_country) {
  		return RoughTraderCountry;
  	}

  	function GetRoughTraderOriginAddress() returns (address _RoughTrader_originaddress){
  		return RoughTraderAddress;
  	}

	function GetRoughTraderBusRegNum() returns (bytes32 _RoughTrader_busregnum){
  		return RoughTraderBusRegNum;
  	}
  	
    function GetRoughTraderDeployedAddress() returns (address){
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
