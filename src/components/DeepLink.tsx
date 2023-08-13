import Image from 'next/image';
import React from 'react';

const DeepLink = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <a
        href="https://metamask.app.link/send/0x5A2609D698DE041B1Ba77139A4229c8a161dDd9e?value=1e16
      
"
        style={{ wordBreak: 'break-all' }}
      >
        https://metamask.app.link/send/0x5A2609D698DE041B1Ba77139A4229c8a161dDd9e?value=1e16
      </a>
      <div>
        <Image src={'/qreth.png'} alt="qr" width={300} height={300}></Image>
      </div>
    </div>
  );
};

export default DeepLink;
