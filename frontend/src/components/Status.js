import { formatNumber } from "../utils/utils";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { useAccount } from 'wagmi'
import { global } from "../config/global";
import eth_ic from "../assets/img/eth.png"
import usdt_ic from "../assets/img/usdt.svg"

export default function Status(props) {
    const { address } = useAccount()
    const [info, setInfo] = useState({
        totalFunds: 0,
        totalFundsByChain: 0,
        totalAmounts: 0,
        totalAmountsByChain: 0,
        userFunds: 0,
        userFundsByChain: 0,
        userAmounts: 0,
        userAmountsByChain: 0
    })

    useEffect(() => {
        try {
            if (Object.keys(props.presaleStatus).length > 0) {
                const presaleStatus = props.presaleStatus

                const _info = {
                    totalFunds: 0,
                    totalFundsByChain: 0,
                    totalAmounts: 0,
                    totalAmountsByChain: 0,
                    userFunds: 0,
                    userFundsByChain: 0,
                    userAmounts: 0,
                    userAmountsByChain: 0
                }

                for (let index = 0; index < global.chains.length; index++) {
                    const statusByChain = presaleStatus[global.chains[index].id];
                    if (statusByChain[0].status === "success" && statusByChain[3].status === "success") {
                        _info.totalFunds += parseFloat(formatUnits(statusByChain[0].result, statusByChain[3].result))
                    }

                    if (statusByChain[1].status === "success") {
                        _info.totalAmounts += parseFloat(formatUnits(statusByChain[1].result, 6))
                    }

                    if (address && statusByChain[4].status === "success" && statusByChain[3].status === "success") {
                        _info.userAmounts += parseFloat(formatUnits(statusByChain[4].result[0], 6))
                        _info.userFunds += parseFloat(formatUnits(statusByChain[4].result[2], statusByChain[3].result))
                    }
                }
                setInfo(_info)
            }
        } catch (error) {
            console.log('status error: ', error)
        }
    }, [props.presaleStatus, address])

    return (
        <div className="w-5/6 mx-auto rounded-2xl border-2 gap-4 border-gray-700 flex lg:flex-row flex-col items-center justify-between text-center lg:px-10 px-3 py-3">
            <div className="lg:w-1/6 w-full rounded-2xl border-2 border-gray-700 flex lg:flex-col flex-row lg:justify-center justify-between items-center text-center px-2 py-1">
                <label>Total Raised </label>
                <div className="flex flex-col items-center">
                    <img src={eth_ic} width={35} height={35} alt='eth' />
                    <label className="text-yellow-500">{formatNumber(info.totalFunds)} ETH </label>
                </div>
            </div>
            <div className="lg:w-1/6 w-full rounded-2xl border-2 border-gray-700 flex lg:flex-col flex-row lg:justify-center justify-between items-center text-center px-2 py-1">
                <label>You Invest</label>
                <div className="flex flex-col items-center">
                    <img src={eth_ic} width={35} height={35} alt='eth' />
                    <label className="text-yellow-500">{formatNumber(info.userFunds)} ETH </label>
                </div>
            </div>
            <div className="lg:w-1/6 w-full rounded-2xl border-2 border-gray-700 flex lg:flex-col flex-row lg:justify-center justify-between items-center text-center px-2 py-1">
                <label>Total Raised</label>
                <div className="flex flex-col items-center">
                    <img src={usdt_ic} width={35} height={35} alt='logo' />
                    <label className="text-yellow-500">{formatNumber(info.totalAmounts)} USDT </label>
                </div>
            </div>
            <div className="lg:w-1/6 w-full rounded-2xl border-2 border-gray-700 flex lg:flex-col flex-row lg:justify-center justify-between items-center text-center px-2 py-1">
                <label>You Invest </label>
                <div className="flex flex-col items-center">
                    <img src={usdt_ic} width={35} height={35} alt='logo' />
                    <label className="text-yellow-500">{formatNumber(info.userAmounts)} USDT </label>
                </div>
            </div>
        </div>
    );
}
