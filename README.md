# 🌱 FreshFind — Fresh All Along
> **Nền tảng số kết nối cộng đồng người tiêu dùng với các phiên chợ nông sản hữu cơ, nông sản mùa vụ và hợp tác xã nông nghiệp bền vững.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-techwiz2026.vercel.app-emerald?style=for-the-badge&logo=vercel)](https://techwiz2026.vercel.app)
[![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-teal?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Status](https://img.shields.io/badge/Deployment-Production_Ready-brightgreen?style=for-the-badge)]()

---

## 📌 Giới Thiệu Dự Án (Project Overview)
**FreshFind** được xây dựng với sứ mệnh trao quyền cho cộng đồng cư dân đô thị dễ dàng tiếp cận nguồn thực phẩm sạch, minh bạch nguồn gốc từ các vùng trồng VietGAP/GlobalGAP (Mộc Châu, Ba Vì, Đà Lạt,...). Dự án vận hành theo kiến trúc **Single Page Application (SPA)** thuần Client-side, không phụ thuộc backend máy chủ trung gian, dữ liệu JSON phi tập trung, tối ưu hiệu năng tốc độ cao và thân thiện trên cả điện thoại di động lẫn máy tính để bàn.

🔗 **Trải nghiệm trực tuyến:** [https://techwiz2026.vercel.app](https://techwiz2026.vercel.app)

---

## 🗺️ Giới Thiệu Chi Tiết Tính Năng Theo Từng Trang

### 1. 🏠 Trang Chủ (`/` — Home Page)
* **Hero Banner & Bản tin âm thanh (Podcast Audio Briefing):**
  * Tích hợp Web Speech API phát bản tin âm thanh cập nhật phiên chợ mở cửa và nông sản thu hoạch sáng sớm hôm nay (kèm thông báo Toast mượt mà khi thiết bị không hỗ trợ).
* **Bộ lọc tìm kiếm nhanh (Quick Find Prompt):**
  * Cho phép tìm nhanh chợ theo 3 tiêu chí: *Quận/Huyện*, *Ngày trong tuần*, và *Loại nông sản*. Chuyển hướng đồng bộ tức thì sang danh bạ với tham số URL tương ứng.
* **Đồng hồ số thời gian thực & Bộ đếm khách:**
  * Đồng hồ kỹ thuật số cập nhật từng giây, đồng bộ trạng thái mở cửa của các chợ và bộ đếm cộng đồng lưu trữ qua `localStorage`.
* **Trưng bày chợ tiêu biểu & Nông sản nổi bật tuần (Highlights Showcase):**
  * Các thẻ chợ có điểm đánh giá cao nhất, huy hiệu chợ mở cửa hàng ngày và nông sản đang độ ngon nhất (Dâu tây Mộc Châu, Bơ sáp Tây Nguyên,...).
* **Cam kết giá trị cộng đồng & Kêu gọi đối tác (Value Pillars & Call-to-Action):**
  * 3 trụ cột giá trị cốt lõi và khu vực đăng ký gian hàng cho hộ nông dân gia đình.

---

### 2. 🧺 Danh Bạ Chợ Nông Sản Toàn Diện (`/markets` — Farmers' Market Directory)
* **Bộ lọc đa tiêu chí linh hoạt:**
  * Tìm kiếm theo từ khóa tên chợ, địa chỉ.
  * Lọc theo Quận/Huyện Hà Nội (Cầu Giấy, Tây Hồ, Đống Đa, Hà Đông,...).
  * Lọc theo Ngày hoạt động trong tuần (Thứ 2 đến Chủ Nhật, hoặc chợ mở cả tuần).
  * Lọc theo Chủng loại nông sản đặc trưng (Rau ăn lá, Trái cây, Bơ sáp, Sữa tươi,...).
* **Sắp xếp thông minh (Multi-Sort):**
  * Sắp xếp theo tên từ A – Z.
  * Sắp xếp theo Điểm đánh giá sao từ cao đến thấp.
  * Ưu tiên đưa các chợ **Đang Mở Cửa Ngay Lúc Này (Open Right Now)** lên đầu danh sách dựa trên giờ thực tế máy người dùng.
* **Thẻ chợ nông sản đa thông tin:**
  * Ảnh chụp chất lượng cao, nhãn quận huyện, giờ mở cửa, số điện thoại, quãng đường km và tính toán giảm phát thải CO₂ (Food Miles).
* **Công cụ So Sánh Chợ Song Song (Side-by-Side Market Comparison):**
  * Chọn bất kỳ 2 khu chợ để mở bảng đối chiếu trực quan về lịch mở cửa, khoảng cách, chứng chỉ VietGAP, hotline và tiện ích bãi đỗ xe/thân thiện thú cưng.

---

### 3. 🏪 Trang Chi Tiết Chợ Riêng Biệt (`/markets/:id` — Dedicated Market Detail)
* **Grand Hero Banner tương thích 100% Mobile:**
  * Thiết kế Flexbox chống tràn, huy hiệu trạng thái mở cửa trực tiếp `OPEN RIGHT NOW`, điểm số đánh giá sao, hotline gọi điện 1 chạm và nút mở chỉ đường Google Maps.
* **Bảng chỉ số Food Miles & Sinh thái:**
  * Thống kê khoảng cách vận chuyển nông sản và lượng CO₂e tiết kiệm được trên mỗi giỏ hàng hữu cơ.
* **Bảng lịch tuần chi tiết (Weekly Schedule & Operating Hours Table):**
  * Chi tiết 7 ngày trong tuần với trạng thái mở/đóng cửa và các phiên chợ đặc biệt (Special Session, Weekend Fair), hỗ trợ cuộn ngang mượt mà trên di động.
* **Danh bạ gian hàng & Hộ nông dân hạt nhân (Stall Directory):**
  * Thông tin số gian hàng, tên hộ nông dân chủ nhiệm, chứng nhận nông nghiệp và mặt hàng đặc sản của từng quầy.
* **Bản đồ Google Maps tương tác:**
  * Bản đồ nhúng iframe định vị chuẩn xác địa chỉ khu chợ.
* **Hệ thống Đánh Giá & Chấm Sao Cộng Đồng (Verified Shopper Reviews):**
  * Yêu cầu đăng nhập tài khoản để gửi đánh giá, đảm bảo tính xác thực.
  * Nhập bình luận kèm xếp hạng 1 – 5 sao tinh gọn.
  * Phân trang 3 bình luận mỗi trang, lọc bình luận theo số sao.
  * Hiển thị thời gian chính xác theo ngày tháng năm (`Sep 25, 2026`).
  * Nút bấm biểu quyết hữu ích **Helpful (Like / Gỡ Like)** có thể bật/tắt linh hoạt.
* **Trang khôi phục điều hướng 404 thân thiện:**
  * Khi người dùng nhập sai mã chợ (ví dụ: `/markets/aaaa`), hệ thống tự động hiển thị màn hình báo lỗi lịch sự kèm gợi ý 3 khu chợ nổi bật để quay lại trải nghiệm.

---

### 4. 🥦 Cẩm Nang Nông Sản & Bản Đồ Thu Hoạch (`/produce` — Produce & Harvest Matrix)
* **Bộ lọc nông sản theo 4 nhóm chuyên biệt:**
  * *Fruits (Hoa quả)*, *Vegetables (Rau củ)*, *Herbs (Thảo mộc)*, *Dairy & Eggs (Sữa & Trứng)*.
* **Thẻ hộ chiếu nông sản chi tiết (Crop Passport):**
  * Tên nông sản, biểu tượng đặc trưng, trạng thái thu hoạch (Đang chính vụ / Sớm vụ), hồ sơ dinh dưỡng và mẹo sơ chế chuẩn nhà bếp nông trại.
  * Danh sách các khu chợ hiện có bán mặt hàng này.
* **Đột phá công nghệ: Ma Trận Nhiệt Thu Hoạch 12 Tháng (Annual Harvest Heatmap):**
  * Bảng ma trận trực quan hóa chu kỳ sinh trưởng và thời điểm thu hoạch rộ của các loại cây trồng xuyên suốt 12 tháng trong năm.

---

### 5. 🍓 Khám Phá Đặc Sản Mùa Vụ & Món Ngon Nông Trại (`/seasonal` — Seasonal Exploration)
* **Bộ chọn 4 mùa tương tác (Spring, Summer, Autumn, Winter):**
  * Xem nông sản biểu tượng, thời tiết đặc trưng và lời khuyên ăn uống theo mùa tự nhiên.
* **Mục Nấu Ăn Cùng Mùa Nông Sản (Farm-to-Kitchen Recipes):**
  * Thư viện công thức chế biến món ngon từ nguyên liệu chợ sáng (Salad dâu tây phô mai Ba Vì, Salad bơ sáp Đắk Lắk, Nấm xào thảo mộc,...).
  * Chi tiết thời gian nấu, mức độ calo, độ khó, thành phần định lượng và các bước thực hiện từng bước.
  * Nút 1-click **"Add Ingredients to Shopping Notebook"** tự động đẩy toàn bộ nguyên liệu vào sổ tay đi chợ.

---

### 6. 📖 Câu Chuyện Thương Hiệu & Sứ Mệnh (`/about` — About Us)
* **Hành trình khởi nghiệp & Mục tiêu xanh:**
  * Tầm nhìn giảm thiểu dấu chân carbon (Food Miles), hỗ trợ chuỗi cung ứng nông sản trực tiếp từ nông trại đến bàn ăn.
* **Thống kê tác động sinh thái (Eco Impact Metrics):**
  * Thống kê số lượng chợ liên kết, hộ gia đình tham gia, tỷ lệ cắt giảm trung gian thương lái và lượng phát thải giảm thiểu.
* **Đội ngũ phát triển dự án (Founding Team):**
  * Giới thiệu chuyên môn của các thành viên phụ trách Kiến trúc, Thiết kế giao diện và Nghiên cứu chuỗi cung ứng xanh.

---

### 7. 📍 Liên Hệ & Định Vị Khoảng Cách GPS (`/contact` — Contact & GPS Proximity)
* **Định vị khoảng cách thông minh qua GPS (Browser Geolocation API):**
  * Tự động xác định vị trí thực tế của người dùng và tính toán chính xác khoảng cách (km) đến từng khu chợ nông sản gần nhất theo công thức Haversine.
* **Form gửi đề xuất & Liên hệ hợp tác:**
  * Xác thực dữ liệu đầu vào chặt chẽ (tên, email đúng định dạng, chủ đề liên hệ, nội dung đề xuất ≥ 10 ký tự).
  * Đầy đủ thuộc tính accessibility chuẩn W3C (`name`, `id`, `htmlFor`).

---

## ⚡ Các Tính Năng Hệ Thống Toàn Trang (Platform-Wide Features)

1. **Sổ tay mua sắm cá nhân (Interactive Shopping Notebook):**
   * Lưu nhanh chợ yêu thích và đặc sản mùa vụ vào `localStorage`.
   * **Ghi chú cá nhân bảo mật chỉ lưu trong phiên (`sessionStorage`)** — tự động xóa sạch khi đóng trình duyệt để bảo vệ riêng tư.
   * **Xuất danh sách đi chợ (.TXT)** tải trực tiếp về máy.
   * Chia sẻ danh sách qua liên kết mạng xã hội 1 chạm.
2. **Trợ lý ảo AI FarmBot Chatbot 24/7:**
   * Hộp thoại AI tư vấn lịch mở cửa, mùa vụ rau quả, mẹo bảo quản và địa chỉ chợ từ cơ sở tri thức JSON độc lập, không cần kết nối API bên ngoài.
3. **Chế độ Sáng / Tối (Light & Dark Theme):**
   * Chuyển đổi giao diện tức thì với phím bấm trên thanh điều hướng, ghi nhớ trạng thái người dùng.
4. **Hệ thống tài khoản thành viên (Auth System Demo):**
   * Đăng ký, đăng nhập tài khoản người tiêu dùng kiểm định để đăng nhận xét và lưu trữ dữ liệu cá nhân hóa.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

* **Core Frontend:** React 18 (Hooks, SPA Router Architecture với `react-router-dom` v6)
* **Bundler & Tooling:** Vite 5 (Fast HMR, Tree-shaking, Rollup Code Splitting)
* **Styling & UI:** Tailwind CSS v3, Plus Jakarta Sans Typography, Lucide React Icons
* **Data Storage:** Client-side JSON Models (`markets.json`, `produce.json`, `recipes.json`, `chatbot-kb.json`), Web Storage API (`localStorage`, `sessionStorage`)
* **Deployment & Security:** Vercel Edge Hosting, Strict HTTP Security Headers, W3C HTML5 Compliance

---

## 🛡️ Tối Ưu Triển Khai & Bảo Mật (Production Standards)

* **Vercel SPA Rewrites (`vercel.json`):** Khắc phục triệt để lỗi 404 khi người dùng tải lại trang (F5) hoặc nhập trực tiếp địa chỉ URL.
* **Mozilla Observatory Security (Đạt chuẩn A/A+):** Tích hợp đầy đủ `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`, `Referrer-Policy` và `Permissions-Policy`.
* **W3C Validated Markup:** Toàn bộ thẻ `<meta />`, `<link />` và form inputs tuân thủ chặt chẽ cú pháp chuẩn W3C.
* **Google PageSpeed Insights:** Tối ưu `defer` tải script, bộ nhớ đệm tài nguyên tĩnh 1 năm `Cache-Control: public, max-age=31536000, immutable`, `dns-prefetch` hình ảnh và font chữ.

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy (Local Development)

### Yêu cầu môi trường:
* **Node.js:** phiên bản `>= 18.x`
* **npm:** phiên bản `>= 9.x`

### Các bước cài đặt:

```bash
# 1. Clone repository từ GitHub
git clone https://github.com/kamiyami05/TechWiz2026.git
cd TechWiz2026

# 2. Cài đặt các gói thư viện phụ thuộc
npm install

# 3. Khởi chạy máy chủ phát triển (Development Server)
npm run dev

# 4. Đóng gói kiểm tra sản phẩm phát hành (Production Build)
npm run build
```

Mở trình duyệt tại: `http://localhost:3000` (hoặc cổng hiển thị trên terminal).

---

## 👥 Nhóm Thực Hiện (Authors)
* **Dự án:** FreshFind — Fresh All Along
* **Repository:** [https://github.com/kamiyami05/TechWiz2026](https://github.com/kamiyami05/TechWiz2026)
* **Bản quyền:** © 2026 FreshFind Vietnam. All rights reserved.
