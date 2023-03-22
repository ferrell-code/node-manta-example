import { MantaPrivateWallet, Environment, Network } from "manta.js/node";
import BN from "bn.js";
// @ts-ignore
import { Keyring } from "@polkadot/keyring";
// @ts-ignore
import { cryptoWaitReady } from "@polkadot/util-crypto";

// ES Module
import fetch from "node-fetch";

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
    network: Network.Dolphin,
    loggingEnabled: true,
  };

  await cryptoWaitReady();
  // Create a keyring instance
  const keyring = new Keyring({ type: "sr25519" });
  const alice = keyring.addFromUri("//Alice");

  const privateWallet = await MantaPrivateWallet.init(privateWalletConfig);
  const privateAddress = await privateWallet.getZkAddress();
  console.log("The private address is: ", privateAddress);
  await privateWallet.initalWalletSync();

  const dolphinId = new BN(1);
  const thousandDol = new BN("1000000000000000000000");
  const toPrivateTx = await privateWallet.toPrivateBuild(
    dolphinId,
    thousandDol,
    alice,
    alice.address
  );
  await toPrivateTx?.txs[0].signAndSend(alice, {});

  // wait for completion (better way than just sleeping?)
  await new Promise((r) => setTimeout(r, 10000));
  await privateWallet.walletSync();

  const newPrivateBalance = await privateWallet.getPrivateBalance(dolphinId);
  console.log("private balance of DOL: ", newPrivateBalance?.toString());

  const fiveHundredDol = thousandDol.div(new BN(2));
  const toPublicTx = await privateWallet.toPublicBuild(
    dolphinId,
    fiveHundredDol,
    alice,
    alice.address
  );
  await toPublicTx?.txs[0].signAndSend(alice, {});

  // wait for completion (better way than just sleeping?)
  await new Promise((r) => setTimeout(r, 10000));
  await privateWallet.walletSync();

  const afterToPublicPrivateBalance = await privateWallet.getPrivateBalance(
    dolphinId
  );
  console.log(
    "private balance of DOL: ",
    afterToPublicPrivateBalance?.toString()
  );

  // disconnect api
  privateWallet.api.disconnect();
}

main()
  .then()
  .catch((e) => console.error(e));
