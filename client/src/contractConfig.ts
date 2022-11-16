import * as ethers from 'ethers';

export const address = import.meta.env.VITE_PROTOSOUND_ADDRESS;
export const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`);
export const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_vrfConsumerAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "songId",
				"type": "uint256"
			}
		],
		"name": "getSongMetadata",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "authorCoverTokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "authorAudioTokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "coverCollectionId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "authorCoverUri",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "audioUri",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "tokenUris",
						"type": "string[]"
					}
				],
				"internalType": "struct ProtoSound.SongMetadata",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "getSongs",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "authorCoverUri",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "audioUri",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "tokenUris",
				"type": "string[]"
			}
		],
		"name": "mintSong",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "songAuthorAudioAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "songAuthorCoverAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "songCoverAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "songMetadata",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "authorCoverTokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "authorAudioTokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "coverCollectionId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "authorCoverUri",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "audioUri",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "songs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "artist",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "collectionId",
				"type": "uint256"
			}
		],
		"name": "transferSongCover",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "updateSongAuthorAudioAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "updateSongAuthorCoverAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "updateSongCoverAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];