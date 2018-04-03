pragma solidity ^0.4.0;

contract Manufacturer {

	bytes32 ManufacturerName;
	bytes32 ManufacturerCountry;
	bytes32 ManufacturerBusRegNum;
	address ManufacturerAddress;
	
	//event ManufacturerDetails(address _Manufactureraddress, bytes32 _Manufacturername,bytes32 _Manufacturercountry, bytes32 _Manufacturerbusregnum);
	
	function Manufacturer(bytes32 _manname, bytes32 _mancountry, bytes32 _manbusregnum) {
  		ManufacturerName = _manname;
  		ManufacturerCountry = _mancountry;
  		ManufacturerBusRegNum = _manbusregnum;
  		ManufacturerAddress = msg.sender;
  		//ManufacturerDetails(ManufacturerAddress, ManufacturerName, ManufacturerCountry, ManufacturerBusRegNum);
  	}
  	
  	function GetManufacturerName() returns (bytes32 _Manufacturer_name) {
  		return ManufacturerName;
  	}
  	
  	function GetManufacturerCountry() returns (bytes32 _Manufacturer_country) {
  		return ManufacturerCountry;
  	}

  	function GetManufacturerOriginAddress() returns (address _Manufacturer_originaddress){
  		return ManufacturerAddress;
  	}

	function GetManufacturerBusRegNum() returns (bytes32 _Manufacturer_busregnum){
  		return ManufacturerBusRegNum;
  	}
  	
  	function GetManufacturerDeployedAddress() returns (address){
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
