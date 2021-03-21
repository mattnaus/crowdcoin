import web3 from "./web3";
import CampaignFactory from "../../build/contracts/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x205f78d00385093298480c56C51335567C32eA49"
);

export default instance;
