import logo from '../logo_3.png';
import fullLogo from '../full_logo.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

function Navbar({theme, toggleTheme}) {

  const [connected, toggleConnect] = useState(false);
    const location = useLocation();
    const [currAddress, updateAddress] = useState("0x");

    async function getAddress() {
        const ethers = require("ethers");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        updateAddress(addr);
    }

    function updateButton() {
        const ethereumButton = document.querySelector(".enableEthereumButton");
        ethereumButton.textContent = "Connected";
        ethereumButton.classList.remove("hover:bg-blue-70");
        ethereumButton.classList.remove("bg-blue-500");
        ethereumButton.classList.add("hover:bg-green-70");
        ethereumButton.classList.add("bg-green-500");
    }

    async function connectWebsite() {
        if (typeof window == "undefined" || typeof window.ethereum == "undefined") {
            alert("Please install metamask: https://metamask.io/download/");
        }
        const chainId = await window.ethereum.request({ method: "eth_chainId" });
        if (chainId !== "0x5") {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x5" }],
            });
        }
        await window.ethereum.request({ method: "eth_requestAccounts" }).then(() => {
            updateButton();
            getAddress();
            window.location.replace(location.pathname);
        });
    }

    useEffect(() => {
        getCurrentWalletConnected();
    }, [currAddress]);

    const getCurrentWalletConnected = async () => {
        if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_accounts",
                });
                if (accounts.length > 0) {
                    getAddress();
                    toggleConnect(true);
                    updateButton();
                } else {
                    console.log("Connect to MetaMask using the Connect button");
                }
                window.ethereum.on("accountsChanged", function (accounts) {
                    window.location.replace(location.pathname);
                });
            } catch (err) {
                console.error(err.message);
            }
        } else {
            /* MetaMask is not installed */
            console.log("Please install MetaMask");
        }
    };

    return (
      <div className="">
        <nav className="w-screen">
          <ul className='flex items-end justify-between py-3 bg-transparent text-white pr-5'>
          <li className='flex items-end ml-5 pb-2'>
            <Link to="/">
            <div id={theme} className='inline-block font-bold text-xl ml-2'>
              NFT Marketplace
            </div>
            </Link>
          </li>
          <li className='w-2/6'>
            <ul className='lg:flex justify-between font-bold mr-10 text-lg'>
              {location.pathname === "/" ? 
                <li id={theme} className=''>
                  <Link to="/">Marketplace</Link>
                </li>
                :
                <li id={theme} className=''>
                  <Link to="/">Marketplace</Link>
                </li>              
              }
              {location.pathname === "/sellNFT" ? 
                <li id={theme} className='2'>
                  <Link to="/sellNFT">List My NFT</Link>
                </li>
                :
                <li id={theme} className=''>
                  <Link to="/sellNFT">List My NFT</Link>
                </li>              
              }              
              {location.pathname === "/profile" ? 
                <li id={theme} className=''>
                  <Link to="/profile">Profile</Link>
                </li>
                :
                <li id={theme} className=''>
                  <Link to="/profile">Profile</Link>
                </li>              
              } 
              <li onClick={toggleTheme} className='pb-0 p-2'>
                <img role="button" style={{"width":"25px"}} src={(theme === "light") ? require('../9023566_moon_fill_icon.png') : require('../9024829_sun_light_icon.png')}></img>
              </li>
              <li>
                <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={connectWebsite}>{connected? "Connected":"Connect Wallet"}</button>
              </li>
            </ul>
          </li>
          </ul>
        </nav>
        <div id={theme} className='text-white text-bold text-right mr-10 text-sm'>
          {currAddress !== "0x" ? "Connected to":"Not Connected. Please login to view NFTs"} {currAddress !== "0x" ? (currAddress.substring(0,15)+'...'):""}
        </div>
      </div>
    );
  }

  export default Navbar;