/* ========== 1. MOBILE NAVIGATION ========== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuBtn.setAttribute("aria-expanded", isOpen);

  menuBtn.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

// Close menu after selecting a section
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});


/* ========== 2. PROFILE PHOTO ========== */

const profileImage = document.getElementById("profileImage");
const profileFallback = document.getElementById("profileFallback");

function showProfileFallback() {
  profileImage.style.display = "none";
  profileFallback.style.display = "block";
}

profileImage.addEventListener("load", () => {
  profileImage.style.display = "block";
  profileFallback.style.display = "none";
});

profileImage.addEventListener("error", showProfileFallback);

// Handle an image already loaded from cache
if (profileImage.complete && profileImage.naturalWidth > 0) {
  profileImage.style.display = "block";
  profileFallback.style.display = "none";
} else if (profileImage.complete) {
  showProfileFallback();
}


/* ========== 3. SCROLL REVEAL ANIMATION ========== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
} else {
  // Fallback for older browsers
  revealElements.forEach(element => {
    element.classList.add("visible");
  });
}


/* ========== 4. ANIMATED SKILL BARS ========== */

const skillSection = document.getElementById("skills");

if ("IntersectionObserver" in window) {
  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".skill-fill").forEach(bar => {
            bar.style.width = bar.dataset.width;
          });

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  skillObserver.observe(skillSection);
} else {
  document.querySelectorAll(".skill-fill").forEach(bar => {
    bar.style.width = bar.dataset.width;
  });
}


/* ========== 5. ACTIVE NAVIGATION LINK ========== */

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function updateActiveLink() {
  let currentSection = "home";

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) {
      currentSection = section.id;
    }
  });

  navItems.forEach(link => {
    const isActive =
      link.getAttribute("href") === "#" + currentSection;

    link.classList.toggle("active", isActive);
  });
}


/* ========== 6. BACK TO TOP BUTTON ========== */

const backTop = document.getElementById("backTop");

function handleScroll() {
  backTop.style.display =
    window.scrollY > 400 ? "block" : "none";

  updateActiveLink();
}

window.addEventListener("scroll", handleScroll, {
  passive: true
});

backTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


/* ========== 7. CONTACT FORM ========== */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// Replace this with your actual email address
const recipient = "YOUR_EMAIL@example.com";

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("senderName").value.trim();
  const email = document.getElementById("senderEmail").value.trim();
  
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    formStatus.textContent = "Please fill in all fields.";
    return;
  }

  if (recipient === "YOUR_EMAIL@example.com") {
    formStatus.textContent =
      "Please add your real email address in script.js first.";
    return;
  }

  const emailBody =
    "Name: " + name +
    "\nSender Email: " + email +
    "\n\nMessage:\n" + message;

  const mailtoLink =
    "mailto:" + recipient +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(emailBody);

  formStatus.textContent =
    "Opening your email application. Review and send the message.";

  window.location.href = mailtoLink;
});


/* ========== 8. AUTOMATIC COPYRIGHT YEAR ========== */

document.getElementById("year").textContent =
  new Date().getFullYear();
