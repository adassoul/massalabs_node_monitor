console.log("publicApiCtrl.js")

let wls = window.localStorage;

/**
 * testing : 
 * - uncomment getItem lines
 */
let baseAccountImported = {
  "address": "A1MASMrnQd7DJj6Md8WkgCnEdfbPhbfoY8T5cz8o1zMZBKEjLpo",
  "secretKey": "S12kE5jxdaUNgsur8eqjp2FfivrUYXdhdxAJLvd5JQP6fwg4MQ2f",
  "publicKey": "P1GAPM7dn193MVLVdZeP4fLgTzAu8tDv59VwDr5U6qaY5hT63Za",
  "createdInThread": "5",
}

// /** get successful credentials */
// baseAccountImported.publicKey = wls.getItem("publicKey");
// baseAccountImported.secretKey = wls.getItem("secretKey");
// baseAccountImported.address = wls.getItem("address");
// baseAccountImported.createdInThread = wls.getItem("createdInThread");

/** massa connection */
//local, public or custom
//public passes tests
const typeOfNode = "public"; //local and custon have ERR-NET problem
const retry = false;

//common variables and Fns
//start common
const ClientFactory = window.massa.ClientFactory;
const DefaultProviderUrls = window.massa.DefaultProviderUrls;
const ProviderType = window.massa.ProviderType;

let baseAccount = baseAccountImported;

let testnetClient, customClient;
let client;

switch (typeOfNode) {
	//local node
	case "local":
			console.log("this is local");
			console.log(baseAccount);
			console.log(typeof(baseAccount));
			testnetClient = await ClientFactory.createDefaultClient(
			DefaultProviderUrls.LOCALNET,
			retry,
			baseAccount
			);
			client = testnetClient;
			console.log("testnetClient");
			console.log(testnetClient);

			const nodeStatus = await testnetClient.publicApi().getNodeStatus();
			// console.log("nodeStatus")
			// console.log(nodeStatus)
			break;

	//public node
	case "public":
		console.log("this is public");
		// initialize a testnet client
		
		//connexion success to massaClient
		testnetClient = await ClientFactory.createDefaultClient(
				DefaultProviderUrls.TESTNET,
				retry,
				baseAccount
				);
		
		console.log("try");
		console.log(baseAccount)
		
		client = testnetClient;
		console.log("testnetClient");
		console.log(testnetClient);
		break;

	//custom node
	case "custom":
		console.log("this is custom");
		const providers = [
		{
				url: "http://127.0.0.1:33035",
				type: ProviderType.PUBLIC,
		},
		{
				url: "http://127.0.0.1:33034",
				type: ProviderType.PRIVATE,
		},
		];
		customClient = await ClientFactory.createCustomClient(
		providers,
		retry,
		baseAccount
		);
		client = customClient;
		console.log("customClient");
		console.log(customClient);
		break;

	default:
		console.log("please choose a correct node type.");
}



// let statu = await client.publicApi().getNodeStatus();
// console.log("status");
// console.log(statu)



/**
 * "
 * 
 * bsdfbsdfb
	bfsdfbsfb   bsdfbsfbsdfb


	sdfbsdfbsdfb"
	is equal to 
	"bsdfbsdfb bfsdfbsfb bsdfbsfbsdfb sdfbsdfbsdfb"
*/
const handleInputToParams = (input) => {
	let trimmedInput = input.trim();
	let noLineBrInput = trimmedInput.replace(/(\r\n|\n|\r)/gm, " ");
	let noBlanksInput = noLineBrInput.replace(/\s\s+/g, ' ');
	// console.log(noBlanksInput)
	let splitInput = noBlanksInput.split(" ")
	return splitInput
}

let output = document.querySelector(".output-container")
const showInOutput = (text) => {
	output.innerHTML = text;
}


const launchBtns = document.querySelectorAll(".card-button button");
[...launchBtns].forEach(btn => {
	let btnCard = btn.parentElement.parentElement;
	btn.addEventListener("click", async()=>{
		console.log(btnCard)
		console.log(output)

	//without params
	if(btnCard.classList.contains("without-params")){
		console.log("wihtout")
	// getNodeStatus
		if(btnCard.classList.contains("getNodeStatus")){
			let stat = await client.publicApi().getNodeStatus();
			showInOutput(stat)
			console.log(stat)
		}
	// getCliques
		if(btnCard.classList.contains("getCliques")){
			let cliques = await client.publicApi().getCliques();
			showInOutput(cliques)
			console.log(cliques)
		}
	// getStakers
		if(btnCard.classList.contains("getStakers")){
			let stakers = await client.publicApi().getStakers();
			showInOutput(stakers)
			console.log(stakers)
		}
	}
	
	// with params
	if(btnCard.classList.contains("with-params")){
		console.log("with")
		let inputVal = btnCard.querySelector("textarea").value;
		let params = handleInputToParams(inputVal)
		// console.log(btnCard.classList)
		// getAddresses
		if(btnCard.classList.contains("getAddresses")){
			let Addresses = await client.publicApi().getAddresses([...params])
		}
		// getBlocks
		if(btnCard.classList.contains("getBlocks")){
			let Blocks = await client.publicApi().getBlocks([...params])
		}
		// getEndorsements
		if(btnCard.classList.contains("getEndorsements")){
			let Endorsements = await client.publicApi().getEndorsements([...params])
		}
		// getOperations
		if(btnCard.classList.contains("getOperations")){
			let Operations = await client.publicApi().getOperations([...params])
		}
		// getDatastoreEntries
		if(btnCard.classList.contains("getDatastoreEntries")){
			let DatastoreEntries = await client.publicApi().getDatastoreEntries([...params])
			console.log(params)
		}
	}
	})
})

const handleLaunchButton = () => {

}