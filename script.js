document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Highlight active nav item on scroll
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach((li) => {
            li.classList.remove("active");
            if (li.getAttribute("href").slice(1) === current) {
                li.classList.add("active");
            }
        });
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });

    // Add fade-in animation to elements as they come into view
    const fadeInElements = document.querySelectorAll('.fade-in');
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const fadeInObserver = new IntersectionObserver((entries, fadeInObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, fadeInOptions);

    fadeInElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // Animated text sequence
    const text1 = document.getElementById('text1');
    const text2 = document.getElementById('text2');
    const text3 = document.getElementById('text3').parentElement;
    const ctaContainer = document.querySelector('.cta-container');
    const logoContainer = document.querySelector('.logo-container');
    const backgroundShapes = document.querySelector('.background-shapes');

    function typeWriter(element, text, callback) {
        element.textContent = '';
        element.style.opacity = 1;
        element.classList.add('typing');
        
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 40); // Adjust this value to change typing speed
            } else {
                element.classList.remove('typing');
                if (callback) setTimeout(callback, 300);
            }
        }
        type();
    }

    function startTextAnimation() {
        typeWriter(text1, 'Öffentlichkeit.', () => {
            typeWriter(text2, 'Neu gedacht.', () => {
                text3.style.opacity = 1;
                ctaContainer.style.opacity = 1;
                logoContainer.style.opacity = 1;
                backgroundShapes.style.opacity = 1;
                
                setTimeout(() => {
                    text3.classList.add('appear');
                    ctaContainer.classList.add('appear');
                    logoContainer.classList.add('appear');
                }, 600);
            });
        });
    }

    // Start the animation sequence when the page loads
    startTextAnimation();

    // Animate background shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        shape.style.transition = 'transform 0.5s ease-in-out';
        setInterval(() => {
            const randomRotation = Math.random() * 30 - 15; // Random rotation between -15 and 15 degrees
            shape.style.transform = `rotate(${randomRotation}deg)`;
        }, 1500);
    });

    // Lottie animations
    const lottiePlayers = document.querySelectorAll('dotlottie-player');
    const lottieWrappers = document.querySelectorAll('.lottie-wrapper');

    lottiePlayers.forEach((player, index) => {
        const wrapper = lottieWrappers[index];
        let hasPlayed = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    wrapper.classList.add('appear');
                    if (index === 1) { // Second animation (index 1)
                        player.play();
                    } else if (!hasPlayed) { // First and third animations
                        player.play();
                        hasPlayed = true;
                    }
                } else if (index === 1) { // Pause second animation when not in view
                    player.pause();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(player);

        if (index !== 1) { // Only for first and third animations
            player.addEventListener('complete', () => {
                player.seek('99%');
                player.pause();
            });
        }
    });

    // Scroll-based animation for containers
    function animateOnScroll() {
        const slideContainers = document.querySelectorAll('.slide-container:not(#lottie-section .slide-container)');
        
        slideContainers.forEach(container => {
            const containerRect = container.getBoundingClientRect();
            const containerTop = containerRect.top;
            const windowHeight = window.innerHeight;
            
            // Start animation when the container is 40% visible
            const triggerPoint = windowHeight * 0.6;
            
            if (containerTop < triggerPoint) {
                container.classList.add('slide-in');
            } else {
                container.classList.remove('slide-in');
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);

    // Initial call to set positions
    animateOnScroll();

    // Advantage carousel
    const advantageCarousel = document.getElementById('advantage-carousel');
    const advantageList = document.querySelector('.advantage-list');
    const advantageItems = advantageList.querySelectorAll('.advantage-item');
    let currentAdvantageIndex = 0;

    function showNextAdvantage() {
        advantageItems[currentAdvantageIndex].style.display = 'none';
        currentAdvantageIndex = (currentAdvantageIndex + 1) % advantageItems.length;
        const nextAdvantage = advantageItems[currentAdvantageIndex];
        nextAdvantage.style.display = 'flex';
        advantageCarousel.querySelector('.advantage-text').textContent = nextAdvantage.textContent.trim();
        advantageCarousel.querySelector('.advantage-item').style.opacity = 0;
        setTimeout(() => {
            advantageCarousel.querySelector('.advantage-item').style.opacity = 1;
        }, 50);
    }

    // Initialize the carousel
    showNextAdvantage();
    setInterval(showNextAdvantage, 5000); // Change advantage every 5 seconds

    // Function to adjust Lottie player size


    // Call the function on load and resize
    window.addEventListener('load', adjustLottieSize);
    window.addEventListener('resize', adjustLottieSize);
});