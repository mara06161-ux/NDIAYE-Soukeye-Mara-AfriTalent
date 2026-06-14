document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("themeToggle");

    if (btn) {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");
            btn.textContent = "☀️";
        } else {
            btn.textContent = "🌙";
        }

        btn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                btn.textContent = "☀️";
                localStorage.setItem("theme", "dark");
            } else {
                btn.textContent = "🌙";
                localStorage.setItem("theme", "light");
            }
        });
    }

    const navbar = document.querySelector(".navbar");

    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }
        });
    }

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    const sections = document.querySelectorAll(".fade-section");

    if (sections.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        });

        sections.forEach(section => fadeObserver.observe(section));
    }

    const counters = document.querySelectorAll(".counter");

    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {

                    const counter = entry.target;
                    const target = +counter.dataset.target;
                    let count = 0;

                    const update = () => {
                        const increment = target / 100;

                        if (count < target) {
                            count += increment;
                            counter.textContent = Math.floor(count).toLocaleString("fr-FR"); requestAnimationFrame(update);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    update();
                    counterObserver.unobserve(counter);
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

});