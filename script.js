document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const loginLink = document.getElementById("loginLink");
  const userMenu = document.getElementById("userMenu");
  const userDropdown = document.getElementById("userDropdown");
  const logoutBtn = document.getElementById("logoutBtn");
  const profileBtn = document.getElementById("profileBtn");

  // Show/hide login link and user menu
  if (currentUser) {
    if (loginLink) loginLink.style.display = "none";
    if (userMenu) userMenu.style.display = "inline-block";
  } else {
    if (loginLink) loginLink.style.display = "inline-block";
    if (userMenu) userMenu.style.display = "none";

    // Optional: restrict access to protected pages
    const restrictedPages = ["booking.html", "profile.html"];
    const currentPage = window.location.pathname.split("/").pop();
    if (restrictedPages.includes(currentPage)) {
      alert("❌ You must log in first!");
      window.location.href = "login.html";
    }
  }

  // Navbar dropdown toggle
  if (userMenu && userDropdown) {
    const userIcon = userMenu.querySelector("i");
    if (userIcon) {
      userIcon.addEventListener("click", () => {
        userDropdown.style.display = userDropdown.style.display === "block" ? "none" : "block";
      });
    }
  }

  // Logout functionality
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
      window.location.href = "index.html";
    });
  }

  // Profile info popup
  if (profileBtn && currentUser) {
    profileBtn.addEventListener("click", () => {
    
    window.location.href = "profile.html"; // ✅ redirect


    });
  }
});

   // ------------------------------
  // Booking Page Form
  // ------------------------------




  // ------------------------------
  // Rooms Page Live Search
  // ------------------------------
  const search = document.getElementById('roomSearch');
  if (search) {
    const cards = Array.from(document.querySelectorAll('.room-grid .card'));
    search.addEventListener('input', (e) => {
      const q = (e.target.value || '').trim().toLowerCase();
      cards.forEach(c => {
        const slug = (c.dataset.room || '').toLowerCase();
        const title = (c.querySelector('h4')?.textContent || '').toLowerCase();
        const matches = slug.includes(q) || title.includes(q);
        c.style.display = matches || !q ? '' : 'none';
      });
    });
  }

  // ------------------------------
  // Contact Page Form
  // ------------------------------
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const status = document.getElementById("status");

      if (name === "" || email === "" || message === "") {
        status.textContent = "Please fill in all fields.";
        status.style.color = "red";
        return;
      }

      // Simulated success
      status.textContent = "Message sent successfully! We’ll contact you soon.";
      status.style.color = "green";
      contactForm.reset();
    });
  }

 

// ------------------------------
// Image Gallery Function
// ------------------------------
function changePhoto() {
  const images = [
    './images/singleroom.jpg',
    './images/double.jpg',
    './images/family.jpg',
    './images/banner.jpg'
  ];

  const img = document.getElementById('gallery-image');
  const prev = document.querySelector('.photo-nav.prev');
  const next = document.querySelector('.photo-nav.next');

  if (!img) return;

  let index = images.indexOf(img.src);
  if (index === -1) index = 0;

  function show(i) {
    index = (i + images.length) % images.length;
    img.src = images[index];
    img.alt = `Photo ${index + 1} of ${images.length}`;
  }

  prev?.addEventListener('click', () => show(index - 1));
  next?.addEventListener('click', () => show(index + 1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
}
changePhoto();

// ------------------------------
// Footer Year
// ------------------------------
const fy = document.getElementById('footer-year');
if (fy) fy.textContent = new Date().getFullYear();



document.addEventListener("DOMContentLoaded", () => {

  let allRooms = [];

  fetch("http://localhost:5000/api/rooms")
    .then(res => res.json())
    .then(data => {
      allRooms = data;
      renderRooms(allRooms);
    })
    .catch(err => console.log(err));

  function renderRooms(list) {
    const container = document.querySelector(".room-grid");
    container.innerHTML = "";

    list.forEach(room => {
      container.innerHTML += `
        <div class="card" data-room="${room.type}">
            <img src="./images/${room.image}" alt="${room.type} Room">
            <h4>${room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room</h4>
            <div><span class="badge">${room.available > 0 ? room.available + " available" : "Sold Out"}</span></div>
            <div class="muted">${room.description || "Comfortable room"}</div>
            <div class="price">₹${room.price} / night</div>

            <div class="card-actions">
              ${
                room.available > 0 
                ? `<a class="btn btn-primary" href="book.html?room=${room.type}">Book</a>`
                : `<button class="btn btn-secondary" disabled style="opacity:.6;cursor:not-allowed;">Not Available</button>`
              }
              <a class="btn btn-secondary" href="room-details.html?room=${room.type}">More Details</a>
            </div>
        </div>
      `;
    });
  }

  // ✅ Search button → Show only available rooms
  document.getElementById("searchRooms").addEventListener("click", () => {
    const availableRooms = allRooms.filter(room => room.available > 0);
    renderRooms(availableRooms);
  });

   document.getElementById("searchRoom").addEventListener("click", () => {
    const availableRooms = allRooms.filter(room => room.available > 0);
    renderRooms(availableRooms);
  });

});
