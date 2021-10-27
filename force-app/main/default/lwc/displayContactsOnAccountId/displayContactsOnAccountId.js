import { LightningElement, track, wire, api} from 'lwc';
//import retrieveAccountRecords from '@salesforce/apex/lwcAppExampleApex.retrieveAccountRecords';
import retrieveContactRecords from '@salesforce/apex/lwcAppExampleApex.retrieveContactRecords';
import updateContacts from '@salesforce/apex/lwcAppExampleApex.updateContacts';
import { getRecordNotifyChange } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DisplayContactsOnAccountId extends LightningElement {
    @track getAccId;
    //@api getIdFromParent;
    @api recordId;
    //@track errorMsg;
    @track contactRecords;
    
    //@wire (retrieveContactRecords, {accId:'$recordId'}) contactRecords;
    @wire (retrieveContactRecords, {accId: "$recordId"})
    wireConRecords({error,data}){
        if(data){
          this.contactRecords = data;     
          this.errorMsg = undefined;    
        }else{         
          this.errorMsg = error;
          this.contactRecords = undefined;
        }
      }
    
      @track columns = [
        { label: 'First Name', fieldName: 'FirstName', editable : 'true' },
        { label: 'Last Name', fieldName: 'LastName', editable : 'true' },
        { label: 'Email', fieldName: 'Email', type: 'email', editable : 'true' },
        { label: 'Mobile Phone', fieldName: 'MobilePhone', type: 'phone', editable : 'true' },
        { label: 'Lead Source', fieldName: 'LeadSource', editable : 'true'},
    ];
     
    handleChangeRadio(event){        
        this.getAccId = event.target.value;
        window.console.log('getAccId ' + this.getAccId);
       const myCustomEventItem = new CustomEvent('myeventdemo',{
            detail: this.getAccId
       });
       this.dispatchEvent(myCustomEventItem);
        
    }

    getSelectedName(event) {
        const selectedRows = event.detail.selectedRows;
        // Display that fieldName of the selected rows
        for (let i = 0; i < selectedRows.length; i++) {
            alert('You selected: ' + selectedRows[i].FirstName + selectedRows[i].LastName);
        }
    }

    async handleSave(event) {
        const updatedFields = event.detail.draftValues;
        
        // Prepare the record IDs for getRecordNotifyChange()
        const notifyChangeIds = updatedFields.map(row => { return { "recordId": row.Id } });
    
        try {
            // Pass edited fields to the updateContacts Apex controller
            const result = await updateContacts({data: updatedFields});
            console.log(JSON.stringify("Apex update result: "+ result));
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact updated',
                    variant: 'success'
                })
            );
    
            // Refresh LDS cache and wires
            getRecordNotifyChange(notifyChangeIds);
    
            // Display fresh data in the datatable
            refreshApex(this.contact).then(() => {
                // Clear all draft values in the datatable
                this.draftValues = [];
            });
       } catch(error) {
               this.dispatchEvent(
                   new ShowToastEvent({
                       title: 'Error updating or refreshing records',
                       message: error.body.message,
                       variant: 'error'
                   })
             );
        };
    }

}