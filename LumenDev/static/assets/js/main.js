(function() {
  "use strict";

  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

 /*
   * Pricing Toggle
  /*
 * Pricing Toggle
 */
/*
 * Pricing Toggle
 */
function initPricing() {

  const cards = document.querySelectorAll('.option-card');

  const totalPriceEls = document.querySelectorAll('#total-price');
  const planBadgeEls = document.querySelectorAll('#plan-badge');
  const summaryTierLabelEls = document.querySelectorAll('#summary-tier-label');

  if (!cards.length) return;


  function updatePricing() {

    let designSelected = false;
    let developmentSelected = false;
    let fastSelected = false;

    cards.forEach(function(card) {

      const checkbox = card.querySelector('.toggle-input');
      const featureKey = card.getAttribute('data-feature');

      if (!checkbox) return;


      if (checkbox.checked) {

        card.classList.add('active');

        if (featureKey === 'design') {
          designSelected = true;
        }

        if (featureKey === 'development') {
          developmentSelected = true;
        }

        if (featureKey === 'fast') {
          fastSelected = true;
        }

      } else {

        card.classList.remove('active');

      }


      const featureItems = document.querySelectorAll(
        '[data-feature-item="' + featureKey + '"]'
      );

      featureItems.forEach(function(item) {

        if (checkbox.checked) {
          item.style.setProperty('display', 'flex', 'important');
        } else {
          item.style.setProperty('display', 'none', 'important');
        }

      });

    });


    /* Calculate price */

    let total = 0;

    if (designSelected) {
      total = total + 200;
    }

    if (developmentSelected) {
      total = total + 300;
    }

    if (fastSelected) {
      total = total + 150;
    }


    /* Update ALL price elements */

    totalPriceEls.forEach(function(element) {
      element.innerText = total;
    });


    /* Update service name */

    let serviceName = '';

    if (designSelected) {
      serviceName = 'Design';
    }

    if (developmentSelected) {

      if (serviceName !== '') {
        serviceName = serviceName + ' & ';
      }

      serviceName = serviceName + 'Development';
    }

    if (fastSelected) {

      if (serviceName !== '') {
        serviceName = serviceName + ' & ';
      }

      serviceName = serviceName + 'Fast';
    }


    summaryTierLabelEls.forEach(function(element) {

      if (serviceName !== '') {
        element.innerText = serviceName;
      } else {
        element.innerText = 'No Services Selected';
      }

    });


    /* Update badge */

    let badgeText = 'None';
    let badgeClass =
      'badge px-3 py-1 rounded-pill bg-secondary-subtle text-secondary fw-bold small';


    if (designSelected && developmentSelected && fastSelected) {

      badgeText = 'Premium';

      badgeClass =
        'badge px-3 py-1 rounded-pill bg-success-subtle text-success fw-bold small';

    } else if (designSelected && developmentSelected) {

      badgeText = 'Standard';

      badgeClass =
        'badge px-3 py-1 rounded-pill bg-warning-subtle text-warning fw-bold small';

    } else if (designSelected || developmentSelected || fastSelected) {

      badgeText = 'Basic';

      badgeClass =
        'badge px-3 py-1 rounded-pill bg-info-subtle text-info fw-bold small';

    }


    planBadgeEls.forEach(function(element) {
      element.innerText = badgeText;
      element.className = badgeClass;
    });

  }


  /* Checkbox change */

  cards.forEach(function(card) {

    const checkbox = card.querySelector('.toggle-input');

    if (!checkbox) return;


    checkbox.addEventListener('change', function() {

      updatePricing();

    });


    /* Card click */

    card.addEventListener('click', function(e) {

      if (e.target.closest('.switch')) {
        return;
      }

      checkbox.checked = !checkbox.checked;

      updatePricing();

    });

  });


  /* Initial calculation */

  updatePricing();

}


if (document.readyState === 'loading') {

  document.addEventListener('DOMContentLoaded', initPricing);

} else {

  initPricing();

}
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
