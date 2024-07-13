import React, { useState } from 'react';

const OTPInput = ({ length, onChange }) => {
    const [otp, setOtp] = useState(Array(length).fill(''));

    const handleChange = (element, index) => {
        const value = element.value.replace(/[^0-9]/g, '');
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            onChange(newOtp.join(''));
            // Move to next input if value is entered
            if (value && index < length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        // Move to previous input on backspace if current input is empty
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {otp.map((value, index) => (
                <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    value={value}
                    maxLength="1"
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    style={{ width: '2em', textAlign: 'center', fontSize: '1.5em' }}
                />
            ))}
        </div>
    );
};

export default OTPInput;
