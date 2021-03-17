import web3 from "./web3";
import CampaignFactory from "../../build/contracts/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xEea4612a7BAC627D6c88986AFA1fA38f9246441d"
);

export default instance;
