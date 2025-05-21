import React, { useState } from 'react';
import '../Styles/order-form.css';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    product: '',
    description: '',
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const isMobileValid = formData.mobile.match(/^[6-9]\d{9}$/);
  const isFormFilled = Object.values(formData).every((val) => val.trim() !== '');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = () => {
    if (!isMobileValid) {
      alert('Please enter a valid mobile number.');
      return;
    }
    setOtpSent(true);
    alert(`OTP sent to ${formData.mobile} (mocked for now). Use 1234`);
  };

  const handleVerifyOTP = () => {
    if (otp.trim() === '1234') {
      setIsOtpVerified(true);
      alert('Mobile number verified successfully.');
    } else {
      alert('Incorrect OTP');
    }
  };

  // const generateWhatsAppLink = () => {
  //   const { name, mobile, address, product, description } = formData;
  //   const message = `*Furniture Order Request*\n\n👤 Name: ${name}\n📞 Mobile: ${mobile}\n🏠 Address: ${address}\n🪑 Product: ${product}\n📝 Description: ${description}`;
  //   return `https://wa.me/919999999999?text=${encodeURIComponent(message)}`; // replace with your WhatsApp number
  // };

 const handleSubmitOrder = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.status === 201 && result.whatsappLink) {
        window.open(result.whatsappLink, '_blank');
      } else {  
        alert('Order saved but failed to get WhatsApp link.');
      }
    } catch (error) {
      console.error('Submit order error:', error);
      alert('Something went wrong while submitting your order.');
    }
  };

  return (
    <div className="order-form-container">
      <h2 className="form-title">Place Your Order</h2>

      <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
      <input type="text" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} />

      <button className="otp-btn" onClick={handleSendOTP} disabled={!isMobileValid || otpSent}>
        {otpSent ? 'OTP Sent' : 'Send OTP'}
      </button>

      {otpSent && !isOtpVerified && (
        <>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button className="verify-btn" onClick={handleVerifyOTP}>Verify OTP</button>
        </>
      )}

      <input type="text" name="address" placeholder="Full Address" value={formData.address} onChange={handleChange} />
      <select name="product" value={formData.product} onChange={handleChange}>
        <option value="">Select Product</option>
        <option value="Sofa">Sofa</option>
        <option value="Bed">Bed</option>
        <option value="Armchair">Armchair</option>
        <option value="Dining Table">Dining Table</option>
        <option value="Wardrobe">Wardrobe</option>
      </select>

      <textarea
        name="description"
        placeholder="Describe your customization or requirements..."
        rows="4"
        value={formData.description}
        onChange={handleChange}
      />

      {isOtpVerified && isFormFilled && (
        <button className="submit-btn" onClick={handleSubmitOrder}>
          Place Order & Send via WhatsApp
        </button>
      )}
    </div>
  );
};

export default OrderForm;
