// Initialize Lenis Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// GSAP ScrollTrigger Integration with Lenis
gsap.registerPlugin(ScrollTrigger);

// Hero Text Reveal
// Use setTimeout to ensure SplitType runs after fonts are loaded, or use document.fonts.ready
document.fonts.ready.then(() => {
    const splitHeadline = new SplitType('.main-headline', { types: 'lines, words' });
    
    // Animate lines and words
    gsap.from(splitHeadline.words, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: 'power3.out',
        delay: 0.2
    });

    gsap.from('.pre-headline, .role', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1
    });

    gsap.from('.support-text, .btn-primary', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8,
        stagger: 0.2
    });

    gsap.from('.hero-img-bg', {
        scale: 1.05,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.4
    });
});

// Hero Parallax Image
gsap.to('.hero-img-bg', {
    yPercent: 15,
    ease: 'none',
    force3D: true,
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5 // Added smoothing (1.5 seconds) to make parallax fluid
    }
});

// Sticky Section & Mobile Adjustments via matchMedia
let mm = gsap.matchMedia();

mm.add("(min-width: 1025px)", () => {
    // Desktop: Pin the left side and fade pillars using active class
    ScrollTrigger.create({
        trigger: '.sticky-section',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.sticky-left',
    });

    const pillars = gsap.utils.toArray('.pillar');
    pillars.forEach(pillar => {
        ScrollTrigger.create({
            trigger: pillar,
            start: 'top center+=100',
            end: 'bottom center-=100',
            toggleClass: 'active'
        });
    });

    gsap.from('.sticky-left-content', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.sticky-section',
            start: 'top 70%'
        }
    });
});

mm.add("(max-width: 1024px)", () => {
    // Mobile: No pinning, just simple fade ups
    gsap.from('.sticky-left-content', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.sticky-left',
            start: 'top 80%'
        }
    });

    const pillars = gsap.utils.toArray('.pillar');
    pillars.forEach(pillar => {
        gsap.to(pillar, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: pillar,
                start: 'top 85%'
            }
        });
    });
});

// Closing Section Entrance Animation
gsap.from('.closing-headline, .closing-subheadline, .magnetic-wrapper', {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.closing-section',
        start: 'top 80%'
    }
});

// Magnetic Button
const magneticBtn = document.querySelector('.btn-magnetic');
const magneticWrapper = document.querySelector('.magnetic-wrapper');

if (magneticBtn && magneticWrapper) {
    magneticWrapper.addEventListener('mousemove', (e) => {
        const x = e.offsetX;
        const y = e.offsetY;
        const btnWidth = magneticWrapper.clientWidth;
        const btnHeight = magneticWrapper.clientHeight;
        const transX = (x - btnWidth / 2);
        const transY = (y - btnHeight / 2);
        
        gsap.to(magneticBtn, {
            x: transX * 0.2,
            y: transY * 0.2,
            scale: 1.05,
            duration: 0.8,
            ease: 'power3.out',
            backgroundColor: '#350f1a' // Darker bordeaux on hover
        });
    });

    magneticWrapper.addEventListener('mouseleave', () => {
        gsap.to(magneticBtn, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'elastic.out(1, 0.4)',
            backgroundColor: '#4A1525'
        });
    });
}
