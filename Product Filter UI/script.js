const products = [
    {
    id: 1,
    name: "Diamond Pearl Necklace",
    category: "Jewellery",
    price: 120,
    oldPrice: 160,
    rating: 4.9,
    reviews: 248,
    badge: "hot",
    image: "https://pcchandraindia.com/cdn/shop/files/18KT00737R_1_383x@3x.progressive.png?v=1719394140",
    desc: "Elegant pearl necklace with diamond finish for premium occasions.",
    bg: "bg-jewellery"
  },

  {
    id: 2,
    name: "Organic Matcha Tea",
    category: "Food",
    price: 22,
    oldPrice: 30,
    rating: 4.8,
    reviews: 342,
    image: "https://png.pngtree.com/png-clipart/20250104/original/pngtree-organic-matcha-powder-for-tea-and-health-png-image_19331685.png",
    badge: "new",
    desc: "Premium organic Japanese matcha tea with rich earthy flavour.",
    bg: "bg-food"
  },

  {
    id: 3,
    name: "Rose Gold Bracelet",
    category: "Jewellery",
    price: 85,
    oldPrice: 110,
    rating: 4.7,
    reviews: 156,
    badge: "sale",
    image: "https://seraphicdiamonds.com/wp-content/uploads/2023/04/0012-9.png",
    desc: "Luxury rose-gold bracelet crafted with modern minimal design.",
    bg: "bg-jewellery"
  },

  {
    id: 4,
    name: "Classic Denim Jacket",
    category: "Fashion",
    price: 90,
    oldPrice: 120,
    rating: 4.8,
    reviews: 274,
    badge: "new",
    image: "https://static.vecteezy.com/system/resources/previews/065/331/344/non_2x/full-shot-of-a-classic-denim-jacket-free-png.png",
    desc: "Vintage-inspired blue denim jacket with modern streetwear style.",
    bg: "bg-fashion"
  },

  {
    id: 5,
    name: "Smart Fitness Watch",
    category: "Electronic",
    price: 210,
    oldPrice: 260,
    rating: 4.8,
    reviews: 389,
    badge: "sale",
    image: "https://www.okfurniture.co.za/media/catalog/product/cache/6ff26a5849409caeba3f2ecbfd14d92c/2/1/216577_chroma_volkano_chroma_bk_main_pic.png",
    desc: "Advanced smartwatch with health tracking and AMOLED display.",
    bg: "bg-electronic"
  },

  {
    id: 6,
    name: "Chocolate Lava Cookies",
    category: "Food",
    price: 18,
    oldPrice: 25,
    rating: 4.6,
    reviews: 198,
    badge: "hot",
    image: "https://png.pngtree.com/png-vector/20231226/ourmid/pngtree-yummy-chocolate-chip-cookies-stack-png-image_11382682.png",
    desc: "Soft baked cookies filled with rich molten chocolate center.",
    bg: "bg-food"
  },

  {
    id: 7,
    name: "Oversized Hoodie",
    category: "Fashion",
    price: 55,
    oldPrice: 75,
    rating: 4.7,
    reviews: 421,
    badge: "sale",
    image: "https://www.thetoonreview.com/cdn/shop/files/mockup-5b8a410e44bca7fec02d9392df8ab082.png?v=1745187499&width=1445",
    desc: "Trendy oversized hoodie made with ultra-soft premium cotton.",
    bg: "bg-fashion"
  },

  {
    id: 8,
    name: "Wireless Headphones",
    category: "Electronic",
    price: 140,
    oldPrice: 180,
    rating: 4.9,
    reviews: 512,
    badge: "hot",
    image: "https://www.boat-lifestyle.com/cdn/shop/products/main2_b66dce6b-710d-49cb-9d1c-2bc8c9c0ab15_600x.png?v=1645698328",
    desc: "Noise-cancelling wireless headphones with immersive sound quality.",
    bg: "bg-electronic"
  },
];
 
let liked = new Set();
let activeCategory = 'all';
let searchQuery = '';
let sortMode = 'default';
 
const grid = document.getElementById('productGrid');
const countEl = document.getElementById('resultCount');
 
function getFiltered() {
  let data = [...products];
  if (activeCategory !== 'all') data = data.filter(p => p.category === activeCategory);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    data = data.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q)
    );
  }
  switch (sortMode) {
    case 'price-asc':  data.sort((a,b) => a.price - b.price); break;
    case 'price-desc': data.sort((a,b) => b.price - a.price); break;
    case 'rating':     data.sort((a,b) => b.rating - a.rating); break;
    case 'name':       data.sort((a,b) => a.name.localeCompare(b.name)); break;
  }
  return data;
}
 
function stars(r) {
  const full = Math.floor(r);
  const half = r % 1 >= 0.5 ? 1 : 0;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
}
 
function renderCard(p, idx) {
  const isLiked = liked.has(p.id);
  const badgeHTML = p.badge ? `<span class="card-badge badge-${p.badge}">${p.badge}</span>` : '';
  const oldPriceHTML = p.oldPrice ? `<span class="price-old">$${p.oldPrice}</span>` : '';
  return `
    <div class="product-card" style="animation-delay:${idx * 0.05}s">
      <div class="card-image ${p.bg}">
        ${badgeHTML}
        <img src="${p.image}" alt="${p.name}" class="product-img">
        <button class="card-fav ${isLiked ? 'liked' : ''}" data-id="${p.id}" title="Favourite">
          ${isLiked ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="card-body">
        <p class="card-category">${p.category}</p>
        <h3 class="card-name">${p.name}</h3>
        <p class="card-desc">${p.desc}</p>
        <div class="card-footer">
          <div class="price-wrap">
            <span class="price">$${p.price}</span>
            ${oldPriceHTML}
          </div>
          <div class="rating">
            ${stars(p.rating)}
            <span>(${p.reviews})</span>
          </div>
        </div>
        <button class="card-btn">Add to Basket</button>
      </div>
    </div>`;
}
 
function render() {
  const data = getFiltered();
  countEl.textContent = data.length;
  if (data.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-fish">🐟</div>
        <h3>No products found</h3>
        <p>Try a different category or search term</p>
      </div>`;
    return;
  }
  grid.innerHTML = data.map((p,i) => renderCard(p,i)).join('');
  grid.querySelectorAll('.card-fav').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = +btn.dataset.id;
      liked.has(id) ? liked.delete(id) : liked.add(id);
      render();
    });
  });
  grid.querySelectorAll('.card-btn').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      btn.textContent = '✓ Added!';
      btn.style.background = '#27AE60';
      btn.style.borderColor = '#27AE60';
      btn.style.color = 'white';
      setTimeout(() => {
        btn.textContent = 'Add to Basket';
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
      }, 1500);
    });
  });
}
 
document.getElementById('searchInput').addEventListener('input', e => {
  searchQuery = e.target.value;
  render();
});
 
document.getElementById('categories').addEventListener('click', e => {
  if (!e.target.classList.contains('cat-btn')) return;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  activeCategory = e.target.dataset.cat;
  render();
});
 
document.getElementById('sortSelect').addEventListener('change', e => {
  sortMode = e.target.value;
  render();
});
 
render();