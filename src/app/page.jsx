"use client"
import { ethers } from 'ethers';
import useWalletStore from '../../store/walletStore';
import toast from 'react-hot-toast';

export default function Home() {
  const { address, setAddress, resetAddress } = useWalletStore();

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        // Check if already connected
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          toast.success('Wallet already connected');
          setAddress(accounts[0]);
          return;
        }

        // Request wallet connection
        const [account] = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setAddress(account);
        toast.success('Wallet connected successfully!');

      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        toast.error('Failed to connect to wallet');
      }
    } else {
      toast.error('MetaMask is not installed. Please install MetaMask.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500 mb-4">
        Uniswap Token Swap DApp
      </h1>
      {address ? (
        <div>
          <p>Connected Wallet: {address}</p>
          <button
            onClick={() => {
              resetAddress();
              toast.success('Wallet disconnected');
            }}
            className="bg-red-500 text-white p-2 rounded"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
