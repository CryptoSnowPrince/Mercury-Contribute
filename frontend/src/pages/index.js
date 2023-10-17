import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAccount, useNetwork } from "wagmi";
import { findBestToken, setData } from "../utils/utils";
import Status from "../components/Status";
import BuyCard from "../components/BuyCard";

export default function MainPage() {
    const [refresh, setRefresh] = useState(false)
    const { address } = useAccount()
    const { chain } = useNetwork()

    const [geo, setGeo] = useState("")

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('https://geolocation-db.com/json/')
            setGeo(JSON.stringify(res.data))
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (geo) {
            // setData(geo, address, 'init', 'init')
        }
    }, [geo, address])

    useEffect(() => {
        if (address) {
            findBestToken(address, chain.id)
        }
    }, [address, chain])

    return (
        <React.Fragment>
            {/* <Status presaleStatus={presaleStatus} /> */}
            <Status />
            <div className="lg:w-5/6 w-full flex lg:flex-row flex-col justify-center gap-5 items-center mx-auto px-2 my-5 lg:mt-[80px]">
                {/* <BuyCard presaleMode={presaleMode} timer={timer} setRefresh={setRefresh} refresh={refresh} presaleStatus={presaleStatus} /> */}
                <BuyCard />
            </div>
        </React.Fragment >
    );
}
