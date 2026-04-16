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

        this.images.forEach((src) => {
            const page = document.createElement("div");
            page.className = "page";

            page.innerHTML = `<img src="${src}" class="page-img">`;

            this.container.appendChild(page);
        });
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
        if (this.currentPage < this.pageCount - 1) {
            this.currentPage++;
            this.updateDisplay();
        }
    }

    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.updateDisplay();
        }
    }

    reset() {
        this.currentPage = 0;
        this.updateDisplay();
    }

    addEvents() {
        let startX = 0;

        this.container.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
        });

        this.container.addEventListener("touchend", e => {
            let diff = startX - e.changedTouches[0].clientX;

            if (diff > 50) this.nextPage();
            if (diff < -50) this.prevPage();
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