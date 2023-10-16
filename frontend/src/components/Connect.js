import React from "react";

import { useAccount, useDisconnect, useNetwork } from 'wagmi'

import ic_ethereum from "../assets/img/networks/ethereum.png";
import ic_wrong from "../assets/img/networks/wrong.png";
import { toast } from 'react-toastify'
import { global } from "../config/global";
import { trimAddress } from "../utils/utils";
import { YourApp } from "./YourApp";

export const Connect = function (props) {
  // const [, setLoading] = useState(false)

  const { address } = useAccount()
  const { chain } = useNetwork()
  // const { isOpen, open, setDefaultChain } = useWeb3Modal();
  const { disconnect } = useDisconnect();

  const onConnect = async () => {
    // try {
    //   setDefaultChain(global.chain)
    //   setLoading(true)
    //   await open()
    //   setLoading(false)
    // } catch (error) {
    //   setLoading(false)
    //   toast.error(error)
    // }
  }

  const onDisconnect = async () => {
    try {
      disconnect()
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <React.Fragment>
      <>
        <button
          className="flex gap-1 text-lg font-menu text-yellow-300 border-yellow-300 border-2 rounded-full px-3 py-2 items-center"
          onClick={(e) => {
            if (address && chain && chain.id !== global.chain.id) {
              toast.warn('Please switch to Ethereum Mainnet!')
            }
          }}
        >
          {address && chain && chain.id !== global.chain.id ? (
            <>
              <img src={ic_wrong} alt="wrong" width="30px" />
              Wrong Network
            </>
          ) : (
            <>
              <img src={ic_ethereum} alt="ethereum" width="30px" />
              Ethereum Mainnet
            </>
          )}
        </button>
        {address ? (
          <button
            type="button"
            className="text-lg border-2 border-yellow-300 px-2 py-1 rounded-full text-yellow-300"
            onClick={onDisconnect}
          >
            {address && trimAddress(address)}
          </button>
        ) : (
          <button
            type="button"
            className="text-lg border-2 font-menu border-yellow-300 px-2 py-1 rounded-full text-yellow-300"
            onClick={onConnect}
          >
            {!false ? 'Connect Wallet' : 'Connecting...'}
          </button>
        )
        }
        <button
          type="button"
          className="text-lg border-2 font-menu border-yellow-300 px-2 py-1 rounded-full text-yellow-300"
          onClick={onConnect}
        >
          <YourApp />
        </button>
      </>
    </React.Fragment>
  );
};

export default Connect;
