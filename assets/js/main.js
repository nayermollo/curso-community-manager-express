// Countdown Timer
function updateCountdown() {
    // Set the target date to 24 hours from now
    const now = new Date();
    const target = new Date(now);
    target.setDate(target.getDate() + 1);

    const timeLeft = target - now;

    // Calculate remaining time
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Update the DOM
    try {
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } catch (error) {
        console.error('Error updating countdown:', error);
    }
}

// Video Modal HTML
const modalHTML = `
    <div id="videoModal" class="video-modal">
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            <div class="video-wrapper">
                <iframe width="560" height="315" 
                    src="about:blank" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    </div>
`;

// Initialize countdown and video modal
document.addEventListener('DOMContentLoaded', () => {
    // Append modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Video Modal Functionality
    const videoContainer = document.querySelector('.video-container');
    const modal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.close-modal');
    const iframe = modal.querySelector('iframe');
    const videoUrl = 'https://www.youtube.com/embed/YOUR_VIDEO_ID'; // Replace with actual video URL

    function openModal() {
        modal.style.display = 'flex';
        iframe.src = videoUrl;
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        iframe.src = 'about:blank';
        document.body.style.overflow = 'auto';
    }

    videoContainer.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        // Initially hide answers
        answer.style.display = 'none';
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';
            
            // Close all answers
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('p');
                otherAnswer.style.display = 'none';
                otherItem.classList.remove('active');
            });
            
            // Toggle clicked answer
            if (!isOpen) {
                answer.style.display = 'block';
                item.classList.add('active');
            }
        });
    });

    // CTA Button Click Tracking
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            try {
                // Facebook Pixel tracking
                if (typeof fbq === 'function') {
                    fbq('track', 'InitiateCheckout');
                }
                
                // Optional: Add custom analytics tracking here
                console.log('CTA button clicked');
            } catch (error) {
                console.error('Error tracking CTA click:', error);
            }
        });
    });
});

// Error handling for the entire page
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Global error:', {
        message: msg,
        url: url,
        lineNo: lineNo,
        columnNo: columnNo,
        error: error
    });
    return false;
};
