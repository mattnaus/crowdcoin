const Campaign = artifacts.require("Campaign");
const CampaignFactory = artifacts.require("CampaignFactory");

contract("Campaign", async (accounts) => {
  let CampaignFactoryInstance;
  let CampaignInstance;

  beforeEach(async () => {
    CampaignFactoryInstance = await CampaignFactory.deployed();
    CampaignInstance = await Campaign.new(100, accounts[0]);
  });

  it("Deployes a factory and a campaign", async () => {
    assert.ok(CampaignFactoryInstance.address);
    assert.ok(CampaignInstance.address);
  });

  it("Marks caller as the campaign manager", async () => {
    const manager = await CampaignInstance.manager();
    assert.equal(accounts[0], manager);
  });

  it("Allows people to contribute money and marks them as approvers", async () => {
    await CampaignInstance.contribute({
      value: "200",
      from: accounts[1],
    });
    const isContributor = await CampaignInstance.approvers(accounts[1]);
    assert(isContributor);
  });

  it("Requires a minimum contribution", async () => {
    try {
      await CampaignInstance.contribute({
        from: accounts[1],
        value: "50",
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("Allows a manager to make a request", async () => {
    await CampaignInstance.createRequest("Buy batteries", "100", accounts[1], {
      from: accounts[0],
      gas: "1000000",
    });

    const request = await CampaignInstance.requests(0);

    assert.equal("Buy batteries", request.description);
  });

  it("Processes requests", async () => {
    await CampaignInstance.contribute({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });

    await CampaignInstance.createRequest(
      "As",
      web3.utils.toWei("5", "ether"),
      accounts[1],
      { from: accounts[0], gas: "1000000" }
    );

    await CampaignInstance.approveRequest(0, {
      from: accounts[0],
      gas: "1000000",
    });

    let balanceOld = await web3.eth.getBalance(accounts[1]);
    balanceOld = web3.utils.fromWei(balanceOld, "ether");
    balanceOld = parseFloat(balanceOld);

    await CampaignInstance.finalizeRequest(0, {
      from: accounts[0],
      gas: "1000000",
    });

    let balanceNew = await web3.eth.getBalance(accounts[1]);
    balanceNew = web3.utils.fromWei(balanceNew, "ether");
    balanceNew = parseFloat(balanceNew);

    //console.log(balanceNew, balanceOld);
    assert(balanceNew > balanceOld + 4);
  });

  it("Returns a campaign summary", async () => {
    await CampaignInstance.contribute({
      from: accounts[0],
      value: 250,
    });

    await CampaignInstance.createRequest("As", 300, accounts[1], {
      from: accounts[0],
      gas: "1000000",
    });

    let summary = await CampaignInstance.getSummary();

    assert.equal(100, summary[0]);
    assert.equal(250, summary[1]);
    assert.equal(1, summary[2]);
    assert.equal(1, summary[3]);
    assert.equal(accounts[0], summary[4]);
  });

  it("Returns the number of requests", async () => {
    await CampaignInstance.createRequest("As", 300, accounts[1], {
      from: accounts[0],
      gas: "1000000",
    });

    await CampaignInstance.createRequest("As", 300, accounts[1], {
      from: accounts[0],
      gas: "1000000",
    });

    let nrOfRequests = await CampaignInstance.getRequestsCount();

    assert.equal(2, nrOfRequests);
  });
});
