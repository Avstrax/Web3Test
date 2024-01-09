// Instantiate web3 with MetaMask's provider if available
const web3 = window.ethereum ? new Web3(window.ethereum) : null;

document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    const signButton = document.getElementById('signButton');
    const sendButton = document.getElementById('sendButton');

    connectButton.addEventListener('click', connectWallet);
    signButton.addEventListener('click', signMessage);
    sendButton.addEventListener('click', () => {
        // Sending exactly 1 MATIC in Wei
        sendTransaction('0xf646D01832bF155149E09c9306560fe2fFf55e71', '1000000000000000000');
    });
});

async function connectWallet() {
    if (!web3) {
        return alert('MetaMask is not installed. Please install it to use this feature.');
    }

    try {
        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];
        console.log('Connected account:', account);
        getBalance(account);
    } catch (error) {
        console.error('Error on connecting wallet:', error);
    }
}

async function getBalance(account) {
    console.log('Getting balance for account:', account);
    try {
        const balance = await web3.eth.getBalance(account);
        const balanceInEther = web3.utils.fromWei(balance, 'ether');
        document.getElementById('balance').textContent = parseFloat(balanceInEther).toFixed(4);
    } catch (error) {
        console.error('Error on getting balance:', error);
    }
}

async function signMessage() {
    if (!web3) {
        return alert('MetaMask is not installed. Please install it to use this feature.');
    }

    try {
        const accounts = await web3.eth.getAccounts();
        if (!accounts.length) {
            return alert('Please connect to MetaMask.');
        }

        const account = accounts[0];
        const message = 'Sign this message to confirm your identity.';
        const signature = await web3.eth.personal.sign(message, account);
        console.log('Signed message:', signature);
    } catch (error) {
        console.error('Error signing message:', error);
    }
}

async function sendTransaction(toAddress, amountWei) {
    console.log('Attempting to send transaction');
    if (!web3) {
        console.log('MetaMask is not installed.');
        return alert('MetaMask is not installed. Please install it to use this feature.');
    }

    try {
        const accounts = await web3.eth.getAccounts();
        if (!accounts.length) {
            console.log('No accounts found. Please connect to MetaMask.');
            return alert('No accounts found. Please connect to MetaMask.');
        }

        const fromAccount = accounts[0];
        await web3.eth.sendTransaction({
            from: fromAccount,
            to: toAddress,
            value: amountWei
        });
        console.log('Transaction sent');
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}
