
This repo currently contains files related to testing and regression testing **DeliveryStream** for **VersionOne**.

After cloning this repo you will need to install the following (if you do not have them already):
****It is assumed that you already have node installed and working.****

    npm install axios
    npm install v1sdk
    npm install util
    npm install chai
    npm install chai-as-promised
    npm install mocha
    npm install

Execution:
----------
In an editor of your preference, navigate to RegressionTests/Test/lib/base.js
Here you will need to update lins 6 thru 10 with information pertaining to your VersionOne Instance. Save the changes to this file.

If you will be regression testing DeliveryStream, I wish to direct you to RegressionTests/Test/CreateRegressionActions.runnable.js. This file will create an ExternalAction for each VersionOne Asset Type currently supported by DeliveryStream. Those Asset Types are:

 - Project 
 - Portfolio Item  
 - Story 
 - Defect 
 - TestSet

Additionally, an ExternalAction will be created on each V1 Asset Type for each **Continuum** Trigger Type.  Those Trigger Types are:

 - Pipeline 
 - Task 
 - Webhook 
 - Canvas

To begin manual regression testing, DeliveryStream must be enabled with a valid Continuum Instance in your targeted VersionOne testing instance. Once DeliveryStream has been successfully enabled, return to the RegressionTests project. Open a cmd window and navigate to the Text directory. Type `node CreateRegressionActions.runnable.js`

If successful, you should see output similar to this:

> Create new action for the Project asset type with Trigger Type Pipeline     
> Create new action for the Project asset type with Trigger Type Task   
> Create new action for the Project asset type with Trigger Type Webhook   
> Create new action for the Project asset type with Trigger Type Canvas   
> Create new action for the Portfolio Item asset type with Trigger Type Pipeline   
> Create new action for the Portfolio Item asset type with Trigger Type Task   
> Create new action for the Portfolio Item asset type with Trigger Type Webhook   
> Create new action for the Portfolio Item asset type with Trigger Type Canvas   
> Create new action for the Story asset type with Trigger Type Pipeline   
> Create new action for the Story asset type with Trigger Type Task   
> Create new action for the Story asset type with Trigger Type Webhook   
> Create new action for the Story asset type with Trigger Type Canvas   
> Create new action for the Defect asset type with Trigger Type Pipeline   
> Create new action for the Defect asset type with Trigger Type Task   
> Create new action for the Defect asset type with Trigger Type Webhook   
> Create new action for the Defect asset type with Trigger Type Canvas   
> Create new action for the TestSet asset type with Trigger Type Pipeline   
> Create new action for the TestSet asset type with Trigger Type Task   
> Create new action for the TestSet asset type with Trigger Type Webhook   
> Create new action for the TestSet asset type with Trigger Type Canvas 	  
> Created new ExternalAction: 7851 	
>Created new ExternalAction: 7853 	
>Created new ExternalAction: 7855 	
>Created new ExternalAction: 7854 	
>Created new ExternalAction: 7857 	
>Created new ExternalAction: 7859 	
>Created new ExternalAction: 7861 	
>Created new ExternalAction: 7863 	
>Created new ExternalAction: 7865 	
>Created new ExternalAction: 7867 	
>Created new ExternalAction: 7869 	
>Created new ExternalAction: 7870

	
And inspecting a browser refreshed DeliveryStream Admin page should yield a grid filled with actions in each Asset Type.

If you just need to complete api level regression testing, in a cmd window navigate to the Test directory.  Type `mocha test.js`
This test suite will exercise each Asset Type/Trigger Type pair for the following:

 - Create an Action 
 - Invoke an Action 
 - Read Action History 
 - Delete the newly created Action (clean up!)

	




> Written with [StackEdit](https://stackedit.io/).
