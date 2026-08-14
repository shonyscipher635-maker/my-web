// Attach cart item details directly into the message box when clicked
const cartButtons = document.querySelectorAll('.add-to-cart-btn');
const messageBox = document.querySelector('textarea[name="message"]');

cartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    const title = card.querySelector('.product-title').textContent.trim();
    const price = card.querySelector('.current-price').textContent.trim();

    if (messageBox) {
      messageBox.value += `Inquiry for: ${title} (${price})\n`;
      
      // Smooth scroll to contact form
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
  });
});