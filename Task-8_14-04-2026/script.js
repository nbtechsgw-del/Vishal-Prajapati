const header = document.getElementById("header");
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  toggle.classList.toggle("open");
});

const propertyGrid = document.getElementById("property-grid");
let properties = [
  {
    title: "Modern Family House",
    location: "Mumbai, India",
    price: "₹45L",
    beds: 3,
    baths: 2,
    size: "1200 sqft",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  },
  {
    title: "Luxury Villa",
    location: "Pune, India",
    price: "₹75L",
    beds: 4,
    baths: 3,
    size: "2500 sqft",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  },
  {
    title: "Cozy Apartment",
    location: "Bangalore, India",
    price: "₹30L",
    beds: 2,
    baths: 1,
    size: "900 sqft",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
  },
  {
    title: "Beachside Bungalow",
    location: "Goa, India",
    price: "₹90L",
    beds: 4,
    baths: 3,
    size: "2200 sqft",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  {
    title: "City Studio Flat",
    location: "Delhi, India",
    price: "₹25L",
    beds: 1,
    baths: 1,
    size: "600 sqft",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
  },
  {
    title: "Penthouse Suite",
    location: "Hyderabad, India",
    price: "₹1.2Cr",
    beds: 5,
    baths: 4,
    size: "3500 sqft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Suburban Home",
    location: "Nagpur, India",
    price: "₹40L",
    beds: 3,
    baths: 2,
    size: "1400 sqft",
    image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126",
  },
  {
    title: "Lake View Villa",
    location: "Udaipur, India",
    price: "₹85L",
    beds: 4,
    baths: 3,
    size: "2600 sqft",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  },
  {
    title: "Compact Budget Home",
    location: "Indore, India",
    price: "₹20L",
    beds: 2,
    baths: 1,
    size: "800 sqft",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  },
  {
    title: "Luxury Farmhouse",
    location: "Chandigarh, India",
    price: "₹1.5Cr",
    beds: 5,
    baths: 4,
    size: "4000 sqft",
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
  },
  {
    title: "Modern Duplex",
    location: "Ahmedabad, India",
    price: "₹60L",
    beds: 3,
    baths: 3,
    size: "1800 sqft",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
  },
  {
    title: "Hill View Cottage",
    location: "Manali, India",
    price: "₹55L",
    beds: 2,
    baths: 2,
    size: "1100 sqft",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607",
  },
];

function renderProperties(list) {
  if (!list.length) {
    propertyGrid.innerHTML =
      "<p style='text-align:center;'>No properties found</p>";
    return;
  }

  let html = "";

  list.forEach((p, i) => {
    html += `
      <div class="card" onclick="openDetails(${i})">
        <div class="card-img">
          <img src="${p.image}" alt="">
          <span class="price">${p.price}</span>
        </div>
        <div class="card-content">
          <h3>${p.title}</h3>
          <p>${p.location}</p>
          <div class="details">
            <span>🛏 ${p.beds}</span>
            <span>🛁 ${p.baths}</span>
            <span>📐 ${p.size}</span>
          </div>
        </div>
      </div>
    `;
  });

  propertyGrid.innerHTML = html;
}

function loadInitialCards() {
  const expanded = [];

  for (let i = 0; i < 12; i++) {
    expanded.push(properties[i % properties.length]);
  }

  renderProperties(expanded);
}

function openDetails(index) {
  const p = properties[index % properties.length];

  alert(`
Property: ${p.title}
Location: ${p.location}
Price: ${p.price}
Beds: ${p.beds}
Baths: ${p.baths}
Size: ${p.size}
  `);
}

function filterProperties() {
  const value = document.getElementById("searchInput").value.toLowerCase();

  const filtered = properties.filter((p) =>
    p.location.toLowerCase().includes(value),
  );

  renderProperties(filtered);
}

async function loadPropertiesFromAPI() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    const apiData = data.products.slice(0, 12).map((p) => ({
      title: p.title,
      location: p.brand,
      price: `$${p.price}`,
      beds: Math.floor(Math.random() * 5) + 1,
      baths: Math.floor(Math.random() * 3) + 1,
      size: `${Math.floor(Math.random() * 2000) + 500} sqft`,
      image: p.thumbnail,
    }));

    properties = apiData;
    renderProperties(properties);
  } catch (err) {
    console.error("API failed:", err);
  }
}

loadInitialCards();
