// assets/pickup-availability.js
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('[data-store-availability-container]');
  if (!container) return;

  const renderPickupAvailability = (variantId) => {
    fetch(`${window.Shopify.routes.root}variants/${variantId}/?section_id=pickup-availability`)
      .then(response => response.text())
      .then(html => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const section = doc.querySelector('.shopify-section');
        if (section) {
          container.innerHTML = '';
          container.appendChild(section);
        }
      })
      .catch(error => console.error('Error loading pickup availability:', error));
  };

  const variantId = container.dataset.productVariantId;
  if (variantId) {
    renderPickupAvailability(variantId);
  }

  document.addEventListener('change', (event) => {
    if (event.target.name === 'id') {
      renderPickupAvailability(event.target.value);
    }
  });
});
