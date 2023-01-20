var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MantaPrivateWallet, Environment, Network } from 'manta.js';
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const privateWalletConfig = {
            environment: Environment.Development,
            network: Network.Dolphin
        };
        const privateWallet = yield MantaPrivateWallet.init(privateWalletConfig);
        const privateAddress = yield privateWallet.getZkAddress();
        console.log("The private address is: ", privateAddress);
    });
}
main();
