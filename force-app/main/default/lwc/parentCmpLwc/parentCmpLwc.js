import { LightningElement, track, wire, api } from 'lwc';
import retrieveContact from '@salesforce/apex/lwcAppExampleApex.retrieveContact';
 
export default class ParentCmpLwc extends LightningElement {
      
    @track contId;
    @track Conrecords;
    @track errorMsg;
    @api recordId;
       
 
    @wire (retrieveContact, {conId: '$contId'})
      wireConRecord({error,data}){
        if(data){
          this.Conrecords = data;     
          this.errorMsg = undefined;    
        }else{         
          this.errorMsg = error;
          this.Conrecords = undefined;
        }
      }
 
    handleChangeAction(event){
      this.contId = event.detail;
      window.console.log('accountId ' + this.contId);
        fields = {}; 
        fields[ID_FIELD.fieldApiName] = event.detail.draftValues[0].Id;
        fields[FIRSTNAME_FIELD.fieldApiName] = event.detail.draftValues[0].FirstName;
        fields[LASTNAME_FIELD.fieldApiName] = event.detail.draftValues[0].LastName;
    }

    
}