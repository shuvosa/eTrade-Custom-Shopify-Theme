// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '☰';
    
    const header = document.querySelector('.header');
    header.insertBefore(mobileMenuToggle, header.firstChild);
    
    mobileMenuToggle.addEventListener('click', () => {
        document.querySelector('.main-menu').classList.toggle('active');
    });

    // Close menu on click outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
            document.querySelector('.main-menu').classList.remove('active');
        }
    });

    // Cart counter update
    document.addEventListener('ajax:cart:updated', () => {
        fetch('/cart.js')
            .then(response => response.json())
            .then(cart => {
                document.querySelectorAll('.cart-link').forEach(link => {
                    link.textContent = `Cart (${cart.item_count})`;
                });
            });
    });
});


$(document).ready(function() {
    

    // Initialize category slider
    $('.category-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: $('.category-prev'),
        nextArrow: $('.category-next'),
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Initialize product slider
    $('.product-slider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // Mobile menu toggle
    $('#mobile-menu-button').click(function() {
        $('#mobile-menu').toggleClass('active');
    });

    // Mobile submenu toggle
    $('.mobile-submenu-trigger').click(function(e) {
        e.preventDefault();
        $(this).next('.submenu').toggleClass('active');
    });


    

    // Search functionality
    $('#search-trigger').click(function() {
        $('.search-overlay').addClass('active');
        $('#search-input').focus();
    });

    $('#close-search').click(function() {
        $('.search-overlay').removeClass('active');
    });

    $('#search-input').on('input', function() {
        const query = $(this).val();
        if (query.length > 2) {
            $.ajax({
                url: '/search/suggest.json',
                method: 'GET',
                data: { q: query, resources: { type: 'product', limit: 5 } },
                success: function(data) {
                    const results = data.resources.results.products;
                    let resultsHtml = '';
                    results.forEach(product => {
                        resultsHtml += `
                            <div class="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer">
                                <div class="flex items-center">
                                    <img src="${product.featured_image.url}" alt="${product.title}" class="w-12 h-12 object-cover rounded">
                                    <div class="ml-3">
                                        <div class="font-medium">${product.title}</div>
                                        <div class="text-sm text-gray-600">${product.price}</div>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    $('#search-results').html(resultsHtml).removeClass('hidden');
                },
                error: function() {
                    $('#search-results').html('<p class="text-gray-600">No results found.</p>').removeClass('hidden');
                }
            });
        } else {
            $('#search-results').addClass('hidden');
        }
    });
    
 // Close search results on click outside

    // Cart drawer functionality
    $('#cart-trigger').click(function() {
        $('.cart-drawer, .cart-overlay').addClass('active');
    });

    $('#close-cart, .cart-overlay').click(function() {
        $('.cart-drawer, .cart-overlay').removeClass('active');
    });

    // Countdown timer
    function updateTimer() {
        const end = new Date('2024-12-31T23:59:59').getTime();
        const now = new Date().getTime();
        const distance = end - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        $('#days').text(days);
        $('#hours').text(hours);
        $('#minutes').text(minutes);
        $('#seconds').text(seconds);
    }

    setInterval(updateTimer, 1000);
    updateTimer();
});



//for customer login template 

function toggleRecoverForm() {
    document.getElementById('RecoverPasswordForm').classList.toggle('hidden');
    document.getElementById('RecoverPassword').classList.toggle('hidden');
}

if (window.location.hash === '#recover') {
    toggleRecoverForm();
}

//end of customer login template

//for country and currency selector

document.addEventListener('DOMContentLoaded', function() {
    // Handle localization form submissions
    document.querySelectorAll('form[class$="-form"]').forEach(form => {
      form.addEventListener('change', function(e) {
        if (e.target.tagName === 'SELECT') {
          // Submit the form when selection changes
          this.submit();
        }
      });
    });
  });
//end of country and currency selector