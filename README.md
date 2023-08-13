# This is the main repository for AtOM project webApp 

## Demo App: https://frontendv2-sigma.vercel.app


### To install run: 
```npm install```
or
```yarn install```


## Start
```npm run dev```
or
```yarn dev```

## Short description

AtOM allows you to prove your IRL interaction with someone (via EAS attest function) and grow your social graph through NFT badges that represent on or off-chain meets.


### PROJECT DESC
We realized that EAS has a fundamental limitation when creating attestations between 2 parties who have "met IRL". The attestation is only single-sided and there is no way to display or show off the attestation outside of an on-chain signature. So we decided to build the AtOM, or Attestation of Meet. 

AtOM will distribute NFTs, on the Zora network, to users who verify their attestation of meeting through 2 signatures. The NFTs will only be distributed when each user completes the bi-lateral verification. Now individuals can both confirm and display their verified connections. 

Lastly, AtOM will also act as a verified social graph. With AtOM social graph feature, users will be able to visually verify all attested connections through an on-chain web of accounts. 



### HOW it was made:
AtOM is built on top of EAS.  EAS is used to verify the attestation between 2 individuals. AtOM attestation happens BASE network by default, but we also give the option to the users to select between Optimism and Zora, whichever is their preferred network. 

We developed a NEW EAS schema that forces 2 users to attest to a “met IRL” for attestation to be a “verified connection.” After users make a new connection, their dashboard will be populated with verified connections. Each user must then select “verify” on their dashboard in order to be a verified connection. Then each user will be distributed an NFT on the Zora network representing their attestation of the meet.




