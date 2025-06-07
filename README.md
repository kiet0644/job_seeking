# 🚀 Job Seeking API

Chào mừng bạn đến với **Job Seeking API** – Nền tảng RESTful mạnh mẽ cho ứng dụng tuyển dụng, tìm việc làm, quản lý hồ sơ ứng viên và nhà tuyển dụng.  
API này được xây dựng với Node.js, Express, Prisma (MongoDB), hỗ trợ xác thực JWT, upload file, phân quyền, và nhiều tính năng hiện đại khác.

---

## 🌟 Tính năng nổi bật

- **Đăng ký, đăng nhập, xác thực email, quên mật khẩu**
- **Quản lý hồ sơ ứng viên & nhà tuyển dụng**
- **Tạo, cập nhật, tìm kiếm công việc** với các trường như kinh nghiệm, cấp bậc, trạng thái (OPEN/CLOSED/DRAFT)
- **Ứng tuyển, lưu việc, đánh giá nhà tuyển dụng**
- **Upload avatar, CV, logo công ty**
- **Phân quyền: Job Seeker, Employer, Admin, Moderator, Premium**
- **Thông báo, chat, quản lý gói premium**
- **RESTful, chuẩn hóa, dễ mở rộng**

---

## 🏗️ Kiến trúc & Công nghệ

- **Node.js + Express**: Server API
- **Prisma + MongoDB**: ORM & Database
- **JWT**: Xác thực bảo mật
- **Multer**: Upload file
- **Zod**: Validate dữ liệu
- **Prisma Studio**: Quản lý dữ liệu trực quan

---

## 🚦 Khởi động nhanh

```bash
# 1. Cài đặt dependencies
npm install

# 2. Đồng bộ schema với MongoDB
npx prisma db push

# 3. Sinh lại Prisma Client
npx prisma generate

# 4. Chạy server phát triển
npm run dev
```

---

## 🔑 Xác thực & Phân quyền

- Đăng ký/Đăng nhập nhận JWT token.
- Gửi token qua header `Authorization: Bearer <token>`.
- Phân quyền theo vai trò (Role): `JOB_SEEKER`, `EMPLOYER`, `ADMIN`, `MODERATOR`, `PREMIUM_*`.

---

## 📚 Một số endpoint tiêu biểu

| Method | Endpoint                       | Mô tả                         | Quyền truy cập         |
|--------|-------------------------------|-------------------------------|------------------------|
| POST   | `/auth/register`              | Đăng ký tài khoản             | Công khai              |
| POST   | `/auth/login`                 | Đăng nhập                     | Công khai              |
| POST   | `/auth/password-reset`        | Gửi email quên mật khẩu       | Công khai              |
| PUT    | `/user/profile`               | Cập nhật hồ sơ cá nhân        | Đã đăng nhập           |
| PUT    | `/user/profile/avatar`        | Upload avatar                 | Đã đăng nhập           |
| GET    | `/user/profile`               | Lấy hồ sơ cá nhân             | Đã đăng nhập           |
| POST   | `/jobs`                       | Tạo job mới                   | Employer/Admin         |
| PUT    | `/jobs/:id`                   | Cập nhật job                  | Employer/Admin         |
| GET    | `/jobs`                       | Tìm kiếm, lọc danh sách job   | Công khai              |
| POST   | `/applications`               | Ứng tuyển công việc           | Job Seeker             |

---

## 📝 Mô hình dữ liệu nổi bật

- **User**: email, fullName, role, avatar, ...
- **Job**: title, description, experience, level, status, ...
- **Application**: user, job, resume, status, ...
- **EmployerProfile / JobSeekerProfile**: thông tin mở rộng
- **Notification, Review, Bookmark, Subscription, ChatMessage**

---

## 📂 Upload file

- **Avatar, CV, logo công ty**: Gửi qua FormData, field là `avatar`, `resume`, `companyLogo`...
- Truy cập file qua URL:  
  `http://<domain>:<port>/uploads/<filename>`

---

## 🔒 Bảo mật

- Mã hóa mật khẩu với bcrypt
- Xác thực email trước khi đăng nhập
- Token JWT hết hạn tự động
- Phân quyền rõ ràng từng endpoint

---

## 💡 Đóng góp & phát triển

- Fork, tạo PR hoặc mở issue nếu bạn muốn đóng góp!
- Dễ dàng mở rộng thêm các module mới (chat, premium, analytics...)

---

## 📞 Liên hệ

- **Tác giả:** [Your Name]
- **Email:** your@email.com

---

> **Job Seeking API** – Nền tảng mở cho mọi ứng dụng tuyển dụng hiện đại!