"use strict";

/* ================================
   LumenDev Main JavaScript
================================ */

document.addEventListener("DOMContentLoaded", function () {

  /* ================================
     Toggle Scrolled
  ================================= */

  function toggleScrolled() {
    const body = document.querySelector("body");
    const header = document.querySelector("#header");

    if (!body || !header) {
      return;
    }

    if (
      !header.classList.contains("scroll-up-sticky") &&
      !header.classList.contains("sticky-top") &&
      !header.classList.contains("fixed-top")
    ) {
      return;
    }

    if (window.scrollY > 100) {
      body.classList.add("scrolled");
    } else {
      body.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);


  /* ================================
     Mobile Navigation
  ================================= */

  const mobileNavToggle =
    document.querySelector(".mobile-nav-toggle");

  function mobileNavToggleFunction() {
    const body = document.querySelector("body");

    if (!body || !mobileNavToggle) {
      return;
    }

    body.classList.toggle("mobile-nav-active");

    mobileNavToggle.classList.toggle("bi-list");
    mobileNavToggle.classList.toggle("bi-x");
  }

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener(
      "click",
      mobileNavToggleFunction
    );
  }


  /* ================================
     Mobile Nav Links
  ================================= */

  const navLinks =
    document.querySelectorAll("#navmenu a");

  navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

      const mobileNavActive =
        document.querySelector(".mobile-nav-active");

      if (mobileNavActive) {
        mobileNavToggleFunction();
      }

    });

  });


  /* ================================
     Mobile Dropdown
  ================================= */

  const dropdownToggles =
    document.querySelectorAll(
      ".navmenu .toggle-dropdown"
    );

  dropdownToggles.forEach(function (toggle) {

    toggle.addEventListener("click", function (event) {

      event.preventDefault();

      const parent = this.parentNode;

      if (parent) {
        parent.classList.toggle("active");
      }

      if (parent && parent.nextElementSibling) {

        parent.nextElementSibling.classList.toggle(
          "dropdown-active"
        );

      }

      event.stopPropagation();

    });

  });


  /* ================================
     Preloader
  ================================= */

  const preloader =
    document.querySelector("#preloader");

  if (preloader) {

    window.addEventListener("load", function () {

      preloader.remove();

    });

  }


  /* ================================
     Scroll Top
  ================================= */

  const scrollTop =
    document.querySelector(".scroll-top");

  function toggleScrollTop() {

    if (!scrollTop) {
      return;
    }

    if (window.scrollY > 100) {
      scrollTop.classList.add("active");
    } else {
      scrollTop.classList.remove("active");
    }

  }

  if (scrollTop) {

    scrollTop.addEventListener(
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

  window.addEventListener("load", toggleScrollTop);
  window.addEventListener("scroll", toggleScrollTop);


  /* ================================
     AOS Animation
  ================================= */

  function aosInit() {

    if (typeof AOS === "undefined") {
      return;
    }

    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });

  }

  window.addEventListener("load", aosInit);


  /* ================================
     GLightbox
  ================================= */

  if (typeof GLightbox !== "undefined") {

    GLightbox({
      selector: ".glightbox"
    });

  }


  /* ================================
     Pure Counter
  ================================= */

  if (typeof PureCounter !== "undefined") {

    new PureCounter();

  }


  /* ================================
     Skills Animation
  ================================= */

  if (typeof Waypoint !== "undefined") {

    const skills =
      document.querySelectorAll(
        ".skills-animation"
      );

    skills.forEach(function (item) {

      new Waypoint({

        element: item,

        offset: "80%",

        handler: function () {

          const progress =
            item.querySelectorAll(
              ".progress .progress-bar"
            );

          progress.forEach(function (bar) {

            const value =
              bar.getAttribute(
                "aria-valuenow"
              );

            if (value) {
              bar.style.width = value + "%";
            }

          });

        }

      });

    });

  }


  /* ================================
     Swiper
  ================================= */

  function initSwiper() {

    if (typeof Swiper === "undefined") {
      return;
    }

    const swiperElements =
      document.querySelectorAll(
        ".init-swiper"
      );

    swiperElements.forEach(function (swiperElement) {

      const configElement =
        swiperElement.querySelector(
          ".swiper-config"
        );

      if (!configElement) {
        return;
      }

      let config = {};

      try {

        config = JSON.parse(
          configElement.textContent.trim()
        );

      } catch (error) {

        console.error(
          "Swiper configuration error:",
          error
        );

        return;
      }

      if (
        swiperElement.classList.contains(
          "swiper-tab"
        ) &&
        typeof initSwiperWithCustomPagination ===
          "function"
      ) {

        initSwiperWithCustomPagination(
          swiperElement,
          config
        );

      } else {

        new Swiper(
          swiperElement,
          config
        );

      }

    });

  }

  window.addEventListener(
    "load",
    initSwiper
  );


  /* ================================
     Isotope
  ================================= */

  function initIsotope() {

    if (
      typeof imagesLoaded === "undefined" ||
      typeof Isotope === "undefined"
    ) {
      return;
    }

    const isotopeLayouts =
      document.querySelectorAll(
        ".isotope-layout"
      );

    isotopeLayouts.forEach(function (layoutElement) {

      const container =
        layoutElement.querySelector(
          ".isotope-container"
        );

      if (!container) {
        return;
      }

      const layout =
        layoutElement.getAttribute(
          "data-layout"
        ) || "masonry";

      const filter =
        layoutElement.getAttribute(
          "data-default-filter"
        ) || "*";

      const sort =
        layoutElement.getAttribute(
          "data-sort"
        ) || "original-order";

      let isotope = null;

      imagesLoaded(
        container,
        function () {

          isotope = new Isotope(
            container,
            {
              itemSelector:
                ".isotope-item",

              layoutMode:
                layout,

              filter:
                filter,

              sortBy:
                sort
            }
          );

        }
      );


      const filters =
        layoutElement.querySelectorAll(
          ".isotope-filters li"
        );

      filters.forEach(function (filterButton) {

        filterButton.addEventListener(
          "click",
          function () {

            const active =
              layoutElement.querySelector(
                ".isotope-filters .filter-active"
              );

            if (active) {

              active.classList.remove(
                "filter-active"
              );

            }

            this.classList.add(
              "filter-active"
            );

            const filterValue =
              this.getAttribute(
                "data-filter"
              );

            if (isotope) {

              isotope.arrange({
                filter: filterValue
              });

            }

          }
        );

      });

    });

  }

  window.addEventListener(
    "load",
    initIsotope
  );


  /* ================================
     Pricing
  ================================= */

  function initPricing() {

    const cards =
      document.querySelectorAll(
        ".option-card"
      );

    const totalPrices =
      document.querySelectorAll(
        "#total-price"
      );

    const badges =
      document.querySelectorAll(
        "#plan-badge"
      );

    const tierLabels =
      document.querySelectorAll(
        "#summary-tier-label"
      );

    if (!cards.length) {
      return;
    }


    function updatePricing() {

      let design = false;
      let development = false;
      let fast = false;


      cards.forEach(function (card) {

        const checkbox =
          card.querySelector(
            ".toggle-input"
          );

        if (!checkbox) {
          return;
        }

        const feature =
          card.getAttribute(
            "data-feature"
          );


        if (checkbox.checked) {

          card.classList.add(
            "active"
          );

          if (feature === "design") {
            design = true;
          }

          if (feature === "development") {
            development = true;
          }

          if (feature === "fast") {
            fast = true;
          }

        } else {

          card.classList.remove(
            "active"
          );

        }


        const featureItems =
          document.querySelectorAll(
            '[data-feature-item="' +
            feature +
            '"]'
          );

        featureItems.forEach(
          function (item) {

            if (checkbox.checked) {

              item.style.setProperty(
                "display",
                "flex",
                "important"
              );

            } else {

              item.style.setProperty(
                "display",
                "none",
                "important"
              );

            }

          }
        );

      });


      /* Price */

      let total = 0;

      if (design) {
        total = total + 200;
      }

      if (development) {
        total = total + 300;
      }

      if (fast) {
        total = total + 150;
      }


      totalPrices.forEach(
        function (element) {

          element.innerText = total;

        }
      );


      /* Service Name */

      let serviceName = "";

      if (design) {
        serviceName = "Design";
      }

      if (development) {

        if (serviceName !== "") {
          serviceName =
            serviceName + " & ";
        }

        serviceName =
          serviceName + "Development";

      }

      if (fast) {

        if (serviceName !== "") {
          serviceName =
            serviceName + " & ";
        }

        serviceName =
          serviceName + "Fast";

      }


      tierLabels.forEach(
        function (element) {

          if (serviceName !== "") {

            element.innerText =
              serviceName;

          } else {

            element.innerText =
              "No Services Selected";

          }

        }
      );


      /* Badge */

      let badgeText = "None";

      let badgeClass =
        "badge px-3 py-1 rounded-pill bg-secondary-subtle text-secondary fw-bold small";


      if (
        design &&
        development &&
        fast
      ) {

        badgeText = "Premium";

        badgeClass =
          "badge px-3 py-1 rounded-pill bg-success-subtle text-success fw-bold small";

      } else if (
        design &&
        development
      ) {

        badgeText = "Standard";

        badgeClass =
          "badge px-3 py-1 rounded-pill bg-warning-subtle text-warning fw-bold small";

      } else if (
        design ||
        development ||
        fast
      ) {

        badgeText = "Basic";

        badgeClass =
          "badge px-3 py-1 rounded-pill bg-info-subtle text-info fw-bold small";

      }


      badges.forEach(
        function (element) {

          element.innerText =
            badgeText;

          element.className =
            badgeClass;

        }
      );

    }


    /* Checkbox */

    cards.forEach(function (card) {

      const checkbox =
        card.querySelector(
          ".toggle-input"
        );

      if (!checkbox) {
        return;
      }


      checkbox.addEventListener(
        "change",
        function () {

          updatePricing();

        }
      );


      /* Card click */

      card.addEventListener(
        "click",
        function (event) {

          if (
            event.target.closest(
              ".switch"
            )
          ) {
            return;
          }

          checkbox.checked =
            !checkbox.checked;

          updatePricing();

        }
      );

    });


    updatePricing();

  }


  initPricing();


  /* ================================
     FAQ
  ================================= */

  const faqItems =
    document.querySelectorAll(
      ".faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header"
    );

  faqItems.forEach(function (faqItem) {

    faqItem.addEventListener(
      "click",
      function () {

        if (faqItem.parentNode) {

          faqItem.parentNode.classList.toggle(
            "faq-active"
          );

        }

      }
    );

  });


  /* ================================
     Hash Scroll
  ================================= */

  window.addEventListener(
    "load",
    function () {

      if (!window.location.hash) {
        return;
      }

      let section = null;

      try {

        section =
          document.querySelector(
            window.location.hash
          );

      } catch (error) {

        return;

      }


      if (section) {

        setTimeout(
          function () {

            const margin =
              getComputedStyle(
                section
              ).scrollMarginTop;

            const marginValue =
              parseInt(
                margin || "0"
              );


            window.scrollTo({

              top:
                section.offsetTop -
                marginValue,

              behavior:
                "smooth"

            });

          },
          100
        );

      }

    }
  );


  /* ================================
     Nav Scrollspy
  ================================= */

  const navMenuLinks =
    document.querySelectorAll(
      ".navmenu a"
    );


  function navMenuScrollspy() {

    navMenuLinks.forEach(
      function (link) {

        if (!link.hash) {
          return;
        }


        let section = null;

        try {

          section =
            document.querySelector(
              link.hash
            );

        } catch (error) {

          return;

        }


        if (!section) {
          return;
        }


        const position =
          window.scrollY + 200;


        if (
          position >=
            section.offsetTop &&
          position <=
            section.offsetTop +
            section.offsetHeight
        ) {

          document
            .querySelectorAll(
              ".navmenu a.active"
            )
            .forEach(
              function (activeLink) {

                activeLink.classList.remove(
                  "active"
                );

              }
            );


          link.classList.add(
            "active"
          );

        } else {

          link.classList.remove(
            "active"
          );

        }

      }
    );

  }


  window.addEventListener(
    "load",
    navMenuScrollspy
  );

  window.addEventListener(
    "scroll",
    navMenuScrollspy
  );


  console.log(
    "LumenDev main.js loaded successfully"
  );

});
