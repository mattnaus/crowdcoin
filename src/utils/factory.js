import web3 from "./web3";
import CampaignFactory from "../../build/contracts/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xA45aA0C0C80117B1D493b7ec33D92fDC39A29f4E"
);

export default instance;
