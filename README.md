this is my minimal front exercice about node monitoring
done only with HTML/CSS and JavaScript

# browse this project :
1/ install and open VSCode

2/ install extension Live Server

3/ launch Live Server on any .html file : 
- open html file
- right click inside the file
- click on "open with live server" 

    -> browse the project 

note : massa-web3 is bundled. No need to install it.

# flow of the project 
0/ click on logo for homepage

1/ enter your credentiels (secret key, public key and address) on credentials page :
- accessisble from side menu or home page in description

2/ go to one of the other pages to monitor your node and interact with it through the functions of the adequate apis

# features of the project
1/ dark/light mode 

2/ UI features

3/ matching massa theme and font

4/ mobile view

5/ localStorage used for loggin

6/  maximizing security : 
- clearing localStorage after 15min of inactivity

7/ memory usage optimized : 
- minimal use of setInterval and repetitive calls

8/ interaction with massa-node via functions from massa-web3 package. Work on the functionalside of the features. The functions from public Api without params are well executed. The functions without params from public Api need to have their params handled more : 
- params are being trimmed and spaces taken out : still need to be put in list
- debug
- also the output of functions need to be ameliorated
privateapi, smarct contract and wallet need to be worked out more.

# mock data
0/ baseAccount is hardcoded in the js files and localstorage handdling is commented for testing and rapidity purposes