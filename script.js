// ========================================
// VIP EXECUTIVE TRAVELS - JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize double-push FIRST to intercept clicks
    initDoublePushButtons(); 

    // Initialize all other components
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initHeroParticles();
    initI18n(); // Initialize language support
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
                entry.target.classList.add('aos-animate');
                // Optional: Stop observing if you want it to happen only once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observe elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        // Remove inline styles set by previous logic to let CSS handle it
        el.style.opacity = '';
        el.style.transform = '';
        el.style.transition = '';
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

// ========================================
// BACKGROUND VIDEO PLAYLIST
// ========================================
function initBackgroundVideo() {
    const container = document.querySelector('.scroll-video-container');
    const video = document.getElementById('scrollVideo');
    if (!video || !container) return;

    const playlist = [
        'mgv1.mp4',
        'mgv2.mp4'
    ];
    let currentVideoIndex = 0;

    // Create a second video element for seamless transitions
    const video2 = document.createElement('video');
    video2.className = 'scroll-video';
    video2.muted = true;
    video2.playsInline = true;
    video2.preload = 'metadata';
    video2.style.position = 'absolute';
    video2.style.top = '0';
    video2.style.left = '0';
    video2.style.width = '100%';
    video2.style.height = '100%';
    video2.style.objectFit = 'cover';
    video2.style.opacity = '0';
    video2.style.transition = 'opacity 0.5s ease';
    container.insertBefore(video2, container.querySelector('.video-overlay'));

    // Style the main video for transitions
    video.style.transition = 'opacity 0.5s ease';

    let activeVideo = video;
    let nextVideo = video2;

    function preloadNextVideo() {
        const nextIndex = (currentVideoIndex + 1) % playlist.length;
        nextVideo.src = playlist[nextIndex];
        nextVideo.load();
    }

    function playNextVideo() {
        // Set source and play current video
        activeVideo.src = playlist[currentVideoIndex];
        activeVideo.style.opacity = '1';

        const playPromise = activeVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented:", error);
            });
        }

        // Preload the next video
        preloadNextVideo();

        // Increment index
        currentVideoIndex = (currentVideoIndex + 1) % playlist.length;
    }

    function switchVideos() {
        // Fade out current, fade in next
        activeVideo.style.opacity = '0';
        nextVideo.style.opacity = '1';

        const playPromise = nextVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented:", error);
            });
        }

        // Swap references
        const temp = activeVideo;
        activeVideo = nextVideo;
        nextVideo = temp;

        // Preload next
        preloadNextVideo();

        // Increment index
        currentVideoIndex = (currentVideoIndex + 1) % playlist.length;
    }

    // When one video ends, switch to the preloaded one
    video.addEventListener('ended', switchVideos);
    video2.addEventListener('ended', switchVideos);

    // Remove loop attribute
    video.removeAttribute('loop');

    // Start playback only when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Initial play
                if (!activeVideo.src) {
                    playNextVideo();
                } else {
                    activeVideo.play().catch(e => console.log("Play failed:", e));
                }
            } else {
                // Pause when out of view to save resources
                activeVideo.pause();
                nextVideo.pause();
            }
        });
    }, { threshold: 0.1 });

    observer.observe(container);
}

// ========================================
// WORD BY WORD REVEAL
// ========================================
function initWordReveal() {
    const textElements = document.querySelectorAll('.about-text');

    textElements.forEach((el, index) => {
        // Skip if already processed or not the target ones (optional check)
        if (el.classList.contains('word-processed')) return;

        // Save original HTML (to keep bold tags etc if possible, but splitting text is tricky with HTML tags)
        // The user text has <strong> tags. Simple textContent split will kill HTML.
        // Complex approach: Walk nodes. 
        // Simpler approach: distinct words are usually text nodes.

        // Let's use a specialized recursive walker or just simple approach if formatting isn't critical.
        // formatting IS critical (<strong>).

        processNode(el);
        el.classList.add('word-processed');

        // Observer to trigger
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Calculate start delay based on previous requirements
                    // Header starts at 1000ms. 
                    // First paragraph starts at 1600ms.
                    // Second paragraph starts much later (e.g., 5000ms) to ensure the first one finishes.
                    let baseDelay = 1600;
                    if (index > 0) baseDelay = 3500;

                    const words = entry.target.querySelectorAll('.word-span');
                    words.forEach((word, i) => {
                        // Much slower reveal: 80ms per word instead of 30ms
                        word.style.animationDelay = `${baseDelay + (i * 80)}ms`;
                        word.classList.add('visible');
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(el);
    });
}

function processNode(node) {
    if (node.nodeType === 3) { // Text node
        const text = node.nodeValue;
        if (!text.trim()) return; // Skip empty text

        const words = text.split(/(\s+)/); // Split keeping delimiters to preserve spacing? or just standard split
        // standard split by space
        const wordsArray = text.split(' ');

        const fragment = document.createDocumentFragment();
        wordsArray.forEach((word, i) => {
            if (word.length === 0) return;
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.className = 'word-span';
            fragment.appendChild(span);
        });

        node.parentNode.replaceChild(fragment, node);
    } else if (node.nodeType === 1) { // Element node
        Array.from(node.childNodes).forEach(child => processNode(child));
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initBackgroundVideo();
    initWordReveal();
});

// ========================================
// MULTI-LANGUAGE SUPPORT (ES/EN)
// ========================================

const translations = {
    es: {
        "nav-service": "Servicio",
        "nav-amenities": "Amenidades",
        "nav-trips": "Viajes",
        "nav-quote": "Cotización",
        "nav-security": "Seguridad",
        "nav-contact": "Contacto",
        "hero-badge": "Servicio Premium",
        "hero-title-line": "Viajes Ejecutivos",
        "hero-subtitle": "Lujo, confort y seguridad en cada trayecto",
        "btn-quote": "Cotiza Tu Viaje",
        "btn-call": "Llamar Ahora",
        "hero-scroll": "Descubre más",
        "about-tag": "Experiencia Premium",
        "about-title": "Sobre Nuestro Servicio",
        "about-lead": "Somos un servicio exclusivo de <strong>Transporte Ejecutivo</strong> con base en Tehuacán, Puebla. Nos especializamos en brindar una experiencia de viaje excepcional para quienes demandan lo mejor.",
        "about-p2": "Cada trayecto está diseñado para ofrecerle el máximo confort, privacidad y seguridad. Nuestros vehículos de lujo cuentan con todas las amenidades que necesita para disfrutar su viaje, ya sea que se trate de negocios o placer.",
        "feature-security-title": "Seguridad Total",
        "feature-security-p": "Seguro de viajero incluido",
        "feature-punctuality-title": "Puntualidad",
        "feature-punctuality-p": "Llegamos siempre a tiempo",
        "feature-discretion-title": "Discreción",
        "feature-discretion-p": "Privacidad garantizada",
        "amenities-tag": "Comodidades a Bordo",
        "amenities-title": "Amenidades Premium",
        "amenities-desc": "Disfrute de una experiencia de viaje de primer nivel con todas las comodidades incluidas",
        "amenity-seats-title": "Asientos de Piel",
        "amenity-seats-p": "Confort supremo en cada kilómetro",
        "amenity-sunroof-title": "Quemacocos",
        "amenity-sunroof-p": "Vista panorámica del cielo",
        "amenity-wifi-title": "WiFi a Bordo",
        "amenity-wifi-p": "Conexión de alta velocidad",
        "amenity-snacks-title": "Snacks Incluidos",
        "amenity-snacks-p": "Refrigerios premium durante el viaje",
        "amenity-screens-title": "Pantallas HD",
        "amenity-screens-p": "En reposacabezas con internet",
        "amenity-ent-title": "Entretenimiento Completo",
        "amenity-ent-p": "Películas, Caricaturas, Conciertos & Youtube",
        "trips-tag": "Destinos",
        "trips-title": "Viajes Foráneos y Ejecutivos",
        "trips-city-title": "Viajes Fuera de la Ciudad",
        "trips-city-p": "Especialistas en traslados foráneos desde Tehuacán hacia cualquier destino. Aeropuertos, ciudades cercanas, eventos corporativos o familiares.",
        "trips-dest-title": "Múltiples Destinos",
        "trips-dest-p": "Planificamos rutas con paradas en diferentes puntos según sus necesidades. Un solo viaje, múltiples destinos, sin complicaciones.",
        "trips-round-title": "Viaje Redondo",
        "trips-round-p": "Servicio de ida y vuelta coordinado. Nos adaptamos a sus horarios y le esperamos el tiempo necesario.",
        "trips-map-caption": "Conectamos Tehuacán con todos los destinos",
        "quote-tag": "Proceso Simple",
        "quote-title": "Cómo Funciona la Cotización",
        "quote-desc": "Obtén tu cotización personalizada en minutos. Proceso 100% transparente.",
        "quote-step1-title": "Lugar de Salida",
        "quote-step1-p": "Indícanos desde dónde partes",
        "quote-step2-title": "Fecha y Hora",
        "quote-step2-p": "Cuándo necesitas el servicio",
        "quote-step3-title": "Destino Final",
        "quote-step3-p": "A dónde quieres llegar",
        "quote-step4-title": "Paradas Adicionales",
        "quote-step4-p": "¿Necesitas visitar varios puntos?",
        "quote-step5-title": "Regreso",
        "quote-step5-p": "Hora o día de retorno",
        "quote-message": "¿Listo para tu viaje ejecutivo?",
        "btn-quote-wa": "Cotizar por WhatsApp",
        "security-tag": "Tu Tranquilidad",
        "security-title": "Seguridad y Confianza",
        "sec-card1-title": "Verificación Vehicular",
        "sec-card1-p": "Vehículo con verificación <strong>00</strong>, garantizando las mejores condiciones mecánicas y ambientales.",
        "sec-card2-title": "Chofer Certificado",
        "sec-card2-p": "Conductor <strong>profesional y certificado</strong> con años de experiencia en transporte ejecutivo.",
        "sec-card3-title": "Seguro de Viajero",
        "sec-card3-p": "<strong>Seguro incluido</strong> en cada viaje. Tu protección es nuestra prioridad número uno.",
        "sec-card4-title": "Seguimiento GPS",
        "sec-card4-p": "<strong>Sistemas ADAS & DMS</strong> con monitoreo en tiempo real y detección de fatiga.",
        "trust-item1": "Puntualidad Garantizada",
        "trust-item2": "Atención Personalizada",
        "trust-item3": "Máxima Discreción",
        "contact-tag": "Contáctanos",
        "contact-title": "Cotiza Tu Viaje Ejecutivo Ahora",
        "contact-p1": "¿Listo para viajar con estilo?",
        "contact-p2": "Contáctanos ahora y recibe tu cotización personalizada en minutos. Sin compromisos.",
        "btn-contact-wa": "Cotizar por WhatsApp",
        "btn-contact-call": "Llamar Ahora",
        "btn-contact-fb": "Facebook",
        "btn-contact-save": "Guardar Contacto",
        "footer-rights": "&copy;2026 Elegance Travel. Todos los derechos reservados."
    },
    en: {
        "nav-service": "Service",
        "nav-amenities": "Amenities",
        "nav-trips": "Trips",
        "nav-quote": "Quote",
        "nav-security": "Security",
        "nav-contact": "Contact",
        "hero-badge": "Premium Service",
        "hero-title-line": "Executive Travel",
        "hero-subtitle": "Luxury, comfort and safety in every journey",
        "btn-quote": "Quote Your Trip",
        "btn-call": "Call Now",
        "hero-scroll": "Discover more",
        "about-tag": "Premium Experience",
        "about-title": "About Our Service",
        "about-lead": "We are an exclusive <strong>Executive Transportation</strong> service based in Tehuacán, Puebla. We specialize in providing an exceptional travel experience for those who demand the best.",
        "about-p2": "Each journey is designed to offer maximum comfort, privacy and safety. Our luxury vehicles have all the amenities you need to enjoy your trip, whether for business or pleasure.",
        "feature-security-title": "Total Safety",
        "feature-security-p": "Traveler insurance included",
        "feature-punctuality-title": "Punctuality",
        "feature-punctuality-p": "We always arrive on time",
        "feature-discretion-title": "Discretion",
        "feature-discretion-p": "Privacy guaranteed",
        "amenities-tag": "Amenities on Board",
        "amenities-title": "Premium Amenities",
        "amenities-desc": "Enjoy a top-tier travel experience with all amenities included",
        "amenity-seats-title": "Leather Seats",
        "amenity-seats-p": "Supreme comfort in every mile",
        "amenity-sunroof-title": "Sunroof",
        "amenity-sunroof-p": "Panoramic sky view",
        "amenity-wifi-title": "Onboard WiFi",
        "amenity-wifi-p": "High-speed connection",
        "amenity-snacks-title": "Snacks Included",
        "amenity-snacks-p": "Premium snacks during the journey",
        "amenity-screens-title": "HD Screens",
        "amenity-screens-p": "In headrests with internet",
        "amenity-ent-title": "Full Entertainment",
        "amenity-ent-p": "Movies, Cartoons, Concerts & Youtube",
        "trips-tag": "Destinations",
        "trips-title": "Foreign and Executive Trips",
        "trips-city-title": "Out-of-Town Trips",
        "trips-city-p": "Specialists in foreign transfers from Tehuacán to any destination. Airports, nearby cities, corporate or family events.",
        "trips-dest-title": "Multiple Destinations",
        "trips-dest-p": "We plan routes with stops at different points according to your needs. A single trip, multiple destinations, no complications.",
        "trips-round-title": "Round Trip",
        "trips-round-p": "Coordinated round-trip service. We adapt to your schedules and wait as long as necessary.",
        "trips-map-caption": "We connect Tehuacán with all destinations",
        "quote-tag": "Simple Process",
        "quote-title": "How Quotation Works",
        "quote-desc": "Get your personalized quote in minutes. 100% transparent process.",
        "quote-step1-title": "Starting Point",
        "quote-step1-p": "Tell us where you are leaving from",
        "quote-step2-title": "Date and Time",
        "quote-step2-p": "When you need the service",
        "quote-step3-title": "Final Destination",
        "quote-step3-p": "Where you want to go",
        "quote-step4-title": "Additional Stops",
        "quote-step4-p": "Do you need to visit several points?",
        "quote-step5-title": "Return",
        "quote-step5-p": "Return time or day",
        "quote-message": "Ready for your executive trip?",
        "btn-quote-wa": "Quote via WhatsApp",
        "security-tag": "Your Peace of Mind",
        "security-title": "Safety and Trust",
        "sec-card1-title": "Vehicle Verification",
        "sec-card1-p": "Vehicle with <strong>00</strong> verification, guaranteeing the best mechanical and environmental conditions.",
        "sec-card2-title": "Certified Driver",
        "sec-card2-p": "<strong>Professional and certified</strong> driver with years of experience in executive transportation.",
        "sec-card3-title": "Traveler Insurance",
        "sec-card3-p": "<strong>Insurance included</strong> in every trip. Your protection is our number one priority.",
        "sec-card4-title": "GPS Tracking",
        "sec-card4-p": "<strong>ADAS & DMS systems</strong> with real-time monitoring and fatigue detection.",
        "trust-item1": "Guaranteed Punctuality",
        "trust-item2": "Personalized Attention",
        "trust-item3": "Maximum Discretion",
        "contact-tag": "Contact Us",
        "contact-title": "Quote Your Executive Trip Now",
        "contact-p1": "Ready to travel with style?",
        "contact-p2": "Contact us now and receive your personalized quote in minutes. No commitments.",
        "btn-contact-wa": "Quote via WhatsApp",
        "btn-contact-call": "Call Now",
        "btn-contact-fb": "Facebook",
        "btn-contact-save": "Save Contact",
        "footer-rights": "&copy;2026 Elegance Travel. All rights reserved."
    }
};

function initI18n() {
    const langToggle = document.getElementById("langToggle");
    const langText = document.getElementById("langText");
    const htmlRoot = document.getElementById("html-root");

    // Check for saved language or default to ES
    let currentLang = localStorage.getItem("preferredLanguage") || "es";

    function updateContent(lang) {
        const elements = document.querySelectorAll("[data-i18n]");
        elements.forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Update toggle text and flag (show target language)
        if (langText && langToggle) {
            if (lang === "es") {
                langText.textContent = "EN";
                langToggle.classList.remove("lang-es");
                langToggle.classList.add("lang-en");
            } else {
                langText.textContent = "ES";
                langToggle.classList.remove("lang-en");
                langToggle.classList.add("lang-es");
            }
        }

        // Update html lang attribute
        if (htmlRoot) htmlRoot.setAttribute("lang", lang);

        // Save preference
        localStorage.setItem("preferredLanguage", lang);
        currentLang = lang;
    }

    // Initial update
    updateContent(currentLang);

    // Handle click
    if (langToggle) {
        langToggle.addEventListener("click", function () {
            const newLang = currentLang === "es" ? "en" : "es";
            updateContent(newLang);
        });
    }
}

// ========================================
// DOUBLE PUSH BUTTON LOGIC (Select then Act)
// ========================================
function initDoublePushButtons() {
    // Select all action buttons, navbar CTA, and security cards
    const buttons = document.querySelectorAll('.btn, .nav-cta, .security-card');

    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            // If the button is not selected yet
            if (!this.classList.contains('btn-selected')) {
                e.preventDefault(); // Stop the action
                e.stopImmediatePropagation(); // Prevent other listeners from running (like smooth scroll)
                
                // Unselect all other buttons
                buttons.forEach(b => b.classList.remove('btn-selected'));
                
                // Select this button
                this.classList.add('btn-selected');
            } else {
                // If it's already selected, this is the "second push"
                // For the "Save Contact" button, we handle it with JS
                if (this.id === 'btn-save-contact') {
                    e.preventDefault();
                    saveContact();
                }
                // For other buttons, let the default behavior happen (links, phone, etc.)
            }
        });
    });

    // Close selection if clicking elsewhere (outside any of these buttons)
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.btn') && !e.target.closest('.nav-link.nav-cta')) {
            const buttons = document.querySelectorAll('.btn, .nav-cta');
            buttons.forEach(b => b.classList.remove('btn-selected'));
        }
    });
}

function saveContact() {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Elegance Travel
ORG:Elegance Travel
NOTE:Viajes Ejecutivos
TEL;TYPE=WORK,VOICE:2381199898
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const newLink = document.createElement('a');
    newLink.download = 'Elegance_Travel.vcf';
    newLink.href = url;
    newLink.click();
    window.URL.revokeObjectURL(url);
}
