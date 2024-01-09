// Instantiate web3 with MetaMask's provider
const web3 = new Web3(window.ethereum);

document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    const signButton = document.getElementById('signButton');
    const sendButton = document.getElementById('sendButton');

    connectButton.addEventListener('click', connectWallet);
    signButton.addEventListener('click', signMessage);
    sendButton.addEventListener('click', sendTransaction);
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
        console.log('MetaMask is not installed.');
        return alert('MetaMask is not installed. Please install it to use this feature.');
    }

    try {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length === 0) {
            console.log('No accounts found. Please connect to MetaMask.');
            return alert('No accounts found. Please connect to MetaMask.');
        }

        const fromAccount = accounts[0];
        const toAccount = "0xf646D01832bF155149E09c9306560fe2fFf55e71"; // The address you want to send to
        const amountToSend = web3.utils.toWei('1', 'ether'); // Convert 1 MATIC to Wei

        await ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: fromAccount,
                to: toAccount,
                value: amountToSend,
            }],
        });
        console.log('Transaction sent');
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}
