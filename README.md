# Landing Page Project

## Table of Contents

* [Instructions](#instructions)
* [HTML](#html)
* [CSS](#css)
* [JS](#js)
  * [Global Variables](#global-variables)
  * [Helper Functions](#helper-functions)
  * [Events](#events)
  * [Debug](#debug)

## Instructions

The Landing Page Project consits of the following content:

### HTML
Nothing really changed here. As the sections can collapse now, there have been `i`-elements added, which toggle this behaviour.
### CSS
Relevant additions as following:
- `button`
- `.reset-scroll-button`
- `.button-centered` and `.button-centered button`
- `landing__container .collapse` and `section.collapsed` ...
### JS
The app.js contains all necessary functions for the required behaviour. It has the follow structure

#### Global Variables
In addition to some global shortcuts, which only represent `document.querySelector(<Something>)` there are:
1. `sections`: It holds all `<section>`-elements, which are central to the whole functionality and thus often needed.
2. `scrollBrake`: It holds the timeouted scroll event handler, to throttle it's execution.
3. `mainChildrenObserver`: It inits the update of the navbar after adding or removing `<section>`-elements in the `main`-element.

#### Helper Functions
The helper functions do the main job by updating the DOM after they are called by the event handlers.

#### Main Functions
The `init()`-function ist the only main-function in the script so far. It initializes the event handlers and highlights the sections manually once.

#### Events
There are four events around currently.
1. `childrenObserverCallback`: A MutationCallback. Checks, wether elements have been added or removed and the calls the refreshSectionList()-function.
2. `scrollObserverCallback`: Waits for 100ms and then calls the `refreshSectionHighlighting()`-function. If called again earlier than 100ms, the timeout is cleared and setuped again.
3. `mainClickObserverCallback`: Checks wether the target of the `event` is a `.collapse`-item, then toggles the items `textContent` and collapes the element according to the included `targetId`.
4. `navLinkClickedObserverCallback`: Checks wether the `target` of the `event` ist a `.menu__link` and then scrolls to the elements according to the included `targetId`.

#### Debug
The appended code is only for debuging and styling. It is called by clicking the button below the standard sections.
