/* jshint esversion: 6*/

/**
 * Responsive slider with parallax capabilities
 * @author Emiel Zuurbier <emielzuurbier@outlook.com>
 * @class
 */
class Slider {

  /**
   *  @param {String} selector - class or ID to select the rails of the slider.
   *  @param {Object=} [options = {}] - Options for configuring instance of the class.
   *  @param {Number} options.amountOfSlides - Amount of slides per time in view.
   *  @param {Boolean} options.autoplay - True or False to autoplay.
   *  @param {Number} options.autoplaySpeed - Time between slides in ms (milliseconds).
   *  @param {String} options.activeSlideClass - Class that is added to the slides in view.
   *  @param {Boolean} options.dots - If true outputs a unordered list with dots for navigation.
   *  @param {String} options.easing - String with easing given. Can be any CSS easing available.
   *  @param {Boolean} options.forceSlideWidth - Forcefully set the width calculated on the width of the slider.
   *  @param {HTMLElement} options.prevButton - Select an HTMLElement for navigating back.
   *  @param {HTMLElement} options.nextButton - Select and HTMLElement for navigating forward.
   *  @param {Boolean} options.pauseOnHover - True to pause on hovering over the slider. Resets the autoplay time on mouseout.
   *  @param {(String|Boolean)} options.parallax - Creates a parallax effect while sliding. String with class, id or element to select the parallax layer within the slide. True to use the first child of the slider as parallax layer.
   *  @param {Number} options.parallaxIntensity - The normal speed divided by the intensity. Eg: 2 = normalSpeed / 2 = 50%. The closer to 0 the more intense the effect.
   *  @param {Number} options.slidesToScroll - The amount of slides that have to be moved when sliding.
   *  @param {Boolean} options.scroll - True to scroll with mousewheel.
   *  @param {Number} options.scrollIntensity
   *  @param {Boolean} options.touch - Set true if slider has to be swipeable on touch devices.
   *  @param {Number} options.touchTreshold - Amount of pixels that has to be swiped to move to the next slide.
   *  @param {Number} options.transitionSpeed - Duration of transition in ms (milliseconds).
   *  @param {Array[]} options.responsive - Array with object that contains a breakpoint and an object with settings like the options paramter of the class.
   *  @param {Number} options.responsive.breakpoint - Number in px to set the breakpoint.
   *  @param {Object} options.responsive.options - Options like the options parameter that override the initial settings given when the breakpoint is met.
   */
  constructor(selector, options = {}) {

    // Checks if selector argument is present and is a string
    // In case there is no selector argument given, the function will return
    if (selector) {
      if (typeof selector === 'string') {
        this.slider = document.querySelector(selector);
      } else if (selector instanceof HTMLElement || selector.nodeType === 1) {
        this.slider = selector;
      }
    } else {
      return;
    }

    // Checks if options argument is present and is an object
    if (options) {
      if (typeof options === 'object') {
        this.options = options;
      }
    }

    // Store often reused data values is data object
    this.data = {
      activeBreakpoint: null,
      animating: false,
      breakpoints: [],
      breakpointSettings: [],
      currentSlide: 0,
      currentPosition: 0,
      dotsList: null,
      hovering: false,
      interval: null,
      touchStart: null,
      touchMove: null,
      touchEnd: null,
      touchDistance: null,
    };

    // Default settings of slider
    this.defaults = {
      amountOfSlides: 1,
      autoplay: false,
      autoplayMode: 'slide',
      autoplaySpeed: 6000,
      activeSlideClass: 'active',
      dots: false,
      easing: 'cubic-bezier(0.67, 0, 0.34, 1)',
      forceSlideWidth: true,
      prevButton: document.getElementById('slider-prev'),
      nextButton: document.getElementById('slider-next'),
      pauseOnHover: true,
      parallax: false,
      parallaxIntensity: 2,
      slidesToScroll: 1,
      scroll: false,
      scrollIntensity: 5,
      touch: true,
      touchTreshold: 100,
      transitionSpeed: 500,
      responsive: []
    };


    // Check if there are slides. If not, exit.
    if (this.slider !== null) {
      if (this.slider.children.length) {
        this.slides = this.slider.children;
      } else {
        return;
      }
    } else {
      return;
    }

    // Fire everything!
    this.init();

  }

  /**
   *  Returns the current slides.
   *
   *  @returns {Array[]}
   */
  get currentSlide() {

    var currentSlide = [];

    for (let i = this.data.currentSlide; i < this.data.currentSlide + this.defaults.amountOfSlides; i += 1) {
      currentSlide.push(this.slides[i]);
    }

    // Select the slides and return it
    return currentSlide;
  }

  /**
   *  Set the current slide and move to it.
   *
   *  @param {Number} index - Number of slide to set as current.
   */
  set currentSlide(index) {

    if ('number' === typeof index && index >= 0 && index <= this.slides.length - this.defaults.amountOfSlides) {

      // Select the slide
      let currentSlide = this.slides[index];
      this.data.currentSlide = index;

      // Move to the selected slide
      this.moveToCurrentSlide();

    }

  }

  /**
   *  Fire all the methods needed to init the slide.
   */
  init() {

    this.overwriteOptions(this.options);
    this.registerBreakpoints();
    this.checkResponsive();
    this.setActiveSlides();
    this.addFlexToRails();
    this.setSliderWidth();
    this.setSlideWidth();
    this.setSlideIndex();
    this.setActiveSlides();
    this.selectParallaxElements();
    this.setParallaxPosition();
    this.initEvents();
    this.startInterval();

  }

  /**
   *  Update the settings with new parameters.
   *
   *  @param {Object} options - Object with options same as when creating an instance of the slide.
   */
  update(options) {

    // Checks if options argument is present and is an object
    if (options) {
      if (typeof options === 'object') {
        this.options = options;
        this.init();
      }
    }

  }

  /**
   *  Override default properties with options from instance.
   *
   *  @param {Object} options - Object with options same as when creating an instance of the slide.
   */
  overwriteOptions(options) {

    // Check if the keys from options match those from the defaults
    // If the keys match, replace the value
    for (let key in this.defaults) {
      if (this.defaults.hasOwnProperty(key)) {
        if (options[key] !== undefined) {
          this.defaults[key] = options[key];
        }
        if (this.slider.dataset[key] !== undefined) {
          this.defaults[key] = parseInt(this.slider.dataset[key], 10);
        }
      }
    }

  }

  /**
   *  Loop over all the slides and fire a callback function.
   *
   *  @param {Function} callback - Callback function which has two arguments: slide, the current slide and index, the index of the slide.
   */
  eachSlide(callback) {

    // If callback is a function
    if (callback && 'function' === typeof callback) {

      // Loop over the slides
      for (let index = 0; index < this.slides.length; index += 1) {
        let slide = this.slides[index];
        callback(slide, index);
      }

    }

  }

  /**
   *  Register the breakpoints to check for settings in the responsive array.
   */
  registerBreakpoints() {

    var breakpoint,
      currentBreakpoint,
      responsive = this.defaults.responsive,
      l;

    if (typeof responsive === 'object' && responsive.length) {
      for (breakpoint in responsive) {

        l = this.data.breakpoints.length - 1;

        if (responsive.hasOwnProperty(breakpoint)) {
          currentBreakpoint = responsive[breakpoint].breakpoint;

          // loop through the breakpoints and cut out any existing
          // ones with the same breakpoint number, we don't want dupes.
          while( l >= 0 ) {
            if( this.data.breakpoints[l] && this.data.breakpoints[l] === currentBreakpoint ) {
                this.data.breakpoints.splice(l,1);
            }
            l--;
          }

          this.data.breakpoints.push(responsive[breakpoint].breakpoint);
          this.data.breakpointSettings.push(responsive[breakpoint].options);

        }

      }
    }

  }

  /**
   *  Adjust the settings given in the responsive to the breakpoints in the screen.
   */
  checkResponsive() {

    var windowWidth = window.innerWidth,
      breakpoint,
      targetBreakpoint;

    // If there are entries in the responsive array
    if (this.defaults.responsive && this.defaults.responsive.length && this.defaults.responsive !== null) {

      targetBreakpoint = null;

      // Loop over all the responsive entries
      for (let i = 0; i < this.data.breakpoints.length; i += 1) {
        breakpoint = this.data.breakpoints[i];


          if (windowWidth <= breakpoint) {
            targetBreakpoint = i;
          }

      }

      if (targetBreakpoint !== null) {

        if (this.data.activeBreakpoint !== null) {

          if (targetBreakpoint !== this.data.activeBreakpoint) {
            this.data.activeBreakpoint = this.data.breakpoints[targetBreakpoint];
            this.overwriteOptions(this.data.breakpointSettings[targetBreakpoint]);
          }

        } else {

          this.data.activeBreakpoint = this.data.breakpoints[targetBreakpoint];
          this.overwriteOptions(this.data.breakpointSettings[targetBreakpoint]);

        }

      } else {

        if (this.data.activeBreakpoint !== null) {
          this.data.activeBreakpoint = null;
          this.overwriteOptions(this.options);
        }

      }

    }

  }

  /**
   *  See if slide is currently in view.
   */
  checkIfInView() {

    this.data.activeSlides = [];

    // Loop over all the slides and check their position on the screen
    // If a slide's left position is less than half the slider width
    for (let i = this.slides.length - 1; i > -1; i--) {

      let slideHalf = this.sliderWidth / 2;
      let slidePosition = this.getSlidePosition(i);

      if (slidePosition.left >= 0 && slidePosition.right <= this.sliderWidth) {

        let currentSlide = this.slides[i];
        this.data.currentSlide = i;
        this.data.activeSlides.push(currentSlide);
        this.addCurrentClass(currentSlide);

      } else {

        let otherSlide = this.slides[i];
        this.removeCurrentClass(otherSlide);

      }
    }

  }

  /**
   *  Calculate the width of the rails and set it.
   *  This is very useful to calculate the position of the rails.
   */
  setSliderWidth() {

    // Get the width of the slider container
    if (this.slider.parentNode !== null) {

      // Get the width of the slider container
      this.sliderWidth = this.slider.parentNode.offsetWidth;

      // Set the width of the slider
      this.railsWidth = (this.sliderWidth / this.defaults.amountOfSlides) * this.slides.length;
      this.slider.style.width = `${this.railsWidth}px`;

    }

  }

  /**
   *  Give all slides a fixed width.
   *
   *  @param {Number} width - Width in pixels to set the sliders to.
   */
  setSlideWidth(width) {

    this.slideWidth = width ? width : this.sliderWidth / this.defaults.amountOfSlides;

    // Set width of slide in flex units
    this.slideWidthPercentage = (this.slideWidth / this.sliderWidth) * 100;

    if (this.defaults.forceSlideWidth !== false) {

      this.eachSlide((slide) => {
        slide.style.width = `${this.slideWidth}px`;
      });

    }

  }

  /**
   *  Add order attribute to the slides.
   */
  setSlideIndex() {

    // Loop over all the slides
    this.eachSlide((slide, index) => {
      if (slide.hasAttribute('data-index')) {
        let dataIndex = slide.getAttribute('data-index');
        slide.style.webkitBoxOrdinalGroup = dataIndex + 1;
        slide.style.msFlexOrder = dataIndex;
        slide.style.order = dataIndex;
      } else {
        slide.setAttribute('data-index', index);
        slide.style.webkitOrdinalGroup = index + 1;
        slide.style.msFlexOrder = index;
        slide.style.order = index;
      }
    });

  }

  /**
   *  Setup all events.
   */
  initEvents() {

    window.addEventListener('resize', () => {
      this.checkResponsive();
      this.sliderWidth = this.slider.offsetWidth;
      this.setSliderWidth();
      this.setSlideWidth();
      this.setParallaxPosition();
      this.moveToCurrentSlide();
    }, false);

    /**
     *  Pause on hover event.
     */
    if (this.defaults.pauseOnHover === true || this.defaults.pauseOnHover === 1) {

      this.slider.addEventListener('mouseover', (e) => {
        if (this.data.hovering === false) {
          this.stopInterval();
        }
        this.data.hovering = true;
      }, false);

      this.slider.addEventListener('mouseout', (e) => {
          if (this.data.hovering === true) {
            this.startInterval();
          }
        this.data.hovering = false;
      }, false);

    }

    /**
     *  Mousewheel scroll event.
     */
    if (this.defaults.scroll === true || this.defaults.scroll === 1) {

      this.slider.addEventListener('wheel', (e) => {

        var delta = e.wheelDeltaY || -e.deltaY * 1.5;

        var distance = delta / this.defaults.scrollIntensity,
          target = this.data.currentPosition - distance,
          end = this.getSliderPosition().right;

        if (delta > 0) {
          if (end < this.sliderWidth + 10) {

            this.moveTo(-this.railsWidth + this.sliderWidth);

            if (this.isParallaxActive()) {
              this.moveParallax(-this.railsWidth + this.sliderWidth);
            }

          } else {

            this.moveTo(target);

            if (this.isParallaxActive()) {
              this.moveParallax(target);
            }

            if (Math.abs(this.getSliderPosition().left) > (this.slideWidth / 2) + this.slideWidth * this.data.currentSlide) {
                this.data.currentSlide += 1;
                this.setActiveSlides();
            }

          }

        } else if (delta < 0) {
          if (target > 0 - 10) {

            this.moveTo(0);

            if (this.isParallaxActive()) {
              this.moveParallax(0);
            }

          } else {

            this.moveTo(target);

            if (this.isParallaxActive()) {
              this.moveParallax(target);
            }

            if (Math.abs(this.getSliderPosition().left) < (this.slideWidth / 2) + this.slideWidth * (this.data.currentSlide - 1)) {
                this.data.currentSlide -= 1;
                this.setActiveSlides();
            }

          }

        }

        e.preventDefault();
      }, false);

    }

    /**
     *  Touch slide event.
     */
    if ((this.defaults.touch === true || this.defaults.touch === 1) && 'ontouchstart' in window) {
      this.slider.addEventListener('touchstart', (e) => {
        this.data.touchStart = e.changedTouches[0].screenX;
      }, {passive: false});

      this.slider.addEventListener('touchmove', (e) => {

        var intensity = (this.defaults.touchIntensity + 10) / 10;
        var end = this.getSliderPosition().right;

        this.data.touchMove = e.changedTouches[0].screenX;
        this.data.touchDistance = this.data.currentSlide * this.slideWidth + (this.data.touchStart - this.data.touchMove);

        if (this.data.animating === false) {
          if (this.data.touchDistance > 0 && this.sliderWidth <= end) {
            this.moveTo(-this.data.touchDistance);

            if (this.isParallaxActive()) {
              this.moveParallax(-this.data.touchDistance);
            }
          }
          this.stopInterval();
        }

      }, {passive: false});

       this.slider.addEventListener('touchend', (e) => {
         this.data.touchEnd = e.changedTouches[0].screenX;

         var absTouchDistance = Math.abs(this.data.currentSlide * this.slideWidth - this.data.touchDistance);

         if (this.data.animating === false) {
           if (absTouchDistance > (this.defaults.touchTreshold || this.slideWidth / 2)) {
             if (this.data.touchDistance > this.data.currentSlide * this.slideWidth) {
               this.moveSlider(this.defaults.slidesToScroll, 1);
             } else if (this.data.touchDistance < this.data.currentSlide * this.slideWidth) {
               this.moveSlider(this.defaults.slidesToScroll, 0);
             }
           } else {
             this.moveToCurrentSlide();
           }
           this.startInterval();
         }

      }, {passive: false});
    }

    /**
     *  Button previous event.
     */
    if (this.defaults.prevButton !== null) {
      this.defaults.prevButton.addEventListener('click', (e) => {

        if (this.data.animating === false) {
          this.moveSlider(this.defaults.slidesToScroll, 0);
        }

        if (this.defaults.autoplay === true || this.defaults.autoplay === 1) {
          this.stopInterval(true);
        }

        e.preventDefault();

      }, false);
    }

    /**
     *  Button next event.
     */
    if (this.defaults.nextButton !== null) {
      this.defaults.nextButton.addEventListener('click', (e) => {

        if (this.data.animating === false) {
          this.moveSlider(this.defaults.slidesToScroll, 1);
        }

        if (this.defaults.autoplay === true || this.defaults.autoplay === 1) {
          this.stopInterval(true);
        }

        e.preventDefault();

      }, false);
    }

  }

  /**
   *  Add the transition to the given element.
   *
   *  @param {HTMLElement} el - Element to add the animation to.
   *  @param {String} type - Type of transition to add to the element.
   */
  addTransition(el, type) {

    if (el) {

      var typeOfTransition;
      if (type && typeof type === 'string') {
        typeOfTransition = type;
      } else {
        typeOfTransition = 'transform';
      }

      el.style.webkitTransition = `${typeOfTransition} ${this.defaults.transitionSpeed}ms ${this.defaults.easing}`;
      el.style.transition = `${typeOfTransition} ${this.defaults.transitionSpeed}ms ${this.defaults.easing}`;

    }

  }

  /**
   *  remove the transition to the given element.
   *
   *  @param {HTMLElement} el - Element to remove transition from.
   */
  removeTransition(el) {

    if (el) {

      setTimeout(() => {

        el.style.webkitTransition = '';
        el.style.transition = '';

        this.data.animating = false;

      }, this.defaults.transitionSpeed);

    }

  }

  /**
   *  Set the active classes to the slides that are in view.
   */
  setActiveSlides() {

    // First remove the classes from all the slides
    this.eachSlide((slide) => {
      this.removeCurrentClass(slide);
    });

    // Add the active classes to the current slide + the amount of slides in view
    for (let j = this.data.currentSlide; j < this.data.currentSlide + this.defaults.amountOfSlides; j++) {
      let slide = this.slides[j];
      this.addCurrentClass(slide);
    }

  }

  /**
   *  Add current class state to slide.
   *
   *  @param {HTMLElement} slide - Slide to add current class to.
   */
  addCurrentClass(slide) {

    if (slide) {

      slide.setAttribute('aria-hidden', false);
      slide.classList.add(this.defaults.activeSlideClass);

    }

  }

  /**
   *  Remove current class state from slide.
   *
   *  @param {HTMLElement} slide - Slide to add current class from.
   */
  removeCurrentClass(slide) {

    if (slide) {

      slide.setAttribute('aria-hidden', true);
      slide.classList.remove(this.defaults.activeSlideClass);

    }

  }



  /**
   *  Force flexbox styling onto slider rails.
   */
  addFlexToRails() {

    // Add flex to slider container
    this.slider.style.display = '-webkit-flex';
    this.slider.style.display = '-ms-flexbox';
    this.slider.style.display = 'flex';
    this.slider.style.webkitAlignItems = 'stretch';
    this.slider.style.alignItems = 'stretch';

  }

  /**
   *  Checks if parallax is true or selected with a string
   *
   *  @returns {Boolean}
   */
  isParallaxActive() {

    if (('boolean' === typeof this.defaults.parallax && this.defaults.parallax === true) || ('number' === typeof this.defaults.parallax && this.defaults.parallax === 1 ) || 'string' === typeof this.defaults.parallax) {
      return true;
    } else {
      return false;
    }

  }

  /**
   *  Find the elements selected to animate in a parallax fashion.
   */
  selectParallaxElements() {

    // If a class or element is given in a string
    if ('string' === typeof this.defaults.parallax) {

      // Loop over the slides
      this.eachSlide((slide) => {

        // Select the parallaxElement
        var slideParallaxElement = slide.querySelector(this.defaults.parallax);

        // If the element is present attach it to the slide
        if (slideParallaxElement) {
          slide.parallaxElement = slideParallaxElement;
        } else {
          slide.parallaxElement = slide.firstElementChild;
        }

      });

    // If is a boolean with the value true
    } else if ('boolean' === typeof this.defaults.parallax) {
      if (this.defaults.parallax === true) {

        // Loop over the slides
        this.eachSlide((slide) => {

          // Select the firstElementChild
          slide.parallaxElement = slide.firstElementChild;

        });

      }
    }

  }


  /**
   *  Sets an offset to all parallax items.
   */
  setParallaxPosition() {

    // Calculate the with of each slide
    this.slideWidth = this.sliderWidth / this.defaults.amountOfSlides;

    // If parallax is normal. This is the ideal setting for having 1 slide visible
    if (this.isParallaxActive()) {

      if (this.defaults.amountOfSlides === 1) {

        // Loop over the slides per amount of slides shown on screen
        this.eachSlide((slide, i) => {

          // Set the style of the parallaxElement
          slide.parallaxElement.style.right = (this.slideWidth / this.defaults.parallaxIntensity) * i + 'px';
          slide.parallaxElement.style.width = this.slideWidth + 'px';

        });

      } else {

        // Loop over the slides per amount of slides shown on screen
        this.eachSlide((slide, i) => {

          // Set the style of the parallaxElement
          slide.parallaxElement.style.right = 0;
          slide.parallaxElement.style.width = this.slideWidth + ((this.slideWidth / this.defaults.parallaxIntensity) * i) + 'px';

        });

      }

    }

  }

  /**
   *  Get the offset of the slider.
   *
   *  @returns {Object} - Object with offset top, right, bottom and left.
   */
  getSliderPosition() {

    // Store the new current position
    let sliderPosition = this.slider.getBoundingClientRect();
    return sliderPosition;

  }

  /**
   *  Get the offset of the selected slide.
   *
   *  @param {Number} number - Nth slide to select.
   *  @returns {Object} - Object with offset top, right, bottom and left.
   */
  getSlidePosition(number) {

    if (typeof number === 'number') {

      // Select the slide
      let slide = this.slides[number];
      let slidePosition = slide.getBoundingClientRect();
      return slidePosition;

    }

  }

  /**
   *  Find the position of the current slide.
   *
   *  @returns {Object} - Object with offset top, right, bottom and left.
   */
  getCurrentSlidePosition() {

    // Select the slide
    let currentSlide = this.slides[this.data.currentSlide];
    let currentSlidePosition = currentSlide.getBoundingClientRect();
    return currentSlidePosition;

  }

  /**
   *  Select a slide from the slider.
   *
   *  @param {Number} number - Number of slide.
   *  @returns {HTMLElement} - Return the slide.
   */
  getSlide(number) {

    if (typeof number === 'number' && number >= 0 && number < this.slides.length) {

      let slide = this.slides[number];
      return slide;

    }

  }

  /**
   *  Move the slider without any transition.
   *
   *  @param {Number} position - Position to move to in px.
   */
  moveTo(position) {

    // Store the new current position
    this.data.currentPosition = position;

    // Animate the slider to the given position
    this.slider.style.webkitTransform = `translate3d(${this.data.currentPosition}px, 0, 0)`;
    this.slider.style.transform = `translate3d(${this.data.currentPosition}px, 0, 0)`;

  }

  /**
   *  Animate the slider with transition.
   *
   *  @param {Number} position - Position to move to in px.
   */
  animateTo(position) {

    // Store the new current position
    this.data.currentPosition = position;

    // Add a transition to the slider
    this.addTransition(this.slider);

    // Animate the slider to the given position
    this.slider.style.webkitTransform = `translate3d(${this.data.currentPosition}px, 0, 0)`;
    this.slider.style.transform = `translate3d(${this.data.currentPosition}px, 0, 0)`;

    // Remove the transition on the slider
    this.removeTransition(this.slider);

  }

  /**
   *  Move the parallax elements without transition.
   *
   *  @param {Number} offset - Offset to move to in px.
   */
  moveParallax(offset) {

    // Calculate the intensity of the translation
    var intensity = -offset / this.defaults.parallaxIntensity;

    // Loop over all the slides
    this.eachSlide((slide) => {

      // Move the elements
      slide.parallaxElement.style.webkitTransform = `translate3d(${intensity}px, 0, 0)`;
      slide.parallaxElement.style.transform = `translate3d(${intensity}px, 0, 0)`;

    });

  }

  /**
   *  Animate the parallax elements with transition.
   *
   *  @param {Number} offset - Offset to move to in px.
   */
  animateParallax(offset) {

    // Calculate the intensity of the translation
    var intensity = -offset / this.defaults.parallaxIntensity;

    this.eachSlide((slide) => {

      // Add transition
      this.addTransition(slide.parallaxElement);

      // Move the elements
      slide.parallaxElement.style.webkitTransform = `translate3d(${intensity}px, 0, 0)`;
      slide.parallaxElement.style.transform = `translate3d(${intensity}px, 0, 0)`;

      // Remove transition
      this.removeTransition(slide.parallaxElement);

    });

  }

  /**
   *  Move the slider to the currentSlide.
   */
  moveToCurrentSlide() {

    let position = this.getSliderPosition().left - this.getCurrentSlidePosition().left;
    this.animateTo(position);

    if (this.isParallaxActive()) {
      this.animateParallax(position);
    }

    this.setActiveSlides();

  }

  /**
   *  Move the slider to the desired position.
   *
   *  @param {Number} slidesToMove - Amount of pixels to move in a direction.
   *  @param {(Number|Boolean)} direction - 1/true moves to the right, 0/false moves to the left.
   */
  moveSlider(slidesToMove, direction) {

    if (slidesToMove && this.data.animating === false) {

      // Animation is happening!
      this.data.animating = true;

      var current = this.data.currentSlide,
        amountOfSlides = this.defaults.amountOfSlides,
        slidesLength = this.slides.length;

      // Direction to the right
      if (direction === 1 || direction === true) {

        if ((current + amountOfSlides - 1) + slidesToMove < slidesLength) {
          this.data.currentSlide += slidesToMove;
        } else if (current === slidesLength - amountOfSlides) {
          this.data.currentSlide = 0;
        } else if ((current + amountOfSlides - 1) + slidesToMove >= slidesLength) {
          this.data.currentSlide = slidesLength - amountOfSlides;
        }

      // Direction to the left
      } else if (direction === 0 || direction === false) {

        if (current - slidesToMove > 0) {
          this.data.currentSlide -= slidesToMove;
        } else if (current  === 0) {
            this.data.currentSlide = (slidesLength - 1) - amountOfSlides + 1;
        } else if (current - slidesToMove <= 0) {
          this.data.currentSlide = 0;
        }

      }

      // The animation stops after the transition has passed
      setTimeout(() => {
        this.data.animating = false;
      }, this.defaults.transitionSpeed);

    }

    // Move to currentslide
    this.moveToCurrentSlide();

  }

  /**
   *  Sets the animation state to animating and resets it when the animation is finished.
   */
  animationState() {

    if (this.data.animating === false) {
      this.data.animating = true;
      setTimeout(() => {
        this.data.animating = false;
      }, this.defaults.transitionSpeed);
    }

  }

  /**
   *  Set interval for autoplay
   */
  startInterval() {

    if (this.defaults.autoplay === true || this.defaults.autoplay === 1) {

      this.data.interval = setInterval(() => {
        this.moveSlider(this.defaults.slidesToScroll, 1);
      }, this.defaults.autoplaySpeed);

    }

  }

  /**
   *  Stop the autoplay interval
   *
   *  @param {Boolean=} reset - True to reset the interval.
   */
  stopInterval(reset) {

    clearInterval(this.data.interval);

    if (reset === true) {
      this.startInterval();
    }

  }

}


/**
 *  Extends Slider class with data-delay attributes to set the autoplaySpeed per slide
 *  @class
 *  @augments Slider
 */
class TimedSlider extends Slider {

  constructor(selector, options = {}) {
    super (selector, options);
  }

  /**
   *  Set interval for autoplay and check per currentSlide the autoplaySpeed
   */
  startInterval() {

    var self = this;

    this.stopInterval();

    if (this.defaults.autoplay === true || this.defaults.autoplay === 1) {

      var currentSlide = this.currentSlide[0];

      if (currentSlide.hasAttribute('data-delay')) {
        var delay = parseFloat(currentSlide.getAttribute('data-delay'));
          delay = delay * 1000;
        this.defaults.autoplaySpeed = delay >= this.defaults.transitionSpeed ? delay : 6000;
      } else {
        this.defaults.autoplaySpeed = this.options.autoplaySpeed ? this.options.autoplaySpeed : 6000;
      }

      this.data.interval = setTimeout(function delay() {
        self.moveSlider(self.defaults.slidesToScroll, 1);
        self.startInterval();
      }, this.defaults.autoplaySpeed);

    }

  }

  /**
   *  Stop the autoplay interval
   *
   *  @param {Boolean=} reset - True to reset the interval.
   */
  stopInterval(reset) {

    clearTimeout(this.data.interval);

    if (reset === true) {
      this.startInterval();
    }

  }

}
