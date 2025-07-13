// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const animatedElements = document.querySelectorAll('.section-title, .showcase-item, .about-text, .value-item, .contact-form');
    
    // Create a loader element
    createLoader();
    
    // Initialize page with a loader
    function createLoader() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        
        const loaderContent = document.createElement('div');
        loaderContent.className = 'loader-content';
        
        const logo = document.createElement('img');
        logo.src = 'images/logo.png';
        logo.alt = 'Mercedes-Benz Loading';
        
        loaderContent.appendChild(logo);
        loader.appendChild(loaderContent);
        document.body.appendChild(loader);
        
        // Remove loader after page loads
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    }
    
    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Check which section is currently in view
        checkSectionInView();
        
        // Animation on scroll
        animateOnScroll();
    });
    
    // Smooth scroll to sections when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active navigation item based on scroll position
    function checkSectionInView() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
            }
        });
    }
    
    // Animation on scroll using Intersection Observer API
    function animateOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                }
            });
        }, { threshold: 0.15 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Call animate on scroll initially to check for elements already in view
    animateOnScroll();
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Reset the form
                contactForm.reset();
                
                // Show success message
                submitButton.textContent = 'Message Sent!';
                
                // Reset button after a delay
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }, 2000);
            }, 1500);
        });
    }
    
    // Add scroll-triggered animations to showcase items with delay
    const showcaseItems = document.querySelectorAll('.showcase-item');
    showcaseItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
    });
    
    // Create parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroSection && heroBackground) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const parallaxEffect = scrollPosition * 0.4;
            
            heroBackground.style.transform = `translateY(${parallaxEffect}px)`;
        });
    }
    
    // Dynamic year for copyright in footer
    const copyrightYear = document.querySelector('.copyright p');
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.textContent = `© ${currentYear} Mercedes-Benz. All Rights Reserved.`;
    }
});
