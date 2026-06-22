document.addEventListener("DOMContentLoaded", () => {

    // --- DARK MODE ---
    const btn = document.getElementById("themeToggle");

    if (btn) {
        const savedTheme = localStorage.getItem("theme");

        // On remet le thème de la dernière visite
        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");
            btn.textContent = "☀️";
        } else {
            btn.textContent = "🌙";
        }

        // Switch au clic et sauvegarde du choix
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

    // --- NAVBAR EFFECT ---
    const navbar = document.querySelector(".navbar");

    if (navbar) {
        // Change l'apparence de la navbar après 50px de scroll
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("navbar-scrolled", window.scrollY > 50);
        });
    }

    // --- BTN BACK TO TOP ---
    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
        // Affiche le bouton si on a scrollé de plus de 300px
        window.addEventListener("scroll", () => {
            backToTop.classList.toggle("show", window.scrollY > 300);
        });

        // Retour fluide en haut de page
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // --- ANIMATION APPARITION SECTIONS ---
    const sections = document.querySelectorAll(".fade-section");

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    });

    sections.forEach(section => fadeObserver.observe(section));

    // --- ANIMATION DES COMPTEURS ---
    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.dataset.target; // + pour convertir en nombre

                let current = 0;
                const duration = 2000; // 2 secondes d'animation
                const stepTime = 16;
                const increment = target / (duration / stepTime);

                const timer = setInterval(() => {
                    current += increment;

                    if (current >= target) {
                        counter.textContent = target.toLocaleString("fr-FR"); // Format fr (ex: 1 500)
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current).toLocaleString("fr-FR");
                    }
                }, stepTime);

                counterObserver.unobserve(counter); // Arrête l'observation de ce compteur une fois l'animation terminée, pour éviter de la relancer inutilement

            }
        });
    });

    counters.forEach(counter => counterObserver.observe(counter));

    // --- VALIDATION FORMULAIRE ---
    const form = document.getElementById("contactForm");
    console.log("FORM =", form);

    if (form) {
        const successBox = document.getElementById("formSuccess");

        form.addEventListener("submit", function (e) {
            e.preventDefault(); // Bloque l'envoi de la page

            const lastName = document.getElementById("lastName");
            const firstName = document.getElementById("firstName");
            const email = document.getElementById("email");
            const subject = document.getElementById("subject");
            const message = document.getElementById("message");

            let isValid = true;

            // Reset des erreurs et des classes Bootstrap
            document.querySelectorAll(".invalid-feedback").forEach(el => el.textContent = "");
            form.querySelectorAll(".form-control, .form-select").forEach(el => {
                el.classList.remove("is-invalid", "is-valid");
            });

            // vérifie que le nom n'est pas vide ( champs obligatoire)
            if (lastName.value.trim() === "") {
                document.getElementById("lastNameError").textContent = "Nom requis";
                lastName.classList.add("is-invalid");
                isValid = false;
            } else {
                lastName.classList.add("is-valid");
            }

            // vérifie que le Prénom est bien saisi
            if (firstName.value.trim() === "") {
                document.getElementById("firstNameError").textContent = "Prénom requis";
                firstName.classList.add("is-invalid");
                isValid = false;
            } else {
                firstName.classList.add("is-valid");
            }

            // vérifie que l'Email est correctement écrit
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

            // vérifie que le champs Sujet n'est pas vide
            if (subject.value === "") {
                document.getElementById("subjectError").textContent = "Sujet obligatoire";
                subject.classList.add("is-invalid");
                isValid = false;
            } else {
                subject.classList.add("is-valid");
            }

            // vérifie que l'utilisateur a écrit au moins 20 caractères Message 
            if (message.value.trim().length < 20) {
                document.getElementById("messageError").textContent = "Minimum 20 caractères";
                message.classList.add("is-invalid");
                isValid = false;
            } else {
                message.classList.add("is-valid");
            }

            // Si tout est OK, on affiche le succès et on reset le formulaire
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
    //Filtrage des Freelances par catégories
    const filter = document.getElementById("categoryFilter");

    if (filter) {
        filter.addEventListener("change", () => {
            const valeurChoisie = filter.value;
            const cartes = document.querySelectorAll(".freelance-card");

            cartes.forEach(carte => {
                if (valeurChoisie === "all" || carte.dataset.category === valeurChoisie) {
                    carte.style.display = "";
                } else {
                    carte.style.display = "none";
                }
            });
        });
    }
    //Annee dynamique permet de changer automatiquement l'annee et de le mettre a jour
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
