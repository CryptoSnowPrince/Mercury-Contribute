import { Typography } from "@material-tailwind/react";
import React from "react";

import image1 from "../../assets/img/community/1.webp"
import image2 from "../../assets/img/community/2.avif"
import image3 from "../../assets/img/community/3.avif"
import image4 from "../../assets/img/community/4.avif"
import image5 from "../../assets/img/community/5.avif"
import image6 from "../../assets/img/community/6.gif"
import image7 from "../../assets/img/community/7.avif"
import image8 from "../../assets/img/community/8.avif"
import image9 from "../../assets/img/community/9.avif"

export default function Community() {
  return (
    <React.Fragment>
      <div className="w-full mx-auto bg-yellow-400 mt-50 lg:pt-10 flex flex-col gap-5" id="socials">
        <div className="w-2/3 flex flex-col lg:flex-row justify-center mx-auto my-5">
          <Typography variant="h1" className="text-black text-center font-menu font-bold">
            {`COMMUNITY`}
          </Typography>
        </div>
        <div className="w-2/3 flex flex-col lg:flex-row justify-center mx-auto gap-5">
          <div className="lg:w-1/3 w-full">
            <img
              src={image1}
              alt="logo"
              height="450px"
              width="450px"
              className="px-2"
            />
          </div>
          <div className="lg:w-1/3 w-full">
            <img
              src={image2}
              alt="logo"
              height="450px"
              width="450px"
              className="px-2"
            />
          </div>
          <div className="lg:w-1/3 w-full">
            <img
              src={image3}
              alt="logo"
              height="450px"
              width="450px"
              className="px-2"
            />
          </div>
        </div>
        <div className="w-2/3 flex flex-col lg:flex-row justify-center mx-auto gap-5">
          <div className="lg:w-1/3 w-full">
            <img
              src={image4}
              alt="logo"
              height="450px"
              width="450px"
              className="px-2"
            />
          </div>
          <div className="lg:w-1/3 w-full">
            <img
              src={image5}
              alt="logo"
              height="450px"
              width="450px"
              className="px-2"
            />
          </div>
          <div className="lg:w-1/3 w-full">
            <img
              src={image6}
              alt="logo"
              height="450px"
              width="450px"
              className="px-2"
            />
          </div>
        </div>
        <div className="w-2/3 flex flex-col lg:flex-row justify-center mx-auto gap-5">
          <div className="lg:w-1/3 w-full">
            <img
              src={image7}
              alt="logo"
              height="450px"
              width="450px"
              className="px-2"
            />
          </div>
          <div className="lg:w-1/3 w-full">
            <img
              src={image8}
              alt="logo"
              height="450px"
              width="450px"
              className="px-2"
            />
          </div>
          <div className="lg:w-1/3 w-full">
            <img
              src={image9}
              alt="logo"
              height="450px"
              width="450px"
              className="px-2"
            />
          </div>
        </div>
        <div className="w-2/3 h-6 flex flex-col lg:flex-row justify-center mx-auto">
          <svg className="w-full" stroke="white" preserveAspectRatio="none">
            <line x1="0" y1="50%" x2="100%" y2="50%" strokeWidth="4" preserveAspectRatio="none"></line>
          </svg>
        </div>
        <div className="w-2/3 flex flex-col justify-center mx-auto">
          <Typography variant="h2" className="text-black text-center font-menu font-bold">
            {`FOLLOW US`}
          </Typography>
          <Typography variant="h6" className="text-black text-center font-menu font-bold">
            {`admin@hpths777inu.com`}
          </Typography>
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
    </React.Fragment>
  );
}
