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
            navbar.classList.toggle("navbar-scrolled", window.scrollY > 50);
        });
    }

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
        window.addEventListener("scroll", () => {
            backToTop.classList.toggle("show", window.scrollY > 300);
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    const sections = document.querySelectorAll(".fade-section");

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    });

    sections.forEach(section => fadeObserver.observe(section));

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.dataset.target;

                let current = 0;
                const duration = 2000;
                const stepTime = 16;
                const increment = target / (duration / stepTime);

                const timer = setInterval(() => {
                    current += increment;

                    if (current >= target) {
                        counter.textContent = target.toLocaleString("fr-FR");
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current).toLocaleString("fr-FR");
                    }
                }, stepTime);

                counterObserver.unobserve(counter);
            }
        });
    });

    counters.forEach(counter => counterObserver.observe(counter));

    const form = document.getElementById("contactForm");
    console.log("FORM =", form);

    if (form) {
        const successBox = document.getElementById("formSuccess");

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const lastName = document.getElementById("lastName");
            const firstName = document.getElementById("firstName");
            const email = document.getElementById("email");
            const subject = document.getElementById("subject");
            const message = document.getElementById("message");

            let isValid = true;

            document.querySelectorAll(".invalid-feedback").forEach(el => el.textContent = "");
            form.querySelectorAll(".form-control, .form-select").forEach(el => {
                el.classList.remove("is-invalid", "is-valid");
            });

            if (lastName.value.trim() === "") {
                document.getElementById("lastNameError").textContent = "Nom requis";
                lastName.classList.add("is-invalid");
                isValid = false;
            } else {
                lastName.classList.add("is-valid");
            }

            if (firstName.value.trim() === "") {
                document.getElementById("firstNameError").textContent = "Prénom requis";
                firstName.classList.add("is-invalid");
                isValid = false;
            } else {
                firstName.classList.add("is-valid");
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === "") {
                document.getElementById("emailError").textContent = "Email requis";
                email.classList.add("is-invalid");
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                document.getElementById("emailError").textContent = "Email invalide";
                email.classList.add("is-invalid");
                isValid = false;
            } else {
                email.classList.add("is-valid");
            }

            if (subject.value === "") {
                document.getElementById("subjectError").textContent = "Sujet obligatoire";
                subject.classList.add("is-invalid");
                isValid = false;
            } else {
                subject.classList.add("is-valid");
            }

            if (message.value.trim().length < 20) {
                document.getElementById("messageError").textContent = "Minimum 20 caractères";
                message.classList.add("is-invalid");
                isValid = false;
            } else {
                message.classList.add("is-valid");
            }

            if (isValid) {
                successBox.classList.remove("d-none");
                successBox.textContent = "Message envoyé ✔";

                form.reset();
                form.querySelectorAll(".form-control, .form-select").forEach(el => {
                    el.classList.remove("is-valid");
                });
            } else {
                successBox.classList.add("d-none");
            }
        });
    }
});