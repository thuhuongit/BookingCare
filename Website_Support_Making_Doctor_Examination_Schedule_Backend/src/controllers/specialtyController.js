import specialtyService from "../services/speciatlyService";

// Thêm chuyên  khoa mới vào db ở bên Admin 
let createSpecialty = async (req, res) => {
  try {
    const { name, descriptionMarkdown, descriptionHTML } = req.body;
    const imageFile = req.file;

    if (!name || !descriptionMarkdown || !descriptionHTML || !imageFile) {
      return res.status(400).json({
        errCode: 1,
        errMessage: "Thiếu thông tin bắt buộc!",
      });
    }
    const data = {
      name,
      descriptionMarkdown,
      descriptionHTML,
      image: `uploads/${imageFile.filename}`,
    };

    const result = await specialtyService.createSpecialty(data);
    return res.status(200).json({
      errCode: 0,
      message: "Thêm chuyên khoa thành công!",
      data: result,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Lỗi server",
    });
  }
};

// Lấy danh sách chuyên khoa từ db lên giao diện 
let getAllSpecialty = async (req, res) => {
  try {
    let infor = await specialtyService.getAllSpecialty(); 
    return res.status(200).json(infor); 
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

// Lấy chi tiết chuyên khoa theo ID  và vị trí 
let getDetailSpecialtyById = async (req, res) => {
  try {
    let infor = await specialtyService.getDetailSpecialtyById(
      req.query.id,
      req.query.location
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

// Xóa chuyên khoa theo ID 
let deleteSpecialty = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await specialtyService.deleteSpecialty(id);
    return res.status(200).json(response);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

// Sửa thông tin chuyên khoa theo ID
let editSpecialty = async (req, res) => {
  try {
    const { id, name, descriptionMarkdown, descriptionHTML } = req.body;
    const imageFile = req.file;

    if (!id || !name || !descriptionMarkdown || !descriptionHTML) {
      return res.status(400).json({
        errCode: 1,
        errMessage: "Thiếu thông tin bắt buộc!",
      });
    }

    const data = {
      id,
      name,
      descriptionMarkdown,
      descriptionHTML,
    };

    if (imageFile) {
      data.image = `uploads/${imageFile.filename}`; 
    }
    const result = await specialtyService.editSpecialty(data);
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Lỗi server",
    });
  }
};

module.exports = {
  createSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
  deleteSpecialty,
  editSpecialty, 
};
