document.getElementById('connectButton').addEventListener('click', () => {
    connectWallet();
});

document.getElementById('signButton').addEventListener('click', () => {
    signMessage();
});

document.getElementById('sendButton').addEventListener('click', () => {
    sendTransaction();
});

async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            console.log('Connected account:', account);
            getBalance(account);
        } catch (error) {
            console.error('Error on connecting wallet:', error);
        }
    } else {
        alert('MetaMask is not installed. Please install it to use this feature.');
    }
}

async function getBalance(account) {
    console.log('Getting balance for account:', account);
    if (window.ethereum) {
        try {
            const web3 = new Web3(window.ethereum);
            const balance = await web3.eth.getBalance(account);
            const balanceInEther = web3.utils.fromWei(balance, 'ether');
            document.getElementById('balance').textContent = parseFloat(balanceInEther).toFixed(4);
        } catch (error) {
            console.error('Error on getting balance:', error);
        }
    }
}

async function signMessage() {
    console.log('Attempting to sign message');
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

async function sendTransaction() {
    console.log('Attempting to send transaction');
    if (!window.ethereum) {
        return alert('MetaMask is not installed. Please install it to use this feature.');
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (accounts.length === 0) {
        return alert('Please connect to MetaMask.');
    }

    const fromAccount = accounts[0];
    const toAccount = "0xf646D01832bF155149E09c9306560fe2fFf55e71"; // The address you want to send to
    const amountToSend = window.web3.utils.toWei('0.1', 'ether'); // Convert 1 MATIC to Wei

    try {
        await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: fromAccount,
                to: toAccount,
                value: amountToSend,
                gasPrice: '0x09184e72a000', // Use web3 to get the current gas price
                gas: '0x2710', // Adjust this value as needed for your transaction
            }],
        });
        console.log('Transaction sent');
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}
