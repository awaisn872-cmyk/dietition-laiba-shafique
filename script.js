

/* =========================================================
   1. WEBSITE CONFIGURATION
   ========================================================= */

const SITE_CONFIG = {
    name: "Dr. Laiba Shafique",

    // WhatsApp number with country code.
    // No + sign, spaces, or dashes.
    whatsappNumber: "923238016355",

    clinics: [
        {
            name: "Sajjad Medicare",
            address: "Jhang Road, Gojra"
        },
        {
            name: "Al-Haris Medicare",
            address: "Canal Road, Toba Tek Singh"
        }
    ]
};


/* =========================================================
   2. INITIALIZE WEBSITE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.querySelector(".navbar");

    const menuToggle = document.querySelector(
        "#menu-toggle, .menu-toggle, .hamburger"
    );

    const navMenu = document.getElementById("nav-menu");

    const navLinks = document.querySelectorAll(
        ".nav-links a, .navbar-links a, .nav-menu a"
    );

    const backToTop = document.querySelector(
        "#backToTop, .back-to-top"
    );

    const appointmentForm = document.querySelector(
        "#appointment-form, #appointmentForm, #bookingForm, .appointment-form"
    );


    /* =====================================================
       3. NOTIFICATION SYSTEM
       ===================================================== */

    function showNotification(message, type = "success") {

        let notification = document.querySelector(
            "#siteNotification"
        );

        if (!notification) {

            notification = document.createElement("div");
            notification.id = "siteNotification";

            notification.setAttribute("role", "status");
            notification.setAttribute("aria-live", "polite");

            document.body.appendChild(notification);
        }

        notification.textContent = message;

        notification.className =
            "site-notification " + type;

        notification.classList.add("show");

        clearTimeout(notification.hideTimeout);

        notification.hideTimeout = setTimeout(function () {
            notification.classList.remove("show");
        }, 5000);
    }


    /* =====================================================
       4. WHATSAPP CONFIGURATION
       ===================================================== */

    function getWhatsAppNumber() {

        return String(
            SITE_CONFIG.whatsappNumber || ""
        ).replace(/\D/g, "");
    }


    function isWhatsAppNumberValid() {

        const number = getWhatsAppNumber();

        return (
            number.length >= 10 &&
            number.length <= 15
        );
    }


    function getWhatsAppURL(message = "") {

        const number = getWhatsAppNumber();

        return (
            "https://wa.me/" +
            number +
            (
                message
                    ? "?text=" + encodeURIComponent(message)
                    : ""
            )
        );
    }


    /* =====================================================
       5. MOBILE NAVIGATION — FIXED
       Uses existing HTML IDs:
       Button: #menu-toggle
       Menu:   #nav-menu
       ===================================================== */

    if (menuToggle && navMenu) {

        function openMobileMenu() {

            navMenu.classList.add("active");

            menuToggle.classList.add("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

            document.body.classList.add("menu-open");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            }
        }


        function closeMobileMenu() {

            navMenu.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            document.body.classList.remove("menu-open");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }


        // Open and close the mobile navigation.

        menuToggle.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });


        // Close the menu after clicking a navigation link.

        navMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {
                closeMobileMenu();
            });
        });


        // Close the menu when clicking outside.

        document.addEventListener("click", function (event) {

            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMobileMenu();
            }
        });


        // Close the menu using Escape.

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMobileMenu();
            }
        });


        // Close the mobile menu when returning to desktop width.

        window.addEventListener("resize", function () {

            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });

    } else {

        console.warn(
            "Mobile navigation elements not found. Check #menu-toggle and #nav-menu in index.html."
        );
    }


    /* =====================================================
       6. STICKY NAVBAR
       ===================================================== */

    function handleNavbarScroll() {

        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }


    window.addEventListener(
        "scroll",
        handleNavbarScroll,
        { passive: true }
    );

    handleNavbarScroll();


    /* =====================================================
       7. SMOOTH SCROLLING
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(
        function (link) {

            link.addEventListener("click", function (event) {

                const targetId = link.getAttribute("href");

                if (!targetId || targetId === "#") {
                    return;
                }

                let targetElement;

                try {
                    targetElement = document.querySelector(targetId);
                } catch (error) {
                    return;
                }

                if (!targetElement) return;

                event.preventDefault();

                const navbarHeight = navbar
                    ? navbar.offsetHeight
                    : 0;

                const targetPosition =
                    targetElement.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            });
        }
    );


    /* =====================================================
       8. SCROLL REVEAL ANIMATIONS
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }
                });
            },

            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }


    /* =====================================================
       9. FAQ ACCORDION
       ===================================================== */

    const faqQuestions = document.querySelectorAll(
        ".faq-question, .faq-header, .accordion-button"
    );

    faqQuestions.forEach(function (question) {

        question.setAttribute("aria-expanded", "false");

        const faqItem = question.closest(
            ".faq-item, .faq-card, .accordion-item"
        );

        if (!faqItem) return;

        const answer = faqItem.querySelector(
            ".faq-answer, .faq-content, .accordion-body"
        );

        if (!answer) return;

        // Initially close each answer.

        answer.hidden = true;
        answer.style.maxHeight = "0";
        answer.style.overflow = "hidden";
        answer.style.display = "block";
        answer.style.transition = "max-height 0.3s ease";


        question.addEventListener("click", function () {

            const isOpen =
                question.getAttribute("aria-expanded") === "true";


            // Close all other FAQ answers.

            faqQuestions.forEach(function (otherQuestion) {

                if (otherQuestion === question) return;

                const otherItem = otherQuestion.closest(
                    ".faq-item, .faq-card, .accordion-item"
                );

                if (!otherItem) return;

                const otherAnswer = otherItem.querySelector(
                    ".faq-answer, .faq-content, .accordion-body"
                );

                otherQuestion.setAttribute(
                    "aria-expanded",
                    "false"
                );

                otherItem.classList.remove("active");

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = "0";
                    otherAnswer.hidden = true;
                }
            });


            // Toggle the selected answer.

            if (isOpen) {

                question.setAttribute(
                    "aria-expanded",
                    "false"
                );

                faqItem.classList.remove("active");

                answer.style.maxHeight = "0";
                answer.hidden = true;

            } else {

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

                faqItem.classList.add("active");

                answer.hidden = false;
                answer.style.display = "block";

                answer.style.maxHeight =
                    answer.scrollHeight + "px";
            }
        });
    });


    /* =====================================================
       10. APPOINTMENT BOOKING FORM
       Opens WhatsApp with appointment details.
       ===================================================== */

    if (appointmentForm) {

        appointmentForm.addEventListener(
            "submit",
            function (event) {

                // Prevent the browser from reloading the page.

                event.preventDefault();

                const formData = new FormData(appointmentForm);


                function getFieldValue(possibleNames) {

                    for (const fieldName of possibleNames) {

                        const value = formData.get(fieldName);

                        if (
                            value !== null &&
                            String(value).trim() !== ""
                        ) {
                            return String(value).trim();
                        }
                    }

                    return "";
                }


                // Patient details.

                const patientName = getFieldValue([
                    "name",
                    "fullName",
                    "full_name",
                    "patientName"
                ]);

                const patientPhone = getFieldValue([
                    "phone",
                    "telephone",
                    "mobile",
                    "contact"
                ]);

                const patientEmail = getFieldValue([
                    "email",
                    "emailAddress"
                ]);


                // Appointment details.

                const selectedService = getFieldValue([
                    "consultation",
                    "service",
                    "serviceType",
                    "appointmentType"
                ]);

                const selectedClinic = getFieldValue([
                    "clinic",
                    "location",
                    "hospital"
                ]);

                const preferredDate = getFieldValue([
                    "date",
                    "appointmentDate"
                ]);

                const preferredTime = getFieldValue([
                    "time",
                    "appointmentTime"
                ]);

                const additionalMessage = getFieldValue([
                    "message",
                    "notes",
                    "details"
                ]);


                // Validate patient's name.

                if (!patientName) {

                    showNotification(
                        "Please enter your full name.",
                        "error"
                    );

                    return;
                }


                // Validate patient's phone.

                if (!patientPhone) {

                    showNotification(
                        "Please enter your phone number.",
                        "error"
                    );

                    return;
                }


                // Accept spaces, dashes, brackets and an optional +.

                const cleanedPhone = patientPhone.replace(
                    /[\s()-]/g,
                    ""
                );

                if (!/^\+?[0-9]{7,15}$/.test(cleanedPhone)) {

                    showNotification(
                        "Please enter a valid phone number.",
                        "error"
                    );

                    return;
                }


                // Validate the clinic's WhatsApp number.

                if (!isWhatsAppNumberValid()) {

                    showNotification(
                        "The clinic WhatsApp number is not configured correctly.",
                        "error"
                    );

                    console.error(
                        "Please check SITE_CONFIG.whatsappNumber in script.js."
                    );

                    return;
                }


                // Build the WhatsApp appointment message.

                const messageLines = [

                    `Assalam-o-Alaikum ${SITE_CONFIG.name},`,

                    "",

                    "I would like to request a dietitian appointment.",

                    "",

                    "*Patient Details*",

                    `Name: ${patientName}`,

                    `Phone: ${patientPhone}`
                ];


                if (patientEmail) {

                    messageLines.push(
                        `Email: ${patientEmail}`
                    );
                }


                messageLines.push(
                    "",
                    "*Appointment Details*"
                );


                if (selectedService) {

                    messageLines.push(
                        `Service: ${selectedService}`
                    );
                }


                if (selectedClinic) {

                    messageLines.push(
                        `Preferred Clinic: ${selectedClinic}`
                    );
                }


                if (preferredDate) {

                    messageLines.push(
                        `Preferred Date: ${preferredDate}`
                    );
                }


                if (preferredTime) {

                    messageLines.push(
                        `Preferred Time: ${preferredTime}`
                    );
                }


                if (additionalMessage) {

                    messageLines.push(
                        "",
                        `Additional Details: ${additionalMessage}`
                    );
                }


                messageLines.push(
                    "",
                    "Please let me know about appointment availability. Thank you."
                );


                const whatsappMessage = messageLines.join("\n");

                const whatsappURL = getWhatsAppURL(
                    whatsappMessage
                );


                // Navigate directly to WhatsApp.

                window.location.href = whatsappURL;
            }
        );

    } else {

        console.warn(
            "Appointment form not found. Check its ID or class in index.html."
        );
    }


    /* =====================================================
       11. FLOATING WHATSAPP BUTTON
       ===================================================== */

    const whatsappButtons = document.querySelectorAll(
        "#whatsappButton, .whatsapp-float, .floating-whatsapp"
    );

    whatsappButtons.forEach(function (button) {

        // Set the WhatsApp destination immediately.

        if (
            button.tagName.toLowerCase() === "a" &&
            isWhatsAppNumberValid()
        ) {

            button.href = getWhatsAppURL();

            button.target = "_blank";

            button.rel = "noopener noreferrer";
        }


        button.addEventListener("click", function (event) {

            if (!isWhatsAppNumberValid()) {

                event.preventDefault();

                showNotification(
                    "WhatsApp contact is currently unavailable. Please try again later.",
                    "error"
                );

                return;
            }


            // Support anchor and button elements.

            if (button.tagName.toLowerCase() !== "a") {

                event.preventDefault();

                window.open(
                    getWhatsAppURL(),
                    "_blank",
                    "noopener,noreferrer"
                );
            }
        });
    });


    /* =====================================================
       12. BACK TO TOP BUTTON
       ===================================================== */

    if (backToTop) {

        function handleBackToTopVisibility() {

            if (window.scrollY > 400) {

                backToTop.classList.add("visible");

                backToTop.style.display = "flex";

            } else {

                backToTop.classList.remove("visible");

                backToTop.style.display = "none";
            }
        }


        window.addEventListener(
            "scroll",
            handleBackToTopVisibility,
            { passive: true }
        );

        handleBackToTopVisibility();


        backToTop.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );
    }


    /* =====================================================
       13. CURRENT YEAR IN FOOTER
       ===================================================== */

    const currentYear = document.querySelector(
        "#currentYear, #year"
    );

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       14. ACTIVE NAVIGATION LINK
       ===================================================== */

    const pageSections = document.querySelectorAll(
        "section[id]"
    );

    if (
        pageSections.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver = new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) return;

                    const sectionId = entry.target.id;

                    navLinks.forEach(function (link) {

                        const linkTarget =
                            link.getAttribute("href");

                        if (linkTarget === "#" + sectionId) {

                            link.classList.add("active");

                        } else {

                            link.classList.remove("active");
                        }
                    });
                });
            },

            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );


        pageSections.forEach(function (section) {

            sectionObserver.observe(section);
        });
    }


    /* =====================================================
       15. IMAGE FALLBACK
       ===================================================== */

    document.querySelectorAll(
        "img[data-fallback]"
    ).forEach(function (imageElement) {

        imageElement.addEventListener(
            "error",
            function () {

                const fallbackImage =
                    imageElement.dataset.fallback;

                if (
                    fallbackImage &&
                    imageElement.src !==
                    new URL(
                        fallbackImage,
                        document.baseURI
                    ).href
                ) {

                    imageElement.src = fallbackImage;

                } else {

                    imageElement.style.visibility = "hidden";
                }
            }
        );
    });


    /* =====================================================
       16. FORM RESET FEEDBACK
       ===================================================== */

    if (appointmentForm) {

        appointmentForm.addEventListener(
            "input",
            function () {

                const notification =
                    document.querySelector("#siteNotification");

                if (notification) {

                    notification.classList.remove("show");
                }
            }
        );
    }


    /* =====================================================
       17. ACCESSIBILITY: ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") return;

            if (navMenu) {

                navMenu.classList.remove("active");
            }

            if (menuToggle) {

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }

            document.body.classList.remove("menu-open");
        }
    );


    /* =====================================================
       18. INITIALIZATION COMPLETE
       ===================================================== */

    console.log(
        `${SITE_CONFIG.name}'s portfolio JavaScript initialized successfully.`
    );

});
