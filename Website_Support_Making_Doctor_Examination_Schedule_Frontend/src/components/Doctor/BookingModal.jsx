import React, { useState, useEffect } from "react";
import "./DoctorDetail.css";
import axiosInstance from "../../util/axios";

function BookingModal({ time, date, onClose, doctorId, onSuccess, doctorInfo }) {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    phone: '',
    email: '',
    address: '',
    reason: '',
    gender: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const genderMap = {
    0: "Nam",
    1: "Nữ",
    2: "Khác",
  };

  useEffect(() => {
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log("user in localStorage:", localStorage.getItem("user"));

  if (userData && userData.role === "user") {
    setFormData({
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      phone: userData.phone || "",
      address: userData.address || "",
      reason: "",
      gender: String(userData.gender),
    });
  }else {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      reason: "",
      gender: "",
    });
  }
}, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('http://localhost:8084/api/patient-book-appointment', {
        doctorId: doctorId,
        timeType: time,
        date: date,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        selectedGender: Number(formData.gender),
        reason: formData.reason,
        phone: formData.phone
      });

      if (response.status === 200 && response.data.errCode === 0) {
        onSuccess(); 
      } else {
        setError(response.data.errMessage || "Có lỗi xảy ra.");
      }
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = date?.split("-").reverse().join("/");

  return (
    <div className="modal-overlay">
      <div className="modal" style={{width: '600px', height: 'auto'}}>
        <div className="modal-header">
          <h3>Thông tin đặt lịch khám bệnh</h3>
          <button className="close-btn" onClick={onClose} style={{color: 'red'}}> <i class="fa-solid fa-circle-xmark"></i> </button>
        </div>
        <div className="modal-body">
          {doctorInfo && (
            <>
              <p>
                <strong>
                  {doctorInfo.positionData?.valueVi} {doctorInfo.lastName} {doctorInfo.firstName}
                </strong>
              </p>
              <p className="doctor-description">
                {doctorInfo.Markdown?.description || "Chưa có mô tả"}
              </p>
              <p><strong>{time}</strong> - <strong>{formattedDate}</strong></p>
              <p>Miễn phí đặt lịch</p>
            </>
          )}

          <div className="name-group">
             <input type="text" placeholder="Họ" name="lastName" value={formData.lastName} readOnly  />
             <input type="text" placeholder="Tên" name="firstName" value={formData.firstName} readOnly  />
          </div>
          <input type="text" placeholder="Số điện thoại" name="phone" value={formData.phone} readOnly  />
          <input type="email" placeholder="Địa chỉ email" name="email" value={formData.email} readOnly  />
          <input type="text" placeholder="Địa chỉ liên lạc" name="address" value={formData.address} readOnly />
          <input type="text" placeholder="Lý do khám" name="reason" value={formData.reason} onChange={handleChange} />
          <select name="gender" value={formData.gender} >
            <option value="">-- Chọn giới tính --</option>
            <option value="0">Nam</option>
            <option value="1">Nữ</option>
            <option value="2">Khác</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}
        <div className="modal-footer">
          <button className="confirm-btn" onClick={handleSubmit} disabled={loading} style={{backgroundColor: "red", color: "white"}}>
            {loading ? 'Đang xử lý...' : 'Xác nhận'}
          </button>
          <button className="cancel-btn" onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
