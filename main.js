/**
 * Business Landing Page — Vanilla JavaScript
 * Handles navigation, scroll effects, form validation, and submission.
 */

(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     DOM References
     -------------------------------------------------------------------------- */

  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileOverlay = document.getElementById("mobile-overlay");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a, .nav-links a");
  const contactForm = document.getElementById("contact-form");
  const revealElements = document.querySelectorAll(".reveal");

  /* --------------------------------------------------------------------------
     Navbar scroll effect
     -------------------------------------------------------------------------- */

  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* --------------------------------------------------------------------------
     Mobile menu toggle
     -------------------------------------------------------------------------- */

  function openMobileMenu() {
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    mobileMenu.classList.add("open");
    mobileOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("open");
    mobileOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  function toggleMobileMenu() {
    if (mobileMenu.classList.contains("open")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  if (hamburger) {
    hamburger.addEventListener("click", toggleMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", closeMobileMenu);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && mobileMenu.classList.contains("open")) {
      closeMobileMenu();
    }
  });

  /* --------------------------------------------------------------------------
     Active nav link on scroll
     -------------------------------------------------------------------------- */

  const sections = document.querySelectorAll("section[id]");

  function setActiveNavLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        mobileNavLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", setActiveNavLink, { passive: true });

  mobileNavLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeMobileMenu();
    });
  });

  /* --------------------------------------------------------------------------
     Scroll reveal animation
     -------------------------------------------------------------------------- */

  if ("IntersectionObserver" in window && revealElements.length) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* --------------------------------------------------------------------------
     Contact form validation & submission
     -------------------------------------------------------------------------- */

  const validators = {
    name: function (value) {
      if (!value.trim()) return "Full name is required.";
      if (value.trim().length < 2) return "Name must be at least 2 characters.";
      return "";
    },
    email: function (value) {
      if (!value.trim()) return "Email address is required.";
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value.trim())) return "Please enter a valid email address.";
      return "";
    },
    subject: function (value) {
      if (!value) return "Please select a subject.";
      return "";
    },
    message: function (value) {
      if (!value.trim()) return "Message is required.";
      if (value.trim().length < 10) return "Message must be at least 10 characters.";
      return "";
    },
  };

  function showFieldError(fieldName, message) {
    const input = document.getElementById(fieldName);
    const errorEl = document.getElementById(fieldName + "-error");

    if (input) input.classList.add("error");
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add("visible");
    }
  }

  function clearFieldError(fieldName) {
    const input = document.getElementById(fieldName);
    const errorEl = document.getElementById(fieldName + "-error");

    if (input) input.classList.remove("error");
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove("visible");
    }
  }

  function validateForm(formData) {
    let isValid = true;

    Object.keys(validators).forEach(function (fieldName) {
      const error = validators[fieldName](formData.get(fieldName) || "");
      if (error) {
        showFieldError(fieldName, error);
        isValid = false;
      } else {
        clearFieldError(fieldName);
      }
    });

    return isValid;
  }

  function showFormMessage(type, text) {
    const messageEl = document.getElementById("form-message");
    if (!messageEl) return;

    messageEl.className = "form-message " + type;
    messageEl.textContent = text;
    messageEl.setAttribute("role", "alert");
  }

  function hideFormMessage() {
    const messageEl = document.getElementById("form-message");
    if (!messageEl) return;

    messageEl.className = "form-message";
    messageEl.textContent = "";
    messageEl.removeAttribute("role");
  }

  if (contactForm) {
    Object.keys(validators).forEach(function (fieldName) {
      const input = document.getElementById(fieldName);
      if (!input) return;

      input.addEventListener("blur", function () {
        const error = validators[fieldName](input.value);
        if (error) {
          showFieldError(fieldName, error);
        } else {
          clearFieldError(fieldName);
        }
      });

      input.addEventListener("input", function () {
        if (input.classList.contains("error")) {
          const error = validators[fieldName](input.value);
          if (!error) clearFieldError(fieldName);
        }
      });
    });

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      hideFormMessage();

      const formData = new FormData(contactForm);

      if (!validateForm(formData)) {
        showFormMessage("error", "Please correct the errors above before submitting.");
        return;
      }

      const submitBtn = contactForm.querySelector('[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<svg class="animate-spin inline w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Sending...';

      const payload = {
        name: formData.get("name").trim(),
        email: formData.get("email").trim(),
        subject: formData.get("subject"),
        message: formData.get("message").trim(),
        _subject: "New inquiry from Meridian website",
        _replyto: formData.get("email").trim(),
      };

      fetch(contactForm.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(function (response) {
          if (response.ok) {
            showFormMessage(
              "success",
              "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours."
            );
            contactForm.reset();
            Object.keys(validators).forEach(clearFieldError);
          } else {
            throw new Error("Submission failed");
          }
        })
        .catch(function () {
          showFormMessage(
            "error",
            "Something went wrong. Please try again or email us directly at hello@meridian.co."
          );
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        });
    });
  }

  /* --------------------------------------------------------------------------
     Smooth scroll for anchor links (fallback for browsers without CSS smooth)
     -------------------------------------------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    });
  });
})();
