/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const mainElem = document.querySelector('main');
const navList = document.querySelector('#navbar__list');
let sections;
const mainChildrenObserver = new MutationObserver(childrenObserverCallback);
let scrollBrake;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 *Gets the height of the navbar. Navbar is identified by its class and needs to be '.navbar__menu'
 *
 * @return navbars height
 */
function getNavBarHeight() {
  const navbar = document.querySelector('.navbar__menu');
  return navbar ? navbar.getBoundingClientRect().height : 0;
}

// build the nav
/**
 * Populates the navbars item list with the @param elements, which should be existing html elements within the document
 *
 * @param {*} elements which shall be added to the navbar
 */
function updateNavList(elements) {
  let items = document.createDocumentFragment();
  for (const element of elements) {
    const item = document.createElement('li');
    item.textContent = element.dataset.nav || 'No Dataset';
    item.dataset.targetId = element.id;
    item.classList.add('menu__link');
    item.id = element.id + '-menu-link';
    items.appendChild(item);
  }
  navList.replaceChildren(items);
}

/**
 * Refreshes the highlighting of the section elements according to their posistion. The section, whose top is nearest to the bottom of the navbar, gets highlighted together with it's link in the navbar.
 *
 */
function refreshSectionHighlighting() {
  if (window.pageYOffset > 0) {
    document.querySelector('.page__header').classList.add('fade-out');
  }

  // find the section, which nearest to the top + the height of the navbar
  // and at the same time clear all sections of highlighting
  let nearest;
  sections.forEach((section) => {
    section.classList.remove('active');
    navList
      .querySelector(`#${section.id}-menu-link`)
      .classList.remove('active');
    const distance = Math.abs(
      getNavBarHeight() - section.getBoundingClientRect().top
    );
    if (nearest == null || distance < nearest.distance) {
      nearest = {
        section: section,
        distance: distance,
      };
    }
  });

  // Highlight the nearest section
  const nearestSection = nearest.section;
  const navLink = navList.querySelector(`#${nearestSection.id}-menu-link`);
  nearestSection.classList.add('active');
  navLink.classList.add('active');

  // Hide or Show Reset Scroll Button
  document
    .querySelector('.reset-scroll-button')
    .classList.toggle('hidden', window.pageYOffset < window.innerHeight);
}

/**
 * Resets the vertical scroll position of the window without changing the horizontal scroll.
 *
 */
function resetScroll() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

/**
 * Refreshes the global list of sections. Should be called after sections have been added to or removed from the document.
 *
 */
function refreshSectionList() {
  sections = mainElem.querySelectorAll('section');
  updateNavList(sections);
}

/**
 * End Helper Functions
 * Start Event Listeners
 *
 */

/**
 * End Event Listeners
 * Begin Main Functions
 *
 */

/**
 * Main function,which starts the script.
 *
 */
function init() {
  const start = performance.now();
  // Setting up Children Observer
  mainChildrenObserver.observe(mainElem, { childList: true });
  document
    .querySelector('main')
    .addEventListener('click', mainClickObserverCallback);
  document.addEventListener('scroll', scrollObserverCallback);
  document
    .querySelector('.navbar__menu')
    .addEventListener('click', navLinkClickedObserverCallback);
  refreshSectionList();

  // Highlighting Sections manually once
  refreshSectionHighlighting();
}

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

/**
 * A MutationCallback. Checks, wether elements have been added or removed and the calls the refreshSectionList()-function.,
 *
 * @param {MutationRecord[]} mutationsList
 * @param {MutationObserver} observer
 * @return {*} Always returns null.
 */
function childrenObserverCallback(mutationsList, observer) {
  for (const mutation of mutationsList) {
    const nodes = [...mutation.addedNodes, ...mutation.removedNodes];
    for (const node of nodes.values()) {
      if (node.nodeName == 'SECTION') {
        refreshSectionList();
        return;
      }
    }
  }
}

/**
 *  Waits for 100ms and then calls the refreshSectionHighlighting()-function. If called again earlier than 100ms, the timeout is cleared and setuped again.
 *
 * @param {Event} event
 */
function scrollObserverCallback(event) {
  if (scrollBrake) {
    clearTimeout(scrollBrake);
  }
  document.querySelector('.page__header').classList.remove('fade-out');
  srcollBrake = setTimeout(refreshSectionHighlighting, 100);
}

/**
 * Checks wether the target of the @param event is a '.collapse'-item, then toggles the items textContent and collapes the element according to the included targetId.
 *
 * @param {Event} event
 */
function mainClickObserverCallback(event) {
  const target = event.target;
  if (target.classList.contains('collapse')) {
    target.textContent = target.textContent == 'X' ? 'V' : 'X';
    document
      .querySelector(`#${target.dataset.targetId}`)
      .classList.toggle('collapsed');
  }
}

/**
 * Checks wether the target of the @param event ist a '.menu__link' and then scrolls to the elements according to the included targetId.
 *
 * @param {Event} event
 */
function navLinkClickedObserverCallback(event) {
  const clickTarget = event.target;
  if (
    clickTarget.classList.contains('menu__link') &&
    clickTarget.dataset.targetId
  ) {
    const scrollTarget = document.querySelector(
      `#${clickTarget.dataset.targetId}`
    );
    window.scrollTo({
      top:
        scrollTarget.getBoundingClientRect().top +
        window.pageYOffset -
        getNavBarHeight(),
      behavior: 'smooth',
    });
  }
}

init();

/**
 * End Events
 * Begin Debug and Demonstration
 *
 */

/**
 * Returns a lorem ipsum-content for debug and styling purposes. Takes a @param sectionNumber, which will stored as the targetId, for other events.
 *
 * @param {Number} sectionNumber
 * @return {String}
 */
function sectionHTML(sectionNumber) {
  return `
        <div class='landing__container'>
            <i class='collapse' data-target-id='section${sectionNumber}'>X</i>
            <h2>Section</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra
            dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus
            imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget
            bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet
            elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo
            nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie
            semper in tellus. Sed congue et odio sed euismod.</p>

            <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel
            luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur
            porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
      </div>`;
}

/**
 * Creates a section with the help of the sectionHTML()-function
 *
 * @param {Number} sectionNumber
 */
function createSection(sectionNumber) {
  const section = document.createElement('section');
  section.dataset.nav = `section${sectionNumber}`;
  section.id = `section${sectionNumber}`;
  section.innerHTML = sectionHTML(sectionNumber);
  section.querySelector('h2').textContent = `Section ${sectionNumber}`;
  mainElem.appendChild(section);
}

/**
 * Adds 6 sections for debug and styling purposes.
 *
 */
function addSections() {
  document.querySelector('#add-sections-button').remove();
  let i = 4;
  const interval = setInterval(() => {
    createSection(i);
    i++;
    if (i == 11) {
      clearInterval(interval);
    }
  }, 100);
}

/**
 * End Events
 */
