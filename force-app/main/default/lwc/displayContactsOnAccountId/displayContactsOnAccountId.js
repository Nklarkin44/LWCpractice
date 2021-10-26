import { LightningElement, track, wire, api} from 'lwc';
//import retrieveAccountRecords from '@salesforce/apex/lwcAppExampleApex.retrieveAccountRecords';
import retrieveContactRecords from '@salesforce/apex/lwcAppExampleApex.retrieveContactRecords';

export default class DisplayContactsOnAccountId extends LightningElement {
    @track getAccId;
    @api getIdFromParent;
    @track errorMsg;
    @track contactRecords;
    
    //@wire (retrieveContactRecords, {accId:'$recordId'}) contactRecords;
    @wire (retrieveContactRecords, {accId:'$getIdFromParent'})
    wireConRecords({error,data}){
        if(data){
          this.contactRecords = data;     
          this.errorMsg = undefined;    
        }else{         
          this.errorMsg = error;
          this.contactRecords = undefined;
        }
      }

     
    handleChangeRadio(event){        
        this.getAccId = event.target.value;
        window.console.log('getAccId ' + this.getAccId);
       const myCustomEventItem = new CustomEvent('myeventdemo',{
            detail: this.getAccId
       });
       this.dispatchEvent(myCustomEventItem);
        
    }

}