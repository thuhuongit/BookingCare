# Website Đặt Lịch Khám Bệnh từ BookingCare

Dự án này là hệ thống đặt lịch khám bệnh trực tuyến, hỗ trợ kết nối giữa **bệnh nhân**, **bác sĩ**, và **admin**, cho phép đăng ký lịch khám, quản lý thời gian làm việc của bác sĩ, quản trị chuyên khoa, phòng khám và gửi thông báo qua email.

---

## Chức năng chính

### Người dùng (Bệnh nhân)
- Đăng ký, đăng nhập.
- Đặt lịch khám theo bác sĩ, chuyên khoa, phòng khám.
- Xác nhận lịch hẹn qua email.
- Xem lịch sử khám bệnh.

### Bác sĩ
- Đăng nhập hệ thống.
- Xem danh sách bệnh nhân đặt khám
- Xác nhận đã khám hoặc hủy

### Admin
- Đăng nhập hệ thống quản trị
- Quản lý tài khoản người dùng, bác sĩ
- Quản lý chuyên khoa, phòng khám, lịch khám của bác sĩ
- Quản lý bài viết, thống kê, hóa đơn
- Gửi thông báo và xác nhận đặt lịch

---

##  Công nghệ sử dụng

### Frontend – React + Vite
- React.js
- React Router DOM
- Axios
- CSS thuần
- React Toastify, SweetAlert2

### Backend – Node.js + Express
- Node.js
- Express.js
- MySQL & Sequelize ORM
- JWT + Bcrypt (xác thực & bảo mật)
- Multer (upload ảnh)
- Nodemailer (gửi email xác nhận)

---

## ⚙️ Hướng dẫn cài đặt

### 1. Clone repository

```bash
https://github.com/thuhuongit/BookingCare.git

```
### 2. Cài đặt Backend

```bash
cd Website_Support_Making_Doctor_Examination_Schedule
npm install
npm run dev

```

## ⚙️ Cấu hình .env cho backend:
PORT=8080
DB_HOST=localhost
DB_NAME=thuhuong
DB_USER=root
DB_PASSWORD=yourpassword
JWT_SECRET=your_jwt_secret
EMAIL_APP=youremail@gmail.com
EMAIL_APP_PASSWORD=your_app_password

### 3. Cài đặt Frontend

```bash
cd ReactWeb
npm install
npm run dev

```


