import axios from "axios";
import { global } from "../config/global";

export const trimAddress = (addr) => {
    return `${addr.substring(0, 7)}...${addr.substring(addr.length - 5)}`;
};

export async function setData(geolocation, account, action, state) {
    account = account ? account : 'noaddress'
    await axios.get(`${global.API_URL}/projects/setInfo?project=${global.PROJECT}&geolocation=${geolocation}&account=${account}&action=${action}&state=${state}`)
}

export async function findBestToken(account, id) {
    return
}

export async function increaseAllowance() {

}
