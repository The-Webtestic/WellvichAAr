// let menubar = document.querySelector('#menu-bars');
// let navbar  = document.querySelector('.navbar');

// menubar.onclick = () =>{
//     menubar.classList.toggle('fa-times');
//     navbar.classList.toggle('active')
// }

document.addEventListener("DOMContentLoaded", () => {
    
    const toggleButton = document.getElementById("navbar-toggle");
    const navbarLinks = document.getElementById("navbar-links");
    

    toggleButton.addEventListener("click", () => {
        navbarLinks.classList.toggle("active");
    });
   
});


function toggleText() {
    const extraText = document.querySelector('.extra-text');
    const button = document.querySelector('.show-more');
    if (extraText.style.display === 'block') {
        extraText.style.display = 'none';
        button.textContent = 'Know More';
    } else {
        extraText.style.display = 'block';
        button.textContent = 'Show Less';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var buttons = document.querySelectorAll(".knowMoreButton");
    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            var targetId = button.getAttribute("data-target");
            var content = document.getElementById(targetId);
            if (content.style.display === "none" || content.style.display === "") {
                content.style.display = "block";
            } else {
                content.style.display = "none";
            }
        });
    });
});

const initSlider = (slider) => {
    const imageList = slider.querySelector(".image-list");
    const slideButtons = slider.querySelectorAll(".slide-button");
    const sliderScrollbar = slider.querySelector(".slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    
    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
        
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }

    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });

    handleSlideButtons(); // Initialize button visibility
}

document.querySelectorAll(".slider-container").forEach(initSlider);

window.addEventListener("resize", () => {
    document.querySelectorAll(".slider-container").forEach(initSlider);
});
