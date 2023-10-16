import { Typography } from "@material-tailwind/react";
import React from "react";
import { global } from "../../config/global";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <React.Fragment>
      <div className="w-full mx-auto bg-yellow-400 mt-10 lg:pt-5 flex flex-col gap-5">
        <div className="w-2/3 flex flex-col justify-center mx-auto">
          <div className="w-full flex justify-center gap-3 mb-10 mt-2">
            <a href="https://twitter.com/hpths777inu" target="_blank" rel="noreferrer" title="Go to Twitter page" className="social-icons__link" data-v-db746e32="">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25H21.552L14.325 10.51L22.827 21.75H16.17L10.956 14.933L4.99003 21.75H1.68003L9.41003 12.915L1.25403 2.25H8.08003L12.793 8.481L18.244 2.25ZM17.083 19.77H18.916L7.08403 4.126H5.11703L17.083 19.77Z" fill="currentColor">
                </path>
              </svg>
            </a>
            <a href="https://t.me/ETHEREUMCoinPortal" target="_blank" rel="noreferrer" title="Go to Telegram page" className="social-icons__link" data-v-db746e32="">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.37097 0 0 5.37097 0 12C0 18.629 5.37097 24 12 24C18.629 24 24 18.629 24 12C24 5.37097 18.629 0 12 0ZM17.8935 8.22097L15.9242 17.5016C15.779 18.1597 15.3871 18.3194 14.8403 18.0097L11.8403 15.7984L10.3935 17.1919C10.2339 17.3516 10.0984 17.4871 9.78871 17.4871L10.0016 14.4339L15.5613 9.41129C15.8032 9.19839 15.5081 9.07742 15.1887 9.29032L8.31774 13.6161L5.35645 12.6919C4.7129 12.4887 4.69839 12.0484 5.49194 11.7387L17.0613 7.27742C17.5984 7.08387 18.0677 7.40806 17.8935 8.22097Z" fill="currentColor">
                </path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto mt-5 lg:pt-2 flex flex-col gap-2" id="about">
        <div className="w-2/3 flex flex-col lg:flex-row justify-center mx-auto my-3">
          <Typography variant="h1" className="text-yellow-300 text-center font-menu font-bold">
            {`About`}
          </Typography>
        </div>
        <div className="lg:w-2/3 w-11/12 flex flex-col lg:flex-row justify-center mx-3 lg:mx-auto mt-0 mb-3 overflow-x-hidden whitespace-pre-wrap">
          <Typography variant="h4" className="text-white text-center font-menu font-bold break-words">
            {`HPTHS777INU TRUMPOS are 777 exclusive unique manifestations of harrypottertrumphomersimpson777inu's egregore. Imbued with high speed presidential wizardry and lifelong loyalty.`}
          </Typography>
        </div>
        <div className="lg:w-2/3 w-11/12 flex flex-col lg:flex-row justify-center mx-3 lg:mx-auto mt-0 mb-10 overflow-x-hidden whitespace-pre-wrap">
          <Link
            to={`${global.chain.blockExplorers.default.url}/address/${global.CONTRACTS.NFT}`}
            target="_blank"
          >
            <Typography variant="h4" className="break-words text-yellow-300 text-center font-sans font-bold hover:underline hover:underline-offset-4">
              {`CA - ${global.CONTRACTS.NFT}`}
            </Typography>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
