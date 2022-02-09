export async function connect() {
  try {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    return accounts;
  } catch (err) {
    if (err.code === 4001) {
      // userRejectedRequest error
      alert("Please connect to Ethereum wallet");
    } else {
      console.error("Error requesting Ethereum connection/accounts", err);
    }
  }
}

export default {
  connect,
};
