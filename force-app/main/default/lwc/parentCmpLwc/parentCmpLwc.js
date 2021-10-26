import { LightningElement, track, wire, api } from 'lwc';
import retrieveContact from '@salesforce/apex/lwcAppExampleApex.retrieveContactRecords';
 
export default class ParentCmpLwc extends LightningElement {
      
    @track accountId;
    @track records;
    @track errorMsg;
    @api recordId;     
 
    @wire (retrieveContact, {conId:'$accountId'})
      wireConRecord({error,data}){
        if(data){
          this.records = data;     
          this.errorMsg = undefined;    
        }else{         
          this.errorMsg = error;
          this.records = undefined;
        }
      }
 
    handleChangeAction(event){
      this.accountId = event.detail;
      window.console.log('accountId ' + this.accountId);
    }
}