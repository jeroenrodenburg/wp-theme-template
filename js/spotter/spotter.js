/* jshint esversion: 6 */

/**
 * Check if selected element(s) are in the view of the window. Animate them in or add your own function to deal with the results.
 * @author Emiel Zuurbier <emielzuurbier@outlook.com>
 */
class Spotter {

  /**
   * Creates an instance of the Spotter class.
   * Takes 1 mandatory argument and 2 optional arguments.
   * @class
   * @param {(string|HTMLElement|HTMLCollection[])} selector - Name of elements in string or HTMLCollection.
   * @param {Object=} [options = {}] - Options for configuring the class.
   * @param {(Object|String|Boolean)} options.animation - Object with animation properties or String with classname or Boolean with false for attribute animation.
   * @param {String} options.animation.name - Name of keyframe animation.
   * @param {Number} options.animation.duration - Duraction in ms (milliseconds).
   * @param {String} options.animation.fillMode - Fillmode of animation.
   * @param {Number} options.animation.delay - Delay of animation in ms (milliseconds).
   * @param {String} options.animation.timingFunction - Easing of animation.
   * @param {String} options.animation.iterationCount - Amount of animation iterations.
   * @param {String} options.animation.directions - Direction of animation.
   * @param {String} options.animation.playState - Play-state of animation.
   * @param {Number} options.delay - Delay of firing animation and callback in ms (milliseconds).
   * @param {Number} options.stagger - Amount of delay between elements in ms (milliseconds).
   * @param {Number} options.offset - Start counting from given offset.
   * @param {Boolean} options.restore - Restore to first position when element leaves view.
   * @param {(Boolean|Number)} options.partInView - True: fires when element is partialy in view, False: fires when element is fully in view, Number = fires when element passes window width and height divided by the number given.
   * @param {Boolean} options.lazyLoadImages - Load images when they enter into view. Image can be the selector or children of the selector. Images have to have an attribute of 'data-src' with the URL referring to the image's source.
   * @param {Function} options.onSpotted - Function that fires when element is in view. Has three parameters given: 'element' (the element that is in view), the index of the element in the HTMLCollection and 'this' (referring to the class and gives access to the methods of Spotter).
   * @param {Function} options.onUnSpotted - Function that fires when element is out of view. Has three parameters given: 'element' (the element that is out of view), the index of the element in the HTMLCollection and 'this' (referring to the class and gives access to the methods of Spotter).
   */
  constructor(selector, options = {}) {

    // Check what type selector is and save it to this.selectors.
    if (selector) {
      if ('string' === typeof selector) {
        this.selectors = document.querySelectorAll(selector);
      } else if ('object' === typeof selector) {
        if (selector.length) {
          this.selectors = selector;
        } else {
          this.selectors = [selector];
        }
      }
    } else { // if there is no selector argument.
      return; // end script
    }

    // Checks what type options is and saves this to this.options.
    if (options) {
      if ('object' === typeof options) {
        if (!options.length) {
          this.options = options;
        }
      }
    }

    // Set windowheight.
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;

    // Default options.
    this.defaults = {
        animation: {
          name: '',
          duration: 500,
          fillMode: 'forwards',
          delay: 0,
          timingFunction: 'ease',
          iterationCount: '1',
          direction: 'normal',
          playState: 'running'
        },
        hide: false,
        delay: 0,
        stagger: 0,
        offset: 0,
        chainReaction: false,
        restore: false,
        partInView: true,
        lazyLoadImages: false,
        onSpotted: () => {},
        onUnSpotted: () => {}
    };

    this.init();

  }

  /**
   * Init method which checks if elements are in view on init and adds events.
   */
  init() {

    this.updateSettings(this.options);
    this.prepareElements();
    this.spotElements();
    this.events();

  }

  /**
   * Update the defaults settings.
   * @param {Object} options - Objects with new options.
   */
  updateSettings(options) {

    if (options) {
      for (let key in this.defaults) {
        if (this.defaults.hasOwnProperty(key)) {
          if (options[key] !== undefined) {
            this.defaults[key] = options[key];
          }
        }
      }
    }

  }

  /**
   * Set events to instance.
   * Sets up resize and scroll listeners.
   */
  events() {

    // Check if input is scroll or touch.
    var handler = document.documentElement.hasOwnProperty('touchmove') ? 'touchmove' : 'scroll' ;

    // Reassign window inner width and inner height.
    const updateWindowHeight = () => {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    };

    // Update window height and width on resize.
    window.addEventListener('resize', () => {
      requestAnimationFrame(this.spotElements.bind(this));
      requestAnimationFrame(updateWindowHeight.bind(this));
    }, false);

    // Check all elements on scroll.
    window.addEventListener(handler, () => {
      requestAnimationFrame(this.spotElements.bind(this));
    }, false);

  }

  /**
   * Loop over all the selected elements.
   * @param {requestCallback} callback - Callback gets two argument: element, index.
   */
  each(callback) {

    if (callback) {
      if (this.selectors.length) {
        let i = this.defaults.offset,
         l = this.selectors.length;
        for (i; i < l; i++) {
          let selector = this.selectors[i];
          callback(selector, i);
        }
      }
    }

  }

  /**
   * Loops over all elements, gives each an index number and hides the elements if 'hide' is true.
   */
  prepareElements() {

    this.each((element, index) => {
      if (this.defaults.hide) {
        this.hideElement(element);
      }
      element.elementInView = false;
      element.spotted = false;
      element.index = index;
    });

  }

  /**
   * Loop over selected elements and see if they are in view.
   * If an element is in view it fires the spotHandler.
   * If an element is out of view it checks if restore is true. If restore is true the animation is removed from the element.
   */
  spotElements() {

    this.each((element, index) => {
      if (this.inView(element)) {
        if (element.elementInView === false) {
          this.spotHandler(element);
          if (element.spotted === false) {
            this.defaults.onSpotted(element, index, this);
          }
          element.elementInView = true;
          element.spotted = true;
        }
      } else {
        if (element.elementInView === true) {
          if (this.defaults.restore) {
            this.removeAnimation(element);
            if (element.spotted === true) {
              this.defaults.onUnSpotted(element, index, this);
            }
            element.spotted = false;
          }
          element.elementInView = false;
        }
      }
    });

  }

  /**
   * Decides what to do with the element based on the settings.
   * @param {HTMLElement} element - Element to investigate.
   */
  spotHandler(element) {

    // Delay the animation and callback with the amount given by 'delay'
    setTimeout(() => {
      if (element) {
        if (this.defaults.lazyLoadImages) {
          if (this.defaults.animation) {
            this.lazyLoad(element, this.addAnimation(element));
          } else {
            this.lazyLoad(element);
          }
        } else {
          if (this.defaults.animation) {
            this.addAnimation(element);
          }
        }
      }
    }, this.defaults.delay);

  }

  /**
   * Checks if element is in view.
   * @param {HTMLElement} element - Element to check if it is in view.
   * @returns {Boolean} - True: element is in view. False: element is not in view.
   */
  inView(element) {

    // Get bounds of element.
    let rect = element.getBoundingClientRect();

    // If element is in view.
    if (this.defaults.partInView) {
      if ('number' === typeof this.defaults.partInView) {
        let absolutePartInView = Math.abs(this.defaults.partInView);
        return (
          (this.windowHeight - this.windowHeight / absolutePartInView) > rect.top &&
          rect.bottom > this.windowHeight / absolutePartInView
        );
      } else if ('boolean' === typeof this.defaults.partInView) {
        return (
          (
            (this.windowHeight > rect.top && 0 < rect.top) ||
            (rect.bottom > 0 && rect.bottom < this.windowHeight)
          ) &&
          (
            (this.windowWidth > rect.left && 0 < rect.left) ||
            (rect.right > 0 && rect.right < this.windowWidth)
          )
        );
      }
    } else {
        return (
          this.windowHeight > rect.top  &&
          rect.bottom > 0 &&
          this.windowWidth > rect.left &&
          rect.right > 0
        );
    }

  }

  /**
   * Load images when they enter the view.
   * Images have to have an attribute 'data-src' which contains the source of the image.
   * The 'src' attribute will be set when the image is in view and loaded.
   * @param {HTMLElement} element
   * @param {function} callback - Function to fire when the image is loaded.
   */
  lazyLoad(element, callback) {

    function loadImage(imageElement) {
      let image = new Image(),
        source = imageElement.getAttribute('data-src');
      image.onload = () => {
        imageElement.removeAttribute('data-src');
        imageElement.setAttribute('src', source);
        if (callback && 'function' === typeof callback) {
          callback();
        }
      };
      image.src = source;
    }

    if (element) {
      if (element.hasAttribute('data-src')) { // If the element itself is an image with a 'data-src' attribute
        loadImage(element);
      } else { // When the element has images as children

        let imageElements = element.querySelectorAll('img'),
          i = 0,
          l = imageElements.length;

        for (i; i < l; i++) {
          let imageElement = imageElements[i];
          if (imageElement.hasAttribute('data-src')) {
            loadImage(imageElement);
          }
        }

      }
    }

  }

  /**
   * Sets the element's opacity to 1.
   * @param {HTMLElement} element
   */
  showElement(element) {

    if (element) {
      element.style.opacity = '1';
    }

  }

  /**
   * Sets the element's opacity to 0.
   * @param {HTMLElement} element
   */
  hideElement(element) {

    if (element) {
      element.style.opacity = '0';
    }

  }

  /**
   * Check if animation property is an object or class and add the corresponding animation.
   * @param {HTMLElement} element - HTMLElement.
   */
  addAnimation(element) {

    if (element) {
      if (this.defaults.animation) {
        if ('object' === typeof this.defaults.animation) {
          this.setAnimationAttributes(element);
        } else if ('string' === typeof this.defaults.animation) {
          this.addAnimationClass(element);
        }
      } else {
        if (element.hasAttribute('data-class')) {
          element.classList.add(element.getAttribute('data-class'));
        }
      }
    }

  }

  /**
   * Check if animation property is an object or class and remove the corresponding animation.
   * @param {HTMLElement} element - HTMLElement.
   */
  removeAnimation(element) {

    if (element) {
      if (this.defaults.animation) {
        if ('object' === typeof this.defaults.animation) {
          this.removeAnimationAttributes(element);
        } else if ('string' === typeof this.defaults.animation) {
          this.removeAnimationClass(element);
        }
      } else {
        if (element.hasAttribute('data-class')) {
          element.classList.remove(element.getAttribute('data-class'));
        }
      }
    }

  }

  /**
   * Add animation attribute to the argument.
   * @param {HTMLElement} element - Element to which the attributes are set.
   */
  setAnimationAttributes(element) {

    let stagger = 0;
    var delay = this.defaults.animation.delay;

    if (element) {
      if (this.defaults.stagger) {
        if ('number' === typeof this.defaults.stagger) {
          stagger = this.defaults.stagger * element.index;
        }
      }
      if (element.hasAttribute('data-delay')) {
        delay = element.getAttribute('data-delay');
      }
      element.style.webkitAnimation = `${this.defaults.animation.name} ${this.defaults.animation.duration}ms ${this.defaults.animation.fillMode} ${delay + stagger}ms ${this.defaults.animation.timingFunction} ${this.defaults.animation.iterationCount} ${this.defaults.animation.direction} ${this.defaults.animation.playState}`;
      element.style.animation = `${this.defaults.animation.name} ${this.defaults.animation.duration}ms ${this.defaults.animation.fillMode} ${delay + stagger}ms ${this.defaults.animation.timingFunction} ${this.defaults.animation.iterationCount} ${this.defaults.animation.direction} ${this.defaults.animation.playState}`;
    }

  }

  /**
   * Removes animation attribute from the argument.
   * @param {HTMLElement} element - Element to which the attributes are removed from.
   */
  removeAnimationAttributes(element) {

    if (element) {
      element.style.webkitAnimation = '';
      element.style.animation = '';
    }

  }

  /**
   * Adds animation class to argument.
   * @param {HTMLElement} element - Element to which the animation class is added to.
   */
  addAnimationClass(element) {

    if (element) {
      element.classList.add(this.defaults.animation);
    }

  }

  /**
   * Removes animation class from argument.
   * @param {HTMLElement} element - Element to which the animation class is removed from.
   */
  removeAnimationClass(element) {

    if (element) {
      element.classList.remove(this.defaults.animation);
    }

  }

} // End of class Spotter.
