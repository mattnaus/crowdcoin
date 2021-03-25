pragma solidity >=0.4.25 <0.7.0;
pragma experimental ABIEncoderV2;

contract CampaignFactory {
	Campaign[] public deployedCampaigns;

	function createCampaign(uint minimum) public {
		Campaign newCampaign = new Campaign(minimum, msg.sender);
		deployedCampaigns.push(newCampaign);
	}

	function getDeployedCampaigns() public view returns (Campaign[] memory) {
		return deployedCampaigns;
	}
}

contract Campaign {
	struct Request {
		string description;
		uint value;
		address payable recipient;
		bool complete;
		uint approvalCount;
		mapping(address => bool) approvals;
	}

	Request[] public requests;
	address public manager;
	uint public minimumContribution;
	mapping(address => bool) public approvers;
	uint public approvalCount;

	modifier restricted() {
		require(msg.sender == manager);
		_;
	}

	constructor(uint minimum, address creator) public {
		manager = creator;
		minimumContribution = minimum;
	}

	function contribute() public payable {
		require(msg.value > minimumContribution);

		approvers[msg.sender] = true;
		approvalCount++;
	}

	function createRequest(string memory description, uint value, address payable recipient)
		public restricted {
			Request memory newRequest = Request({
				description: description,
				value: value,
				recipient: recipient,
				complete: false,
				approvalCount: 0
			});

		requests.push(newRequest);
	}

	function approveRequest(uint index) public {
		Request storage request = requests[index];

		require(approvers[msg.sender]);
		require(!request.approvals[msg.sender]);

		request.approvals[msg.sender] = true;
		request.approvalCount++;
	}

	function finalizeRequest(uint index) public {
		Request storage request = requests[index];

		require(request.approvalCount > (approvalCount/2));
		require(!request.complete);

		request.recipient.transfer(request.value);
		request.complete = true;
	}

	function getSummary() public view returns (uint, uint, uint, uint, address) {
		return (
			minimumContribution,
			address(this).balance,
			requests.length,
			approvalCount,
			manager
		);
	}

	function getRequestsCount() public view returns (uint) {
		return requests.length;
	}

	function getAllRequests() public view returns (string[] memory, uint[] memory, address[] memory, bool[] memory, uint[] memory) {

	    string[] memory description = new string[](requests.length);
			uint[] memory value = new uint[](requests.length);
			address[] memory recipient = new address[](requests.length);
			bool[] memory complete = new bool[](requests.length);
			uint[] memory aCount = new uint[](requests.length);

	    for(uint i = 0; i < requests.length; i++) {

	        description[i] = requests[i].description;
					value[i] = requests[i].value;
					recipient[i] = requests[i].recipient;
					complete[i] = requests[i].complete;
					aCount[i] = requests[i].approvalCount;

	    }

	    return (description, value, recipient, complete, aCount);

	}

}
