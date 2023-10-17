import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown, faClock } from "@fortawesome/free-solid-svg-icons";
import { useAccount, useNetwork } from "wagmi";
import { writeContract, prepareWriteContract, fetchFeeData, waitForTransaction } from "@wagmi/core"
import { displayRemainTime, formatNumber, getMaxValue, isSupportedChain } from "../utils/utils";
import { toast } from "react-toastify";
import { formatUnits, parseUnits } from "viem";
import { global } from "../config/global";
// import presaleABI from '../constants/abi/presale.json'
// import erc20ABI from '../constants/abi/token.json'
import eth_ic from "../assets/img/eth.png"
import usdt_ic from "../assets/img/usdt.svg"

export default function BuyCard(props) {
    const [usdtAmount, setUsdtAmount] = useState('')
    const [tokenAmount, setTokenAmount] = useState('')
    const { address } = useAccount()
    const { chain } = useNetwork()
    const [info, setInfo] = useState({
        usdtRawBalance: "",
        usdtBalance: 0,
        tokenRawBalance: "",
        tokenBalance: 0,
        usdtRawAllowance: "",
        usdtAllowance: 0,
    })

    useEffect(() => {
        if (chain && address) {
            try {
                if (Object.keys(props.presaleStatus).length > 0) {
                    const presaleStatus = props.presaleStatus

                    const _info = {
                        usdtRawBalance: "",
                        usdtBalance: 0,
                        tokenRawBalance: "",
                        tokenBalance: 0,
                        usdtRawAllowance: "",
                        usdtAllowance: 0,
                    }

                    const statusByChain = presaleStatus[chain.id];
                    if (statusByChain[6].status === "success" && statusByChain[3].status === "success") {
                        _info.usdtRawAllowance = statusByChain[6].result
                        _info.usdtAllowance = parseFloat(formatUnits(statusByChain[6].result, statusByChain[3].result))
                    }

                    if (statusByChain[7].status === "success" && statusByChain[3].status === "success") {
                        _info.usdtRawBalance = statusByChain[7].result
                        _info.usdtBalance = parseFloat(formatUnits(statusByChain[7].result, statusByChain[3].result))
                    }

                    if (statusByChain[8].status === "success" && statusByChain[3].status === "success") {
                        _info.tokenRawBalance = statusByChain[8].result
                        _info.tokenBalance = parseFloat(formatUnits(statusByChain[8].result, 6))
                    }
                    setInfo(_info)
                }
            } catch (error) {
                console.log('status error: ', error)
            }
        }
    }, [props.presaleStatus, chain, address])

    const [btnMsg, setBtnMsg] = useState("BUY NOW")
    const [pending, setPending] = useState(false)

    useEffect(() => {
        if (pending) {
            setBtnMsg("PENDING...")
            return
        }

        if (!address) {
            setBtnMsg("CONNECT WALLET")
            return
        }

        if (!isSupportedChain(chain)) {
            setBtnMsg("UNSUPPORED CHAIN")
            return
        }

        const validUsdt = parseFloat(usdtAmount)
        if (!validUsdt || validUsdt < 0) {
            setBtnMsg("Enter USDT amount")
            return
        }

        if (validUsdt > getMaxValue(info.usdtBalance, false)) {
            setBtnMsg("Insufficient USDT")
            return
        }

        const validToken = parseFloat(tokenAmount)
        if (!validToken || validToken < 0) {
            setBtnMsg("Enter $FTL amount")
            return
        }

        if (info.usdtAllowance < validUsdt + 10000) {
            setBtnMsg('ENABLE BUY')
            return
        }

        setBtnMsg('BUY NOW')
    }, [address, chain, tokenAmount, usdtAmount, info.usdtAllowance, info.usdtBalance, pending, props?.presaleMode, props.timer])

    const handleBtn = async () => {
        // if (btnMsg === 'ENABLE BUY' || btnMsg === 'BUY NOW') {
        //     setPending(true)
        //     try {
        //         const feeData = await fetchFeeData()
        //         // console.log('[PRINCE] feeData: ', feeData)

        //         let data = null
        //         if (btnMsg === 'ENABLE BUY') {
        //             try {
        //                 data = {
        //                     address: usdt[chain ? chain.id : global.chainIds[0]],
        //                     abi: erc20ABI,
        //                     functionName: 'increaseAllowance',
        //                     args: [presale[chain ? chain.id : global.chainIds[0]], global.MAX_UINT256_HALF],
        //                     chainId: chain ? chain.id : global.chainIds[0],
        //                     gasPrice: feeData.gasPrice ? feeData.gasPrice : undefined,
        //                 }
        //                 const incApproveData = await prepareWriteContract(data)
        //             } catch (error) {
        //                 data = {
        //                     address: usdt[chain ? chain.id : global.chainIds[0]],
        //                     abi: erc20ABI,
        //                     functionName: 'approve',
        //                     args: [presale[chain ? chain.id : global.chainIds[0]], global.MAX_UINT256],
        //                     chainId: chain ? chain.id : global.chainIds[0],
        //                     gasPrice: feeData.gasPrice ? feeData.gasPrice : undefined,
        //                 }
        //             }
        //         } else {
        //             data = {
        //                 address: presale[chain ? chain.id : global.chainIds[0]],
        //                 abi: presaleABI,
        //                 functionName: 'buyToken',
        //                 args: [parseUnits(tokenAmount, 6)],
        //                 chainId: chain ? chain.id : global.chainIds[0],
        //                 gasPrice: feeData.gasPrice ? feeData.gasPrice : undefined,
        //             }
        //         }

        //         const preparedData = await prepareWriteContract(data)
        //         // console.log('[PRINCE] preparedData: ', preparedData)

        //         const writeData = await writeContract(preparedData)
        //         // console.log('[PRINCE] writeData: ', writeData)

        //         const txPendingData = waitForTransaction(writeData)
        //         toast.promise(txPendingData, {
        //             pending: "Waiting for pending... 👌",
        //         });

        //         // console.log('[PRINCE] txPendingData: ', txPendingData)
        //         const txData = await txPendingData;
        //         // console.log('[PRINCE] txData: ', txData)

        //         if (btnMsg === 'ENABLE BUY') {
        //             toast.success(`Successfully enabled to buy! 👌`)
        //         } else {
        //             toast.success(`Successfully purchased ${formatNumber(parseFloat(tokenAmount))} $FTL! 👍`)
        //         }
        //     } catch (error) {
        //         toast.error('Something went wrong!')
        //         // console.log('[PRINCE] preparedData error: ', error)
        //     }
        //     try {
        //         if (props.setRefresh !== undefined && props.refresh !== undefined) {
        //             props.setRefresh(!props.refresh)
        //         }
        //     } catch (error) {
        //     }
        //     setPending(false)
        //     return
        // }

        toast.warn(btnMsg)
    }

    return (
        <div className="w-full lg:w-[600px] h-[450px] rounded-2xl border-2 border-gray-700 flex flex-col items-center justify-center text-center px-2 bg-center bg-no-repeat bg-contain]">
            <div className="w-full lg:w-11/12 py-2 bg-black/[0.95] rounded-2xl border-2 border-gray-700 flex flex-col justify-center text-center px-2 my-3">
                <div className="w-full px-3 flex flex-row items-center justify-between text-lg text-center">
                    <label className="">You contribute</label>
                </div>
                <div className="w-full py-2 bg-black/[0.95] flex flex-row justify-center text-center px-2 mt-2 gap-2">
                    <div className="w-1/2 h-[50px] px-3 rounded-xl border-2 border-gray-700 flex flex-row items-center justify-between text-2xl text-center">
                        <input
                            className={`w-full bg-transparent focus:border-0 active:border-0 focus:outline-0 mb-1 ${pending ? `text-gray-800` : `text-white`}`}
                            placeholder="0"
                            value={usdtAmount}
                            disabled={pending}
                            onChange={(e) => {
                                const usdtValue = parseFloat(e.target.value)
                                if (usdtValue && usdtValue > 0) {
                                    const tokenValue = usdtValue * global.TOKEN_PRICE_DEN / global.TOKEN_PRICE_NUM;
                                    setTokenAmount(tokenValue.toFixed(2))
                                } else {
                                    setTokenAmount('0')
                                }
                                setUsdtAmount(e.target.value)
                            }}
                        />
                        <img src={eth_ic} width={35} height={35} alt='eth' />
                    </div>
                    <button
                        className={`w-1/2 h-[50px] bg-black/[0.95] text-2xl rounded-2xl border-2 ${pending ? `border-yellow-700 text-gray-800` : `border-yellow-500 text-white`}`}
                        disabled={pending}
                        onClick={handleBtn}
                    >
                        {btnMsg}
                    </button>
                </div>
                <div className="w-full px-3 flex flex-row items-center justify-start text-sm text-center">
                    <div className="flex flex-row items-center justify-end gap-2 text-center">
                        <label>Balance: {formatNumber(info.usdtBalance)} </label>
                        <button
                            className={`${pending ? `text-yellow-800` : `text-yellow-400`}`}
                            disabled={pending}
                            onClick={(e) => {
                                const maxValue = getMaxValue(info.usdtBalance, false);
                                if (maxValue && maxValue > 0) {
                                    setUsdtAmount(maxValue.toFixed(2))
                                    setTokenAmount((maxValue * global.TOKEN_PRICE_DEN / global.TOKEN_PRICE_NUM).toFixed(2))
                                }
                            }}
                        >Max</button>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-11/12 py-2 bg-black/[0.95] rounded-2xl border-2 border-gray-700 flex flex-col justify-center text-center px-2 my-3">
                <div className="w-full px-3 flex flex-row items-center justify-between text-lg text-center">
                    <label className="">You contribute</label>
                </div>
                <div className="w-full py-2 bg-black/[0.95] flex flex-row justify-center text-center px-2 mt-2 gap-2">
                    <div className="w-1/2 h-[50px] px-3 rounded-xl border-2 border-gray-700 flex flex-row items-center justify-between text-2xl text-center">
                        <input
                            className={`w-full bg-transparent focus:border-0 active:border-0 focus:outline-0 mb-1 ${pending ? `text-gray-800` : `text-white`}`}
                            placeholder="0"
                            value={usdtAmount}
                            disabled={pending}
                            onChange={(e) => {
                                const usdtValue = parseFloat(e.target.value)
                                if (usdtValue && usdtValue > 0) {
                                    const tokenValue = usdtValue * global.TOKEN_PRICE_DEN / global.TOKEN_PRICE_NUM;
                                    setTokenAmount(tokenValue.toFixed(2))
                                } else {
                                    setTokenAmount('0')
                                }
                                setUsdtAmount(e.target.value)
                            }}
                        />
                        <img src={eth_ic} width={35} height={35} alt='eth' />
                    </div>
                    <button
                        className={`w-1/2 h-[50px] bg-black/[0.95] text-2xl rounded-2xl border-2 ${pending ? `border-yellow-700 text-gray-800` : `border-yellow-500 text-white`}`}
                        disabled={pending}
                        onClick={handleBtn}
                    >
                        {btnMsg}
                    </button>
                </div>
                <div className="w-full px-3 flex flex-row items-center justify-start text-sm text-center">
                    <div className="flex flex-row items-center justify-end gap-2 text-center">
                        <label>Balance: {formatNumber(info.usdtBalance)} </label>
                        <button
                            className={`${pending ? `text-yellow-800` : `text-yellow-400`}`}
                            disabled={pending}
                            onClick={(e) => {
                                const maxValue = getMaxValue(info.usdtBalance, false);
                                if (maxValue && maxValue > 0) {
                                    setUsdtAmount(maxValue.toFixed(2))
                                    setTokenAmount((maxValue * global.TOKEN_PRICE_DEN / global.TOKEN_PRICE_NUM).toFixed(2))
                                }
                            }}
                        >Max</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
