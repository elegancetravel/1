// ========================================
// VIP EXECUTIVE TRAVELS - JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initHeroParticles();
});

// ========================================
// NAVBAR
// ========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleScroll() {
        const currentScroll = window.pageYOffset;

        // Add scrolled class when past hero
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    // Throttle scroll event
    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    // Toggle menu
    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Also observe sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Add animate-in styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    [data-aos][data-aos-delay="100"].animate-in { transition-delay: 0.1s; }
    [data-aos][data-aos-delay="200"].animate-in { transition-delay: 0.2s; }
    [data-aos][data-aos-delay="300"].animate-in { transition-delay: 0.3s; }
    [data-aos][data-aos-delay="400"].animate-in { transition-delay: 0.4s; }
    [data-aos][data-aos-delay="500"].animate-in { transition-delay: 0.5s; }
    [data-aos][data-aos-delay="600"].animate-in { transition-delay: 0.6s; }
`;
document.head.appendChild(style);

// ========================================
// HERO PARTICLES
// ========================================
function initHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    // Create floating particles
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');

    // Random properties
    const size = Math.random() * 4 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.3 + 0.1;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(135deg, rgba(201, 169, 98, ${opacity}), rgba(201, 169, 98, ${opacity * 0.5}));
        border-radius: 50%;
        left: ${posX}%;
        top: ${posY}%;
        pointer-events: none;
        animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
    `;

    container.appendChild(particle);
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.3;
        }
        25% {
            transform: translate(20px, -30px) rotate(90deg);
            opacity: 0.6;
        }
        50% {
            transform: translate(-10px, -60px) rotate(180deg);
            opacity: 0.3;
        }
        75% {
            transform: translate(30px, -30px) rotate(270deg);
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(particleStyle);

// ========================================
// ACTIVE SECTION HIGHLIGHT
// ========================================
function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        const scrollPos = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
}

// Initialize active section highlighting
document.addEventListener('DOMContentLoaded', initActiveSection);

// ========================================
// PRELOADER (Optional Enhancement)
// ========================================
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

// ========================================
// WHATSAPP BUTTON PULSE
// ========================================
function initWhatsAppPulse() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (!whatsappBtn) return;

    // Add subtle attention pulse every 5 seconds
    setInterval(() => {
        whatsappBtn.style.animation = 'whatsappPulse 0.6s ease';
        setTimeout(() => {
            whatsappBtn.style.animation = '';
        }, 600);
    }, 5000);
}

// Add WhatsApp pulse animation
const whatsappStyle = document.createElement('style');
whatsappStyle.textContent = `
    @keyframes whatsappPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(whatsappStyle);

document.addEventListener('DOMContentLoaded', initWhatsAppPulse);

// ========================================
// UTILITY: Detect Mobile
// ========================================
function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
}

// ========================================
// PERFORMANCE: Debounce
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// PERFORMANCE: Throttle
// ========================================
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// VIP LUXURY EFFECTS
// ========================================

// Initialize luxury effects
document.addEventListener('DOMContentLoaded', function () {
    initLuxuryEffects();
    initParallaxEffect();
    initMagneticButtons();
    initGoldSparkles();
    initScrollReveal();
    initCounterAnimation();
    initTiltEffect();
});

// ========================================
// LUXURY CURSOR TRAIL
// ========================================
function initLuxuryEffects() {
    // Only on desktop
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'luxury-cursor';
    document.body.appendChild(cursor);

    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'luxury-cursor-trail';
    document.body.appendChild(cursorTrail);

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .amenity-card, .trips-card, .security-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorTrail.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorTrail.classList.remove('cursor-hover');
        });
    });

    // Add cursor styles
    const cursorStyles = document.createElement('style');
    cursorStyles.textContent = `
        .luxury-cursor {
            position: fixed;
            width: 8px;
            height: 8px;
            background: linear-gradient(135deg, #c9a962, #d4b876);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease, width 0.2s ease, height 0.2s ease;
            mix-blend-mode: difference;
        }
        
        .luxury-cursor-trail {
            position: fixed;
            width: 30px;
            height: 30px;
            border: 1px solid rgba(201, 169, 98, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
        }
        
        .luxury-cursor.cursor-hover {
            width: 12px;
            height: 12px;
            background: #fff;
        }
        
        .luxury-cursor-trail.cursor-hover {
            width: 50px;
            height: 50px;
            border-color: rgba(201, 169, 98, 0.8);
        }
        
        @media (max-width: 768px) {
            .luxury-cursor, .luxury-cursor-trail {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(cursorStyles);
}

// ========================================
// PARALLAX EFFECT
// ========================================
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');

        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }
    });
}

// ========================================
// MAGNETIC BUTTONS
// ========================================
function initMagneticButtons() {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-gold, .nav-link.nav-cta');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ========================================
// GOLD SPARKLES
// ========================================
function initGoldSparkles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create sparkle container
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkle-container';
    sparkleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: 5;
    `;
    hero.appendChild(sparkleContainer);

    // Create sparkles periodically
    setInterval(() => {
        createSparkle(sparkleContainer);
    }, 300);
}

function createSparkle(container) {
    const sparkle = document.createElement('div');
    const size = Math.random() * 6 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;

    sparkle.innerHTML = '✦';
    sparkle.style.cssText = `
        position: absolute;
        left: ${posX}%;
        top: ${posY}%;
        font-size: ${size}px;
        color: #c9a962;
        opacity: 0;
        pointer-events: none;
        animation: sparkleAnim 2s ease-out forwards;
    `;

    container.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 2000);
}

// Add sparkle animation
const sparkleAnimStyle = document.createElement('style');
sparkleAnimStyle.textContent = `
    @keyframes sparkleAnim {
        0% { opacity: 0; transform: scale(0) rotate(0deg); }
        50% { opacity: 1; transform: scale(1) rotate(180deg); }
        100% { opacity: 0; transform: scale(0) rotate(360deg); }
    }
`;
document.head.appendChild(sparkleAnimStyle);

// ========================================
// SCROLL REVEAL
// ========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.amenity-card, .trips-card, .security-card, .contact-card, .feature-item, .timeline-item, .trust-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal-up');
        revealObserver.observe(el);
    });
}

// ========================================
// COUNTER ANIMATION
// ========================================
function initCounterAnimation() {
    const securityBadge = document.querySelector('.security-badge');
    if (!securityBadge) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counterObserver.observe(securityBadge);
}

function animateCounter(element) {
    const finalValue = element.textContent;
    element.textContent = '';

    let count = 0;
    const duration = 1500;
    const steps = 30;
    const increment = Math.ceil(parseInt(finalValue) / steps);

    const timer = setInterval(() => {
        count += increment;
        if (count >= parseInt(finalValue)) {
            element.textContent = finalValue;
            clearInterval(timer);
        } else {
            element.textContent = count.toString().padStart(2, '0');
        }
    }, duration / steps);
}

// ========================================
// 3D TILT EFFECT
// ========================================
function initTiltEffect() {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const tiltElements = document.querySelectorAll('.amenity-card, .security-card, .image-frame');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ========================================
// TEXT TYPING EFFECT (for hero subtitle)
// ========================================
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';

    let index = 0;

    function type() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }

    // Start after hero animation
    setTimeout(type, 1500);
}

// ========================================
// LUXURY LOADING ANIMATION
// ========================================
function initLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'luxury-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">✦</div>
            <div class="loader-text">ELEGANCE TRAVEL</div>
            <div class="loader-bar"><div class="loader-progress"></div></div>
        </div>
    `;
    document.body.appendChild(loader);

    const loaderStyles = document.createElement('style');
    loaderStyles.textContent = `
        .luxury-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0a0a;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        .luxury-loader.loaded {
            opacity: 0;
            visibility: hidden;
        }
        
        .loader-content {
            text-align: center;
        }
        
        .loader-logo {
            font-size: 3rem;
            color: #c9a962;
            margin-bottom: 1rem;
            animation: loaderPulse 1s ease-in-out infinite;
        }
        
        .loader-text {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.5rem;
            letter-spacing: 4px;
            background: linear-gradient(120deg, #c9a962, #d4b876, #fff8dc, #d4b876, #c9a962);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 2s ease-in-out infinite;
            margin-bottom: 2rem;
        }
        
        .loader-bar {
            width: 200px;
            height: 2px;
            background: rgba(201, 169, 98, 0.2);
            border-radius: 2px;
            overflow: hidden;
            margin: 0 auto;
        }
        
        .loader-progress {
            width: 0%;
            height: 100%;
            background: linear-gradient(90deg, #c9a962, #d4b876);
            animation: loaderProgress 1.5s ease forwards;
        }
        
        @keyframes loaderPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        @keyframes loaderProgress {
            0% { width: 0%; }
            100% { width: 100%; }
        }
    `;
    document.head.appendChild(loaderStyles);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('loaded');
            setTimeout(() => loader.remove(), 500);
        }, 1500);
    });
}

// Initialize loader on page load
initLoadingAnimation();

// ========================================
// FLOATING ACTION ANIMATION
// ========================================
function initFloatingActions() {
    const floatingElements = document.querySelectorAll('.hero-badge, .pin-icon, .amenity-icon');

    floatingElements.forEach((el, index) => {
        el.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
    });
}

document.addEventListener('DOMContentLoaded', initFloatingActions);

// Add float animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(floatStyle);
