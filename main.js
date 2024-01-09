document.getElementById('connectButton').addEventListener('click', () => {
    connectWallet();
});

document.getElementById('signButton').addEventListener('click', () => {
    signMessage();
});

async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            getBalance(account);
        } catch (error) {
            console.error(error);
        }
    } else {
        alert('MetaMask is not installed. Please install it to use this feature.');
    }
}

async function getBalance(account) {
    if (window.ethereum) {
        try {
            const web3 = new Web3(window.ethereum);
            const balance = await web3.eth.getBalance(account);
            const balanceInEther = web3.utils.fromWei(balance, 'ether');
            document.getElementById('balance').textContent = parseFloat(balanceInEther).toFixed(4);
        } catch (error) {
            console.error(error);
        }
    }
}

async function signMessage() {
    if (!window.ethereum) {
        return alert('MetaMask is not installed. Please install it to use this feature.');
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (accounts.length === 0) {
        return alert('Please connect to MetaMask.');
    }

    const account = accounts[0];
    const message = 'Sign this message to confirm your identity.';
    try {
        const signature = await ethereum.request({
            method: 'personal_sign',
            params: [message, account],
        });
        console.log('Signed message:', signature);
    } catch (error) {
        console.error('Error signing message:', error);
    }
}
