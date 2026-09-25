import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Top Bar
    topBarSlogan: "Farm-to-Table Organic Living • Sustainable Community Markets",
    liveVisits: "Live Visits",
    hotline: "Hotline: +84 (0) 24 7300 8855",
    
    // Navbar
    home: "Home",
    markets: "Markets Directory",
    seasonal: "Seasonal Picks",
    produce: "Produce Guide",
    about: "About Us",
    contact: "Contact",
    compareMarkets: "Compare Markets",
    recipes: "Farm Recipes",
    savedNotebook: "Saved Notebook",
    signIn: "Sign In",
    signOut: "Sign Out",
    organicBadge: "100% Organic",

    // Common Buttons & Badges
    exploreMarkets: "Explore Markets",
    viewDetails: "View Details & Map",
    openNow: "OPEN NOW",
    closed: "CLOSED",
    saveToNotebook: "Save to Notebook",
    savedInNotebook: "Saved in Notebook",
    directions: "Get Directions",
    share: "Share",
    filterByArea: "Filter by Area",
    filterByDay: "Filter by Day",
    filterByProduce: "Filter by Produce",
    all: "All",
    searchPlaceholder: "Search markets, streets, organic crops...",
    resetFilters: "Reset Filters",
    sortBy: "Sort By",
    alphabetical: "Alphabetical (A - Z)",
    highestRating: "Highest Rating",
    openNowFirst: "Open Right Now First",
    compare: "Compare",
    comparing: "Comparing",
    compareSelected: "Compare Markets",

    // Market Details
    weeklySchedule: "Weekly Operating Schedule",
    operatingHours: "Operating Hours",
    typicalProduce: "Typical Organic Produce & Goods",
    stallsDirectory: "Stalls & Local Growers Directory",
    communityReviews: "Community Reviews & Ratings",
    writeReview: "Write a Review",
    submitReview: "Submit Review",
    helpful: "Helpful",
    navigateGoogleMaps: "Navigate in Google Maps",
    discoverNearby: "Discover Other Nearby Farmers Markets",

    // Produce & Recipes
    harvestHeatmap: "Annual Regional Crop Harvest Heatmap Matrix",
    peakHarvest: "Peak Harvest",
    earlyCrop: "Early Crop",
    offSeason: "Off-Season",
    farmToKitchen: "Farm-to-Kitchen Recipes",
    cookWithProduce: "Cook With Fresh Farm Produce",
    ingredients: "Farm Fresh Ingredients",
    instructions: "Cooking Instructions",
    chefTip: "Farmer's Kitchen Tip",
    findIngredientsAt: "Find Ingredients at Nearby Markets",
    prepTime: "Prep Time",
    difficulty: "Difficulty",

    // Comparison Modal
    sideBySideCompare: "Side-by-Side Market Comparison",
    selectMarket: "Select Market",
    marketA: "Market A",
    marketB: "Market B",
    amenities: "Key Amenities & Services",
    freeParking: "Free Parking",
    petFriendly: "Pet-Friendly",
    wheelchairAccess: "Wheelchair Accessible",
    organicCertified: "100% Certified Organic",
    cardAccepted: "Credit Card / Cashless",
    restrooms: "Clean Restrooms",
    distance: "Distance",
    foodMilesSaved: "CO₂e Offset",

    // Footer
    footerDesc: "Connecting conscientious urban consumers with certified local organic growers across Vietnam. Empowering sustainable farming, food security, and healthy communities.",
    rightsReserved: "All rights reserved. TechWiz 7 International Championship Edition.",
    quickLinks: "Quick Navigation",
    communityPillars: "Sustainable Pillars",
  },
  vi: {
    // Top Bar
    topBarSlogan: "Nông Sản Từ Vườn Đến Bàn Ăn • Hệ Thống Chợ Nông Dân Bền Vững",
    liveVisits: "Lượt truy cập",
    hotline: "Hotline: +84 (0) 24 7300 8855",

    // Navbar
    home: "Trang Chủ",
    markets: "Danh Bạ Chợ",
    seasonal: "Đặc Sản 4 Mùa",
    produce: "Cẩm Nang Nông Sản",
    about: "Về Chúng Tôi",
    contact: "Liên Hệ",
    compareMarkets: "So Sánh Chợ",
    recipes: "Món Ngon Nông Trại",
    savedNotebook: "Sổ Tay Mua Sắm",
    signIn: "Đăng Nhập",
    signOut: "Đăng Xuất",
    organicBadge: "100% Hữu Cơ",

    // Common Buttons & Badges
    exploreMarkets: "Khám Phá Các Chợ",
    viewDetails: "Xem Chi Tiết & Bản Đồ",
    openNow: "ĐANG MỞ CỬA",
    closed: "ĐÃ ĐÓNG CỬA",
    saveToNotebook: "Lưu Vào Sổ Tay",
    savedInNotebook: "Đã Lưu Sổ Tay",
    directions: "Chỉ Đường",
    share: "Chia Sẻ",
    filterByArea: "Lọc theo Khu vực",
    filterByDay: "Lọc theo Ngày",
    filterByProduce: "Lọc theo Loại Nông Sản",
    all: "Tất cả",
    searchPlaceholder: "Tìm chợ, tên đường, loại nông sản hữu cơ...",
    resetFilters: "Đặt lại bộ lọc",
    sortBy: "Sắp xếp theo",
    alphabetical: "Bảng chữ cái (A - Z)",
    highestRating: "Đánh giá cao nhất",
    openNowFirst: "Đang mở cửa ưu tiên trước",
    compare: "So sánh",
    comparing: "Đang chọn",
    compareSelected: "So Sánh Chợ",

    // Market Details
    weeklySchedule: "Lịch Hoạt Động Tuần",
    operatingHours: "Khung Giờ Mở Cửa",
    typicalProduce: "Nông Sản & Đặc Sản Chủ Lực",
    stallsDirectory: "Danh Bạ Gian Hàng & Hợp Tác Xã",
    communityReviews: "Đánh Giá & Nhận Xét Cộng Đồng",
    writeReview: "Viết Đánh Giá",
    submitReview: "Gửi Đánh Giá",
    helpful: "Hữu ích",
    navigateGoogleMaps: "Chỉ đường bằng Google Maps",
    discoverNearby: "Khám Phá Các Chợ Lân Cận",

    // Produce & Recipes
    harvestHeatmap: "Bản Đồ Nhiệt Mùa Vụ Thu Hoạch 12 Tháng",
    peakHarvest: "Chính Vụ (Rộ)",
    earlyCrop: "Vụ Sớm",
    offSeason: "Trái Vụ",
    farmToKitchen: "Món Ngon Từ Nông Trại",
    cookWithProduce: "Nấu Ăn Cùng Nông Sản Tươi Lành",
    ingredients: "Nguyên Liệu Tươi Sạch",
    instructions: "Công Thức Chế Biến",
    chefTip: "Mẹo Nhỏ Từ Đầu Bếp Nông Trại",
    findIngredientsAt: "Tìm Mua Nguyên Liệu Tại Các Chợ Này",
    prepTime: "Thời gian chuẩn bị",
    difficulty: "Độ khó",

    // Comparison Modal
    sideBySideCompare: "So Sánh Hai Chợ Song Song",
    selectMarket: "Chọn chợ nông sản",
    marketA: "Chợ thứ nhất",
    marketB: "Chợ thứ hai",
    amenities: "Tiện Ích & Dịch Vụ Đi Kèm",
    freeParking: "Bãi Đỗ Xe Miễn Phí",
    petFriendly: "Thân Thiện Thú Cưng",
    wheelchairAccess: "Lối Đi Xe Lăn",
    organicCertified: "100% Chứng Nhận Hữu Cơ",
    cardAccepted: "Thanh Toán Không Tiền Mặt / Thẻ",
    restrooms: "Nhà Vệ Sinh Sạch Sẽ",
    distance: "Khoảng cách",
    foodMilesSaved: "Giảm phát thải CO₂e",

    // Footer
    footerDesc: "Kết nối người tiêu dùng văn minh với những người nông dân canh tác hữu cơ chân chính tại Việt Nam. Thúc đẩy nông nghiệp bền vững, an ninh lương thực và lối sống xanh.",
    rightsReserved: "Bảo lưu mọi quyền. Phiên bản thi đấu TechWiz 7 Quốc Tế.",
    quickLinks: "Điều Hướng Nhanh",
    communityPillars: "Trụ Cột Phát Triển Bền Vững",
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('freshfind_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('freshfind_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'vi' : 'en'));
  };

  const t = (key) => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    return translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
