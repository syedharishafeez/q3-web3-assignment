// 1st Task
let Web3 = require("web3");

console.log(Web3);

let rpcURL = "https://ropsten.infura.io/v3/2404468ea8494106b610540b3dbe4d8c";

let web3 = new Web3(rpcURL);
console.log("web3 = ", web3);
const address = "0x0A255cfbE81A3587af219D0Cd75C60ceAA02bf41";
web3.eth.getBalance(address, (err, wei) => {
  console.log("wei = ", wei);
  let balance = web3.utils.fromWei(wei, "ether");
  console.log("balance = ", balance);
});

// 2nd Task
let contractAddress = "0x445f68b319fef1449d10f635509083343e1ab796";

let abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_age",
        type: "uint256",
      },
    ],
    name: "setAge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "doSomething",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAge",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const contract = new web3.eth.Contract(abi, contractAddress);

console.log("contract = ", contract);

contract.methods.getAge().call(function (err, result) {
  console.log("age = ", result);
});
contract.methods.doSomething().call(function (err, result) {
  console.log("doSomething = ", result);
});

// 3rd Task

let Tx = require("ethereumjs-tx");

rpcURL = "http://127.0.0.1:7545";

web3 = new Web3(rpcURL);

let account1 = "0x1830c5103059222c08Eddda10FA901915BaE671E";
let account2 = "0x46A0C826A72F42916A4d62048d1d5157952420C9";

let privateKey1 =
  "f7490ea58d6ff33d8aad973d2aefebf31c58db30a00bbc078c05bf243a934202";
let privateKey2 =
  "2c1eef6d5d2990cd90490bfc10225b27dbd7e5f7a7c028a294d9d86ed7c0faa8";

let privateKey1Buffer = Buffer.from(privateKey1, "hex");
let privateKey2Buffer = Buffer.from(privateKey2, "hex");

web3.eth.getTransactionCount(account1, (err, txCount) => {
  let txObject = {
    nonce: web3.utils.toHex(txCount),
    to: account2,
    value: web3.utils.toHex(web3.utils.toWei("3", "ether")),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
  };

  let tx = new Tx.Transaction(txObject); // This line is use for ganache network

  // The following block is use for Ethereum main-net, ropsten, rinkeby etc

  // const tx = new Tx.Transaction(txObject, {
  //   chain: "ropsten",
  //   hardfork: "petersburg",
  // });

  //  end of block

  tx.sign(privateKey1Buffer);

  let serializedTx = tx.serialize();
  let raw = "0x" + serializedTx.toString("hex");

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash:", txHash);
  });
});

// 5th Task

Tx = require("ethereumjs-tx");

rpcURL = "https://ropsten.infura.io/v3/2404468ea8494106b610540b3dbe4d8c";

web3 = new Web3(rpcURL);

account1 = "0x0A255cfbE81A3587af219D0Cd75C60ceAA02bf41";
account2 = "0x8f6b2341E411d4b8C547136fb2E2D09700e76C9E";

privateKey1 =
  "0B27A1D20474E1AA60104015091F44B2E52B402E8BC71CF7AD9791790B7B1900";
privateKey2 =
  "9EF7FABC0E65C65394B06B9EC847C1AE0073125FDE417B1AFD7BEBACB951C410";

privateKey1Buffer = Buffer.from(privateKey1, "hex");
privateKey2Buffer = Buffer.from(privateKey2, "hex");

web3.eth.getTransactionCount(account1, (err, txCount) => {
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    to: contractAddress,
    data: contract.methods.setAge(89).encodeABI(),
  };

  // tx = new Tx.Transaction(txObject); // This line is use for ganache network

  // The following block is use for Ethereum main-net, ropsten, rinkeby etc

  tx = new Tx.Transaction(txObject, {
    chain: "ropsten",
    hardfork: "petersburg",
  });

  //  end of block

  tx.sign(privateKey1Buffer);

  serializedTx = tx.serialize();
  raw = "0x" + serializedTx.toString("hex");

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash:", txHash);
  });
});

// 4th Task

Tx = require("ethereumjs-tx");

rpcURL = "https://ropsten.infura.io/v3/2404468ea8494106b610540b3dbe4d8c";

web3 = new Web3(rpcURL);

account1 = "0x0A255cfbE81A3587af219D0Cd75C60ceAA02bf41";
account2 = "0x8f6b2341E411d4b8C547136fb2E2D09700e76C9E";

privateKey1 =
  "0B27A1D20474E1AA60104015091F44B2E52B402E8BC71CF7AD9791790B7B1900";
privateKey2 =
  "9EF7FABC0E65C65394B06B9EC847C1AE0073125FDE417B1AFD7BEBACB951C410";

privateKey1Buffer = Buffer.from(privateKey1, "hex");
privateKey2Buffer = Buffer.from(privateKey2, "hex");

web3.eth.getTransactionCount(account1, (err, txCount) => {
  let data =
    "608060405234801561001057600080fd5b5061019b806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80638269267914610046578063967e6e65146100c9578063d5dcf127146100e7575b600080fd5b61004e610115565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561008e578082015181840152602081019050610073565b50505050905090810190601f1680156100bb5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100d1610152565b6040518082815260200191505060405180910390f35b610113600480360360208110156100fd57600080fd5b810190808035906020019092919050505061015b565b005b60606040518060400160405280601681526020017f646f20736f6d6520776f726b20666f722068756d616e00000000000000000000815250905090565b60008054905090565b806000819055505056fea26469706673582212206fe302f6411ef5b2cfeaf9542147ec97043dc78c77a6aefa86cd54a2019cf67764736f6c63430006060033";
  let dataBuffer = Buffer.from(data, "hex");
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    data: dataBuffer,
  };

  // tx = new Tx.Transaction(txObject); // This line is use for ganache network

  // The following block is use for Ethereum main-net, ropsten, rinkeby etc

  tx = new Tx.Transaction(txObject, {
    chain: "ropsten",
    hardfork: "petersburg",
  });

  //  end of block

  tx.sign(privateKey1Buffer);

  serializedTx = tx.serialize();
  raw = "0x" + serializedTx.toString("hex");

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash:", txHash);
  });
});
