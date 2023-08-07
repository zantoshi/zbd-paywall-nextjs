import React from 'react'
import QRCode from 'react-qr-code';

interface QRProps {
    value: string;
}

export const QR: React.FC<QRProps> = ({value}) => {
  return (
        <div style={{
        maxWidth: 130,
        width: '100%',
        height: 'auto',
        margin: '0 auto 20px auto',
        }}>
        <QRCode
            size={256}
            style={{ 
            width: '100%',
            height: 'auto', 
            maxWidth: '100%',
            }}
            value={value}
            viewBox={`0 0 256 256`}
        />
        </div>
    );
}
