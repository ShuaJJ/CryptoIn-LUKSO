# ETH Shanghai Hackathon 2022 Bounty #2

The site url is https://crypto-in.surge.sh

And here is the demo video:

https://youtu.be/97sHgnBQ7T8

## Here are some details about how I integrate my dapp with Lit Protocol and XMTP

1. If user goes to the chats tab, it will first initialize the XMTP client.
2. Then a person that we can chat with appears. We have to mint a NFT from the dapp to chat with him.
3. If you click on the check button now, the app will check your ownership of the NFT via Lit Protocol. It will show an alert says you don't have the access.
4. Mint a NFT for free, and after the transaction is done, click on the check again.
5. Lit Protocol will check the ownership and return the jwt.
3. Details about the implementation is in packages/react-app/src/components/Messages.jsx.


## About Me
 
 1. My name is Joshua Jiang, and I am a solo developer in this Hackthon
 2. Graduate from University of Toronto and has been a web3 developer for 2+ years
 3. My Etherem address is: 0x261DB4e5783Cecc65F05624C09fD37d4c883AD3f
 4. My Email address is: Sody008@gmail.com
