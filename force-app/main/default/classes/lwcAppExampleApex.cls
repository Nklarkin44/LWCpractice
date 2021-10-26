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
      List<Contact> conObj = new  List<Contact>();
      List<Contact> conList = [Select Id, FirstName, LastName, Email, Phone, MobilePhone, AccountId, LeadSource From Contact Where Id=:conId];
      for(Contact con:conList){
        system.debug('NICHOLAS contact name: ' + con.FirstName);
        conObj.add(con);
      }
      return conObj;
    }
}