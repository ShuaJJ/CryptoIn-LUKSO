# Build A DApp Using Arweave

The site url is https://crypto-in.surge.sh

## Here are some details about how I integrate my dapp with Arweave

1. The homepage is showing feeds from rss3, all the images are stored using Arweave permanent storage service.
2. In "Mine" tab, users can post feeds. When they upload an image, it's uploaded to Arweave using the SDK.
3. A component is created to render the images stored on Arweave. It's packages/react-app/src/components/ArweaveImage.tsx.
4. For storing images, the codes are at packages/react-app/src/components/PostModal.tsx.
5. I found out if there is no balance in arweave wallet, images cannot be uploaded. That's why currently I use my own key for this demo.


## About Me
 
 1. My name is Joshua Jiang, and I am a solo developer in this Hackthon
 2. Graduate from University of Toronto and has been a web3 developer for 2+ years
 3. My Etherem address is: 0x261DB4e5783Cecc65F05624C09fD37d4c883AD3f
