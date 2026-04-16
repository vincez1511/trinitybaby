class Flipbook {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentPage = 0;
        this.isAnimating = false;

        this.images = [
            "pictures/meandtrinity.png",
            "pictures/loveletter.png",
            "pictures/meandtrinity2.png",
            "pictures/loveletter2.png",
            "pictures/meandtrinity3.png",
            "pictures/loveletter3.png",
        ];

        this.pageCount = this.images.length;

        this.init();
    }

    init() {
        this.createPages();
        this.updateDisplay();
        this.addEvents();
    }

    createPages() {
        this.container.innerHTML = "";

        this.images.forEach((src, i) => {
            const page = document.createElement("div");
            page.className = "page";
            page.style.zIndex = this.pageCount - i;

            page.innerHTML = `<img src="${src}" class="page-img">`;

            this.container.appendChild(page);
        });
    }

    lockAnimation(duration = 900) {
        this.isAnimating = true;
        setTimeout(() => {
            this.isAnimating = false;
        }, duration);
    }

    updateDisplay() {
        const pages = this.container.querySelectorAll(".page");

        pages.forEach((page, i) => {
            page.classList.remove("flipped", "left", "right");

            if (i < this.currentPage) {
                page.classList.add("flipped");
            } 
            else if (i === this.currentPage) {
                page.classList.add("left");
            } 
            else {
                page.classList.add("right");
            }
        });
    }

    nextPage() {
        if (this.isAnimating) return;
        if (this.currentPage >= this.pageCount) return;

        this.lockAnimation();

        this.currentPage++;
        this.updateDisplay();
    }

    prevPage() {
        if (this.isAnimating) return;
        if (this.currentPage <= 0) return;

        this.lockAnimation();

        this.currentPage--;
        this.updateDisplay();
    }

    reset() {
        if (this.isAnimating) return;

        this.currentPage = 0;
        this.updateDisplay();
    }

    addEvents() {
        let startX = 0;

        // TOUCH (mobile fix)
        this.container.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        this.container.addEventListener("touchend", (e) => {
            if (this.isAnimating) return;

            let diff = startX - e.changedTouches[0].clientX;

            if (diff > 50) this.nextPage();
            else if (diff < -50) this.prevPage();
        }, { passive: true });

        // OPTIONAL: click support (desktop fallback)
        this.container.addEventListener("click", (e) => {
            if (this.isAnimating) return;

            const rect = this.container.getBoundingClientRect();
            const x = e.clientX - rect.left;

            if (x > rect.width / 2) this.nextPage();
            else this.prevPage();
        });
    }
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
    window.flipbook = new Flipbook("flipbook");
});

/* CONTROLS */
function nextPage() { flipbook.nextPage(); }
function prevPage() { flipbook.prevPage(); }
function resetBook() { flipbook.reset(); }
