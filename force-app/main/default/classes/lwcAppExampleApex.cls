public with sharing class lwcAppExampleApex {
   
 
    //Display the Contacts based on AccountId the help of event in LWc
    /* @AuraEnabled(cacheable=true)
    public static List<Account> retrieveAccountRecords(){
        List<Account> accList = [Select Id, Name, Phone, Industry, Description From Account Where Phone != null limit 6];
        return accList;
    } */
 
 
    @AuraEnabled(cacheable=true)
    public static List<Contact> retrieveContactRecords(string accId){
        system.debug('NICHOLAS passed account ID: ' + accId);
      List<Contact> conObj = new  List<Contact>();
      List<Contact> conList = [Select Id, FirstName, LastName, Email, Phone, MobilePhone, AccountId, LeadSource From Contact Where AccountId=:accId];
      for(Contact con:conList){
        system.debug('NICHOLAS contact name: ' + con.FirstName);
        conObj.add(con);
      }
      return conObj;
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> retrieveContact(string conId){
        system.debug('NICHOLAS passed account ID: ' + conId);
      List<Contact> conObj2 = new  List<Contact>();
      List<Contact> conList2 = [Select Id, FirstName, LastName, Email, MobilePhone, LeadSource From Contact Where Id=:conId LIMIT 1];
      for(Contact con:conList2){
        system.debug('NICHOLAS contact name: ' + con.FirstName);
        conObj2.add(con);
      }
      return conObj2;
    }
    
    @AuraEnabled
    public static string updateContacts(Object data) {
        List<Contact> contactsForUpdate = (List<Contact>) JSON.deserialize(
             JSON.serialize(data),
             List<Contact>.class
        );
        try {
            update contactsForUpdate;
            return 'Success: contacts updated successfully';
        }
        catch (Exception e) {
            return 'The following exception has occurred: ' + e.getMessage();
        }
    }
}