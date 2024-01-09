document.getElementById('connectButton').addEventListener('click', () => {
    connectWallet();
});

async function connectWallet() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const chainId = '0x89'; // Chain ID for Polygon Mainnet
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainId }],
            });

            console.log('Connected to Polygon Mainnet');
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log('MetaMask is not installed. Please install it to use this feature.');
        alert('MetaMask is not installed. Please install it to use this feature.');
    }
}
