import doctorService from "../services/doctorService";
const db = require("../models"); 

// Lấy danh sách bác sĩ nổi bật lên trang chủ
let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await doctorService.getTopDoctorHome(+limit); 
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

// Lấy danh sách tất cả bác sĩ 
let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (e) {
    console.log(e);
    return res.status.json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

// Lưu thông tin HTML hoặc Markdown của bác sĩ 
let postInforDoctor = async (req, res) => {
  try {
    let response = await doctorService.saveDetailInforDoctor(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status.json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

//Lấy tất cả thông tin bác sĩ 
let getAllDoctorInfos = async (req, res) => {
  const result = await doctorService.getAllDoctorInfos();
  return res.status(200).json(result);
};

// Xóa thông tin doctor theo id
let deleteDoctor = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await doctorService.deleteDoctor(id);
    return res.status(200).json(response);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

// Sửa thông tin bác sĩ 
let editDoctor = async (req, res) => {
  try {
    const {
      id,
      doctorId,
      specialtyId,
      clinicId,
      priceId,
      provinceId,
      paymentId,
      addressClinic,
      nameClinic,
      note,
      contentMarkdown,
      contentHTML,
      description,
    } = req.body;

    if (!id || !doctorId) {
      return res.status(400).json({
        errCode: 1,
        errMessage: "Thiếu ID hoặc doctorId!",
      });
    }
    const data = {
      id,
      doctorId,
      specialtyId,
      clinicId,
      priceId,
      provinceId,
      paymentId,
      addressClinic,
      nameClinic,
      note,
      contentMarkdown,
      contentHTML,
      description,
    };
    const result = await doctorService.editDoctor(data);
    return res.status(200).json(result);

  } catch (e) {
    console.error(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Lỗi server",
    });
  }
};

// Lấy thông tin chi tiết bác sĩ theo id lên giao diện 
let getDetailDoctorById = async (req, res) => {
  try {
    let infor = await doctorService.getDetailDoctorById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

// Lưu lịch khám cho bác sĩ (Bảng Schedule )
const MAX_NUMBER_SCHEDULE = 10;
let bulkCreateSchedule = async (req, res) => {
  try {
    const { arrSchedule, doctorId, date } = req.body;
    if (!arrSchedule || !doctorId || !date) {
      return res.status(400).json({
        errCode: 1,
        errMessage: "Missing required parameters: arrSchedule, doctorId, date",
      });
    }
    let infor = await doctorService.bulkCreateSchedule({
      arrSchedule,
      doctorId,
      date,
      maxNumber: MAX_NUMBER_SCHEDULE,
    });
    return res.status(200).json(infor);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

// Lấy thông tin bác sĩ theo ngày
let getScheduleByDate = async (req, res) => {
  try {
    let { doctorId, date } = req.query;
    if (!doctorId || !date) {
      return res.status(400).json({
        errCode: 1,
        errMessage: "Missing doctorId or date",
      });
    }
    let data = await doctorService.getScheduleByDate(doctorId, date);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getExtraInforDoctorById = async (req, res) => {
  try {
    let infor = await doctorService.getExtraInforDoctorById(req.query.doctorId);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getProfileDoctorById = async (req, res) => {
  try {
    let infor = await doctorService.getProfileDoctorById(req.query.doctorId);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

// Lấy danh sách bệnh nhận cho bác sĩ theo ngày 
const getListPatientForDoctor = async (req, res) => {
  try {
    const { doctorId, date } = req.query;
    if (!doctorId || !date) {
      return res.status(400).json({
        errCode: 1,
        errMessage: "Missing doctorId or date",
      });
    }

    const infor = await doctorService.getListPatientForDoctor(doctorId, date);
    return res.status(200).json(infor);
  } catch (e) {
    console.error("Error in getListPatientForDoctor:", e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

// Xóa thông tin lịch khám 
let deleteSchedule = async (req, res) => {
  try {
    const { doctorId, date, timeType } = req.body;

    if (!doctorId || !date || !timeType) {
      return res.status(400).json({
        errCode: 1,
        errMessage: "Thiếu thông tin cần thiết",
      });
    }

    const result = await db.Schedule.destroy({
      where: {
        doctorId,
        date,
        timeType,
      },
    });

    if (result === 0) {
      return res.status(404).json({
        errCode: 2,
        errMessage: "Không tìm thấy lịch để xoá",
      });
    }

    return res.status(200).json({
      errCode: 0,
      errMessage: "Xoá thành công",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Lỗi server",
    });
  }
};

// Xác nhận lịch hẹn bên doctor 
let sendRemedy = async (req, res) => {
  try {
    let infor = await doctorService.sendRemedy(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error in sendRemedy:", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Lỗi server",
    });
  }
};

// Hủy lịch hẹn bên doctor 
let cancelBooking = async (req, res) => {
  try {

    let infor = await doctorService.cancelBooking(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  getTopDoctorHome,
  getAllDoctors,
  getAllDoctorInfos,
  postInforDoctor,
  editDoctor,
  deleteDoctor,
  getDetailDoctorById,
  bulkCreateSchedule,
  getScheduleByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
  getListPatientForDoctor,
  sendRemedy,
  cancelBooking,
  deleteSchedule, 
};
