import { MantaPrivateWallet, Environment, Network } from 'manta.js/node'
// ES Module
import fetch from 'node-fetch';

// @ts-ignore
global.fetch = fetch;
// @ts-ignore
global.Headers = fetch.Headers;
// @ts-ignore
global.Request = fetch.Request;
// @ts-ignore
global.Response = fetch.Response;

async function main() {
	const privateWalletConfig = {
		environment: Environment.Development,
		network: Network.Dolphin
	}

	const privateWallet = await MantaPrivateWallet.init(privateWalletConfig);
	const privateAddress = await privateWallet.getZkAddress();
    console.log("The private address is: ", privateAddress);
}

main();

