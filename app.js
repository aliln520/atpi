(function () {
  const ASSETS = {
    iosBanner: "images/ios_banner.jpg",
    iosSeller: "images/ios_seller.jpg",
    iosCustomer: "images/ios_customer.jpg",
    stickerG: "images/prod_sticker_g.jpg",
    carabinerH: "images/prod_carabiner_h.jpg",
    tumblerF: "images/prod_tumbler_f.jpg",
    hairpinJ: "images/prod_hairpin_j.jpg",
    keychainA: "images/prod_keychain_a.jpg",
    pinE: "images/prod_pin_e.jpg",
    keychainC: "images/prod_keychain_c.jpg",
    plushieB: "images/prod_plushie_b.jpg",
    plushieD: "images/prod_plushie_d.jpg",
    tshirt: "images/prod_tshirt.jpg",
    f1: "images/founder_1.jpg",
    f2: "images/founder_2.jpg",
    f3: "images/founder_3.jpg",
    f4: "images/founder_4.jpg",
    f5: "images/founder_5.jpg",
    f6: "images/founder_6.jpg",
    f7: "images/founder_7.jpg",
    f8: "images/founder_8.jpg",
    f9: "images/founder_9.jpg"
  };

  const FOUNDERS = [
    { name: "Adisa Rahma Dillah", img: ASSETS.f1 },
    { name: "Aika Khairunisa Hamidah", img: ASSETS.f2 },
    { name: "Alifia Laelatun Nisa", img: ASSETS.f3 },
    { name: "Aprilia Elika Tandiallo", img: ASSETS.f4 },
    { name: "Citra Riany Pertiwi", img: ASSETS.f5 },
    { name: "Dinda Shafa Az Zahra", img: ASSETS.f6 },
    { name: "Indah Nur Ristiana", img: ASSETS.f7 },
    { name: "Izzatun Khalidah", img: ASSETS.f8 },
    { name: "Norman Widi Nurazan", img: ASSETS.f9 }
  ];

  const OUR_PRODUCTS = [
    { id: "op1", name: "Sticker Proker G", price: 12000, category: "Sticker", stock: 18, img: ASSETS.stickerG },
    { id: "op2", name: "Carabiner Proker H", price: 22000, category: "Accessory", stock: 9, img: ASSETS.carabinerH },
    { id: "op3", name: "Tumbler Proker F", price: 65000, category: "Tumbler", stock: 6, img: ASSETS.tumblerF },
    { id: "op4", name: "Hairpin Proker J", price: 18000, category: "Accessory", stock: 12, img: ASSETS.hairpinJ },
    { id: "op5", name: "Keychain Proker A", price: 15000, category: "Keychain", stock: 10, img: ASSETS.keychainA },
    { id: "op6", name: "Pin Proker E", price: 5000, category: "Pin", stock: 3, img: ASSETS.pinE }
  ];

  const WELCOME_SLIDES = [
    {
      slide: "SLIDE 1 / 55",
      label: "About Us",
      desc: "Kami adalah penyedia layanan promosi digital merchandise & tiket webinar Universitas Indonesia. Ketuk untuk info lengkap.",
      target: "about",
      visual: '<img src="' + ASSETS.iosCustomer + '" alt="About GetmerchUI" style="width:100%;height:100%;object-fit:cover;" />'
    },
    {
      slide: "SLIDE 2 / 55",
      label: "Instagram",
      desc: "Check our Social media now! Ikuti @getmerchui untuk rilisan merchandise & informasi promo terbaru.",
      target: "instagram-popup",
      visual:
        '<div style="width:100%;height:100%;background:linear-gradient(135deg,#FEDA75 0%,#FA7E1E 28%,#D62976 62%,#962FBF 85%,#4F5BD5 100%);display:flex;align-items:center;justify-content:center;position:relative;">' +
          '<div style="position:absolute;inset:0;background:radial-gradient(circle at 25% 20%,rgba(255,255,255,0.45),transparent 55%);"></div>' +
          '<svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1" fill="#FFF" stroke="none"/></svg>' +
        '</div>'
    },
    {
      slide: "SLIDE 3 / 55",
      label: "Our Products",
      desc: "Check our New Products! Jelajahi koleksi merchandise terbaru organisasi & proker UI tanpa perlu login.",
      target: "our-products",
      visual: '<img src="' + ASSETS.iosSeller + '" alt="Our Products" style="width:100%;height:100%;object-fit:cover;" />'
    }
  ];

  const CHECK_BADGE =
    '<div class="ios-icon-squircle emerald" style="width:72px;height:72px;border-radius:50%;">' +
      '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' +
    '</div>';

  const state = {
    role: "guest",
    pendingLoginRole: "customer",
    currentScreen: "welcome",
    welcomeIndex: 0,
    founderIndex: 0,
    otpDigits: [],
    custCat: "All",
    custHistoryTab: "all",
    sellerPurchTab: "all",
    selectedProductId: "p4",
    checkoutQty: 1,
    editingProductId: "p2",
    addProdImgDataUrl: null,
    favorites: {},
    profilePhotos: { customer: null, seller: null },
    promoBanner: {
      product: "Produk A",
      title: "New Arrival",
      start: "20/05/2027",
      end: "27/05/2027",
      img: ASSETS.iosBanner
    },
    sellerChats: [
      { id: "chat1", productName: "Keychain Proker A", seller: "Organisasi A", customer: "Adisa Rahma Dillah", message: "Kak, Keychain Proker A stoknya masih ready?", reply: "Halo kak! Masih ready 10 pcs ya, bisa langsung checkout hari ini." }
    ],
    newOrderCount: 0,
    qrTimer: null,
    qrSecs: 299,
    products: [
      { id: "p1", name: "Keychain Proker C", price: 25000, stock: 5, category: "Keychain", seller: "Organisasi A", status: "Published", desc: "Gantungan kunci boneka mini Proker C.", img: ASSETS.keychainC },
      { id: "p2", name: "Plushie Proker B", price: 50000, stock: 2, category: "Doll", seller: "Organisasi A", status: "Published", desc: "Boneka plushie edisi terbatas Proker B.", img: ASSETS.plushieB },
      { id: "p3", name: "Plushie Proker D", price: 30000, stock: 0, category: "Doll", seller: "Organisasi A", status: "Published", desc: "Boneka maskot Proker D.", img: ASSETS.plushieD },
      { id: "p4", name: "Keychain Proker A", price: 15000, stock: 10, category: "Keychain", seller: "Organisasi A", status: "Published", desc: "Gantungan kunci akrilik Proker A.", img: ASSETS.keychainA },
      { id: "p5", name: "Pin Proker E", price: 5000, stock: 3, category: "Pin", seller: "Organisasi A", status: "Published", desc: "Pin bulat ilustrasi lucu Proker E.", img: ASSETS.pinE }
    ],
    customerOrders: [
      { id: "co1", date: "17/11/2026", name: "Keychain Proker C", price: 25000, stock: 5, category: "Keychain", status: "processed", img: ASSETS.keychainC },
      { id: "co2", date: "16/11/2026", name: "Plushie Proker D", price: 30000, stock: 0, category: "Doll", status: "processed", img: ASSETS.plushieD },
      { id: "co3", date: "12/11/2026", name: "Keychain Proker A", price: 15000, stock: 10, category: "Keychain", status: "finished", img: ASSETS.keychainA },
      { id: "co4", date: "02/11/2026", name: "Pin Proker E", price: 5000, stock: 3, category: "Pin", status: "finished", img: ASSETS.pinE }
    ],
    sellerPurchases: [
      { id: "sp1", orderId: "ORD-2026-1011", date: "11/10/2026", name: "Keychain Proker A", qty: 2, total: 30000, buyer: "Dinda Shafa Az Zahra", phone: "0812-8890-4421", accountFor: "Civitas Akademik UI (FIB)", paymentMethod: "QRIS", status: "processed", img: ASSETS.keychainA },
      { id: "sp2", orderId: "ORD-2026-1002", date: "02/10/2026", name: "Kaos Proker UI", qty: 1, total: 95000, buyer: "Citra Riany Pertiwi", phone: "0857-3310-9912", accountFor: "Civitas Akademik UI (FISIP)", paymentMethod: "QRIS", status: "finished", img: ASSETS.tshirt },
      { id: "sp3", orderId: "ORD-2026-0824", date: "24/08/2026", name: "Pin Proker E", qty: 3, total: 15000, buyer: "Norman Widi Nurazan", phone: "0813-7721-5040", accountFor: "Civitas Akademik UI (FT)", paymentMethod: "QRIS", status: "finished", img: ASSETS.pinE }
    ],
    sellerPayments: [
      {
        id: "pay1", invoiceNo: "INV/GMUI/20261022/001", date: "22/10/2026 14:20",
        buyer: "Dinda Shafa Az Zahra", method: "QRIS — ShopeePay", status: "Berhasil",
        items: [{ name: "Keychain Proker A", qty: 2, price: 15000 }, { name: "Pin Proker E", qty: 2, price: 5000 }],
        adminFee: 1000, total: 41000
      },
      {
        id: "pay2", invoiceNo: "INV/GMUI/20261104/014", date: "04/11/2026 09:45",
        buyer: "Citra Riany Pertiwi", method: "QRIS — BCA Mobile", status: "Berhasil",
        items: [{ name: "Plushie Proker B", qty: 1, price: 50000 }],
        adminFee: 1000, total: 51000
      },
      {
        id: "pay3", invoiceNo: "INV/GMUI/20261201/029", date: "01/12/2026 16:10",
        buyer: "Norman Widi Nurazan", method: "QRIS — GoPay", status: "Berhasil",
        items: [{ name: "Keychain Proker C", qty: 1, price: 25000 }, { name: "Pin Proker E", qty: 3, price: 5000 }],
        adminFee: 1000, total: 41000
      }
    ]
  };

  const META = {
    "welcome": { slide: "SLIDE 1–3 / 55", title: "Welcome Carousel", bnav: false, jump: "welcome" },
    "about": { slide: "SLIDE 4–11 / 55", title: "About Us & Founders", bnav: false, jump: "about" },
    "our-products": { slide: "SLIDE 12 / 55", title: "Our Products (Publik)", bnav: false, jump: "our-products" },
    "registration": { slide: "SLIDE 13–16 / 55", title: "Registration", bnav: false, jump: "registration" },
    "signup-role": { slide: "SLIDE 17 / 55", title: "Sign Up — Pilih Role", bnav: false, jump: "signup-role" },
    "signup-seller": { slide: "SLIDE 18–19 / 55", title: "Sign Up Seller", bnav: false, jump: "signup-role" },
    "signup-customer": { slide: "SLIDE 20–21 / 55", title: "Sign Up Customer", bnav: false, jump: "signup-role" },
    "login-role": { slide: "SLIDE 22 & 29 / 55", title: "Log in — Pilih Role", bnav: false, jump: "login-role" },
    "login-form": { slide: "SLIDE 23–24 / 55", title: "Login", bnav: false, jump: "login-role" },
    "forgot-password": { slide: "SLIDE 25 / 55", title: "Forgot Password", bnav: false, jump: "login-role" },
    "otp": { slide: "SLIDE 26 / 55", title: "Enter Your OTP", bnav: false, jump: "login-role" },
    "reset-password": { slide: "SLIDE 27–28 / 55", title: "Reset Password", bnav: false, jump: "login-role" },
    "home": { slide: "SLIDE 30 / 55", title: "Home Beranda", bnav: true, tab: "home", jump: "home-customer" },
    "profile": { slide: "SLIDE 31–35 / 55", title: "Profile", bnav: true, tab: "profile", jump: "home-customer" },
    "customer-catalog": { slide: "SLIDE 36–37 / 55", title: "Product Catalog", bnav: true, tab: "catalogs", jump: "home-customer" },
    "payment": { slide: "SLIDE 38 / 55", title: "Payment QR", bnav: false, jump: "home-customer" },
    "customer-history": { slide: "SLIDE 39 / 55", title: "Purchase History", bnav: true, tab: "fourth", jump: "home-customer" },
    "customer-favorites": { slide: "FAVORIT", title: "Produk Disukai", bnav: true, tab: "home", jump: "home-customer" },
    "seller-catalogs-hub": { slide: "SLIDE 41 / 55", title: "Catalogs Hub", bnav: true, tab: "catalogs", jump: "home-seller" },
    "seller-catalog": { slide: "SLIDE 42 / 55", title: "Seller Product Catalog", bnav: true, tab: "search", jump: "home-seller" },
    "seller-edit-product": { slide: "SLIDE 43 / 55", title: "Catalog Product Edit", bnav: false, jump: "home-seller" },
    "seller-add-product": { slide: "SLIDE 44 / 55", title: "New Product", bnav: false, jump: "home-seller" },
    "seller-result": { slide: "SLIDE 50 / 55", title: "Seller Result", bnav: true, tab: "fourth", jump: "home-seller" },
    "seller-history-hub": { slide: "SLIDE 51 / 55", title: "History Hub", bnav: true, tab: "fourth", jump: "home-seller" },
    "seller-purchases": { slide: "SLIDE 52 / 55", title: "Purchases History", bnav: true, tab: "fourth", jump: "home-seller" },
    "seller-payments": { slide: "SLIDE 53 / 55", title: "Payments History", bnav: true, tab: "fourth", jump: "home-seller" },
    "faq": { slide: "SLIDE 54 / 55", title: "FAQ", bnav: false, jump: "faq" },
    "seller-promo": { slide: "SLIDE 55 / 55", title: "Product Promotion Edit", bnav: false, jump: "seller-promo" }
  };

  function formatRp(n) { return "Rp" + Number(n || 0).toLocaleString("en-US"); }

  let toastTimer = null;
  function showToast(msg) {
    const el = document.getElementById("toastEl");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2300);
  }

  function burstConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext("2d");
    const colors = ["#F6C622", "#0B5384", "#22C55E", "#FFFFFF", "#18181B"];
    const pieces = Array.from({ length: 40 }, () => ({
      x: rect.width / 2, y: rect.height * 0.42,
      vx: (Math.random() - 0.5) * 9, vy: (Math.random() - 0.85) * 10,
      size: 5 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 50
    }));
    function step() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      pieces.forEach((p) => {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx; p.y += p.vy; p.vy += 0.34; p.life--;
        ctx.globalAlpha = Math.max(0, p.life / 50);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });
      if (alive) requestAnimationFrame(step);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(step);
  }

  function closeModal() {
    const ov = document.getElementById("modalOverlay");
    ov.classList.remove("open", "bottom");
  }

  function openModal(html, bottom) {
    const ov = document.getElementById("modalOverlay");
    document.getElementById("modalContainer").innerHTML = html;
    ov.classList.toggle("bottom", Boolean(bottom));
    ov.classList.add("open");
  }

  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") closeModal();
  });

  function startQrTimer() {
    clearInterval(state.qrTimer);
    state.qrSecs = 299;
    const el = document.getElementById("qrCountdown");
    state.qrTimer = setInterval(() => {
      if (state.qrSecs > 0) state.qrSecs--;
      const m = String(Math.floor(state.qrSecs / 60)).padStart(2, "0");
      const s = String(state.qrSecs % 60).padStart(2, "0");
      if (el) el.textContent = m + ":" + s;
    }, 1000);
  }

  function navigate(id, opts) {
    opts = opts || {};
    if (id === "home-customer") { state.role = "customer"; id = "home"; }
    if (id === "home-seller") { state.role = "seller"; id = "home"; }

    const el = document.getElementById("screen-" + id);
    if (!el) return;
    clearInterval(state.qrTimer);
    state.currentScreen = id;
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    el.classList.add("active");
    document.getElementById("viewport").scrollTop = 0;

    const m = META[id] || { slide: "GETMERCHUI", title: id, bnav: false };
    const dock = document.getElementById("bottomDockWrap");
    if (m.bnav && state.role !== "guest") {
      dock.classList.add("visible");
      document.getElementById("bnavFourthLabel").textContent = state.role === "seller" ? "Summary" : "History";
      const tab = opts.tab || m.tab || "home";
      document.querySelectorAll("#bottomNav .bnav-item").forEach((b) => b.classList.toggle("active", b.dataset.bnav === tab));
      const badge = document.getElementById("fourthBadge");
      badge.classList.toggle("show", state.role === "customer" && state.newOrderCount > 0);
      badge.textContent = state.newOrderCount;
    } else {
      dock.classList.remove("visible");
    }

    let slideLabel = m.slide;
    if (id === "welcome") slideLabel = WELCOME_SLIDES[state.welcomeIndex].slide;
    else if (id === "home") slideLabel = state.role === "seller" ? "SLIDE 40 / 55" : "SLIDE 30 / 55";
    else if (id === "profile") slideLabel = state.role === "seller" ? "SLIDE 45–49 / 55" : "SLIDE 31–35 / 55";

    document.getElementById("sidebarSlideBadge").textContent = slideLabel;
    document.getElementById("sidebarRoleBadge").textContent = state.role.toUpperCase();
    document.getElementById("sidebarScreenTitle").textContent =
      id === "welcome" ? ("Welcome — " + WELCOME_SLIDES[state.welcomeIndex].label) : m.title;

    document.getElementById("quickCustomerBtn").classList.toggle("active", state.role === "customer");
    document.getElementById("quickSellerBtn").classList.toggle("active", state.role === "seller");

    const jumpKey = (id === "home" || id === "profile")
      ? (state.role === "seller" ? "home-seller" : "home-customer")
      : m.jump;
    document.querySelectorAll(".jump-btn").forEach((b) => b.classList.toggle("active", b.dataset.jump === jumpKey));
    const mob = document.getElementById("mobileJumpSelect");
    if (mob && jumpKey) mob.value = jumpKey;

    if (id === "home") {
      document.getElementById("homeRoleKicker").textContent = state.role === "seller" ? "Seller Dashboard" : "Universitas Indonesia";
      document.getElementById("homeFavBtn").style.display = state.role === "customer" ? "inline-flex" : "none";
      syncHomeBanner();
      updateFavCounter();
    }
    if (id === "customer-catalog") renderCustomerCatalog();
    if (id === "customer-favorites") renderCustomerFavorites();
    if (id === "customer-history") { state.newOrderCount = 0; renderCustomerHistory(); }
    if (id === "profile") renderProfile();
    if (id === "payment") startQrTimer();
    if (id === "seller-catalog") renderSellerCatalog();
    if (id === "seller-result") renderSellerResult();
    if (id === "seller-purchases") renderSellerPurchases();
    if (id === "seller-payments") renderSellerPayments();
  }

  /* ---- Renderers ---- */
  function renderWelcome() {
    const s = WELCOME_SLIDES[state.welcomeIndex];
    document.getElementById("welcomeVisualBox").innerHTML = s.visual;
    document.getElementById("welcomePillLabel").textContent = s.label + " →";
    document.getElementById("welcomeDescText").textContent = s.desc;
    document.querySelectorAll("#welcomeDots .dot-pill").forEach((d, i) => d.classList.toggle("active", i === state.welcomeIndex));
    if (state.currentScreen === "welcome") {
      document.getElementById("sidebarSlideBadge").textContent = s.slide;
      document.getElementById("sidebarScreenTitle").textContent = "Welcome — " + s.label;
    }
  }

  function renderFounders() {
    const a = FOUNDERS[state.founderIndex];
    const b = FOUNDERS[(state.founderIndex + 1) % FOUNDERS.length];
    document.getElementById("foundersPair").innerHTML = [a, b].map((f) =>
      '<button type="button" class="founder-card" data-founder="' + f.name + '">' +
        '<img class="founder-photo" src="' + f.img + '" alt="' + f.name + '" />' +
        '<div class="founder-name">' + f.name + '</div>' +
      '</button>'
    ).join("");
    document.getElementById("founderSlideCounter").textContent = "Slide " + (4 + Math.min(state.founderIndex, 7)) + " / 11";
    const dotIdx = Math.min(2, Math.floor(state.founderIndex / 3));
    document.querySelectorAll("#founderDots .dot-pill").forEach((d, i) => d.classList.toggle("active", i === dotIdx));
  }

  function renderProductGrids() {
    const heartSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
    const heartOutline = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';

    document.getElementById("ourProductsGrid").innerHTML = OUR_PRODUCTS.map((p) => {
      const liked = Boolean(state.favorites[p.id]);
      return (
        '<div class="prod-card public-prod-tile" data-opid="' + p.id + '">' +
          '<button type="button" class="fav-btn ' + (liked ? 'liked' : '') + '" data-fav="' + p.id + '" aria-label="Favorit">' + (liked ? heartSvg : heartOutline) + '</button>' +
          '<img src="' + p.img + '" alt="' + p.name + '" />' +
          '<div class="prod-card-body">' +
            '<div class="prod-card-title">' + p.name + '</div>' +
            '<div class="prod-card-price">' + formatRp(p.price) + '</div>' +
          '</div>' +
        '</div>'
      );
    }).join("");

    document.getElementById("homeNewProductsGrid").innerHTML = OUR_PRODUCTS.slice(0, 4).map((p) => {
      const liked = Boolean(state.favorites[p.id]);
      return (
        '<div class="prod-card home-prod-tile">' +
          '<button type="button" class="fav-btn ' + (liked ? 'liked' : '') + '" data-fav="' + p.id + '" aria-label="Favorit">' + (liked ? heartSvg : heartOutline) + '</button>' +
          '<img src="' + p.img + '" alt="' + p.name + '" />' +
          '<div class="prod-card-body"><div class="prod-card-title">' + p.name + '</div><div class="prod-card-price">' + formatRp(p.price) + '</div></div>' +
        '</div>'
      );
    }).join("");
  }

  function openPublicQuickView(opid) {
    const p = OUR_PRODUCTS.find((x) => x.id === opid);
    if (!p) return;
    openModal(
      '<div class="ios-modal">' +
        '<img src="' + p.img + '" alt="' + p.name + '" style="width:146px;height:146px;object-fit:cover;border-radius:20px;box-shadow:var(--glass-shadow-sm);" />' +
        '<div style="font-family:var(--font-display);font-size:17px;font-weight:800;">' + p.name + '</div>' +
        '<div style="font-size:15px;font-weight:800;color:var(--accent-gold);">' + formatRp(p.price) + '</div>' +
        '<div style="font-size:12.5px;color:var(--muted);">Category: ' + p.category + ' &bull; Stock: ' + p.stock + '</div>' +
        '<button type="button" class="ios-btn ios-btn-primary" id="qvLoginBtn">Login untuk Beli</button>' +
        '<button type="button" class="text-link" id="qvCloseBtn">Tutup</button>' +
      '</div>'
    );
    document.getElementById("qvLoginBtn").addEventListener("click", () => { closeModal(); navigate("registration"); });
    document.getElementById("qvCloseBtn").addEventListener("click", closeModal);
  }

  function renderCustomerCatalog() {
    const inp = document.getElementById("custSearchInput");
    const q = (inp.value || "").trim().toLowerCase();
    document.getElementById("custSearchClear").classList.toggle("show", q.length > 0);
    const items = state.products.filter((p) =>
      (state.custCat === "All" || p.category === state.custCat) &&
      (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    );
    document.getElementById("custCatalogList").innerHTML = items.map((p) => {
      const ready = p.stock > 0;
      return (
        '<div class="catalog-card" style="position:relative;">' +
          '<button type="button" class="fav-btn ' + (state.favorites[p.id] ? 'liked' : '') + '" data-fav="' + p.id + '" aria-label="Favorit" style="top:8px;left:8px;right:auto;">' + (state.favorites[p.id] ? '&#9829;' : '&#9825;') + '</button>' +
          '<img src="' + p.img + '" alt="' + p.name + '" />' +
          '<div class="catalog-info">' +
            '<strong>' + p.name + '</strong>' +
            '<div style="font-size:11px;color:var(--navy);font-weight:700;">Seller: ' + (p.seller || 'Organisasi A') + '</div>' +
            '<div style="font-weight:700;color:var(--accent-gold);">' + formatRp(p.price) + '</div>' +
            '<div>Stock: ' + p.stock + ' &bull; ' + p.category + '</div>' +
            '<span class="status-pill ' + (ready ? 'ready' : 'out') + '">' + (ready ? 'Ready' : 'Out of stock') + '</span>' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;gap:6px;flex-shrink:0;">' +
            '<button type="button" class="ios-btn ios-btn-gold ios-btn-sm buy-btn" data-pid="' + p.id + '" ' + (ready ? '' : 'disabled') + '>Buy</button>' +
            '<button type="button" class="ios-btn ios-btn-glass ios-btn-sm ask-seller-btn" data-pid="' + p.id + '" style="font-size:11px;padding:6px 10px;">Tanya Seller</button>' +
          '</div>' +
        '</div>'
      );
    }).join("") || '<div class="glass-card" style="text-align:center;font-size:13px;color:var(--muted);">Produk tidak ditemukan.</div>';
  }

  function openCheckoutSheet(pid) {
    const prod = state.products.find((p) => p.id === pid);
    if (!prod || prod.stock <= 0) return;
    state.selectedProductId = pid;
    state.checkoutQty = 1;

    openModal(
      '<div class="ios-sheet">' +
        '<div class="sheet-grabber"></div>' +
        '<div style="display:flex;align-items:center;gap:14px;">' +
          '<img src="' + prod.img + '" alt="' + prod.name + '" style="width:74px;height:74px;border-radius:16px;object-fit:cover;background:#FFF;" />' +
          '<div><div style="font-size:17px;font-weight:800;">' + prod.name + '</div><div id="sheetSubtotal" style="font-size:15px;font-weight:700;color:var(--accent-gold);margin-top:2px;">' + formatRp(prod.price) + '</div></div>' +
        '</div>' +
        '<div style="display:flex;align-items:center;justify-content:space-between;padding:4px 0;">' +
          '<span style="font-size:14.5px;font-weight:700;">Quantity</span>' +
          '<div style="display:flex;align-items:center;gap:14px;background:#FFF;padding:5px 14px;border-radius:999px;font-size:16px;font-weight:800;box-shadow:var(--glass-shadow-sm);">' +
            '<button type="button" id="sheetQtyMinus" style="font-size:18px;padding:0 4px;">&minus;</button>' +
            '<span id="sheetQtyVal">1</span>' +
            '<button type="button" id="sheetQtyPlus" style="font-size:18px;padding:0 4px;">+</button>' +
          '</div>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:10px;">' +
          '<input class="ios-input" id="sheetCustName" type="text" placeholder="Customer name" value="Adisa Rahma" />' +
          '<input class="ios-input" id="sheetCustPhone" type="tel" placeholder="Phone number" value="085774707438" />' +
        '</div>' +
        '<button type="button" class="ios-btn ios-btn-primary" id="sheetGoPayBtn">Proceed to Payment</button>' +
      '</div>',
      true
    );

    document.getElementById("sheetQtyMinus").addEventListener("click", () => {
      if (state.checkoutQty > 1) {
        state.checkoutQty--;
        document.getElementById("sheetQtyVal").textContent = state.checkoutQty;
        document.getElementById("sheetSubtotal").textContent = formatRp(prod.price * state.checkoutQty);
      }
    });
    document.getElementById("sheetQtyPlus").addEventListener("click", () => {
      if (state.checkoutQty < prod.stock) {
        state.checkoutQty++;
        document.getElementById("sheetQtyVal").textContent = state.checkoutQty;
        document.getElementById("sheetSubtotal").textContent = formatRp(prod.price * state.checkoutQty);
      }
    });
    document.getElementById("sheetGoPayBtn").addEventListener("click", () => {
      closeModal();
      document.getElementById("paymentTotalAmount").textContent = formatRp(prod.price * state.checkoutQty);
      navigate("payment");
    });
  }

  function openAskSellerModal(pid) {
    const prod = state.products.find((p) => p.id === pid);
    if (!prod) return;
    const sellerName = prod.seller || "Organisasi A";
    const thread = state.sellerChats.filter((c) => c.productName === prod.name);
    const threadHtml = thread.length
      ? thread.map((c) =>
          '<div style="background:rgba(255,255,255,0.75);padding:9px 11px;border-radius:12px;font-size:12px;text-align:left;">' +
            '<div style="font-weight:700;color:var(--ink);">Anda:</div>' +
            '<div style="color:var(--ink-soft);margin-top:2px;">' + c.message + '</div>' +
            (c.reply ? '<div style="margin-top:6px;padding-top:6px;border-top:1px solid rgba(24,24,27,0.08);color:var(--navy);font-weight:600;">' + sellerName + ': ' + c.reply + '</div>' : '<div style="margin-top:4px;font-size:10.5px;color:var(--muted);">Menunggu balasan seller...</div>') +
          '</div>'
        ).join("")
      : '<div style="font-size:12px;color:var(--muted);text-align:center;padding:8px;">Belum ada pertanyaan untuk produk ini.</div>';

    openModal(
      '<div class="ios-sheet">' +
        '<div class="sheet-grabber"></div>' +
        '<div style="display:flex;align-items:center;gap:12px;">' +
          '<img src="' + prod.img + '" alt="' + prod.name + '" style="width:52px;height:52px;border-radius:12px;object-fit:cover;background:#FFF;" />' +
          '<div>' +
            '<div style="font-size:15px;font-weight:800;">Tanya Seller</div>' +
            '<div style="font-size:12px;color:var(--navy);font-weight:700;">' + sellerName + ' &bull; ' + prod.name + '</div>' +
          '</div>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:8px;max-height:165px;overflow-y:auto;">' + threadHtml + '</div>' +
        '<div style="display:flex;flex-direction:column;gap:8px;">' +
          '<textarea class="ios-textarea" id="askSellerInput" placeholder="Tulis pertanyaan Anda untuk ' + sellerName + ' (stok, ukuran, pengambilan)..."></textarea>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">' +
            '<button type="button" class="ios-btn ios-btn-glass" id="closeAskSellerBtn">Tutup</button>' +
            '<button type="button" class="ios-btn ios-btn-primary" id="sendAskSellerBtn">Kirim Pertanyaan</button>' +
          '</div>' +
        '</div>' +
      '</div>',
      true
    );

    document.getElementById("closeAskSellerBtn").addEventListener("click", closeModal);
    document.getElementById("sendAskSellerBtn").addEventListener("click", () => {
      const msg = (document.getElementById("askSellerInput").value || "").trim();
      if (!msg) { showToast("Tulis pertanyaan terlebih dahulu"); return; }
      state.sellerChats.unshift({
        id: "chat" + Date.now(),
        productName: prod.name,
        seller: sellerName,
        customer: document.getElementById("profFullName").value || "Customer UI",
        message: msg,
        reply: ""
      });
      closeModal();
      showToast("Pertanyaan terkirim ke " + sellerName + "!");
    });
  }

  function syncHomeBanner() {
    const b = state.promoBanner;
    const imgEl = document.getElementById("homeBannerImg");
    if (imgEl) imgEl.src = b.img;
    const kicker = document.getElementById("homeBannerKicker");
    if (kicker) kicker.textContent = b.title + " • " + b.start + " – " + b.end;
    const title = document.getElementById("homeBannerTitle");
    if (title) title.textContent = b.product + " — " + b.title;
  }

  function getAllFavItems() {
    const map = {};
    OUR_PRODUCTS.forEach((p) => { if (state.favorites[p.id]) map[p.id] = p; });
    state.products.forEach((p) => { if (state.favorites[p.id]) map[p.id] = p; });
    return Object.values(map);
  }

  function updateFavCounter() {
    const count = getAllFavItems().length;
    const el = document.getElementById("homeFavCount");
    if (el) el.textContent = count;
    const badge = document.getElementById("favTotalBadge");
    if (badge) badge.textContent = count + " Produk";
  }

  function renderCustomerFavorites() {
    updateFavCounter();
    const favs = getAllFavItems();
    const grid = document.getElementById("customerFavoritesGrid");
    if (!favs.length) {
      grid.innerHTML = '<div class="glass-card" style="grid-column:1/-1;text-align:center;font-size:13px;color:var(--muted);padding:24px;">Belum ada produk yang disukai. Ketuk ikon hati pada produk untuk menyimpannya di sini.</div>';
      return;
    }
    grid.innerHTML = favs.map((p) =>
      '<div class="prod-card">' +
        '<button type="button" class="fav-btn liked" data-fav="' + p.id + '" aria-label="Hapus favorit">&#9829;</button>' +
        '<img src="' + p.img + '" alt="' + p.name + '" />' +
        '<div class="prod-card-body">' +
          '<div class="prod-card-title">' + p.name + '</div>' +
          '<div class="prod-card-price">' + formatRp(p.price) + '</div>' +
          '<button type="button" class="ios-btn ios-btn-gold ios-btn-sm fav-go-buy" data-favname="' + p.name + '" style="width:100%;margin-top:6px;padding:6px 10px;font-size:11px;">Lihat di Katalog</button>' +
        '</div>' +
      '</div>'
    ).join("");
  }

  function renderCustomerHistory() {
    if (state.custHistoryTab === "chats") {
      const listEl = document.getElementById("custHistoryList");
      if (!state.sellerChats.length) {
        listEl.innerHTML = '<div class="glass-card" style="text-align:center;font-size:13px;color:var(--muted);">Belum ada percakapan dengan seller.</div>';
        return;
      }
      listEl.innerHTML = state.sellerChats.map((c) =>
        '<div class="glass-card" style="margin-bottom:10px;padding:13px 14px;display:flex;flex-direction:column;gap:8px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;">' +
            '<strong style="font-size:13.5px;color:var(--navy);">' + c.seller + ' &bull; ' + c.productName + '</strong>' +
            '<span class="status-pill ' + (c.reply ? 'ready' : 'proc') + '" style="margin:0;">' + (c.reply ? 'Dibalas' : 'Menunggu') + '</span>' +
          '</div>' +
          '<div style="background:rgba(24,24,27,0.05);padding:9px 11px;border-radius:12px;font-size:12.5px;"><strong>Anda:</strong> ' + c.message + '</div>' +
          (c.reply
            ? '<div style="background:rgba(220,252,231,0.75);border:1px solid rgba(22,163,74,0.25);padding:9px 11px;border-radius:12px;font-size:12.5px;color:#14532D;"><strong>Balasan ' + c.seller + ':</strong> ' + c.reply + '</div>'
            : '<div style="font-size:11.5px;color:var(--muted);">Seller belum membalas pertanyaan ini.</div>') +
        '</div>'
      ).join("");
      return;
    }
    const items = state.customerOrders.filter((o) => state.custHistoryTab === "all" || o.status === state.custHistoryTab);
    document.getElementById("custHistoryList").innerHTML = items.map((o) =>
      '<div class="catalog-card" style="flex-direction:column;align-items:stretch;gap:8px;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px;font-weight:700;color:var(--muted);">' +
          '<span>' + o.date + '</span>' +
          '<span class="status-pill ' + (o.status === 'finished' ? 'ready' : 'proc') + '">' + (o.status === 'finished' ? 'Finished' : 'On Processed') + '</span>' +
        '</div>' +
        '<div style="display:flex;gap:12px;align-items:center;">' +
          '<img src="' + o.img + '" alt="' + o.name + '" />' +
          '<div class="catalog-info">' +
            '<strong>' + o.name + '</strong>' +
            '<div style="font-weight:700;color:var(--accent-gold);">' + formatRp(o.price) + '</div>' +
            '<div>Category: ' + o.category + '</div>' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;gap:5px;flex-shrink:0;">' +
            (o.status === "processed" ? '<button type="button" class="ios-btn ios-btn-gold ios-btn-sm finish-order-btn" data-oid="' + o.id + '" style="padding:6px 10px;font-size:11px;">Selesai</button>' : '') +
            '<button type="button" class="ios-btn ios-btn-danger ios-btn-sm clear-cust-order-btn" data-oid="' + o.id + '" style="padding:6px 10px;font-size:11px;">Clear</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    ).join("") || '<div class="glass-card" style="text-align:center;font-size:13px;color:var(--muted);">Belum ada pesanan di kategori ini.</div>';
  }

  function renderProfile() {
    const isSeller = state.role === "seller";
    document.getElementById("profileRoleBadge").textContent = isSeller ? "Seller" : "Customer";
    document.getElementById("profStoreGroup").style.display = isSeller ? "flex" : "none";
    document.getElementById("profAccountFor").value = isSeller ? "Organization" : "Civitas Akademik UI";
    const photoUrl = state.profilePhotos[isSeller ? "seller" : "customer"];
    const imgEl = document.getElementById("profileAvatarImg");
    const svgEl = document.getElementById("profileAvatarSvg");
    if (photoUrl) {
      imgEl.src = photoUrl;
      imgEl.style.display = "block";
      svgEl.style.display = "none";
    } else {
      imgEl.style.display = "none";
      svgEl.style.display = "block";
    }
  }

  function renderSellerCatalog() {
    const q = (document.getElementById("sellerSearchInput").value || "").trim().toLowerCase();
    const items = state.products.filter((p) => !q || p.name.toLowerCase().includes(q));
    document.getElementById("sellerCatalogList").innerHTML = items.map((p) => {
      const ready = p.stock > 0;
      return (
        '<div class="catalog-card">' +
          '<img src="' + p.img + '" alt="' + p.name + '" />' +
          '<div class="catalog-info">' +
            '<strong>' + p.name + '</strong>' +
            '<div style="font-weight:700;color:var(--accent-gold);">' + formatRp(p.price) + '</div>' +
            '<div>Stock: ' + p.stock + ' &bull; ' + p.category + '</div>' +
            '<span class="status-pill ' + (ready ? 'ready' : 'out') + '">' + (ready ? 'Ready' : 'Out of stock') + '</span>' +
          '</div>' +
          '<button type="button" class="ios-btn ios-btn-glass ios-btn-sm edit-btn" data-pid="' + p.id + '">Edit</button>' +
        '</div>'
      );
    }).join("");
  }

  function openEditProduct(pid) {
    const prod = state.products.find((p) => p.id === pid);
    if (!prod) return;
    state.editingProductId = pid;
    document.getElementById("editProdImg").src = prod.img;
    document.getElementById("editProdSellerLabel").textContent = prod.seller || "Organisasi A";
    document.getElementById("editProdName").value = prod.name;
    document.getElementById("editProdPrice").value = prod.price;
    document.getElementById("editProdStock").value = prod.stock;
    document.getElementById("editProdCategory").value = prod.category;
    document.getElementById("editProdStatus").value = prod.status || "Published";
    document.getElementById("editProdDesc").value = prod.desc || "";
    navigate("seller-edit-product");
  }

  function animateCount(elId, target) {
    const el = document.getElementById(elId);
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 12));
    const t = setInterval(() => {
      cur = Math.min(target, cur + step);
      el.textContent = cur;
      if (cur >= target) clearInterval(t);
    }, 28);
  }

  function renderSellerResult() {
    animateCount("kpiNewOrder", state.sellerPurchases.filter((x) => x.status === "processed").length);
    animateCount("kpiSoldToday", state.customerOrders.length);
    animateCount("kpiTxToday", state.sellerPayments.length);
    animateCount("kpiProdListed", state.products.length);
  }

  function openBuyerDetailModal(spid) {
    const o = state.sellerPurchases.find((x) => x.id === spid);
    if (!o) return;
    openModal(
      '<div class="ios-modal" style="text-align:left;align-items:stretch;gap:10px;">' +
        '<div style="display:flex;align-items:center;gap:12px;">' +
          '<img src="' + o.img + '" alt="' + o.name + '" style="width:64px;height:64px;border-radius:14px;object-fit:cover;background:#FFF;" />' +
          '<div>' +
            '<div style="font-size:15px;font-weight:800;">' + o.name + '</div>' +
            '<div style="font-size:12px;color:var(--muted);font-weight:600;">' + o.orderId + ' &bull; ' + o.date + '</div>' +
          '</div>' +
        '</div>' +
        '<div style="background:rgba(24,24,27,0.05);border-radius:16px;padding:12px;display:flex;flex-direction:column;gap:7px;font-size:12.5px;">' +
          '<div style="display:flex;justify-content:space-between;gap:8px;"><span style="color:var(--muted);">Pembeli</span><strong style="text-align:right;">' + o.buyer + '</strong></div>' +
          '<div style="display:flex;justify-content:space-between;gap:8px;"><span style="color:var(--muted);">No. HP</span><strong>' + o.phone + '</strong></div>' +
          '<div style="display:flex;justify-content:space-between;gap:8px;"><span style="color:var(--muted);">Akun</span><strong style="text-align:right;">' + o.accountFor + '</strong></div>' +
          '<div style="display:flex;justify-content:space-between;gap:8px;"><span style="color:var(--muted);">Jumlah</span><strong>' + o.qty + ' pcs</strong></div>' +
          '<div style="display:flex;justify-content:space-between;gap:8px;"><span style="color:var(--muted);">Total Bayar</span><strong style="color:var(--accent-gold);">' + formatRp(o.total) + '</strong></div>' +
          '<div style="display:flex;justify-content:space-between;gap:8px;"><span style="color:var(--muted);">Metode</span><strong>' + o.paymentMethod + '</strong></div>' +
          '<div style="display:flex;justify-content:space-between;gap:8px;"><span style="color:var(--muted);">Status</span><span class="status-pill ' + (o.status === 'finished' ? 'ready' : 'proc') + '" style="margin:0;">' + (o.status === 'finished' ? 'Finished' : 'On Processed') + '</span></div>' +
        '</div>' +
        '<button type="button" class="ios-btn ios-btn-primary" id="closeBuyerDetailBtn">Tutup</button>' +
      '</div>'
    );
    document.getElementById("closeBuyerDetailBtn").addEventListener("click", closeModal);
  }

  function renderSellerPurchases() {
    const q = (document.getElementById("sellerPurchSearch").value || "").trim().toLowerCase();
    const items = state.sellerPurchases.filter((o) =>
      (state.sellerPurchTab === "all" || o.status === state.sellerPurchTab) &&
      (!q || o.date.includes(q) || o.name.toLowerCase().includes(q) || o.buyer.toLowerCase().includes(q))
    );
    document.getElementById("sellerPurchasesList").innerHTML = items.map((o) =>
      '<div class="glass-card" style="padding:11px;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;font-size:12.5px;font-weight:700;margin-bottom:8px;gap:6px;">' +
          '<span>' + o.date + ' &bull; ' + o.name + '</span>' +
          '<div style="display:flex;align-items:center;gap:6px;">' +
            '<span class="status-pill ' + (o.status === 'finished' ? 'ready' : 'proc') + '" style="margin:0;">' + (o.status === 'finished' ? 'Finished' : 'On Processed') + '</span>' +
            '<button type="button" class="ios-btn ios-btn-danger ios-btn-sm clear-seller-purch-btn" data-spid="' + o.id + '" style="padding:4px 9px;font-size:10.5px;">Clear</button>' +
          '</div>' +
        '</div>' +
        '<div class="buyer-img-trigger" data-spid="' + o.id + '" role="button" tabindex="0" style="position:relative;cursor:pointer;border-radius:14px;overflow:hidden;">' +
          '<img src="' + o.img + '" alt="' + o.name + '" style="width:100%;height:134px;object-fit:cover;" />' +
          '<div style="position:absolute;left:0;right:0;bottom:0;background:linear-gradient(transparent,rgba(24,24,27,0.78));color:#FFF;padding:18px 12px 9px;display:flex;justify-content:space-between;align-items:center;font-size:11.5px;">' +
            '<span><strong>' + o.buyer + '</strong> &bull; ' + o.qty + ' pcs</span>' +
            '<span style="background:rgba(255,255,255,0.22);backdrop-filter:blur(6px);padding:2px 8px;border-radius:999px;font-weight:700;">Info Pembeli &rsaquo;</span>' +
          '</div>' +
        '</div>' +
      '</div>'
    ).join("") || '<div class="glass-card" style="text-align:center;font-size:13px;color:var(--muted);">Belum ada riwayat pembelian.</div>';
  }

  function openInvoicePrintModal(payId) {
    const r = state.sellerPayments.find((x) => x.id === payId);
    if (!r) return;
    const rowsHtml = r.items.map((it) =>
      '<div style="display:flex;justify-content:space-between;font-size:12.5px;padding:4px 0;border-bottom:1px solid #F3F4F6;">' +
        '<span>' + it.name + ' (x' + it.qty + ')</span>' +
        '<strong>' + formatRp(it.price * it.qty) + '</strong>' +
      '</div>'
    ).join("");
    openModal(
      '<div class="invoice-sheet" id="printableInvoice">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #18181B;padding-bottom:10px;">' +
          '<div>' +
            '<div style="font-family:var(--font-display);font-size:17px;font-weight:800;">FAKTUR PEMBAYARAN</div>' +
            '<div style="font-size:11px;color:var(--muted);">GetmerchUI &bull; Universitas Indonesia</div>' +
          '</div>' +
          '<span class="status-pill ready" style="margin:0;">LUNAS</span>' +
        '</div>' +
        '<div style="font-size:11.5px;color:#3F3F46;display:flex;flex-direction:column;gap:3px;">' +
          '<div><strong>No. Faktur:</strong> ' + r.invoiceNo + '</div>' +
          '<div><strong>Tanggal:</strong> ' + r.date + '</div>' +
          '<div><strong>Pembeli:</strong> ' + r.buyer + '</div>' +
          '<div><strong>Metode:</strong> ' + r.method + '</div>' +
        '</div>' +
        '<div style="margin:4px 0;">' + rowsHtml + '</div>' +
        '<div style="display:flex;justify-content:space-between;font-size:12px;color:var(--muted);"><span>Biaya Layanan</span><span>' + formatRp(r.adminFee) + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;font-size:15px;font-weight:800;padding-top:6px;border-top:1.5px dashed #18181B;">' +
          '<span>Total Pembayaran</span><span style="color:var(--accent-gold);">' + formatRp(r.total) + '</span>' +
        '</div>' +
        '<div class="no-print" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;">' +
          '<button type="button" class="ios-btn ios-btn-glass" id="closeInvModalBtn">Tutup</button>' +
          '<button type="button" class="ios-btn ios-btn-primary" id="printInvNowBtn">Print Faktur</button>' +
        '</div>' +
      '</div>'
    );
    document.getElementById("closeInvModalBtn").addEventListener("click", closeModal);
    document.getElementById("printInvNowBtn").addEventListener("click", () => {
      window.print();
      showToast("Membuka dialog cetak faktur...");
    });
  }

  function renderSellerPayments() {
    const q = (document.getElementById("sellerPaySearch").value || "").trim().toLowerCase();
    const items = state.sellerPayments.filter((r) =>
      !q || r.date.toLowerCase().includes(q) || r.invoiceNo.toLowerCase().includes(q) || r.buyer.toLowerCase().includes(q)
    );
    document.getElementById("sellerPaymentsList").innerHTML = items.map((r) =>
      '<div class="shopee-pay-card">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(24,24,27,0.08);padding-bottom:8px;">' +
          '<div>' +
            '<div style="font-size:12px;font-weight:800;color:var(--ink);">' + r.invoiceNo + '</div>' +
            '<div style="font-size:11px;color:var(--muted);">' + r.date + ' &bull; ' + r.method + '</div>' +
          '</div>' +
          '<span class="status-pill ready" style="margin:0;">' + r.status + '</span>' +
        '</div>' +
        '<div style="font-size:12.5px;color:var(--ink-soft);">' +
          '<div style="font-weight:700;color:var(--ink);margin-bottom:3px;">Pembeli: ' + r.buyer + '</div>' +
          r.items.map((it) => '<div style="display:flex;justify-content:space-between;"><span>' + it.name + ' x' + it.qty + '</span><span>' + formatRp(it.price * it.qty) + '</span></div>').join("") +
        '</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;padding-top:8px;border-top:1px solid rgba(24,24,27,0.08);">' +
          '<div><div style="font-size:10.5px;color:var(--muted);">Total Pembayaran</div><strong style="font-size:15px;color:var(--accent-gold);">' + formatRp(r.total) + '</strong></div>' +
          '<div style="display:flex;gap:6px;">' +
            '<button type="button" class="ios-btn ios-btn-gold ios-btn-sm print-faktur-btn" data-payid="' + r.id + '" style="padding:6px 11px;font-size:11px;">Cetak Faktur</button>' +
            '<button type="button" class="ios-btn ios-btn-danger ios-btn-sm clear-seller-pay-btn" data-payid="' + r.id + '" style="padding:6px 10px;font-size:11px;">Clear</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    ).join("") || '<div class="glass-card" style="text-align:center;font-size:13px;color:var(--muted);">Belum ada riwayat pembayaran.</div>';
  }

  function renderOtp() {
    document.querySelectorAll("#otpBoxes .otp-cell").forEach((c, i) => {
      const val = state.otpDigits[i];
      c.textContent = val !== undefined ? val : "";
      c.classList.toggle("filled", val !== undefined);
      c.classList.toggle("current", i === state.otpDigits.length);
    });
  }

  /* ---- Event Listeners ---- */
  document.addEventListener("click", (e) => {
    const fav = e.target.closest("[data-fav]");
    if (fav) {
      e.stopPropagation();
      const fid = fav.dataset.fav;
      state.favorites[fid] = !state.favorites[fid];
      renderProductGrids();
      updateFavCounter();
      if (state.currentScreen === "customer-catalog") renderCustomerCatalog();
      if (state.currentScreen === "customer-favorites") renderCustomerFavorites();
      showToast(state.favorites[fid] ? "Ditambahkan ke favorit" : "Dihapus dari favorit");
      return;
    }
    const favBuy = e.target.closest(".fav-go-buy");
    if (favBuy) {
      document.getElementById("custSearchInput").value = favBuy.dataset.favname || "";
      navigate("customer-catalog");
      return;
    }
    const printBtn = e.target.closest(".print-faktur-btn");
    if (printBtn) {
      openInvoicePrintModal(printBtn.dataset.payid);
      return;
    }
    const fItem = e.target.closest("[data-founder]");
    if (fItem) { showToast("Founder GetmerchUI: " + fItem.dataset.founder); return; }
    const pubProd = e.target.closest(".public-prod-tile");
    if (pubProd) { openPublicQuickView(pubProd.dataset.opid); return; }
    const finBtn = e.target.closest(".finish-order-btn");
    if (finBtn) {
      const ord = state.customerOrders.find((o) => o.id === finBtn.dataset.oid);
      if (ord) { ord.status = "finished"; renderCustomerHistory(); showToast("Pesanan ditandai selesai!"); }
      return;
    }
    const nav = e.target.closest("[data-nav]");
    if (nav) { navigate(nav.dataset.nav); return; }
    const back = e.target.closest("[data-back]");
    if (back) { navigate(back.dataset.back); return; }
    const buy = e.target.closest(".buy-btn");
    if (buy) { openCheckoutSheet(buy.dataset.pid); return; }
    const askBtn = e.target.closest(".ask-seller-btn");
    if (askBtn) { openAskSellerModal(askBtn.dataset.pid); return; }
    const buyerTrig = e.target.closest(".buyer-img-trigger");
    if (buyerTrig) { openBuyerDetailModal(buyerTrig.dataset.spid); return; }
    const clrCust = e.target.closest(".clear-cust-order-btn");
    if (clrCust) {
      state.customerOrders = state.customerOrders.filter((o) => o.id !== clrCust.dataset.oid);
      renderCustomerHistory();
      showToast("Riwayat pesanan dihapus");
      return;
    }
    const clrSP = e.target.closest(".clear-seller-purch-btn");
    if (clrSP) {
      state.sellerPurchases = state.sellerPurchases.filter((o) => o.id !== clrSP.dataset.spid);
      renderSellerPurchases();
      showToast("Riwayat pembelian dihapus");
      return;
    }
    const clrPay = e.target.closest(".clear-seller-pay-btn");
    if (clrPay) {
      state.sellerPayments = state.sellerPayments.filter((r) => r.id !== clrPay.dataset.payid);
      renderSellerPayments();
      showToast("Riwayat pembayaran dihapus");
      return;
    }
    const edit = e.target.closest(".edit-btn");
    if (edit) { openEditProduct(edit.dataset.pid); return; }
    if (e.target.closest(".home-prod-tile")) {
      navigate(state.role === "seller" ? "seller-catalog" : "customer-catalog");
    }
  });

  document.querySelectorAll(".jump-btn").forEach((b) => {
    b.addEventListener("click", () => {
      const t = b.dataset.jump;
      if (t === "seller-promo") state.role = "seller";
      navigate(t);
    });
  });

  document.getElementById("mobileJumpSelect").addEventListener("change", (e) => {
    const t = e.target.value;
    if (t === "seller-promo") state.role = "seller";
    navigate(t);
  });

  document.getElementById("quickCustomerBtn").addEventListener("click", () => navigate("home-customer"));
  document.getElementById("quickSellerBtn").addEventListener("click", () => navigate("home-seller"));

  document.querySelectorAll("#bottomNav .bnav-item").forEach((b) => {
    b.addEventListener("click", () => {
      const tab = b.dataset.bnav;
      const isSeller = state.role === "seller";
      if (tab === "home") navigate("home", { tab: "home" });
      else if (tab === "catalogs") navigate(isSeller ? "seller-catalogs-hub" : "customer-catalog", { tab: "catalogs" });
      else if (tab === "search") {
        navigate(isSeller ? "seller-catalog" : "customer-catalog", { tab: "search" });
        const inp = document.getElementById(isSeller ? "sellerSearchInput" : "custSearchInput");
        if (inp) setTimeout(() => inp.focus(), 60);
      }
      else if (tab === "fourth") navigate(isSeller ? "seller-result" : "customer-history", { tab: "fourth" });
      else if (tab === "profile") navigate("profile", { tab: "profile" });
    });
  });

  // Welcome Carousel + Swipe
  function openWelcomeTarget() {
    const t = WELCOME_SLIDES[state.welcomeIndex].target;
    if (t === "instagram-popup") {
      openModal(
        '<div class="ios-modal">' +
          '<div class="ios-icon-squircle sm" style="background:linear-gradient(135deg,#FA7E1E,#D62976,#4F5BD5);color:#FFF;"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1" fill="#FFF" stroke="none"/></svg></div>' +
          '<div style="font-family:var(--font-display);font-size:18px;font-weight:800;">@getmerchui</div>' +
          '<p style="font-size:13px;color:var(--muted);line-height:1.45;">Ikuti akun Instagram resmi kami di <strong>@getmerchui</strong> untuk informasi rilisan merchandise terbaru dan kerja sama promosi kampus UI.</p>' +
          '<button type="button" class="ios-btn ios-btn-primary" id="copyIgBtn">Salin @getmerchui</button>' +
          '<button type="button" class="text-link" id="closeIgModalBtn">Tutup</button>' +
        '</div>'
      );
      document.getElementById("copyIgBtn").addEventListener("click", () => {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText("@getmerchui").catch(() => {});
        showToast("Disalin: @getmerchui");
        closeModal();
      });
      document.getElementById("closeIgModalBtn").addEventListener("click", closeModal);
    } else {
      navigate(t);
    }
  }
  document.getElementById("welcomePrevBtn").addEventListener("click", () => { state.welcomeIndex = (state.welcomeIndex + 2) % 3; renderWelcome(); });
  document.getElementById("welcomeNextBtn").addEventListener("click", () => { state.welcomeIndex = (state.welcomeIndex + 1) % 3; renderWelcome(); });
  document.querySelectorAll("#welcomeDots .dot-pill").forEach((d) => {
    d.addEventListener("click", () => { state.welcomeIndex = Number(d.dataset.wdot); renderWelcome(); });
  });
  document.getElementById("welcomeCardBtn").addEventListener("click", openWelcomeTarget);

  let touchStartX = 0;
  const swipeArea = document.getElementById("welcomeSwipeArea");
  swipeArea.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  swipeArea.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      state.welcomeIndex = dx < 0 ? (state.welcomeIndex + 1) % 3 : (state.welcomeIndex + 2) % 3;
      syncHomeBanner();
  updateFavCounter();
  renderWelcome();
    }
  });

  document.getElementById("founderPrevBtn").addEventListener("click", () => { state.founderIndex = (state.founderIndex + FOUNDERS.length - 1) % FOUNDERS.length; renderFounders(); });
  document.getElementById("founderNextBtn").addEventListener("click", () => { state.founderIndex = (state.founderIndex + 1) % FOUNDERS.length; renderFounders(); });

  // Sign Up Forms
  document.getElementById("signupSellerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    burstConfetti();
    openModal(
      '<div class="ios-modal">' + CHECK_BADGE +
        '<div style="font-family:var(--font-display);font-size:19px;font-weight:800;">Successfully</div>' +
        '<p style="font-size:13px;color:var(--muted);">Akun Seller berhasil didaftarkan.</p>' +
        '<button type="button" class="ios-btn ios-btn-primary" id="goSellerHomeBtn">Go To Home</button>' +
      '</div>'
    );
    document.getElementById("goSellerHomeBtn").addEventListener("click", () => { closeModal(); navigate("home-seller"); });
  });

  document.getElementById("signupCustomerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    burstConfetti();
    openModal(
      '<div class="ios-modal">' + CHECK_BADGE +
        '<div style="font-family:var(--font-display);font-size:19px;font-weight:800;">Successfully</div>' +
        '<p style="font-size:13px;color:var(--muted);">Akun Customer berhasil didaftarkan.</p>' +
        '<button type="button" class="ios-btn ios-btn-primary" id="goCustHomeBtn">Go To Home</button>' +
      '</div>'
    );
    document.getElementById("goCustHomeBtn").addEventListener("click", () => { closeModal(); navigate("home-customer"); });
  });

  // Login & OTP
  document.getElementById("chooseLoginSellerBtn").addEventListener("click", () => {
    state.pendingLoginRole = "seller";
    document.getElementById("loginRoleChip").textContent = "Seller";
    document.getElementById("loginUser").value = "organisasi.a";
    navigate("login-form");
  });
  document.getElementById("chooseLoginCustomerBtn").addEventListener("click", () => {
    state.pendingLoginRole = "customer";
    document.getElementById("loginRoleChip").textContent = "Customer";
    document.getElementById("loginUser").value = "mahasiswa.ui";
    navigate("login-form");
  });
  document.getElementById("toggleLoginPass").addEventListener("click", () => {
    const p = document.getElementById("loginPass");
    p.type = p.type === "password" ? "text" : "password";
  });
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    navigate(state.pendingLoginRole === "seller" ? "home-seller" : "home-customer");
    showToast("Selamat datang kembali!");
  });
  document.getElementById("forgotForm").addEventListener("submit", (e) => {
    e.preventDefault();
    state.otpDigits = [];
    renderOtp();
    navigate("otp");
    showToast("Kode OTP dikirim ke email Anda");
  });
  function handleOtpInput(v) {
    if (v === "del") state.otpDigits.pop();
    else if (/^[0-9]$/.test(v) && state.otpDigits.length < 4) state.otpDigits.push(v);
    renderOtp();
  }
  document.querySelectorAll("#otpKeypad .ios-key").forEach((k) => {
    k.addEventListener("click", () => handleOtpInput(k.dataset.key));
  });
  document.addEventListener("keydown", (e) => {
    if (state.currentScreen !== "otp") return;
    if (e.key === "Backspace") handleOtpInput("del");
    else if (/^[0-9]$/.test(e.key)) handleOtpInput(e.key);
  });
  document.getElementById("verifyOtpBtn").addEventListener("click", () => {
    if (state.otpDigits.length < 4) { showToast("Masukkan 4 digit OTP dulu"); return; }
    navigate("reset-password");
  });
  document.getElementById("resetPassForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (document.getElementById("newPassInput").value !== document.getElementById("confirmPassInput").value) {
      showToast("Konfirmasi password tidak cocok");
      return;
    }
    burstConfetti();
    openModal(
      '<div class="ios-modal">' + CHECK_BADGE +
        '<div style="font-family:var(--font-display);font-size:18px;font-weight:800;">New Password Set!</div>' +
        '<p style="font-size:13px;color:var(--muted);">Kata sandi baru berhasil disimpan.</p>' +
        '<button type="button" class="ios-btn ios-btn-primary" id="goLoginAfterResetBtn">Go To Login</button>' +
      '</div>'
    );
    document.getElementById("goLoginAfterResetBtn").addEventListener("click", () => { closeModal(); navigate("login-form"); });
  });

  // Home
  document.getElementById("homeBannerClick").addEventListener("click", () => {
    navigate(state.role === "seller" ? "seller-promo" : "customer-catalog");
  });
  document.getElementById("homeSeeAllBtn").addEventListener("click", () => {
    navigate(state.role === "seller" ? "seller-catalogs-hub" : "customer-catalog");
  });

  // Profile Modals
  document.getElementById("profileForm").addEventListener("submit", (e) => {
    e.preventDefault();
    burstConfetti();
    openModal(
      '<div class="ios-modal">' + CHECK_BADGE +
        '<div style="font-family:var(--font-display);font-size:19px;font-weight:800;">Successfully</div>' +
        '<p style="font-size:13px;color:var(--muted);">Perubahan profil telah disimpan.</p>' +
        '<button type="button" class="ios-btn ios-btn-primary" id="profDoneBtn">Done</button>' +
      '</div>'
    );
    document.getElementById("profDoneBtn").addEventListener("click", closeModal);
  });

  document.getElementById("logoutTriggerBtn").addEventListener("click", () => {
    openModal(
      '<div class="ios-modal">' +
        '<div style="font-family:var(--font-display);font-size:17px;font-weight:800;">Are you sure to Log Out?</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%;margin-top:4px;">' +
          '<button type="button" class="ios-btn ios-btn-primary" id="confirmLogoutYes">Yes</button>' +
          '<button type="button" class="ios-btn ios-btn-glass" id="confirmLogoutCancel">Cancel</button>' +
        '</div>' +
      '</div>'
    );
    document.getElementById("confirmLogoutYes").addEventListener("click", () => { closeModal(); state.role = "guest"; navigate("welcome"); showToast("Berhasil Log Out"); });
    document.getElementById("confirmLogoutCancel").addEventListener("click", closeModal);
  });

  document.getElementById("deleteAccTriggerBtn").addEventListener("click", () => {
    openModal(
      '<div class="ios-modal">' +
        '<div style="font-family:var(--font-display);font-size:17px;font-weight:800;color:var(--danger);">Delete Account?</div>' +
        '<p style="font-size:13px;color:var(--muted);">Are you sure to delete an account?</p>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%;margin-top:4px;">' +
          '<button type="button" class="ios-btn ios-btn-danger" id="confirmDelYes">Delete</button>' +
          '<button type="button" class="ios-btn ios-btn-glass" id="confirmDelNo">No</button>' +
        '</div>' +
      '</div>'
    );
    document.getElementById("confirmDelYes").addEventListener("click", () => { closeModal(); state.role = "guest"; navigate("welcome"); showToast("Akun dihapus"); });
    document.getElementById("confirmDelNo").addEventListener("click", closeModal);
  });

  document.getElementById("changePhotoBtn").addEventListener("click", () => {
    const cls = state.role === "seller" ? "ios-sheet light" : "ios-sheet";
    openModal(
      '<div class="' + cls + '">' +
        '<div class="sheet-grabber"></div>' +
        '<button type="button" class="sheet-row-btn" id="photoGalleryBtn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Choose from gallery</span></button>' +
        '<button type="button" class="sheet-row-btn" id="photoCameraBtn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg><span>Take photo</span></button>' +
        '<button type="button" class="sheet-row-btn" id="photoRemoveBtn" style="color:var(--danger);"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg><span>Remove current picture</span></button>' +
        '<button type="button" class="ios-btn ios-btn-primary" id="photoCancelBtn">Cancel</button>' +
      '</div>',
      true
    );
    const profFileInp = document.getElementById("profilePhotoInput");
    document.getElementById("photoCancelBtn").addEventListener("click", closeModal);
    document.getElementById("photoGalleryBtn").addEventListener("click", () => { closeModal(); profFileInp.click(); });
    document.getElementById("photoCameraBtn").addEventListener("click", () => { closeModal(); profFileInp.click(); });
    document.getElementById("photoRemoveBtn").addEventListener("click", () => {
      state.profilePhotos[state.role === "seller" ? "seller" : "customer"] = null;
      renderProfile();
      closeModal();
      showToast("Foto profil dihapus");
    });
  });

  document.getElementById("profilePhotoInput").addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      state.profilePhotos[state.role === "seller" ? "seller" : "customer"] = ev.target.result;
      renderProfile();
      showToast("Foto profil berhasil diperbarui!");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  });

  // Catalog, Payment, History
  document.getElementById("custSearchInput").addEventListener("input", renderCustomerCatalog);
  document.getElementById("custSearchClear").addEventListener("click", () => { document.getElementById("custSearchInput").value = ""; renderCustomerCatalog(); });
  document.querySelectorAll("#custCatChips .cat-chip").forEach((c) => {
    c.addEventListener("click", () => {
      state.custCat = c.dataset.cat;
      document.querySelectorAll("#custCatChips .cat-chip").forEach((x) => x.classList.remove("active"));
      c.classList.add("active");
      renderCustomerCatalog();
    });
  });

  document.getElementById("paymentDoneBtn").addEventListener("click", () => {
    const prod = state.products.find((p) => p.id === state.selectedProductId);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - state.checkoutQty);
      state.customerOrders.unshift({
        id: "co" + Date.now(), date: "26/11/2026", name: prod.name,
        price: prod.price * state.checkoutQty, stock: prod.stock,
        category: prod.category, status: "processed", img: prod.img
      });
      state.newOrderCount++;
    }
    burstConfetti();
    showToast("Pembayaran QR berhasil!");
    navigate("customer-history");
  });

  document.querySelectorAll("#custHistoryTabs .ios-seg-btn").forEach((t) => {
    t.addEventListener("click", () => {
      state.custHistoryTab = t.dataset.htab;
      document.querySelectorAll("#custHistoryTabs .ios-seg-btn").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      renderCustomerHistory();
    });
  });

  // Clear All History Handlers
  document.getElementById("clearAllCustHistBtn").addEventListener("click", () => {
    if (!state.customerOrders.length) { showToast("Riwayat sudah kosong"); return; }
    openModal(
      '<div class="ios-modal">' +
        '<div style="font-family:var(--font-display);font-size:17px;font-weight:800;">Hapus Semua History?</div>' +
        '<p style="font-size:13px;color:var(--muted);">Semua riwayat pesanan Anda akan dibersihkan.</p>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%;">' +
          '<button type="button" class="ios-btn ios-btn-danger" id="confirmClearCustAll">Clear All</button>' +
          '<button type="button" class="ios-btn ios-btn-glass" id="cancelClearCustAll">Batal</button>' +
        '</div>' +
      '</div>'
    );
    document.getElementById("confirmClearCustAll").addEventListener("click", () => {
      state.customerOrders = [];
      closeModal();
      renderCustomerHistory();
      showToast("Semua history pesanan dibersihkan");
    });
    document.getElementById("cancelClearCustAll").addEventListener("click", closeModal);
  });

  document.getElementById("clearAllSellerPurchBtn").addEventListener("click", () => {
    if (!state.sellerPurchases.length) { showToast("Riwayat sudah kosong"); return; }
    state.sellerPurchases = [];
    renderSellerPurchases();
    showToast("Semua history pembelian dibersihkan");
  });

  document.getElementById("clearAllSellerPayBtn").addEventListener("click", () => {
    if (!state.sellerPayments.length) { showToast("Riwayat sudah kosong"); return; }
    state.sellerPayments = [];
    renderSellerPayments();
    showToast("Semua history pembayaran dibersihkan");
  });

  // Seller Actions + Real Image Upload via FileReader
  document.getElementById("sellerSearchInput").addEventListener("input", renderSellerCatalog);

  const editFileInput = document.getElementById("editProdFileInput");
  document.getElementById("cycleEditImgBtn").addEventListener("click", () => editFileInput.click());
  editFileInput.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      document.getElementById("editProdImg").src = ev.target.result;
      showToast("Foto produk diperbarui: " + file.name);
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("editProductForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const prod = state.products.find((p) => p.id === state.editingProductId);
    if (prod) {
      prod.name = document.getElementById("editProdName").value.trim();
      prod.price = Number(document.getElementById("editProdPrice").value) || 0;
      prod.stock = Number(document.getElementById("editProdStock").value) || 0;
      prod.category = document.getElementById("editProdCategory").value;
      prod.status = document.getElementById("editProdStatus").value;
      prod.desc = document.getElementById("editProdDesc").value.trim();
      prod.img = document.getElementById("editProdImg").src;
    }
    showToast("Perubahan produk disimpan!");
    navigate("seller-catalog");
  });

  const addFileInput = document.getElementById("addProdFileInput");
  document.getElementById("addUploadBtn").addEventListener("click", () => addFileInput.click());
  addFileInput.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      state.addProdImgDataUrl = ev.target.result;
      const prev = document.getElementById("addProdPreviewImg");
      prev.src = ev.target.result;
      prev.style.display = "block";
      document.getElementById("addUploadLabel").textContent = file.name + " (Ganti Foto)";
      showToast("Foto berhasil ditambahkan!");
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("addProductForm").addEventListener("submit", (e) => {
    e.preventDefault();
    state.products.unshift({
      id: "p" + Date.now(),
      name: document.getElementById("addProdName").value.trim(),
      category: document.getElementById("addProdCategory").value,
      price: Number(document.getElementById("addProdPrice").value) || 15000,
      stock: 10, seller: "Organisasi A", status: "Published",
      desc: document.getElementById("addProdDesc").value.trim(),
      img: state.addProdImgDataUrl || ASSETS.keychainA
    });
    e.target.reset();
    state.addProdImgDataUrl = null;
    const prev = document.getElementById("addProdPreviewImg");
    prev.style.display = "none";
    prev.removeAttribute("src");
    document.getElementById("addUploadLabel").textContent = "Tambah Foto dari Perangkat";
    burstConfetti();
    showToast("Produk baru berhasil ditambahkan!");
    navigate("seller-catalog");
  });

  document.getElementById("processReqBtn").addEventListener("click", () => {
    const btn = document.getElementById("processReqBtn");
    btn.textContent = "Shipped ✓";
    btn.style.background = "#DCFCE7";
    btn.style.color = "#15803D";
    showToast("REQ-001 ditandai sedang dikirim!");
  });

  document.getElementById("replyChatBtn").addEventListener("click", () => {
    const latest = state.sellerChats[0] || { customer: "Customer UI", productName: "Keychain Proker A", message: "Kak, stoknya masih ready?" };
    openModal(
      '<div class="ios-modal" style="text-align:left;align-items:stretch;">' +
        '<div style="font-size:15px;font-weight:800;">Chat dari ' + latest.customer + '</div>' +
        '<div style="font-size:11.5px;color:var(--navy);font-weight:700;">Produk: ' + latest.productName + '</div>' +
        '<div style="background:rgba(24,24,27,0.06);padding:10px 12px;border-radius:14px;font-size:12.5px;">"' + latest.message + '"</div>' +
        '<input class="ios-input" id="chatReplyInput" type="text" value="Halo kak! Masih ready ya, silakan langsung diorder :)" />' +
        '<button type="button" class="ios-btn ios-btn-primary" id="sendReplyBtn">Kirim Balasan</button>' +
      '</div>'
    );
    document.getElementById("sendReplyBtn").addEventListener("click", () => {
      latest.reply = document.getElementById("chatReplyInput").value.trim();
      closeModal();
      const btn = document.getElementById("replyChatBtn");
      btn.textContent = "Replied ✓";
      btn.style.background = "#DCFCE7";
      btn.style.color = "#15803D";
      showToast("Balasan terkirim ke " + latest.customer + "!");
    });
  });

  document.getElementById("togglePurchSearchBtn").addEventListener("click", () => {
    const inp = document.getElementById("sellerPurchSearch");
    inp.style.display = inp.style.display === "none" ? "block" : "none";
    if (inp.style.display === "block") inp.focus();
  });
  document.getElementById("sellerPurchSearch").addEventListener("input", renderSellerPurchases);
  document.querySelectorAll("#sellerPurchTabs .ios-seg-btn").forEach((t) => {
    t.addEventListener("click", () => {
      state.sellerPurchTab = t.dataset.sptab;
      document.querySelectorAll("#sellerPurchTabs .ios-seg-btn").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      renderSellerPurchases();
    });
  });

  document.getElementById("togglePaySearchBtn").addEventListener("click", () => {
    const inp = document.getElementById("sellerPaySearch");
    inp.style.display = inp.style.display === "none" ? "block" : "none";
    if (inp.style.display === "block") inp.focus();
  });
  document.getElementById("sellerPaySearch").addEventListener("input", renderSellerPayments);

  document.querySelectorAll(".faq-header").forEach((btn) => {
    btn.addEventListener("click", () => btn.parentElement.classList.toggle("collapsed"));
  });
  document.getElementById("faqBackBtn").addEventListener("click", () => navigate(state.role === "guest" ? "welcome" : "home"));


  function updatePromoPreview() {
    const p = document.getElementById("promoProduct").value || "Produk";
    const t = document.getElementById("promoTitle").value || "Promo";
    const s = document.getElementById("promoStart").value || "-";
    const e = document.getElementById("promoEnd").value || "-";
    document.getElementById("promoLivePreview").textContent = p + " — " + t + " (" + s + " – " + e + ")";
  }
  ["promoProduct", "promoTitle", "promoStart", "promoEnd"].forEach((fid) => {
    document.getElementById(fid).addEventListener("input", updatePromoPreview);
  });
  const promoFileInput = document.getElementById("promoFileInput");
  document.getElementById("promoUploadBtn").addEventListener("click", () => promoFileInput.click());
  promoFileInput.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      state.promoBanner.img = ev.target.result;
      document.getElementById("promoPreviewImg").src = ev.target.result;
      document.getElementById("promoUploadLabel").textContent = file.name.slice(0, 12) + " ✓";
      showToast("Banner baru siap diterapkan!");
    };
    reader.readAsDataURL(file);
  });
  document.getElementById("promoEditForm").addEventListener("submit", (e) => {
    e.preventDefault();
    state.promoBanner.product = document.getElementById("promoProduct").value.trim() || "Produk A";
    state.promoBanner.title = document.getElementById("promoTitle").value.trim() || "New Arrival";
    state.promoBanner.start = document.getElementById("promoStart").value.trim() || "-";
    state.promoBanner.end = document.getElementById("promoEnd").value.trim() || "-";
    syncHomeBanner();
    burstConfetti();
    showToast("Banner Beranda berhasil diperbarui!");
    navigate("home-seller");
  });

  renderWelcome();
  renderFounders();
  renderProductGrids();
  navigate("welcome");
})();
