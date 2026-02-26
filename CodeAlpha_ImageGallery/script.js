const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const filterButtons = document.querySelectorAll(".filters button");

let currentIndex = 0;
let images = [];

/* Lightbox Open */
galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        images = Array.from(document.querySelectorAll(".gallery-item img"))
            .filter(img => img.parentElement.style.display !== "none");

        currentIndex = images.indexOf(item.querySelector("img"));
        lightboxImg.src = images[currentIndex].src;
        lightbox.style.display = "flex";
    });
});

/* Close */
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

/* Next */
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
});

/* Prev */
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
});

/* Keyboard Support */
document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "Escape") closeBtn.click();
    }
});

/* Filtering */
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.category;

        galleryItems.forEach(item => {
            if (category === "all" || item.classList.contains(category)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});