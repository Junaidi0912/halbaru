// Parallax effect
document.addEventListener('mousemove', function(e){
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  document.querySelector('.layer1').style.transform = `translate(${x*20}px,${y*12}px)`;
  document.querySelector('.layer2').style.transform = `translate(${x*50}px,${y*24}px) scale(1.02)`;
  document.querySelector('.layer3').style.transform = `translate(${x*70}px,${y*30}px) scale(1.03)`;
});

// Produk Dummy
const products = [
  {
    name: "Kaos Animasi Seru",
    desc: "Kaos dengan desain animasi modern, nyaman dipakai sehari-hari.",
    price: "Rp120.000",
    img: "https://images.unsplash.com/photo-1503342452485-86a097568a0c?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Jam Dinding Keren",
    desc: "Jam dinding dengan efek glowing dan animasi LED.",
    price: "Rp250.000",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Botol Minum Unik",
    desc: "Botol minum dengan animasi warna-warni ketika digoyang.",
    price: "Rp75.000",
    img: "https://images.unsplash.com/photo-1519864600546-3f7e3e5f8a8c?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Lampu Tidur RGB",
    desc: "Lampu tidur dengan animasi warna RGB otomatis.",
    price: "Rp180.000",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Mouse Wireless Gaming",
    desc: "Mouse gaming dengan animasi LED dan DPI tinggi.",
    price: "Rp320.000",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Headset Musik Bass",
    desc: "Headset musik dengan animasi lampu dan bass kuat.",
    price: "Rp290.000",
    img: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=400&q=80"
  }
];

// Render Produk dengan animasi masuk
const productList = document.querySelector('.product-list');
products.forEach((prod, idx) => {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${prod.img}" alt="${prod.name}" />
    <h3>${prod.name}</h3>
    <p>${prod.desc}</p>
    <div class="price">${prod.price}</div>
    <button data-idx="${idx}">Tambah ke Keranjang</button>
  `;
  productList.appendChild(card);
});

// Show cards with animation on scroll
function animateOnScroll() {
  document.querySelectorAll('.product-card').forEach(card => {
    const rect = card.getBoundingClientRect();
    if(rect.top < window.innerHeight - 20) {
      card.classList.add('visible');
    } else {
      card.classList.remove('visible');
    }
  });
  document.querySelectorAll('.testi-card').forEach(card => {
    const rect = card.getBoundingClientRect();
    if(rect.top < window.innerHeight - 20) {
      card.classList.add('visible');
    } else {
      card.classList.remove('visible');
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
animateOnScroll();

// Keranjang Belanja Interaktif
let cart = [];
const cartCount = document.getElementById('cartCount');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const closeCart = document.getElementById('closeCart');

productList.addEventListener('click', function(e) {
  if(e.target.tagName === 'BUTTON') {
    const idx = e.target.getAttribute('data-idx');
    cart.push(products[idx]);
    cartCount.textContent = cart.length;
    showCartAnim();
  }
});

cartBtn.addEventListener('click', function() {
  renderCart();
  cartModal.classList.add('active');
});

closeCart.addEventListener('click', function() {
  cartModal.classList.remove('active');
});

function renderCart() {
  cartItems.innerHTML = '';
  if(cart.length === 0) {
    cartItems.innerHTML = '<li>Keranjang kosong.</li>';
    return;
  }
  cart.forEach((item, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${item.name}</strong> - <em>${item.price}</em>
      <button style="margin-left:16px;background:#ff6f61;border:none;color:#fff;border-radius:6px;cursor:pointer;" data-remove="${i}">Hapus</button>
    `;
    cartItems.appendChild(li);
  });
}

cartItems.addEventListener('click', function(e) {
  if(e.target.hasAttribute('data-remove')) {
    const idx = e.target.getAttribute('data-remove');
    cart.splice(idx,1);
    cartCount.textContent = cart.length;
    renderCart();
  }
});

function showCartAnim() {
  cartBtn.classList.add('cart-anim');
  setTimeout(() => cartBtn.classList.remove('cart-anim'), 600);
}

// Smooth scroll untuk navigasi
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({behavior: 'smooth'});
  });
});

// Animasi bubble pada hero
document.querySelectorAll('.bubble').forEach(bubble => {
  bubble.addEventListener('animationiteration', () => {
    bubble.style.left = (Math.random()*80+10)+"%";
    bubble.style.width = (Math.random()*60+40)+"px";
    bubble.style.height = bubble.style.width;
  });
});

// Form kontak submit dummy
document.querySelector('.contact-form').addEventListener('submit', function(e){
  e.preventDefault();
  alert("Pesan anda telah dikirim! Terima kasih telah menghubungi kami.");
  this.reset();
});