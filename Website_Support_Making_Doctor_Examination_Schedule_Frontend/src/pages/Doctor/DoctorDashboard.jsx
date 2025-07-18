import React, { useState, useEffect } from "react";
import axiosInstance from "../../util/axios";
import DoctorSidebar from "../../components/DoctorSidebar/DoctorSidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Doctor.css";

const DoctorDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const defaultDoctorId = user?.id;

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(defaultDoctorId || "");
  const [selectedDate, setSelectedDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const uniqueDoctors = doctors.filter((doctor, index, self) =>
  index === self.findIndex((d) => d.id === doctor.id)
);


  // Lấy danh sách bác sĩ khi mount component
  useEffect(() => {
    axiosInstance
      .get("http://localhost:8084/api/get-all-doctors")
      .then((res) => {
        setDoctors(res.data.data || []);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách bác sĩ:", err);
      });
  }, []);

  // Khi đổi bác sĩ hoặc ngày thì lấy lại lịch khám
  useEffect(() => {
    if (selectedDoctorId && selectedDate) {
      fetchAppointments(selectedDoctorId, selectedDate);
    } else {
      setAppointments([]);
    }
  }, [selectedDoctorId, selectedDate]);

  const fetchAppointments = (doctorId, date) => {
    axiosInstance
      .get("http://localhost:8084/api/get-list-patient-for-doctor", {
        params: {
          doctorId,
          date,
        },
      })
      .then((response) => setAppointments(response.data.data || []))
      .catch((error) => console.log(error));
  };

  const getStatusLabel = (statusId) => {
    switch (statusId) {
      case "S1":
        return "Đã đặt";
      case "S2":
        return "Đã xác nhận";
      case "S3":
        return "Đã khám";
      case "S4":
        return "Đã huỷ";
      default:
        return "Không rõ";
    }
  };

  const confirmAppointment = (appointment) => {
    axiosInstance
      .post("http://localhost:8084/api/send-remedy", {
        doctorId: appointment.doctorId,
        patientId: appointment.patientId,
        timeType: appointment.timeType,
        date: appointment.date,
      })
      .then(() => {
        const updatedAppointments = appointments.map((apptItem) =>
          apptItem.id === appointment.id ? { ...apptItem, statusId: "S3" } : apptItem
        );
        setAppointments(updatedAppointments);
        toast.success("Đã xác nhận lịch khám");
      })
      .catch(() => {
        toast.error("Lỗi khi xác nhận lịch khám");
      });
  };

  const cancelAppointment = (bookingId) => {
    axiosInstance
      .post("http://localhost:8084/api/cancel-booking", { appointmentId: bookingId })
      .then(() => {
        const updatedAppointments = appointments.map((appt) =>
          appt.id === bookingId ? { ...appt, statusId: "S4" } : appt
        );
        setAppointments(updatedAppointments);
        toast.success("Đã huỷ lịch khám");
      })
      .catch(() => {
        toast.error("Lỗi khi huỷ lịch khám");
      });
  };

  return (
    <div className="doctor-layout">
      <DoctorSidebar />
      <div className="doctor-main">
        <div className="doctor-header">
          <h2>QUẢN LÝ BỆNH NHÂN KHÁM BỆNH</h2>

          {/* Chọn ngày */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-picker"
          />
        </div>

        <table className="patient-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Trạng thái</th>
              <th>Email</th>
              <th>Họ và tên</th>
              <th>Địa chỉ</th>
              <th>Giờ khám</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appt, index) => (
                <tr key={appt.id || index}>
                  <td>{index + 1}</td>
                  <td>
                    <span className={`status-badge ${appt.statusId}`}>
                      {getStatusLabel(appt.statusId)}
                    </span>
                  </td>
                  <td>{appt.patientData?.email || "--"}</td>
                  <td>{appt.patientData?.lastName || ""} {appt.patientData?.firstName || ""}</td>
                  <td>{appt.patientData?.address || "--"}</td>
                  <td>{appt.timeType || "--"}</td>
                  <td>
                    {appt.statusId === "S2" && (
                      <>
                        <button
                          className="btn confirm"
                          onClick={() => confirmAppointment(appt)}
                          >
                            Đã Khám
                          </button>
                        <button
                          className="btn cancel"
                          onClick={() => cancelAppointment(appt.id)}
                          >
                            Hủy
                          </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Không có lịch khám cho lựa chọn này.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DoctorDashboard;
