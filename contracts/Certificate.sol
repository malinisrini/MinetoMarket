pragma solidity ^0.4.0;

import {RoughTrader} from "./RoughTrader.sol"; 
import {CuttingPolisher} from "./CuttingPolisher.sol"; 
//import "github.com/Arachnid/solidity-stringutils/strings.sol";
 
 
contract Certificate { 
   // using strings for *;
 
     uint public kcIssueDate = now; 
     uint public kcExpiryDate;
     string kcID;
  	 string issuingAuthority;
  	 string originCountry;
     RoughTrader tempRoughTrader;
  	 
  	 //address kcRoughTrader;
  	 //address kcCuttingPolisher;
  
     struct Signature { 
         uint date; 
         address owner; 
     } 
     
     struct Signatures { 
         Signature exporter; 
         Signature importer; 
         Signature importerOnReceipt; 
         Signature exporterAuthority; 
         Signature importerAuthority; 
         Signature importerAuthorityOnReceipt; 
     } 
     Signatures private signatures; 
 
    //Parcel public parcel; 
    struct kcParcel { 
         uint parcelID;
         uint carats; 
         uint value; 
        // address[] origins; 
     } 
     //Parcel[] public parcels; 
     kcParcel public _kcparcel;
    
 
 
    //expire this certificate 30 days in the future 
    uint private constant expirationDateFromNow = now + (60 * 60 * 24 * 30); 


    //when the certificate is created by the exporting party 
    event Created(address indexed certificate); 


    //when the parsels have been added, and the certificate is awaiting signing by parties and authorities 
    event Pending(address indexed certificate, 
        address exporter, 
        address importer, 
        address participantSource, 
        address participantDestination); 


    //when all required parties and authorities have signed the certificate 
    event Issued(address indexed certificate); 


    //when a certificate has been signed by a party of authority's agent 
    event Signed(address from, string name); 


    event Expired(address indexed certificate); 


    //when a certificate completes transit of an international border, 
    //and is marked as received by the improting authority 
    event Complete(address from, string name); 


     /* 
     Certificates should be created by the exporter: the party in possession of the goods. 
     params: 
     - importer - importing Party 
     - exporter - exporting Party 
     */ 
     function Certificate( 
         address _kcExportAddress, 
         address _kcImportAddress, string _kcIssuingAuthority, string _kcOriginCountry) {
         
        // kcRoughTrader = _kcExportAddress;
//kcCuttingPolisher = _kcImportAddress;
         
         tempRoughTrader = RoughTrader(_kcExportAddress);
 //        kcID = (kcRoughTrader.GetRoughTraderCountry()).toSlice().concat("1111".toSlice());
        //kcID = tempRoughTrader.GetRoughTraderCountry();
  	 	 issuingAuthority = _kcIssuingAuthority;
  	 	 originCountry = _kcOriginCountry;
               
         signatures = Signatures( 
             Signature(now, _kcExportAddress), 
             Signature(now, _kcImportAddress), 
             Signature(0,0x0), 
             Signature(0,0x0), 
             Signature(0,0x0), 
             Signature(0,0x0)); 
         kcExpiryDate = now + 30; 
         Created(this); 
         
     } 

     function GetCertID() returns (string) {
	 return bytes32ToString(tempRoughTrader.GetRoughTraderCountry());
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

	























