document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. DYNAMIC CART BADGE & ADD TO CART LOGIC
  // ==========================================
  let cartCount = 0;

  // Dynamically add a Cart counter badge to the header
  const header = document.querySelector('header');
  const cartBadgeContainer = document.createElement('div');
  cartBadgeContainer.className = 'cart-counter-container';
  cartBadgeContainer.innerHTML = `
    <div style="position: relative; cursor: pointer; display: flex; align-items: center; gap: 8px; color: #fff; font-weight: bold;">
      <span style="font-size: 1.2rem;">🛒</span> Cart
      <span id="cart-count" style="background: #ff9900; color: #111; font-size: 0.8rem; font-weight: 800; border-radius: 50%; padding: 2px 7px; display: inline-block;">0</span>
    </div>
  `;
  header.appendChild(cartBadgeContainer);

  const cartCountEl = document.getElementById('cart-count');
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

  addToCartButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const title = card.querySelector('.product-title').textContent.trim();
      const price = card.querySelector('.current-price').textContent.trim();

      // Update cart count
      cartCount++;
      cartCountEl.textContent = cartCount;

      // Temporary button feedback
      const originalHTML = button.innerHTML;
      button.innerHTML = `✓ Added`;
      button.style.backgroundColor = '#2ea44f';
      button.style.color = '#fff';

      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.backgroundColor = '';
        button.style.color = '';
      }, 1200);

      console.log(`Added to Cart: ${title} - ${price}`);
    });
  });

  // ==========================================
  // 2. LIVE SEARCH FILTERING
  // ==========================================
  const searchInput = document.querySelector('.search-bar input');
  const searchBtn = document.querySelector('.search-bar button');
  const productCards = document.querySelectorAll('.product-card');

  function filterProducts() {
    const query = searchInput.value.toLowerCase().trim();

    productCards.forEach((card) => {
      const title = card.querySelector('.product-title').textContent.toLowerCase();
      
      // Show card if search term matches, otherwise hide
      if (title.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    // Check section visibility (hide empty section headers)
    const sections = document.querySelectorAll('.container .product-grid');
    sections.forEach((grid) => {
      const visibleCards = grid.querySelectorAll('.product-card[style*="display: flex"], .product-card:not([style*="display"])');
      const sectionHeader = grid.previousElementSibling;
      
      if (visibleCards.length === 0 && query !== '') {
        grid.style.display = 'none';
        if (sectionHeader && sectionHeader.classList.contains('section-title')) {
          sectionHeader.style.display = 'none';
        }
      } else {
        grid.style.display = 'grid';
        if (sectionHeader && sectionHeader.classList.contains('section-title')) {
          sectionHeader.style.display = 'flex';
        }
      }
    });
  }

  // Filter as user types
  searchInput.addEventListener('keyup', filterProducts);

  // Filter on Search button click
  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    filterProducts();
  });

  // ==========================================
  // 3. SMOOTH SCROLLING FOR HERO LINK
  // ==========================================
  const heroBtn = document.querySelector('.hero-btn');
  if (heroBtn) {
    heroBtn.addEventListener('click', (e) => {
      const targetId = heroBtn.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
});