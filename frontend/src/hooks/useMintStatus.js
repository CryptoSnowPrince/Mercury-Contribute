import { useEffect, useState } from "react";
import NftABI from "../assets/abi/nft.json"
import { useAccount } from "wagmi";
import { multicall, fetchBalance } from '@wagmi/core'
import { global } from "../config/global";
import { formatUnits } from "viem";

export function useMintStatus(refresh) {
    const [data, setData] = useState({
        totalSupply: 0,
        maxSupply: 0,
        price: 0,
        maxAmountPerMint: 0,
        mintingSeason: true,
        walletOfOwner: [],
        ethAmountOfNFT: 0,
        ethBalance: 0,
    })
    const { address } = useAccount();

    const [refetch, setRefetch] = useState(false)

    useEffect(() => {
        const timerID = setInterval(() => {
            setRefetch((prevData) => {
                return !prevData;
            })
        }, global.REFETCH_INTERVAL);

        return () => {
            clearInterval(timerID);
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const contracts = [
                    {
                        address: global.CONTRACTS.NFT,
                        abi: NftABI,
                        functionName: 'totalSupply'
                    },
                    {
                        address: global.CONTRACTS.NFT,
                        abi: NftABI,
                        functionName: 'maxSupply'
                    },
                    {
                        address: global.CONTRACTS.NFT,
                        abi: NftABI,
                        functionName: 'price'
                    },
                    {
                        address: global.CONTRACTS.NFT,
                        abi: NftABI,
                        functionName: 'maxAmountPerMint'
                    },
                    {
                        address: global.CONTRACTS.NFT,
                        abi: NftABI,
                        functionName: '_mintingSeason'
                    },
                ]
                if (address) {
                    contracts.push({
                        address: global.CONTRACTS.NFT,
                        abi: NftABI,
                        functionName: 'walletOfOwner',
                        args: [address],
                    })
                }
                const _data = await multicall({
                    chainId: global.chain.id,
                    contracts
                })
                const _ethAmountOfNFT = await fetchBalance({ address: global.CONTRACTS.NFT })
                const _ethBalance = address ? (await fetchBalance({ address })) : 0
    
                setData({
                    totalSupply: _data[0].status === "success" ? _data[0].result : 0,
                    maxSupply: _data[1].status === "success" ? _data[1].result : 0,
                    price: _data[2].status === "success" ? parseFloat(formatUnits(_data[2].result, global.chain.nativeCurrency.decimals)) : 0,
                    maxAmountPerMint: _data[3].status === "success" ? _data[3].result : 0,
                    mintingSeason: _data[4].status === "success" ? _data[4].result : 0,
                    walletOfOwner: address && _data[5].status === "success" ? _data[5].result : [],
                    ethAmountOfNFT: parseFloat(_ethAmountOfNFT.formatted),
                    ethBalance: parseFloat(_ethBalance.formatted),
                })
            } catch (error) {
                console.log('hook err', error)
            }
        };
        fetchData();
        // eslint-disable-next-line
    }, [address, refetch, refresh])

    return data
}
