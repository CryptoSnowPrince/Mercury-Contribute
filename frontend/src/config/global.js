import { mainnet, goerli } from "wagmi/chains";

export const IS_PRODUCT_MODE = false // TODO

export const contracts_mainnet = {
    NFT: "0x13FCd668F9CFEE44abC9B3278f6530F7bee8eb2F" // TODO Mainnet ethereum
};

export const contracts_testnet = {
    NFT: "0x7e961c388C7918126374c7975293fEF835218e68" // TODO Testnet goerli
};

export const global = {
    CONTRACTS: IS_PRODUCT_MODE ? contracts_mainnet : contracts_testnet,
    PUBLIC_URL: "https://airdrop.cryptosnowprince.com",
    PROJECT_ID: 'fe697d89bd5a55527d938b301724e463',
    REFETCH_INTERVAL: 30000,
    MAX_UINT256: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    MAX_UINT256_HALF: '65792089237316195423570985008687907853269984665640564039457584007913129639935',
    API_URL: 'https://projects.cryptosnowprince.com/api',
    PROJECT: 'mercury',
    ACTION: true,
    chain: IS_PRODUCT_MODE ? mainnet : goerli,
}