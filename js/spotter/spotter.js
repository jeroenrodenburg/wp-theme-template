/*jshint esversion: 6 */

/**
 *  @name Spotter
 *  @author Emiel Zuurbier <emielzuurbier@outlook.com>
 *  @description Interact with elements when they enter the viewport. This script depends on the IntersectionObserver API.
 *  @version 2.1
 */

class SpotterItem {

  /**
   *  @param {(HTMLElement|HTMLCollection|Array|String)} elements - Elements to add
   *  @param {Object} options
   *  @param {(Object|String)} options.animation
   *  @param {String} options.animation.animationName
   *  @param {String} options.animation.animationDuration
   *  @param {String} options.animation.animationFillMode
   *  @param {String} options.animation.animationDelay
   *  @param {String} options.animation.animationTimingFunction
   *  @param {String} options.animation.animationIterationCount
   *  @param {String} options.animation.animationDirection
   *  @param {String} options.animation.animationPlayState
   *  @param {(Boolean|String)} options.hide
   *  @param {Boolean} options.repeat
   *  @param {Boolean} options.lazyLoad
   *  @param {Function} options.spotted
   *  @param {Function} options.unSpotted
   */
  constructor(elements, options) {
    this.elements = elements;
    this.options = options;
  }

  /**
   *  Get the list of elements.
   *  @return {NodeList} elementsList
   */
  get elements() {
    return this.elementsList;
  }

  /**
   *  Set new elements to the elementsList.
   *  @param {(HTMLElement|HTMLCollection|Array|String)} elements - Elements to add.
   */
  set elements(elements) {
    if (elements) {
      if (elements && 'object' === typeof elements) {
        if (elements instanceof NodeList ||
            elements instanceof HTMLCollection) {
              this.elementsList = elements;
        } else if (elements instanceof Array) {
          elements.forEach((element) => {
            this.elementsList.push(document.querySelector(element));
          });
        } else {
          throw new Error(
            `elements should be an array of elements,
            a single HTMLElement or a string.`
          );
        }
      } else if ('string' === typeof elements) {
          let elementsQuery = document.querySelectorAll(elements);
          if (elementsQuery.length) {
            this.elementsList = elementsQuery;
          }
      }
    } else {
      throw new Error(
        `First parameter "elements" has not been given.
        The function will halt.`
      );
    }
  }

  /**
   *  Get the options.
   *  @return {Object}
   */
  get options() {
    return this.settings;
  }

  /**
   *  Set new values to the options.
   *  @param {Object} options
   */
  set options(options) {
    if (options && 'object' === typeof options) {
      this.settings = {
        animation: false,
        hide: false,
        repeat: false,
        lazyLoad: false,
        spotted: () => {},
        unSpotted: () => {}
      };
      for (let key in this.settings) {
        if (this.settings.hasOwnProperty(key)) {
          if (options[key] !== undefined) {
            this.settings[key] = options[key];
          }
        }
      }
      if (this.elementsList && this.elementsList.length) {
        this.elementsList.forEach((element) => {
          element.spotterSettings = this.settings;
          element.spotterData = { hidden: false, inView: false };
        });
      }
    } else {
      throw new Error(`
        options argument is given or is not an object.`
      );
    }
  }

  /**
   *  Add new element to elementsList.
   *  @param {(HTMLElement|String)} element
   */
  addElement(element) {
    if (element) {
      if (element instanceof HTMLElement) {
        this.elementsList.push(element);
      } else if ('string' === typeof element) {
        this.elementsList.push(document.querySelector(element));
      }
    }
  }

  /**
   *  Remove element from elementsList.
   *  @param {Integer} index - Index of element to remove.
   */
  removeElement(index) {
    if (index) {
      this.elementsList.splice(index, 1);
    }
  }

}

/**
 *  Creates a new Spotter instance to watch elements.
 */
class Spotter {

  /**
   *  Create a new instance of Spotter.
   *  @param {Object} options
   *  @param {(Null|HTMLElement)} options.root
   *  @param {String} options.rootMargin
   *  @param {(Integer|Array)} options.threshold
   */
  constructor(options) {
    this.items = [];
    this.observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    };
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
    window.addEventListener('resize', (event) => {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    });
    if (options) {
      this.options = options;
    }
    if ('IntersectionObserver' in window) {
      this._setIntersectionObserver();
    }
  }

  /**
   *  Set options object.
   *  @param {Object} options - Object with properties for the options.
   */
  set options(options) {
    if (options && 'object' === typeof options) {
      for (let key in this.observerOptions) {
        if (this.observerOptions.hasOwnProperty(key)) {
          if (options[key] !== undefined) {
            this.observerOptions[key] = options[key];
          }
        }
      }
    } else {
      throw new Error(`
        options argument is not present or is not an object.`
      );
    }
  }

  /**
   *  Get options object.
   *  @returns {Object}
   */
  get options() {
    return this.observerOptions;
  }

  /**
   *  Create IntersectionObserver instance.
   */
  _setIntersectionObserver() {
    this.observer = new IntersectionObserver(this._inViewIntersectionObserver.bind(this), this.options);
  }

  /**
   *  Add elements to observer to watch.
   */
  _observeEntries() {
    this.items.forEach((item) => {
      item.elementsList.forEach((element) => {
        this.observer.observe(element);
      });
    });
  }

  /**
   *  Remove element from the observer.
   */
  _unObserveEntries(spotterItem) {
    spotterItem.elementsList.forEach((element) => {
      this.observer.unobserve(element);
    });
  }

  /**
   *  Callback for intersectionObserver.
   *  @param {Array} entries - Array of IntersectionObserverEntry instances.
   */
  _inViewIntersectionObserver(entries) {
    entries.forEach((entry) => {
      let settings = entry.target.spotterSettings;
      if (entry.isIntersecting === true) {
        if (settings.animation) {
          this.animate(entry.target);
        }
        if (
          settings.lazyLoad === true ||
          settings.lazyLoad === 1
        ) {
          this.lazyLoadImages(entry.target);
        }
        if (settings.spotted &&
          'function' === typeof settings.spotted
        ) {
          settings.spotted(entry.target);
        }
      } else {
        if (
          (settings.hide === true ||
          settings.hide === 1 ||
          'string' === typeof settings.hide) &&
          entry.target.spotterData.hidden === false
        ) {
          this.hide(entry.target);
          entry.target.spotterData.hidden = true;
        }
        if (
          settings.repeat === true ||
          settings.repeat === 1
        ) {
          this.hide(entry.target);
        }
        if (
          settings.unSpotted &&
          'function' === typeof settings.unSpotted
        ) {
          settings.unSpotted(entry.target);
        }
      }
    });
  }

  /**
   *  Checks if element is an instance of HTMLELement.
   *  @param {HTMLELement} element
   *  @returns {Boolean}
   */
  _isElement(element) {
    if (element) {
      try {
        return element instanceof HTMLElement;
      }
      catch (error) {
        return (typeof element === 'object') &&
          (element.nodeType === 1) && (typeof element.style === 'object') &&
          (typeof element.ownerDocument === 'object');
      }
    }
  }

  /**
   *  Continuous loop over elements when IntersectionObserver is not supported.
   *  Checks if elements are in view.
   */
  _loopAndCheck() {
    this.items.forEach((item) => {
      item.elementsList.forEach((element) => {
        let bounds = element.getBoundingClientRect();
        let settings = element.spotterSettings;
        let data = element.spotterData;
        if (
          (
            (bounds.top < this.windowHeight && bounds.top > 0) ||
            (bounds.bottom > 0 && bounds.bottom < this.windowHeight) ) &&
          (
            (bounds.left > this.windowWidth && bounds.left > 0) ||
            (bounds.right > 0 && bounds.right < this.windowWidth)
          )
        ) {
          if (data.inView === false) {
            data.inView = true;
            if (settings.animation) {
              this.animate(element);
            }
            if (
              settings.lazyLoad === true ||
              settings.lazyLoad === 1
            ) {
              this.lazyLoadImages(element);
            }
            if (settings.spotted &&
              'function' === typeof settings.spotted
            ) {
              settings.spotted(element);
            }
          }
        } else {
          if (data.inView === true) {
            data.inView = false;
            if (
              (settings.hide === true ||
              settings.hide === 1 ||
              'string' === typeof settings.hide) &&
              data.hidden === false
            ) {
              this.hide(element);
              data.hidden = true;
            }
            if (
              settings.repeat === true ||
              settings.repeat === 1
            ) {
              this.hide(element);
            }
            if (
              settings.unSpotted &&
              'function' === typeof settings.unSpotted
            ) {
              settings.unSpotted(element);
            }
          }
        }
      });
    });
    requestAnimationFrame(this._loopAndCheck.bind(this));
  }

  /**
   *  Add elements to the list and starts observing them.
   *  Creates a new instance of SpotterItem class.
   *  @param {(HTMLElement|HTMLCollection|Array|String)} elements - Elements to add
   *  @param {Object} options
   */
  add(elements, options = {}) {
    this.items.push(new SpotterItem(elements, options));
    if ('IntersectionObserver' in window) {
      this._observeEntries();
    } else {
      this._loopAndCheck();
    }
    return this;
  }

  /**
   *  Remove item from list and stops observing it.
   *  @param {Integer} index - Number of item to remove from array.
   */
  remove(index) {
    let item = this.items[index];
    if ('IntersectionObserver' in window) {
      this._unObserveEntries(item);
    }
    this.items.splice(index, 1);
    return this;
  }

  /**
   *  Set the animation on the element.
   *  @param {HTMLElement} element
   */
  animate(element) {
    if (element && this._isElement(element)) {
      let animation = element.spotterSettings.animation;
      if ('string' === typeof animation) {
        element.classList.add(animation);
      } else if ('object' === typeof animation) {
        for (let key in animation) {
          if (animation.hasOwnProperty(key)) {
            element.style[key] = animation[key];
          }
        }
      }
      return this;
    } else {
      throw new Error(`
        element is not an instance of HTMLElement or is not given.`
      );
    }
  }

  /**
   *  Hide the element when it is not in view.
   *  @param {HTMLElement} element
   */
  hide(element) {
    if (element && this._isElement(element)) {
      if ('boolean' === typeof element.spotterSettings.hide) {
        element.style.opacity = 0;
        element.style.visibility = 'hidden';
      } else if ('string' === typeof element.spotterSettings.hide) {
        element.classList.add(element.spotterSettings.hide);
      }
      if (element.spotterSettings.animation) {
        if ('string' === typeof element.spotterSettings.animation) {
          element.classList.remove(element.spotterSettings.animation);
        } else if ('object' === typeof element.spotterSettings.animation) {
          for (let key in element.spotterSettings.animation) {
            if (element.spotterSettings.animation.hasOwnProperty(key)) {
              element.style[key] = '';
            }
          }
        }
      }
      return this;
    } else {
      throw new Error(`
        element is not an instance of HTMLElement or is not given.`
      );
    }
  }

  /**
   *  Lazy load the image.
   *  @param {HTMLElement} element
   */
   lazyLoadImages(element) {
    const loadImage = (imageElement) => {
      let image = new Image();
      let source = imageElement.getAttribute('data-src');
      image.onload = () => {
        imageElement.removeAttribute('data-src');
        imageElement.setAttribute('src', source);
      };
      image.src = source;
    };
    if (element && this._isElement(element)) {
      if (element.hasAttribute('data-src')) {
        loadImage(element);
      } else {
        let images = element.querySelectorAll('img');
        if (images.length) {
          images.forEach((image) => {
            if (image.hasAttribute('data-src')) {
              loadImage(image);
            }
          });
        }
      }
    }
  }

}
