// Loader functionality
function initLoader() {
    const loaderContainer = document.querySelector('.loader-container');
    
    if (loaderContainer) {
        // Hide loader when page is fully loaded
        window.addEventListener('load', function() {
            setTimeout(() => {
                loaderContainer.classList.add('hidden');
                // Remove loader from DOM after animation completes
                setTimeout(() => {
                    if (loaderContainer.parentNode) {
                        loaderContainer.parentNode.removeChild(loaderContainer);
                    }
                }, 500);
            }, 1000); // Show loader for at least 1 second
        });
    }
}

// Initialize loader
initLoader();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded successfully');
    
    // Initialize all functionality
    initCalculator();
    initTabs();
});

// Calorie Calculator Functionality
function initCalculator() {
    const form = document.getElementById('calorieForm');
    const resultBox = document.getElementById('result');
    
    if (!form) {
        console.error('Calculator form not found!');
        return;
    }
    
    console.log('Calculator form found, adding event listener');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        try {
            // Get form values
            const age = parseInt(document.getElementById('age').value);
            const gender = document.getElementById('gender').value;
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value);
            const activity = parseFloat(document.getElementById('activity').value);
            
            console.log('Form values:', { age, gender, weight, height, activity });
            
            // Validate inputs
            if (!age || !gender || !weight || !height || !activity) {
                resultBox.textContent = 'Please fill in all fields';
                resultBox.style.color = '#ff6b6b';
                return;
            }
            
            if (age < 10 || age > 120) {
                resultBox.textContent = 'Please enter a valid age (10-120)';
                resultBox.style.color = '#ff6b6b';
                return;
            }
            
            if (weight < 30 || weight > 300) {
                resultBox.textContent = 'Please enter a valid weight (30-300 kg)';
                resultBox.style.color = '#ff6b6b';
                return;
            }
            
            if (height < 100 || height > 250) {
                resultBox.textContent = 'Please enter a valid height (100-250 cm)';
                resultBox.style.color = '#ff6b6b';
                return;
            }
            
            // Calculate BMR using Mifflin-St Jeor Equation
            let bmr;
            if (gender === 'male') {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            } else {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            }
            
            // Calculate total daily energy expenditure (TDEE)
            const tdee = Math.round(bmr * activity);
            
            console.log('Calculated values:', { bmr, tdee });
            
            // Display result
            resultBox.textContent = `Your daily calorie needs: ${tdee} kcal`;
            resultBox.style.color = '#51cf66';
            
        } catch (error) {
            console.error('Error in calculation:', error);
            resultBox.textContent = 'Error calculating calories. Please try again.';
            resultBox.style.color = '#ff6b6b';
        }
    });
}

// Tab Functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    console.log('Found tab buttons:', tabButtons.length);
    console.log('Found tab contents:', tabContents.length);
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            console.log('Tab clicked:', targetTab);
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                console.log('Showing tab content:', targetTab);
            } else {
                console.error('Tab content not found:', targetTab);
            }
        });
    });
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add loading animation to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn, .calculate-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add a small loading effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Form validation feedback
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = '#333';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value) {
                this.style.borderColor = '#3b82f6';
            }
        });
    });
}); 