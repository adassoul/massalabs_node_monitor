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
