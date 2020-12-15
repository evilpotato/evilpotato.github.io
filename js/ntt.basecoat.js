/*!
 * @license
 * Basecoat v3.3.3 (https://brand.global.ntt)
 * Copyright (C) 2011-2020 NTT Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */


/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(src) {
	function log(error) {
		(typeof console !== "undefined")
		&& (console.error || console.log)("[Script Loader]", error);
	}

	// Check for IE =< 8
	function isIE() {
		return typeof attachEvent !== "undefined" && typeof addEventListener === "undefined";
	}

	try {
		if (typeof execScript !== "undefined" && isIE()) {
			execScript(src);
		} else if (typeof eval !== "undefined") {
			eval.call(null, src);
		} else {
			log("EvalError: No eval function available");
		}
	} catch (error) {
		log(error);
	}
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*!
 * Bootstrap v3.4.0 (https://getbootstrap.com/)
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: https://modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // https://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.4.0'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    selector    = selector === '#' ? [] : selector
    var $parent = $(document).find(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.4.0'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.4.0'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      if (typeof $next === 'object' && $next.length) {
        $next[0].offsetWidth // force reflow
      }
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    if (href) {
      href = href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
    }

    var target  = $this.attr('data-target') || href
    var $target = $(document).find(target)

    if (!$target.hasClass('carousel')) return

    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.4.0'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(document).find(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(document).find(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.4.0'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(document).find(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#modals
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options = options
    this.$body = $(document.body)
    this.$element = $(element)
    this.$dialog = this.$element.find('.modal-dialog')
    this.$backdrop = null
    this.isShown = null
    this.originalBodyPad = null
    this.scrollbarWidth = 0
    this.ignoreBackdropClick = false
    this.fixedContent = '.navbar-fixed-top, .navbar-fixed-bottom'

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION = '3.4.0'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
          this.$element[0] !== e.target &&
          !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    var scrollbarWidth = this.scrollbarWidth
    if (this.bodyIsOverflowing) {
      this.$body.css('padding-right', bodyPad + scrollbarWidth)
      $(this.fixedContent).each(function (index, element) {
        var actualPadding = element.style.paddingRight
        var calculatedPadding = $(element).css('padding-right')
        $(element)
          .data('padding-right', actualPadding)
          .css('padding-right', parseFloat(calculatedPadding) + scrollbarWidth + 'px')
      })
    }
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
    $(this.fixedContent).each(function (index, element) {
      var padding = $(element).data('padding-right')
      $(element).removeData('padding-right')
      element.style.paddingRight = padding ? padding : ''
    })
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
    var href = $this.attr('href')
    var target = $this.attr('data-target') ||
      (href && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7

    var $target = $(document).find(target)
    var option = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.4.0'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(document).find($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo($(document).find(this.options.container)) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.4.0'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
        o.content.call($e[0]) :
        o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.4.0'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.4.0'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(document).find(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
        .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
        .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
          .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#affix
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    var target = this.options.target === Affix.DEFAULTS.target ? $(this.options.target) : $(document).find(this.options.target)

    this.$target = target
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.4.0'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// todo: aria-expanded="true|false" on all collapsible content (accordions, tags, etc)

+function ($) {

  $.fn.accordion = function (option) {
    return this.each(function () {
      switch (option) {
      case 'show':
        if ($(this).parent().find('[data-toggle="collapse"]:first').hasClass('disabled')) return false;
        $(this).parent().find('[data-toggle="collapse"]:first').removeClass('collapsed').addClass('active');
        break;
      case 'hide':
        if ($(this).parent().find('[data-toggle="collapse"]:first').hasClass('disabled')) return false;
        $(this).parent().find('[data-toggle="collapse"]:first').addClass('collapsed').removeClass('active');
        break;
      case 'toggle':
        // prevent panels inside of accordions from doing anything to the accordion
        if ($(this).closest('.panel').length > 0) return false;
        // prevent open/close if toggle has class disabled on it
        if ($(this).hasClass('disabled')) return false;
        // progress-steps: exactly 1 accordion may be open at a time (and cannot be closed)
        // accordion-group: 0 or 1 accordions may be open at a time
        var $container = $(this).parent().parent();
        if ($container.is('[data-progress-steps], [data-accordion-group]')) {
          // close all OTHER accordions on the SAME level
          $container.find('> * > [data-toggle="collapse"]').not(this).next('.collapse').collapse('hide');
          // extra measure to prevent two steps opening at the same time when clicked too quickly
          var allowClose = $container.is('[data-accordion-group]') && $(this).hasClass('active');
          if ($container.find('> * > [data-toggle="collapse"]:not(.collapsed)').length > 0 && !allowClose) return;
        }
        // open/close this accordion
        $(this).next('.collapse').collapse('toggle');
        break;
      }
    });
  };

  $(document)
  // prevent open/close if toggle has class disabled on it, and
  // add/remove active/collapsed classes on the toggle for additional styling
  .on('show.bs.collapse', '.collapse', function (e) {
    e.stopPropagation();
    $(e.target).accordion('show');
  })
  .on('hide.bs.collapse', '.collapse', function (e) {
    e.stopPropagation();
    $(e.target).accordion('hide');
  })
  // this is so that we don't need to use a unique id (as per Bootstrap) for every single accordion
  .on('click.bc.accordion', '[data-toggle="collapse"]', function (e) {
    e.preventDefault();
    $(this).accordion('toggle');
  });

}(jQuery);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// load CSS Grid Animation
basecoat.animateGrid = __webpack_require__(28);

+function () {
  // First we find [data-dash-liquid]
  var grid = document.querySelector('[data-dash-liquid]');
  // Then we query if there is a grid
  if (document.body.contains(grid)) {
    // Then we animate the grid - if we don't do it this way, our console lights up on every page that doesn't have a liquid dash
    animateCSSGrid.wrapGrid(grid, {
      // int: default is 0 ms
      stagger: 45,
      // int: default is 250 ms
      duration: 450,
      // string: default is 'easeInOut'
      easing: 'easeInOut'
      // function: called with list of elements about to animate
      // onStart: (animatingElementList)=> {},
      // function: called with list of elements that just finished animating
      // cancelled animations will not trigger onEnd
      // onEnd: (animatingElementList)=> {}
    });
  }
}();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// init a global object (this can be used for sharing things like variables, plugins, and functions between components)
window.basecoat = window.basecoat || {};

basecoat.init = {};
basecoat.postInit = {};

+function ($) {

  $.fn.basecoat = function (component) {
    // console.log('initializing basecoat');
    if (typeof component === 'string') {
      return this.each(function () {
        if (basecoat.init[component]) basecoat.init[component].call(this);
        if (basecoat.postInit[component]) basecoat.postInit[component].call(this);
        // console.log('init:', component);
      });
    }
    return this.each(function () {
      for (component in basecoat.init) {
        if (basecoat.init[component]) basecoat.init[component].call(this);
        // console.log('init:', component);
      }
      for (component in basecoat.postInit) {
        if (basecoat.postInit[component]) basecoat.postInit[component].call(this);
        // console.log('init:', component);
      }
    });
  };

  // add a class to html tag if the device is mobile (can be useful elsewhere in css and js)
  basecoat.isMobile = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(navigator.userAgent);
  basecoat.isDesktop = !basecoat.isMobile;
  $('html').toggleClass('is-mobile', basecoat.isMobile);
  $('html').toggleClass('is-desktop', basecoat.isDesktop);

  // initialize all of basecoat's JS components when jQuery's DOM ready event is fired
  $(function () {
    // NOTE: components may need to be manually initialized when added to the DOM later by AJAX or other JS frameworks
    // basecoat can be manually initialized in a specific area like this: $('.new-stuff').basecoat();
    $(document).basecoat();
  });

}(jQuery);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  $.fn.checkbox = function () {
    // handle checkboxes wrapped in labels (without for="#id") on page load
    return this
    .find('label :checkbox')
    .addBack('label :checkbox')
    .each(function () {
      $(this).closest('label').toggleClass('checked', $(this).is(':checked'));
      $(this).closest('label').toggleClass('disabled', $(this).is(':disabled'));
    });
  };

  $(document)
  // update checkbox label on change
  .on('change.bc.checkbox', 'label input:checkbox', function (e) {
    var $input = $(e.target);
    var $label = $input.closest('label');
    $label.toggleClass('checked', $input.is(':checked'));
  });

  basecoat.init.checkbox = function () {
    $(this).checkbox();
  };

}(jQuery);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  $.desktopMenu = function (option) {
    var open = option === 'show';
    if (option === 'toggle' && $('.desktop-menu').offset().left < 0) {
      open = true;
    }
    $('html')
    .toggleClass('tablet-menu-open', open)
    .toggleClass('desktop-menu-open', open);
  };

  $(document)
  // open & close the desktop-menu
  .on('click.bc.desktopMenu', '[data-toggle="desktop-menu"]', function (e) {
    e.preventDefault();
    $.desktopMenu('toggle');
  })
  // click anywhere outside to close the menu
  .on('click.bc.mobileMenu touchstart.bc.mobileMenu', '.desktop-menu-layout', function (e) {
    if ($(e.target).hasClass('desktop-menu-layout')) {
      $.desktopMenu('hide');
    }
  });

}(jQuery);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  $.fn.drilldownMenu = function () {
    return this
    .find('.drilldown-menu .drilldown')
    .addBack('.drilldown-menu .drilldown')
    .each(function () {
      if ($(this).data('drilldown')) return;

      // determine which level of the menu should be open initially on load
      var $currentLevel = $(this).find('li.active:last > ul');
      $currentLevel = $currentLevel.length > 0 ? $currentLevel : $(this).find('li.active:last').closest('ul');

      // drilldown menu
      $(this).drilldown({
        activeClass: 'current-level', // Class that's applied to the current menu level `<ul>`
        headerClass: 'heading', // Class name for the container for the back button and heading
        headingTag: '<h2 class="title">', // Tag that contains the heading
        backFirst: true, // Optionally append the back button before the heading instead of after
        label: 'Back', // Label for the back button. Pass true to use the link's own label
        title: true, // Pass true to show title of current menu level
        speed: 300, // Animation speed in milliseconds
        resize: true // Resize menu height to match content on navigation
      }).jump($currentLevel, false);

      // add active class to all parent menu items (showing the route, like a breadcrumb)
      $(this).find('li.active').parents('ul > li').addClass('active');
    });
  };

  basecoat.init.drilldownMenu = function () {
    $(this).drilldownMenu();
  };

}(jQuery);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Drilldown is a fork of Slinky v3.0.0 which has been customized for Basecoat
 * Forked from https://github.com/alizahid/slinky/commit/42aea38f71dc09ce4e8a699d024c49b2abfc1f16
 * Originally built by Ali Zahid <ali.zahid@live.com>
 * Published under the MIT license
 */



(function ($) {
  var lastClick;

  $.fn.drilldown = function (options) {
    var settings = $.extend({
      activeClass: 'current-level', // Class that's applied to the current menu level `<ul>`
      headerClass: 'heading', // Class name for the container for the back button and heading
      headingTag: '<h2 class="title">', // Tag that contains the heading
      backFirst: true, // Optionally append the back button before the heading instead of after
      label: 'Back', // Label for the back button. Pass true to use the link's own label
      title: true, // Pass true to show title of current menu level
      speed: 300, // Animation speed in milliseconds
      resize: true // Resize menu height to match content on navigation
    }, options);

    var activeClass = '.' + settings.activeClass;
    var headerClass = '.' + settings.headerClass;

    var menu = $(this),
      root = menu.children().first();

    var move = function (depth, callback) {
      var left = Math.round(parseInt(root.get(0).style.left)) || 0;

      root.css('left', left - (depth * 100) + '%');

      if (typeof callback === 'function') {
        setTimeout(callback, settings.speed);
      }
    };

    var resize = function (content) {
      menu.height(content.outerHeight());
    };

    var transition = function (speed) {
      root.css('transition-duration', speed + 'ms');
    };

    transition(settings.speed);

    $('a + ul', menu).prev().addClass('next');

    $('li > ul', menu).addClass('sub-menu').prepend('<li class="' + settings.headerClass + '">');

    if (settings.title === true) {
      $('li > ul', menu).each(function () {
        var label = $(this).parent().find('a').first().text(),
          title = $(settings.headingTag).text(label);

        $('> ' + headerClass, this).append(title);
      });
    }

    if (!settings.title && settings.label === true) {
      $('li > ul', menu).each(function () {
        var label = $(this).parent().find('a').first().text(),
          backLink = $('<a>').text(label).prop('href', '#').addClass('back');

        if (settings.backFirst) {
          $('> ' + headerClass, this).prepend(backLink);
        } else {
          $('> ' + headerClass, this).append(backLink);
        }
      });
    } else {
      var backLink = $('<a>').text(settings.label).prop('href', '#').addClass('back');

      if (settings.backFirst) {
        $(headerClass, menu).prepend(backLink);
      } else {
        $(headerClass, menu).append(backLink);
      }
    }

    $('a', menu).on('click.bc.drilldown', function (e) {
      if ((lastClick + settings.speed) > Date.now()) {
        return false;
      }

      lastClick = Date.now();

      var a = $(this);

      if (/^#$/.test(this.href) || a.hasClass('next') || a.hasClass('back')) {
        e.preventDefault();
      }

      if (a.hasClass('next')) {
        menu.find(activeClass).removeClass(settings.activeClass);

        a.next().show().addClass(settings.activeClass);

        move(1);

        if (settings.resize) {
          resize(a.next());
        }
      } else if (a.hasClass('back')) {

        move(-1, function () {
          menu.find(activeClass).removeClass(settings.activeClass);
          a.parent().parent().hide().parentsUntil(menu, 'ul').first().addClass(settings.activeClass);
        });

        if (settings.resize) {
          resize(a.parent().parent().parentsUntil(menu, 'ul'));
        }
      }
    });

    this.jump = function (to, animate) {
      to = $(to);

      if (to.length !== 1) {
        return;
      }

      var active = menu.find(activeClass);

      if (active.length > 0) {
        active = active.parentsUntil(menu, 'ul').length;
      } else {
        active = 0;
      }

      menu.find('ul').removeClass(settings.activeClass).hide();

      var menus = to.parentsUntil(menu, 'ul');

      menus.show();
      to.show().addClass(settings.activeClass);

      if (animate === false) {
        transition(0);
      }

      move(menus.length - active);

      if (settings.resize) {
        resize(to);
      }

      if (animate === false) {
        transition(settings.speed);
      }
    };

    this.home = function (animate) {
      if (animate === false) {
        transition(0);
      }

      var active = menu.find(activeClass),
        count = active.parentsUntil(menu, 'li').length;

      if (count > 0) {

        $.each(active.parentsUntil(menu, 'li'), function () {
          var $this = $(this);
          $this.find('ul').hide();
        });

        active.removeClass(settings.activeClass);
        move(-count);

        if (settings.resize) {
          resize($(active.parentsUntil(menu, 'li').get(count - 1)).parent());
        }
      }

      if (animate === false) {
        transition(settings.speed);
      }
    };

    this.destroy = function () {
      $(headerClass, menu).remove();
      $('a', menu).removeClass('next').off('click.bc.drilldown');
      $('li > ul', menu).removeClass('sub-menu');
      root.css('transition-duration', '');
    };

    var active = menu.find(activeClass);

    if (active.length > 0) {
      active.removeClass(settings.activeClass);

      this.jump(active, false);
    }

    var drilldown = this;

    menu
    .data('drilldown', drilldown)
    .on('jump.bc.drilldown', function (e, to, animate) {
      drilldown.jump(to, animate);
      return $(drilldown);
    })
    .on('home.bc.drilldown', function (e, animate) {
      drilldown.home(animate);
      return $(drilldown);
    })
    .on('destroy.bc.drilldown', function () {
      drilldown.destroy();
      return $(drilldown);
    });

    return this;
  };
}(jQuery));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  $(document)
  // prevent browser's default # navigation if there's no link on a dropdown-menu item
  .on('click.bc.dropdown', '.dropdown-menu a[href="#"]', function (e) {
    e.preventDefault();
  })

  // selecting an option from the dropdown-menu
  .on('click.bc.dropdown', '[data-dropdown] .dropdown-menu a', function (e) {
    var $option = $(e.target).closest('a') || $(e.target);
    var $dropdown = $option.closest('[data-dropdown]');
    var $button = $dropdown.find('button');
    var label = $option.text();
    var value = $option.data('value');
    // dynamically update label on fake "select" button and return focus to button
    if ($button.length > 0) {
      if (typeof $option.data('label') !== 'undefined') {
        label = $option.data('label');
      }
      $button.html(function (index, oldHtml) {
        return oldHtml.replace(/^[^<]+/, label);
      });
      // .focus(); // this causes complications if you trigger change then it triggers click and then this focus causes the page to scroll - trigger change shouldn't cause a scroll jump
    }
    // dynamically update value of a hidden form field
    if (typeof value === 'undefined') {
      value = label;
    }
    // blur to trigger validation
    $dropdown.find(':input').val(value).trigger('blur');
  })

  // when the hidden input changes, update the dropdown's displayed value
  .on('change.bc.dropdown', '[data-dropdown] :input', function () {
    var $dropdown = $(this).closest('[data-dropdown]');
    var $option = $dropdown.find('.dropdown-menu [data-value="' + $(this).val() + '"]');
    if ($option.length < 1) {
      $option = $dropdown.find('.dropdown-menu li:first a:first');
    }
    $option.trigger('click');
  });

}(jQuery);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {
  $(function () {
    function dashIsMoving() {
      $('[data-dash-liquid]').addClass('dash-is-opening').delay(1000).queue(
        function (next) {
          $(this).removeClass('dash-is-opening');
          chart.reflow();
          next();
        }
      );
    }
    $(document).ready(function () {
      var widgetCount = $('[data-dash-widget]').length - 1;
      var widgetClass = 'dashboard--' + widgetCount;
      $('[data-dash-liquid]').addClass(widgetClass);
    });
    $('[data-dash-toggle]').on('click', function () {
      dashIsMoving();
      var togglerParent = (this).closest('[data-dash-widget]');
      if ($(togglerParent).hasClass('widget--open')) {
        $(togglerParent).removeClass('widget--open');
        $('[data-dash-liquid]').removeClass('widget-is-open');
      } else {
        $('[data-dash-widget]').removeClass('widget--open');
        $('[data-dash-liquid]').removeClass('widget-is-open');
        $(togglerParent).addClass('widget--open');
        $('[data-dash-liquid]').addClass('widget-is-open');
      }
    });
  });
}(jQuery);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {
  $.fn.button.Constructor.DEFAULTS.loadingText = '<span class="fa fa-circle-o-notch fa-spin"></span><span>Loading...</span>';

  $.fn.loader = function (option) {
    var show = option === 'show';
    return this.each(function () {
      $(this).toggleClass('in', show).toggleClass('out', !show);
    });
  };

  // generate, return, and display a 'loader' modal
  basecoat.loaderModal = function (message) {
    message = message || 'Loading...';
    var html = ''
    + '<div class="modal-body">'
      + '<span class="loader-spinner fade in"></span>'
      + (message ? '<span class="modal-message">' + message + '</span>' : '')
    + '</div>';
    return basecoat.modal(html, 'loader', 'auto');
  };

  $(document)
  // 'show' and 'hide' events for spinner-loader
  .on('show.bc.loader', '.loader-spinner', function () {
    $(this).loader('show');
  })
  .on('hide.bc.loader', '.loader-spinner', function () {
    $(this).loader('hide');
  });

}(jQuery);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  $.mobileMenu = function (option) {
    var open = option === 'show';
    open = option === 'toggle' ? undefined : open;
    $('html').toggleClass('mobile-menu-open', open);
  };

  $(document)
  // open the mobile-menu
  .on('click.bc.mobileMenu', '[data-toggle="mobile-menu"]', function (e) {
    e.preventDefault();
    $.mobileMenu('toggle');
  })
  // click anywhere outside to close the menu
  .on('click.bc.mobileMenu touchstart.bc.mobileMenu', '.mobile-menu-layout', function (e) {
    if ($(e.target).hasClass('mobile-menu-layout')) {
      $.mobileMenu('hide');
    }
  })
  // close the menu when navigating to another page
  .on('click.bc.mobileMenu', '.mobile-menu nav a:not(".next, .back")', function () {
    $.mobileMenu('hide');
  });

}(jQuery);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  // create, show, and return a simple static modal
  basecoat.modal = function (content, type, size) {
    type = type || 'alert';
    size = size || 'md';
    var $modal = $(''
    + '<div class="modal ' + type + '-modal fade" tabindex="-1" role="dialog">'
      + '<div class="modal-dialog modal-' + size + '" role="document">'
        + '<div class="modal-content">'
          + content
          + '</div>'
        + '</div>'
      + '</div>'
    );

    $modal.modal({
      keyboard: false,
      backdrop: 'static'
    })
    .on('hidden.bs.modal', function () {
      $(this).data('bs.modal', null).remove();
    });

    return $modal;
  };

  // create, show, and return a dialog modal with buttons
  basecoat.dialogModal = function (heading, message, buttons) {
    var content = '';

    if (heading) {
      content += ''
      + '<div class="modal-header">'
        + '<h5 class="modal-title">'
          + heading
        + '</h5>'
      + '</div>';
    }

    if (message) {
      content += ''
      + '<div class="modal-body">'
        + '<p>'
          + message
        + '</p>'
      + '</div>';
    }

    if (buttons) {
      var $footer = $('<div class="modal-footer"><div class="btn-link-toolbar"/></div>');
      $.each(buttons, function (key, value) {
        $footer.find('.btn-link-toolbar').append(
          '<button type="button" class="btn btn-link" data-dismiss="modal" onClick="$(this).closest(\'.modal\').trigger(\'' + key + '\')" data-modal-btn="' + key + '">'
            + value +
          '</button>'
        );
      });
      content += $footer.prop('outerHTML');
    }

    return basecoat.modal(content);
  };

  basecoat.alert = function (heading, message, accept) {
    return basecoat.dialogModal(heading, message, {
      accept: accept || 'OK'
    });
  };

  basecoat.confirm = function (heading, message, accept, reject) {
    return basecoat.dialogModal(heading, message, {
      reject: reject || 'Cancel',
      accept: accept || 'OK'
    });
  };

  $(document)
  // add a temp hash when opening full-modal
  .on('shown.bs.modal', '.modal.full-modal', function () {
    window.history.pushState('forward', null, '#openModal');
  })
  // remove the temp hash after closing full-modal
  .on('hidden.bs.modal', '.modal.full-modal', function () {
    if (location.hash === '#openModal') {
      window.history.back();
    }
  });

  $(window)
  // close the full-modal when user presses "back" button
  .on('popstate.bc.modal', function (e) {
    if (e.state !== null) {
      $('.modal.full-modal.in').modal('hide');
    }
  });

}(jQuery);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


basecoat.notificationLimit = 3;
basecoat.notificationCount = 0;
basecoat.notificationMoreCount = 0;
basecoat.notificationModalHtml = '' +
'<div class="modal fade full-modal notification-modal" id="notificationModal" tabindex="-1" role="dialog" aria-labelledby="notificationModalLabel">' +
  '<div class="modal-dialog" role="document">' +
    '<div class="modal-content">' +

      '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '<h4 class="modal-title" id="notificationModalLabel">' +
          '<span class="fa fa-flag"></span> Notifications' +
        '</h4>' +
      '</div>' +

      '<div class="delete-all fade in"><span data-notifications-count-plural="There are <strong>#</strong> notifications." data-notifications-count-singular="There is <strong>#</strong> notification."></span> <a class="pull-right" data-dismiss="allNotifications">Delete all</a></div>' +

      '<div class="modal-body scrollbars scrollbars-light">' +
        '<div class="notification-container">' +

          '<div class="notification-feed"></div>' +

          '<a class="show-more fade" data-toggle="notificationsModal">There are <strong><span data-notifications-more-count>0</span> more</strong> notifications. Click to view all.</a>' +

        '</div>' +
      '</div>' +

    '</div>' +
  '</div>' +
'</div>';

+function ($) {

  var $modal, $container;

  // leave the dom uncluttered until such a time that notifications are used. that's when this function will be called.
  basecoat.initNotificationModal = function () {
    if ($modal) return $modal; // only execute on the first time

    // create the notification modal (if it doesn't exist)
    $modal = $('#notificationModal');
    if ($modal.length == 0) {
      $modal = $(basecoat.notificationModalHtml).appendTo('body');
      $modal.find('.scrollbars').scrollbar();
    }

    // create the floating notifications container based off the modal
    $container = $modal.find('.notification-container').clone(true);
    $('body').append($container);

    // update (initialize) any counters on the DOM
    basecoat.updateNotificationCounters();

    $modal
    // show modal: move notifications to inside the modal
    .on('show.bs.modal', function () {
      $container = $('body .notification-container:last').clone(true);
      $modal.find('.notification-container').replaceWith($container);
    })
    // hide modal: make notifications floaty
    .on('hide.bs.modal', function () {
      $container = $modal.find('.notification-container').clone(true);
      $('body .notification-container:last').replaceWith($container);
    });

    $(document)
    // dismiss notification
    .on('click.bc.notification', '[data-dismiss="notification"]', function () {
      $(this).closest('.notification-alert').trigger('hide');
    })
    // dismiss all-notifications
    .on('click.bc.notification', '[data-dismiss="allNotifications"]', function () {
      $('.notification-alert').remove();
      basecoat.updateNotificationCounters();
      $modal.modal('hide');
    });
  };

  // update all variables/badges/display of notification counters found on a page
  basecoat.updateNotificationCounters = function () {
    basecoat.notificationCount = $container.find('.notification-feed .notification-alert:not(.out)').length;
    basecoat.notificationMoreCount = Math.max(0, basecoat.notificationCount - basecoat.notificationLimit);

    // update simple counters on the page
    $('[data-notifications-more-count]').text(basecoat.notificationMoreCount);
    $('[data-notifications-count-not-empty]').text(basecoat.notificationCount > 0 ? basecoat.notificationCount : '');
    $('[data-notifications-count]').text(basecoat.notificationCount);

    // correct language for singular or plural notification count
    var multiple = basecoat.notificationCount == 1 ? 'singular' : 'plural';
    $('[data-notifications-count-' + multiple + ']').html(function () {
      return $(this).data('notifications-count-' + multiple).replace(/#/g, basecoat.notificationCount);
    });

    // if there aren't any more notifications then hide the "show more" link
    if (basecoat.notificationMoreCount < 1) {
      $container.find('.show-more').removeClass('in');
    }

    // if there are too many notifications
    if (basecoat.notificationMoreCount > 0) {
      // display "show more" link
      $container.find('.show-more').addClass('in');
      // hide excess notifications
      $container.find('.notification-feed .notification-alert:not(.out):gt(' + (basecoat.notificationLimit - 1) + ')').removeClass('in');
    }
  };

  // create a new notification with show and hide events
  basecoat.notification = function (heading, message, footnote) {
    basecoat.initNotificationModal();

    // generate new notification
    return $(
      '<div class="notification-alert fade">' +
        (heading ? '<h5 class="heading">' + heading + '</h5>' : '') +
        (message ? '<p class="message">' + message + '</p>' : '') +
        (footnote ? '<p class="footnote">' + footnote + '</p>' : '') +
        '<span class="close" data-dismiss="notification"></span>' +
      '</div>'
    )

    // show the notification
    .on('show.bc.notification', function (e) {
      e.stopPropagation();

      // prepend to the feed
      var $notification = $(this);
      $container.find('.notification-feed').prepend($notification);
      $notification[0].offsetWidth; // forces reflow before applying fade in effect
      $notification.addClass('in');

      // update counters
      basecoat.updateNotificationCounters();
    })

    // dismiss the notification
    .on('hide.bc.notification', function (e) {
      e.stopPropagation();

      // remove any that are still busy animating
      $container.find('.notification-feed notification-alert.fade.out').remove();

      // remove this notification from the feed
      var $notification = $(this);
      $notification.addClass('out').removeClass('in');
      window.setTimeout(function () { $notification.remove(); }, 1000);

      // make sure the newest notifications are visible
      $container.find('.notification-feed .notification-alert:not(.out):lt(' + basecoat.notificationLimit + ')').addClass('in');

      // update counters
      basecoat.updateNotificationCounters();

      // if that was the last notification then close the modal
      if ($modal.hasClass('in') && basecoat.notificationCount < 1) {
        $modal.modal('hide');
      }
    });
  };

  $(document)
  // show/hide the notifications modal
  .on('click.bc.notification', '[data-toggle="notificationsModal"]', function () {
    basecoat.initNotificationModal();
    $modal.modal('toggle');
  });

}(jQuery);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  $.fn.passwordToggle = function () {
    return this.each(function () {
      var $input = $(this).find(':password, :text');
      var $toggle = $(this).find('.password-toggle');
      if ($toggle.hasClass('password-visible')) {
        $toggle.removeClass('password-visible');
        $input.attr('type', 'password');
      } else {
        $toggle.addClass('password-visible');
        $input.attr('type', 'text');
      }
    });
  };

  $(document)
  // toggle eye icon input type="text|password" on click
  .on('click.bc.passwordToggle', '.password-toggle', function (e) {
    e.stopPropagation();
    $(e.target).closest('.has-password-toggle').passwordToggle();
  });

}(jQuery);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {
  $.fn.popover.Constructor.DEFAULTS.placement = 'auto top';
  // $.fn.popover.Constructor.DEFAULTS.container = 'body'; // body would prevent tooltips from inheriting styles from their parents, but it disconnects positioning from page layout

  $(document)
  // Bootstrap's toggle popover fix: https://github.com/twbs/bootstrap/issues/16732#issuecomment-165229037
  .on('hidden.bs.popover', function (e) {
    $(e.target).data('bs.popover').inState.click = false;
  });

  $(document)
  // to dismiss/close a popover from inside that popover
  .on('click.bc.popover', '[data-dismiss="popover"]', function () {
    $(this).closest('.popover').data('bs.popover').$element.popover('hide');
  });

  // automatically activate popovers everywhere (specific options can be set using data-attributes on the tooltip trigger)
  $(document).popover({
    selector: '[data-toggle="popover"]'
  });

}(jQuery);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  $.fn.progressStep = function (option) {
    return this.each(function () {
      var $steps = $(this);
      var linear = $steps.attr('data-progress-steps') === 'linear';
      var $current, $next;

      // accordion steps: .accordion-heading.complete, .accordion-heading.active, .accordion-heading.disabled
      if ($steps.hasClass('accordion-group')) {
        $current = $steps.find('.accordion > [data-toggle].active');
        switch (option) {
        case 'back':
          $next = $current.closest('.accordion').prev().find('> [data-toggle]');
          $steps.find('.collapse').not($next.next('.collapse')).collapse('hide');
          $current.toggleClass('disabled', linear);
          $next.removeClass('disabled').click();
          if (linear) {
            $current.removeClass('complete');
            $next.removeClass('complete');
          }
          break;
        case 'next':
          $next = $current.closest('.accordion').next().find('> [data-toggle]');
          $steps.find('.collapse').not($next.find('.collapse')).collapse('hide');
          $current.addClass('complete').toggleClass('disabled', linear);
          $next.removeClass('disabled').click();
          break;
        case 'complete':
          $steps.find('> .accordion > [data-toggle]').addClass('complete');
          $steps.find('> .accordion:last-child > [data-toggle]').removeClass('disabled').click();
          $steps.find('> .accordion:not(:last-child) > [data-toggle]').toggleClass('disabled', linear);
          break;
        case 'reset':
          $steps.find('> .accordion > [data-toggle]').removeClass('complete');
          $steps.find('> .accordion:first-child > [data-toggle]').removeClass('disabled').click();
          $steps.find('> .accordion:not(:first-child) > [data-toggle]').addClass('disabled');
          break;
        }
      // tabbed steps: li.active, li.disabled, li.complete
      } else if ($steps.hasClass('nav-tabs')) {
        $current = $steps.find('> li.active').toggleClass('disabled', linear);
        // Prevent two tabs opening at the same time by first checking if the component is busy
        switch (option) {
        case 'back':
          // check if still busy
          if ($steps.data('busy')) return false;
          $steps.data('busy', true);
          // do the step change
          $next = $current.prev();
          if (linear) {
            $current.removeClass('complete');
            $next.removeClass('complete').removeClass('disabled');
          }
          $next.find('[data-toggle]').click();
          // get ready for the next step change
          window.setTimeout(function () {
            $steps.data('busy', false);
          }, 300);
          break;
        case 'next':
          // check if still busy
          if ($steps.data('busy')) return false;
          $steps.data('busy', true);
          // do the step change
          $next = $current.next().removeClass('disabled');
          $next.find('[data-toggle]').click();
          // get ready for the next step change
          window.setTimeout(function () {
            $steps.data('busy', false);
          }, 300);
          break;
        case 'complete':
          $steps.find('> li').addClass('complete');
          $steps.find('> li:last-child').removeClass('disabled').find('[data-toggle]').click();
          $steps.find('> li:not(:last-child)').toggleClass('disabled', linear);
          break;
        case 'reset':
          $steps.find('> li').removeClass('complete');
          $steps.find('> li:first-child').removeClass('disabled').find('[data-toggle]').click();
          $steps.find('> li:not(:first-child)').addClass('disabled');
          break;
        }
      }
    });
  };

  $(document)
  .on('back.bc.progressStep', function (e) { $(e.target).progressStep('back'); })
  .on('next.bc.progressStep', function (e) { $(e.target).progressStep('next'); })
  .on('complete.bc.progressStep', function (e) { $(e.target).progressStep('complete'); })
  .on('reset.bc.progressStep', function (e) { $(e.target).progressStep('reset'); });

}(jQuery);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  $.fn.radio = function () {
    // handle radios wrapped in labels (without for="#id") on page load
    return this
    .find(':radio')
    .addBack(':radio')
    .each(function () {
      var $radios = $('label input:radio[name="' + $(this).attr('name') + '"]');
      $radios.each(function () {
        $(this).closest('label').toggleClass('checked', $(this).is(':checked'));
        $(this).closest('label').toggleClass('disabled', $(this).is(':disabled'));
      });
    });
  };

  $(document)
  // update radio label on change
  .on('change.bc.radio', 'input:radio', function (e) {
    var $input = $(e.target);
    var $radios = $input;
    if ($input.attr('name')) {
      $radios = $('label input:radio[name="' + $input.attr('name') + '"]');
    } else if ($input.closest('.form-group').length > 0) {
      $radios = $input.closest('.form-group').find('input:radio');
    }
    $radios.each(function () {
      $(this).closest('label').toggleClass('checked', $(this).is(':checked'));
    });
  });

  basecoat.init.radio = function () {
    $(this).radio();
  };

}(jQuery);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// load jQuery Scrollbar
basecoat.jQueryScrollbar = __webpack_require__(29);

+function ($) {

  $.fn.jQueryScrollbar = $.fn.scrollbar;
  $.fn.scrollbar = function () {
    return this
    .find('.scrollbars')
    .addBack('.scrollbars')
    .each(function () {
      $(this)
      .addClass('scrollbar-inner')
      .jQueryScrollbar({
        // debug: true,
        ignoreMobile: false, // use the mobile's native scrollbar functionality instead of this plugin
        disableBodyScroll: !($(this).data('disable-body-scroll') == false), // disable entire page scrolling if the mouse is over the container
        //callback function before scrollbars size is calculated
        onUpdate: function ($element) {
          if (parseInt($element.css('maxHeight'), 10) < 30) {
            // fix to initialize scrollbars inside of hidden modals and drop-downs BEFORE they open on the screen.
            // jQueryScrollbar plugin sets maxHeight = scrollbar-height on invisible targets and it causes a delayed redraw of the scrollbars on opening, so we just have to undo it.
            $element.css('maxHeight', '');
          }
        }
      });
    });
  };

  $(document)
  // prevent unexpected events firing on click of a scrollbar
  .on('click.bc.scrollbar', '.scroll-element', function (e) {
    e.stopPropagation();
  });

  // postInit ensures that everything else has run before scrollbars are attached
  basecoat.postInit.scrollbar = function () {
    $(this).scrollbar();
  };

}(jQuery);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  basecoat.init.scrollspy = function () {
    // automatically activate scrollspy everywhere
    if ($('[data-scrollspy]').length > 0) {
      // bootstrap only allows one instance of scrollspy, so using an empty target makes this work on multile navs
      var navbarHeight = $('.site-header .navbar-fixed-top').height();
      $('body').scrollspy({
        target: '[data-scrollspy]',
        offset: navbarHeight + 10
      });
    }
  };

}(jQuery);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  var $navbar = $('.site-header .navbar-fixed-top');
  var navbarHeight = $navbar.height();
  var lastWidth = $(window).width();
  var lastPos = 0;
  var delta = 5;

  // hide the navbar when scrolling downwards on mobile (delayed to prevent jumpy behavior on page load with #anchors and stuff)
  window.setTimeout(function () {
    $(window)
    .on('scroll.bc.siteHeader', function () {
      var currentPos = $(this).scrollTop();
      var currentWidth = $(window).width();

      // if the page is busy scrolling then we do not want to interfere (this bool is set to true in scrollto.js)
      if (basecoat.scrollJacking) return false;

      // resizing the window seems to trigger scroll so this negates it
      if (lastWidth != currentWidth) {
        lastPos = currentPos;
        lastWidth = currentWidth;
        return true;
      }

      // hide navbar if scrolling down
      if (currentPos > (lastPos + delta) && currentPos > navbarHeight) {
        $navbar.addClass('navbar-hide');
        lastPos = currentPos;
      // show the navbar if scrolling up OR at the top
      } else if (currentPos < (lastPos - delta) || currentPos < navbarHeight) {
        $navbar.removeClass('navbar-hide');
        lastPos = currentPos;
      }
    });
  }, 1000);

}(jQuery);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  $.siteSearch = function (option) {
    var $search = $('.site-search');
    switch (option) {
    case 'show':
      // initialize just in time so as not to clutter the DOM
      if ($search.is(':empty')) {
        $search.html('<div class="search-bar"><input class="search-input" type="search"><button class="close" data-dismiss="site-search" aria-label="Close" aria-hidden="true">×</button></div><div class="search-dropdown"><ul class="search-results"></ul></div></div>');
        $search.find('.search-bar')[0].offsetWidth; // forces reflow before animating in
      }
      $('html').addClass('site-search-open');
      $search.find('.search-input').focus();
      $search.trigger('shown.bc.siteSearch');
      break;
    case 'hide':
      $('html').removeClass('site-search-open');
      window.setTimeout(function () {
        $search.find('.search-input').val('');
        $search.find('.search-results').empty();
      }, 10); // a tiny delay just allows IE 11 to register that a link was clicked before that link gets removed from the DOM
      break;
    case 'toggle':
      if ($('html').hasClass('site-search-open')) {
        $.siteSearch('hide');
      } else {
        $.siteSearch('show');
      }
      break;
    }
  };

  basecoat.init.siteSearch = function () {
    // show/hide functions
    $('.site-search')
    .off('.bc.siteSearch')
    .on('show.bc.siteSearch', function () { $.siteSearch('show'); })
    .on('hide.bc.siteSearch', function () { $.siteSearch('hide'); })
    // hide search on click of 'x', or any link
    .on('click.bc.siteSearch', '[data-dismiss="site-search"], a', function () { $.siteSearch('hide'); })
    // hide search on click of backdrop
    .on('click.bc.siteSearch', function (e) {
      if (e.target !== this) return;
      $.siteSearch('hide');
    })
    // hide search on press of `esc` key
    .on('keydown.bc.siteSearch', '.search-input', function (e) {
      if (e.which === 27) { // esc
        $.siteSearch('hide');
      }
    });

    // show search on click of search button
    $('[data-toggle="site-search"]').on('click.bc.siteSearch', function () {
      $.siteSearch('show');
    });
  };

}(jQuery);


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {
  // if a tab is disabled, prevent any action (pointer-events: none; doesn't work in IE 10)
  $(document).on('show.bs.tab', '.disabled [data-toggle="tab"]', false)

  // scroll tabs into view on really small screens
  .on('show.bs.tab', '.nav-tabs-responsive a[data-toggle="tab"]', function () {
    $(this).closest('.nav-tabs-responsive').animate({
      scrollLeft: $(this).offset().left - $(this).closest('.nav-tabs').offset().left - ($(this).closest('.nav-tabs-responsive').width() - $(this).outerWidth()) / 2
    }, 500);
  });

}(jQuery);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  basecoat.toast = function (content, type) {
    var $toast = $('<div class="toast-alert fade">' + content + '</div>');
    type = type || 'default';
    $toast.addClass('toast-' + type);

    $toast.on('show.bc.toast', function (e, duration) {
      duration = duration || 5000;
      // hide any existing toasts
      $('.toast-alert').trigger('hide');
      var $toast = $(this);
      $('body').append($toast);
      $toast[0].offsetWidth; // forces reflow before applying fade in effect
      $toast.addClass('in');
      // auto hide toast
      window.setTimeout(function () {
        $toast.trigger('hide');
      }, duration);
    });

    $toast.on('hide.bc.toast', function () {
      var $toast = $(this).removeClass('in');
      window.setTimeout(function () {
        $toast.remove();
      }, 1000);
    });

    return $toast;
  };

}(jQuery);


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {
  $.fn.tooltip.Constructor.DEFAULTS.placement = 'auto top';
  $.fn.tooltip.Constructor.DEFAULTS.container = 'body'; // prevents tooltips from inheriting styles from their parents, but dissociates positioning from page layout

  // automatically activate tooltips everywhere (specific options can be set using data-attributes on the tooltip trigger)
  $(document).tooltip({
    selector: '[data-toggle="tooltip"]'
  });

}(jQuery);


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = "!function(t,n){\"object\"==typeof exports&&\"object\"==typeof module?module.exports=n():\"function\"==typeof define&&define.amd?define([],n):\"object\"==typeof exports?exports.animateCSSGrid=n():t.animateCSSGrid=n()}(window,function(){return function(t){var n={};function r(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=n,r.d=function(t,n,e){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},r.r=function(t){\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(t,\"__esModule\",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&\"object\"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,\"default\",{enumerable:!0,value:t}),2&n&&\"string\"!=typeof t)for(var o in t)r.d(e,o,function(n){return t[n]}.bind(null,o));return e},r.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(n,\"a\",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p=\"\",r(r.s=14)}([function(t,n){t.exports=function(t){var n=typeof t;return null!=t&&(\"object\"==n||\"function\"==n)}},function(t,n,r){var e=r(4),o=r(0),i=\"Expected a function\";t.exports=function(t,n,r){var u=!0,a=!0;if(\"function\"!=typeof t)throw new TypeError(i);return o(r)&&(u=\"leading\"in r?!!r.leading:u,a=\"trailing\"in r?!!r.trailing:a),e(t,n,{leading:u,maxWait:n,trailing:a})}},function(t,n,r){var e=r(6),o=\"object\"==typeof self&&self&&self.Object===Object&&self,i=e||o||Function(\"return this\")();t.exports=i},function(t,n,r){var e=r(2).Symbol;t.exports=e},function(t,n,r){var e=r(0),o=r(5),i=r(8),u=\"Expected a function\",a=Math.max,c=Math.min;t.exports=function(t,n,r){var f,s,p,l,d,v,h=0,m=!1,g=!1,y=!0;if(\"function\"!=typeof t)throw new TypeError(u);function b(n){var r=f,e=s;return f=s=void 0,h=n,l=t.apply(e,r)}function w(t){var r=t-v;return void 0===v||r>=n||r<0||g&&t-h>=p}function O(){var t=o();if(w(t))return x(t);d=setTimeout(O,function(t){var r=n-(t-v);return g?c(r,p-(t-h)):r}(t))}function x(t){return d=void 0,y&&f?b(t):(f=s=void 0,l)}function j(){var t=o(),r=w(t);if(f=arguments,s=this,v=t,r){if(void 0===d)return function(t){return h=t,d=setTimeout(O,n),m?b(t):l}(v);if(g)return d=setTimeout(O,n),b(v)}return void 0===d&&(d=setTimeout(O,n)),l}return n=i(n)||0,e(r)&&(m=!!r.leading,p=(g=\"maxWait\"in r)?a(i(r.maxWait)||0,n):p,y=\"trailing\"in r?!!r.trailing:y),j.cancel=function(){void 0!==d&&clearTimeout(d),h=0,f=v=s=d=void 0},j.flush=function(){return void 0===d?l:x(o())},j}},function(t,n,r){var e=r(2);t.exports=function(){return e.Date.now()}},function(t,n,r){(function(n){var r=\"object\"==typeof n&&n&&n.Object===Object&&n;t.exports=r}).call(this,r(7))},function(t,n){var r;r=function(){return this}();try{r=r||new Function(\"return this\")()}catch(t){\"object\"==typeof window&&(r=window)}t.exports=r},function(t,n,r){var e=r(0),o=r(9),i=NaN,u=/^\\s+|\\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,f=/^0o[0-7]+$/i,s=parseInt;t.exports=function(t){if(\"number\"==typeof t)return t;if(o(t))return i;if(e(t)){var n=\"function\"==typeof t.valueOf?t.valueOf():t;t=e(n)?n+\"\":n}if(\"string\"!=typeof t)return 0===t?t:+t;t=t.replace(u,\"\");var r=c.test(t);return r||f.test(t)?s(t.slice(2),r?2:8):a.test(t)?i:+t}},function(t,n,r){var e=r(10),o=r(13),i=\"[object Symbol]\";t.exports=function(t){return\"symbol\"==typeof t||o(t)&&e(t)==i}},function(t,n,r){var e=r(3),o=r(11),i=r(12),u=\"[object Null]\",a=\"[object Undefined]\",c=e?e.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?a:u:c&&c in Object(t)?o(t):i(t)}},function(t,n,r){var e=r(3),o=Object.prototype,i=o.hasOwnProperty,u=o.toString,a=e?e.toStringTag:void 0;t.exports=function(t){var n=i.call(t,a),r=t[a];try{t[a]=void 0;var e=!0}catch(t){}var o=u.call(t);return e&&(n?t[a]=r:delete t[a]),o}},function(t,n){var r=Object.prototype.toString;t.exports=function(t){return r.call(t)}},function(t,n){t.exports=function(t){return null!=t&&\"object\"==typeof t}},function(t,n,r){\"use strict\";r.r(n);var e=function(t){return function(n){return 1-t(1-n)}},o=function(t){return function(n){return n<=.5?t(2*n)/2:(2-t(2*(1-n)))/2}},i=function(t){return function(n){return n*n*((t+1)*n-t)}},u=function(t){var n=i(t);return function(t){return(t*=2)<1?.5*n(t):.5*(2-Math.pow(2,-10*(t-1)))}},a=function(t){return t},c=function(t){return function(n){return Math.pow(n,t)}}(2),f=e(c),s=o(c),p=function(t){return 1-Math.sin(Math.acos(t))},l=e(p),d=o(l),v=i(1.525),h=e(v),m=o(v),g=u(1.525);var y,b=0,w=\"undefined\"!=typeof window&&void 0!==window.requestAnimationFrame?function(t){return window.requestAnimationFrame(t)}:function(t){var n=Date.now(),r=Math.max(0,16.7-(n-b));b=n+r,setTimeout(function(){return t(b)},r)};!function(t){t.Read=\"read\",t.Update=\"update\",t.Render=\"render\",t.PostRender=\"postRender\",t.FixedUpdate=\"fixedUpdate\"}(y||(y={}));var O=1/60*1e3,x=!0,j=!1,M=!1,P={delta:0,timestamp:0},C=[y.Read,y.Update,y.Render,y.PostRender],S=function(t){return j=t},E=C.reduce(function(t,n){var r,e,o,i,u,a,c,f,s,p=(r=S,e=[],o=[],i=0,u=!1,a=0,c=new WeakSet,f=new WeakSet,s={cancel:function(t){var n=o.indexOf(t);c.add(t),-1!==n&&o.splice(n,1)},process:function(t){var n,p;if(u=!0,e=(n=[o,e])[0],(o=n[1]).length=0,i=e.length)for(a=0;a<i;a++)(p=e[a])(t),!0!==f.has(p)||c.has(p)||(s.schedule(p),r(!0));u=!1},schedule:function(t,n,r){var a=r&&u,c=a?e:o;n&&f.add(t),-1===c.indexOf(t)&&(c.push(t),a&&(i=e.length))}});return t.sync[n]=function(t,n,r){return void 0===n&&(n=!1),void 0===r&&(r=!1),j||k(),p.schedule(t,n,r),t},t.cancelSync[n]=function(t){return p.cancel(t)},t.steps[n]=p,t},{steps:{},sync:{},cancelSync:{}}),A=E.steps,T=E.sync,I=E.cancelSync,X=function(t){return A[t].process(P)},Y=function(t){j=!1,P.delta=x?O:Math.max(Math.min(t-P.timestamp,40),1),x||(O=P.delta),P.timestamp=t,M=!0,C.forEach(X),M=!1,j&&(x=!1,w(Y))},k=function(){j=!0,x=!0,M||w(Y)},R=T,_=r(1),F=r.n(_),G=function(t,n){return(G=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)n.hasOwnProperty(r)&&(t[r]=n[r])})(t,n)};function $(t,n){function r(){this.constructor=t}G(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}var N=function(){return(N=Object.assign||function(t){for(var n,r=1,e=arguments.length;r<e;r++)for(var o in n=arguments[r])Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o]);return t}).apply(this,arguments)};function L(t,n){var r={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(r[e]=t[e]);if(null!=t&&\"function\"==typeof Object.getOwnPropertySymbols){var o=0;for(e=Object.getOwnPropertySymbols(t);o<e.length;o++)n.indexOf(e[o])<0&&(r[e[o]]=t[e[o]])}return r}\n/*! *****************************************************************************\nCopyright (c) Microsoft Corporation. All rights reserved.\nLicensed under the Apache License, Version 2.0 (the \"License\"); you may not use\nthis file except in compliance with the License. You may obtain a copy of the\nLicense at http://www.apache.org/licenses/LICENSE-2.0\n\nTHIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\nKIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED\nWARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,\nMERCHANTABLITY OR NON-INFRINGEMENT.\n\nSee the Apache Version 2.0 License for specific language governing permissions\nand limitations under the License.\n***************************************************************************** */\nvar B=function(){return(B=Object.assign||function(t){for(var n,r=1,e=arguments.length;r<e;r++)for(var o in n=arguments[r])Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o]);return t}).apply(this,arguments)},W=function(t,n){return function(r){return Math.max(Math.min(r,n),t)}},q=function(t){return function(n){return\"string\"==typeof n&&0===n.indexOf(t)}},U=function(t){return t%1?Number(t.toFixed(5)):t},V={test:function(t){return\"number\"==typeof t},parse:parseFloat,transform:function(t){return t}},z=(B({},V,{transform:W(0,1)}),B({},V,{default:1}),function(t){return{test:function(n){return\"string\"==typeof n&&n.endsWith(t)&&1===n.split(\" \").length},parse:parseFloat,transform:function(n){return\"\"+n+t}}}),D=z(\"deg\"),K=z(\"%\"),H=z(\"px\"),J=z(\"vh\"),Q=z(\"vw\"),Z=W(0,255),tt=/^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$/i,nt=function(t){return void 0!==t.red},rt=function(t){return void 0!==t.hue},et=function(t){var n=t.length;return function(r){if(\"string\"!=typeof r)return r;for(var e,o={},i=function(t){return\"string\"==typeof t?t.split(/,\\s*/):[t]}((e=r).substring(e.indexOf(\"(\")+1,e.lastIndexOf(\")\"))),u=0;u<n;u++)o[t[u]]=void 0!==i[u]?parseFloat(i[u]):1;return o}},ot=B({},V,{transform:function(t){return Math.round(Z(t))}}),it=q(\"rgb\"),ut={test:function(t){return\"string\"==typeof t?it(t):nt(t)},parse:et([\"red\",\"green\",\"blue\",\"alpha\"]),transform:function(t){var n=t.red,r=t.green,e=t.blue,o=t.alpha;return function(t){var n=t.red,r=t.green,e=t.blue,o=t.alpha;return\"rgba(\"+n+\", \"+r+\", \"+e+\", \"+(void 0===o?1:o)+\")\"}({red:ot.transform(n),green:ot.transform(r),blue:ot.transform(e),alpha:U(o)})}},at=q(\"hsl\"),ct={test:function(t){return\"string\"==typeof t?at(t):rt(t)},parse:et([\"hue\",\"saturation\",\"lightness\",\"alpha\"]),transform:function(t){var n=t.hue,r=t.saturation,e=t.lightness,o=t.alpha;return function(t){var n=t.hue,r=t.saturation,e=t.lightness,o=t.alpha;return\"hsla(\"+n+\", \"+r+\", \"+e+\", \"+(void 0===o?1:o)+\")\"}({hue:Math.round(n),saturation:K.transform(U(r)),lightness:K.transform(U(e)),alpha:U(o)})}},ft=B({},ut,{test:q(\"#\"),parse:function(t){var n=\"\",r=\"\",e=\"\";return t.length>4?(n=t.substr(1,2),r=t.substr(3,2),e=t.substr(5,2)):(n=t.substr(1,1),r=t.substr(2,1),e=t.substr(3,1),n+=n,r+=r,e+=e),{red:parseInt(n,16),green:parseInt(r,16),blue:parseInt(e,16),alpha:1}}}),st={test:function(t){return\"string\"==typeof t&&tt.test(t)||ut.test(t)||ct.test(t)||ft.test(t)},parse:function(t){return ut.test(t)?ut.parse(t):ct.test(t)?ct.parse(t):ft.test(t)?ft.parse(t):t},transform:function(t){return nt(t)?ut.transform(t):rt(t)?ct.transform(t):t}},pt=/(-)?(\\d[\\d\\.]*)/g,lt=/(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))/gi,dt=function(t){if(\"string\"!=typeof t||!isNaN(t))return!1;var n=0,r=t.match(pt),e=t.match(lt);return r&&(n+=r.length),e&&(n+=e.length),n>0},vt=function(t){var n=t,r=[],e=n.match(lt);e&&(n=n.replace(lt,\"${c}\"),r.push.apply(r,e.map(st.parse)));var o=n.match(pt);return o&&r.push.apply(r,o.map(V.parse)),r},ht=function(t){var n=t,r=0,e=t.match(lt),o=e?e.length:0;if(e)for(var i=0;i<o;i++)n=n.replace(e[i],\"${c}\"),r++;var u=n.match(pt),a=u?u.length:0;if(u)for(i=0;i<a;i++)n=n.replace(u[i],\"${n}\"),r++;return function(t){for(var e=n,i=0;i<r;i++)e=e.replace(i<o?\"${c}\":\"${n}\",i<o?st.transform(t[i]):U(t[i]));return e}},mt=function(t){return\"number\"==typeof t},gt=function(t){return function(n,r,e){return void 0!==e?t(n,r,e):function(e){return t(n,r,e)}}},yt=gt(function(t,n,r){return Math.min(Math.max(r,t),n)}),bt=function(t,n,r){var e=n-t;return 0===e?1:(r-t)/e},wt=function(t,n,r){return-r*t+r*n+t},Ot=function(){return(Ot=Object.assign||function(t){for(var n,r=1,e=arguments.length;r<e;r++)for(var o in n=arguments[r])Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o]);return t}).apply(this,arguments)},xt=function(t,n,r){var e=t*t,o=n*n;return Math.sqrt(r*(o-e)+e)},jt=[ft,ut,ct],Mt=function(t){return jt.find(function(n){return n.test(t)})},Pt=function(t,n){var r=Mt(t),e=Mt(n);r.transform,e.transform;var o=r.parse(t),i=e.parse(n),u=Ot({},o),a=r===ct?wt:xt;return function(t){for(var n in u)\"alpha\"!==n&&(u[n]=a(o[n],i[n],t));return u.alpha=wt(o.alpha,i.alpha,t),r.transform(u)}},Ct=function(t,n){return function(r){return n(t(r))}},St=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return t.reduce(Ct)},Et=function(t,n){var r=t.slice(),e=r.length,o=t.map(function(t,r){var e=n[r];return mt(t)?function(n){return wt(t,e,n)}:st.test(t)?Pt(t,e):At(t,e)});return function(t){for(var n=0;n<e;n++)r[n]=o[n](t);return r}},At=function(t,n){var r=ht(t);return r(t),ht(n)(t),St(Et(vt(t),vt(n)),r)},Tt=(gt(wt),function(t){return t}),It=function(t){return void 0===t&&(t=Tt),gt(function(n,r,e){var o=r-e,i=-(0-n+1)*(0-t(Math.abs(o)));return o<=0?r+i:r-i})};It(),It(Math.sqrt),gt(function(t,n,r){var e=n-t;return((r-t)%e+e)%e+t}),yt(0,1);var Xt=function(){function t(t){void 0===t&&(t={}),this.props=t}return t.prototype.applyMiddleware=function(t){return this.create(N({},this.props,{middleware:this.props.middleware?[t].concat(this.props.middleware):[t]}))},t.prototype.pipe=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var r=1===t.length?t[0]:St.apply(void 0,t);return this.applyMiddleware(function(t){return function(n){return t(r(n))}})},t.prototype.while=function(t){return this.applyMiddleware(function(n,r){return function(e){return t(e)?n(e):r()}})},t.prototype.filter=function(t){return this.applyMiddleware(function(n){return function(r){return t(r)&&n(r)}})},t}(),Yt=function(){return function(t,n){var r=t.middleware,e=t.onComplete,o=this;this.isActive=!0,this.update=function(t){o.observer.update&&o.updateObserver(t)},this.complete=function(){o.observer.complete&&o.isActive&&o.observer.complete(),o.onComplete&&o.onComplete(),o.isActive=!1},this.error=function(t){o.observer.error&&o.isActive&&o.observer.error(t),o.isActive=!1},this.observer=n,this.updateObserver=function(t){return n.update(t)},this.onComplete=e,n.update&&r&&r.length&&r.forEach(function(t){return o.updateObserver=t(o.updateObserver,o.complete)})}}(),kt=function(t,n,r){var e=n.middleware;return new Yt({middleware:e,onComplete:r},\"function\"==typeof t?{update:t}:t)},Rt=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return $(n,t),n.prototype.create=function(t){return new n(t)},n.prototype.start=function(t){void 0===t&&(t={});var n=!1,r={stop:function(){}},e=this.props,o=e.init,i=L(e,[\"init\"]),u=o(kt(t,i,function(){n=!0,r.stop()}));return r=u?N({},r,u):r,t.registerParent&&t.registerParent(r),n&&r.stop(),r},n}(Xt),_t=function(t){return new Rt({init:t})},Ft=function(t){var n=t.getCount,r=t.getFirst,e=t.getOutput,o=t.mapApi,i=t.setProp,u=t.startActions;return function(t){return _t(function(a){var c=a.update,f=a.complete,s=a.error,p=n(t),l=e(),d=function(){return c(l)},v=0,h=u(t,function(t,n){var r=!1;return t.start({complete:function(){r||(r=!0,++v===p&&R.update(f))},error:s,update:function(t){i(l,n,t),R.update(d,!1,!0)}})});return Object.keys(r(h)).reduce(function(t,n){return t[n]=o(h,n),t},{})})}},Gt=Ft({getOutput:function(){return{}},getCount:function(t){return Object.keys(t).length},getFirst:function(t){return t[Object.keys(t)[0]]},mapApi:function(t,n){return function(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];return Object.keys(t).reduce(function(e,o){var i;return t[o][n]&&(r[0]&&void 0!==r[0][o]?e[o]=t[o][n](r[0][o]):e[o]=(i=t[o])[n].apply(i,r)),e},{})}},setProp:function(t,n,r){return t[n]=r},startActions:function(t,n){return Object.keys(t).reduce(function(r,e){return r[e]=n(t[e],e),r},{})}}),$t=Ft({getOutput:function(){return[]},getCount:function(t){return t.length},getFirst:function(t){return t[0]},mapApi:function(t,n){return function(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];return t.map(function(t,e){if(t[n])return Array.isArray(r[0])?t[n](r[0][e]):t[n].apply(t,r)})}},setProp:function(t,n,r){return t[n]=r},startActions:function(t,n){return t.map(function(t,r){return n(t,r)})}}),Nt=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return $t(t)},Lt=[H,K,D,J,Q],Bt=function(t){return Lt.find(function(n){return n.test(t)})},Wt=function(t,n){return t(n)},qt=function(t,n,r){var e=r[0],o=n[e].map(function(e,o){var i=r.reduce(function(t){return function(n,r){return n[r]=n[r][t],n}}(o),N({},n));return Ht(e)(t,i)});return Nt.apply(void 0,o)},Ut=function(t,n,r){var e=r[0],o=Object.keys(n[e]).reduce(function(o,i){var u=r.reduce(function(t){return function(n,r){return n[r]=n[r][t],n}}(i),N({},n));return o[i]=Ht(n[e][i])(t,u),o},{});return Gt(o)},Vt=function(t,n){var r=n.from,e=n.to,o=L(n,[\"from\",\"to\"]),i=Bt(r)||Bt(e),u=i.transform,a=i.parse;return t(N({},o,{from:\"string\"==typeof r?a(r):r,to:\"string\"==typeof e?a(e):e})).pipe(u)},zt=function(t,n){var r=n.from,e=n.to,o=L(n,[\"from\",\"to\"]);return t(N({},o,{from:0,to:1})).pipe(Pt(r,e),st.transform)},Dt=function(t,n){var r=n.from,e=n.to,o=L(n,[\"from\",\"to\"]),i=ht(r);return i(r),ht(e)(r),t(N({},o,{from:0,to:1})).pipe(Et(vt(r),vt(e)),i)},Kt=function(t,n){var r=function(t){var n=Object.keys(t),r=function(n,r){return void 0!==n&&!t[r](n)};return{getVectorKeys:function(t){return n.reduce(function(n,e){return r(t[e],e)&&n.push(e),n},[])},testVectorProps:function(t){return t&&n.some(function(n){return r(t[n],n)})}}}(n),e=r.testVectorProps,o=r.getVectorKeys;return function(n){if(!e(n))return t(n);var r=o(n),i=n[r[0]];return Ht(i)(t,n,r)}},Ht=function(t){var n=Wt;return\"number\"==typeof t?n=Wt:Array.isArray(t)?n=qt:!function(t){return Boolean(Bt(t))}(t)?st.test(t)?n=zt:dt(t)?n=Dt:\"object\"==typeof t&&(n=Ut):n=Vt,n},Jt=Kt(function(t){var n=t.from,r=void 0===n?0:n,e=t.to,o=void 0===e?1:e,i=t.ease,u=void 0===i?a:i;return _t(function(t){var n=t.update;return{seek:function(t){return n(t)}}}).pipe(u,function(t){return wt(r,o,t)})},{ease:function(t){return\"function\"==typeof t},from:V.test,to:V.test}),Qt=yt(0,1),Zt=function(t){return void 0===t&&(t={}),_t(function(n){var r,e=n.update,o=n.complete,i=t.duration,u=void 0===i?300:i,a=t.ease,c=void 0===a?f:a,s=t.flip,p=void 0===s?0:s,l=t.loop,d=void 0===l?0:l,v=t.yoyo,h=void 0===v?0:v,m=t.from,g=void 0===m?0:m,y=t.to,b=void 0===y?1:y,w=t.elapsed,O=void 0===w?0:w,x=t.playDirection,j=void 0===x?1:x,M=t.flipCount,P=void 0===M?0:M,C=t.yoyoCount,S=void 0===C?0:C,E=t.loopCount,A=void 0===E?0:E,T=Jt({from:g,to:b,ease:c}).start(e),X=0,Y=!1,k=function(){return j*=-1},_=function(){X=Qt(bt(0,u,O)),T.seek(X)},F=function(){Y=!0,r=R.update(function(t){var n=t.delta;O+=n*j,_(),function(){var t,n=1===j?Y&&O>=u:Y&&O<=0;if(!n)return!1;if(n&&!d&&!p&&!h)return!0;var r=!1;return d&&A<d?(O=0,A++,r=!0):p&&P<p?(O=u-O,T=Jt({from:g=(t=[b,g])[0],to:b=t[1],ease:c}).start(e),P++,r=!0):h&&S<h&&(k(),S++,r=!0),!r}()&&o&&(I.update(r),R.update(o,!1,!0))},!0)},G=function(){Y=!1,r&&I.update(r)};return F(),{isActive:function(){return Y},getElapsed:function(){return yt(0,u,O)},getProgress:function(){return X},stop:function(){G()},pause:function(){return G(),this},resume:function(){return Y||F(),this},seek:function(t){return O=wt(0,u,t),R.update(_,!1,!0),this},reverse:function(){return k(),this}}})},tn=function(t,n,r){return _t(function(e){var o=e.update,i=n.split(\" \").map(function(n){return t.addEventListener(n,o,r),n});return{stop:function(){return i.forEach(function(n){return t.removeEventListener(n,o,r)})}}})},nn=function(){return{clientX:0,clientY:0,pageX:0,pageY:0,x:0,y:0}},rn=function(t,n){return void 0===n&&(n={clientX:0,clientY:0,pageX:0,pageY:0,x:0,y:0}),n.clientX=n.x=t.clientX,n.clientY=n.y=t.clientY,n.pageX=t.pageX,n.pageY=t.pageY,n},en=[nn()];if(\"undefined\"!=typeof document){tn(document,\"touchstart touchmove\",{passive:!0,capture:!0}).start(function(t){var n=t.touches;!0;var r=n.length;en.length=0;for(var e=0;e<r;e++){var o=n[e];en.push(rn(o))}})}var on=nn();if(\"undefined\"!=typeof document){tn(document,\"mousedown mousemove\",!0).start(function(t){!0,rn(t,on)})}r.d(n,\"wrapGrid\",function(){return sn});var un={anticipate:g,backIn:v,backInOut:m,backOut:h,circIn:p,circInOut:d,circOut:l,easeIn:c,easeInOut:s,easeOut:f,linear:a},an=function(t){return t?Array.prototype.slice.call(t):[]},cn=function(t,n){var r=n.getBoundingClientRect(),e={top:r.top,left:r.left,width:r.width,height:r.height};return e.top-=t.top,e.left-=t.left,e.top=Math.max(e.top,0),e.left=Math.max(e.left,0),e},fn=function(t,n){var r=n.translateX,e=n.translateY,o=n.scaleX,i=n.scaleY,u=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}).immediate,a=0===r&&0===e&&1===o&&1===i,c=function(){t.style.transform=a?\"\":\"translateX(\".concat(r,\"px) translateY(\").concat(e,\"px) scaleX(\").concat(o,\") scaleY(\").concat(i,\")\")};u?c():R.render(c);var f=t.children[0];if(f){var s=function(){f.style.transform=a?\"\":\"scaleX(\".concat(1/o,\") scaleY(\").concat(1/i,\")\")};u?s():R.render(s)}},sn=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.duration,e=void 0===r?250:r,o=n.stagger,i=void 0===o?0:o,u=n.easing,a=void 0===u?\"easeInOut\":u,c=n.onStart,f=void 0===c?function(){}:c,s=n.onEnd,p=void 0===s?function(){}:s;if(!un[a])throw new Error(\"\".concat(a,\" is not a valid easing name\"));var l={},d=function(n){var r=t.getBoundingClientRect();an(n).forEach(function(t){if(\"function\"==typeof t.getBoundingClientRect){if(!t.dataset.animateGridId){var n=\"\".concat(Math.random());t.dataset.animateGridId=n}var e=t.dataset.animateGridId;l[e]||(l[e]={});var o=cn(r,t);l[e].rect=o,l[e].gridBoundingClientRect=r}})};d(t.children);var v=F()(function(){var n=document.querySelector(\"body\"),r=n&&!n.contains(t);t&&!r||window.removeEventListener(\"resize\",v),d(t.children)},250);window.addEventListener(\"resize\",v);var h=F()(function(){d(t.children)},20);t.addEventListener(\"scroll\",h);var m=function(n){if(\"forceGridAnimation\"!==n&&!n.filter(function(t){return\"class\"===t.attributeName||t.addedNodes.length||t.removedNodes.length}).length)return;var r=t.getBoundingClientRect(),o=an(t.children);o.filter(function(t){var n=l[t.dataset.animateGridId];if(n&&n.stopTween)return n.stopTween(),delete n.stopTween,!0}).forEach(function(t){t.style.transform=\"\";var n=t.children[0];n&&(n.style.transform=\"\")});var u=o.map(function(t){return{childCoords:{},el:t,boundingClientRect:cn(r,t)}}).filter(function(t){var n=t.el,r=t.boundingClientRect,e=l[n.dataset.animateGridId];return e?r.top!==e.rect.top||r.left!==e.rect.left||r.width!==e.rect.width||r.height!==e.rect.height:(d([n]),!1)});if(u.forEach(function(t){var n=t.el;if(an(n.children).length>1)throw new Error(\"Make sure every grid item has a single container element surrounding its children\")}),u.length){var c=u.map(function(t){return t.el});f(c);var s=[];u.map(function(t){var n=t.el.children[0];return n&&(t.childCoords=cn(r,n)),t}).forEach(function(t,n){var r=t.el,o=t.boundingClientRect,u=o.top,c=o.left,f=o.width,p=o.height,v=t.childCoords,h=v.top,m=v.left,g=r.children[0],y=l[r.dataset.animateGridId],b={scaleX:y.rect.width/f,scaleY:y.rect.height/p,translateX:y.rect.left-c,translateY:y.rect.top-u};r.style.transformOrigin=\"0 0\",g&&m===c&&h===u&&(g.style.transformOrigin=\"0 0\");var w=function(){},O=new Promise(function(t){w=t});s.push(O),fn(r,b,{immediate:!0});var x=function(){var t=Zt({from:b,to:{translateX:0,translateY:0,scaleX:1,scaleY:1},duration:e,ease:un[a]}).start({update:function(t){fn(r,t),R.postRender(function(){return d([r])})},complete:w}).stop;y.stopTween=t};if(\"number\"!=typeof i)x();else{var j=setTimeout(function(){R.update(x)},i*n);y.stopTween=function(){return clearTimeout(j)}}}),Promise.all(s).then(function(){p(c)})}},g=new MutationObserver(m);g.observe(t,{childList:!0,attributes:!0,subtree:!0,attributeFilter:[\"class\"]});return{unwrapGrid:function(){window.removeEventListener(\"resize\",v),t.removeEventListener(\"scroll\",h),g.disconnect()},forceGridAnimation:function(){return m(\"forceGridAnimation\")}}}}])});\n//# sourceMappingURL=main.js.map"

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = "/**\r\n * jQuery CSS Customizable Scrollbar\r\n *\r\n * Copyright 2015, Yuriy Khabarov\r\n * Dual licensed under the MIT or GPL Version 2 licenses.\r\n *\r\n * If you found bug, please contact me via email <13real008@gmail.com>\r\n *\r\n * @author Yuriy Khabarov aka Gromo\r\n * @version 0.2.11\r\n * @url https://github.com/gromo/jquery.scrollbar/\r\n *\r\n */\r\n;\r\n(function (root, factory) {\r\n    if (typeof define === 'function' && define.amd) {\r\n        define(['jquery'], factory);\r\n    } else if (typeof exports !== \"undefined\") {\r\n        factory(require('jquery'));\r\n    } else {\r\n        factory(root.jQuery);\r\n    }\r\n}(this, function ($) {\r\n    'use strict';\r\n\r\n    // init flags & variables\r\n    var debug = false;\r\n\r\n    var browser = {\r\n        data: {\r\n            index: 0,\r\n            name: 'scrollbar'\r\n        },\r\n        firefox: /firefox/i.test(navigator.userAgent),\r\n        macosx: /mac/i.test(navigator.platform),\r\n        msedge: /edge\\/\\d+/i.test(navigator.userAgent),\r\n        msie: /(msie|trident)/i.test(navigator.userAgent),\r\n        mobile: /android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent),\r\n        overlay: null,\r\n        scroll: null,\r\n        scrolls: [],\r\n        webkit: /webkit/i.test(navigator.userAgent) && !/edge\\/\\d+/i.test(navigator.userAgent)\r\n    };\r\n\r\n    browser.scrolls.add = function (instance) {\r\n        this.remove(instance).push(instance);\r\n    };\r\n    browser.scrolls.remove = function (instance) {\r\n        while ($.inArray(instance, this) >= 0) {\r\n            this.splice($.inArray(instance, this), 1);\r\n        }\r\n        return this;\r\n    };\r\n\r\n    var defaults = {\r\n        autoScrollSize: true, // automatically calculate scrollsize\r\n        autoUpdate: true, // update scrollbar if content/container size changed\r\n        debug: false, // debug mode\r\n        disableBodyScroll: false, // disable body scroll if mouse over container\r\n        duration: 200, // scroll animate duration in ms\r\n        ignoreMobile: false, // ignore mobile devices\r\n        ignoreOverlay: false, // ignore browsers with overlay scrollbars (mobile, MacOS)\r\n        isRtl: false, // is RTL\r\n        scrollStep: 30, // scroll step for scrollbar arrows\r\n        showArrows: false, // add class to show arrows\r\n        stepScrolling: true, // when scrolling to scrollbar mousedown position\r\n\r\n        scrollx: null, // horizontal scroll element\r\n        scrolly: null, // vertical scroll element\r\n\r\n        onDestroy: null, // callback function on destroy,\r\n        onFallback: null, // callback function if scrollbar is not initialized\r\n        onInit: null, // callback function on first initialization\r\n        onScroll: null, // callback function on content scrolling\r\n        onUpdate: null            // callback function on init/resize (before scrollbar size calculation)\r\n    };\r\n\r\n\r\n    var BaseScrollbar = function (container) {\r\n\r\n        if (!browser.scroll) {\r\n            browser.overlay = isScrollOverlaysContent();\r\n            browser.scroll = getBrowserScrollSize();\r\n            updateScrollbars();\r\n\r\n            $(window).resize(function () {\r\n                var forceUpdate = false;\r\n                if (browser.scroll && (browser.scroll.height || browser.scroll.width)) {\r\n                    var scroll = getBrowserScrollSize();\r\n                    if (scroll.height !== browser.scroll.height || scroll.width !== browser.scroll.width) {\r\n                        browser.scroll = scroll;\r\n                        forceUpdate = true; // handle page zoom\r\n                    }\r\n                }\r\n                updateScrollbars(forceUpdate);\r\n            });\r\n        }\r\n\r\n        this.container = container;\r\n        this.namespace = '.scrollbar_' + browser.data.index++;\r\n        this.options = $.extend({}, defaults, window.jQueryScrollbarOptions || {});\r\n        this.scrollTo = null;\r\n        this.scrollx = {};\r\n        this.scrolly = {};\r\n\r\n        container.data(browser.data.name, this);\r\n        browser.scrolls.add(this);\r\n    };\r\n\r\n    BaseScrollbar.prototype = {\r\n        destroy: function () {\r\n\r\n            if (!this.wrapper) {\r\n                return;\r\n            }\r\n\r\n            this.container.removeData(browser.data.name);\r\n            browser.scrolls.remove(this);\r\n\r\n            // init variables\r\n            var scrollLeft = this.container.scrollLeft();\r\n            var scrollTop = this.container.scrollTop();\r\n\r\n            this.container.insertBefore(this.wrapper).css({\r\n                \"height\": \"\",\r\n                \"margin\": \"\",\r\n                \"max-height\": \"\"\r\n            })\r\n                .removeClass('scroll-content scroll-scrollx_visible scroll-scrolly_visible')\r\n                .off(this.namespace)\r\n                .scrollLeft(scrollLeft)\r\n                .scrollTop(scrollTop);\r\n\r\n            this.scrollx.scroll.removeClass('scroll-scrollx_visible').find('div').addBack().off(this.namespace);\r\n            this.scrolly.scroll.removeClass('scroll-scrolly_visible').find('div').addBack().off(this.namespace);\r\n\r\n            this.wrapper.remove();\r\n\r\n            $(document).add('body').off(this.namespace);\r\n\r\n            if ($.isFunction(this.options.onDestroy)) {\r\n                this.options.onDestroy.apply(this, [this.container]);\r\n            }\r\n        },\r\n        init: function (options) {\r\n\r\n            // init variables\r\n            var S = this,\r\n                c = this.container,\r\n                cw = this.containerWrapper || c,\r\n                namespace = this.namespace,\r\n                o = $.extend(this.options, options || {}),\r\n                s = {x: this.scrollx, y: this.scrolly},\r\n            w = this.wrapper,\r\n                cssOptions = {};\r\n\r\n            var initScroll = {\r\n                scrollLeft: c.scrollLeft(),\r\n                scrollTop: c.scrollTop()\r\n            };\r\n\r\n            // do not init if in ignorable browser\r\n            if ((browser.mobile && o.ignoreMobile)\r\n                || (browser.overlay && o.ignoreOverlay)\r\n                || (browser.macosx && !browser.webkit) // still required to ignore nonWebKit browsers on Mac\r\n                ) {\r\n                if ($.isFunction(o.onFallback)) {\r\n                    o.onFallback.apply(this, [c]);\r\n                }\r\n                return false;\r\n            }\r\n\r\n            // init scroll container\r\n            if (!w) {\r\n                this.wrapper = w = $('<div>').addClass('scroll-wrapper').addClass(c.attr('class'))\r\n                    .css('position', c.css('position') === 'absolute' ? 'absolute' : 'relative')\r\n                    .insertBefore(c).append(c);\r\n\r\n                if (o.isRtl) {\r\n                    w.addClass('scroll--rtl');\r\n                }\r\n\r\n                if (c.is('textarea')) {\r\n                    this.containerWrapper = cw = $('<div>').insertBefore(c).append(c);\r\n                    w.addClass('scroll-textarea');\r\n                }\r\n\r\n                cssOptions = {\r\n                    \"height\": \"auto\",\r\n                    \"margin-bottom\": browser.scroll.height * -1 + 'px',\r\n                    \"max-height\": \"\"\r\n                };\r\n                cssOptions[o.isRtl ? 'margin-left' : 'margin-right'] = browser.scroll.width * -1 + 'px';\r\n\r\n                cw.addClass('scroll-content').css(cssOptions);\r\n\r\n                c.on('scroll' + namespace, function (event) {\r\n                    var scrollLeft = c.scrollLeft();\r\n                    var scrollTop = c.scrollTop();\r\n                    if (o.isRtl) {\r\n                        // webkit   0:100\r\n                        // ie/edge  100:0\r\n                        // firefox -100:0\r\n                        switch (true) {\r\n                            case browser.firefox:\r\n                                scrollLeft = Math.abs(scrollLeft);\r\n                            case browser.msedge || browser.msie:\r\n                                scrollLeft = c[0].scrollWidth - c[0].clientWidth - scrollLeft;\r\n                                break;\r\n                        }\r\n                    }\r\n                    if ($.isFunction(o.onScroll)) {\r\n                        o.onScroll.call(S, {\r\n                            maxScroll: s.y.maxScrollOffset,\r\n                            scroll: scrollTop,\r\n                            size: s.y.size,\r\n                            visible: s.y.visible\r\n                        }, {\r\n                            maxScroll: s.x.maxScrollOffset,\r\n                            scroll: scrollLeft,\r\n                            size: s.x.size,\r\n                            visible: s.x.visible\r\n                        });\r\n                    }\r\n                    s.x.isVisible && s.x.scroll.bar.css('left', scrollLeft * s.x.kx + 'px');\r\n                    s.y.isVisible && s.y.scroll.bar.css('top', scrollTop * s.y.kx + 'px');\r\n                });\r\n\r\n                /* prevent native scrollbars to be visible on #anchor click */\r\n                w.on('scroll' + namespace, function () {\r\n                    w.scrollTop(0).scrollLeft(0);\r\n                });\r\n\r\n                if (o.disableBodyScroll) {\r\n                    var handleMouseScroll = function (event) {\r\n                        isVerticalScroll(event) ?\r\n                            s.y.isVisible && s.y.mousewheel(event) :\r\n                            s.x.isVisible && s.x.mousewheel(event);\r\n                    };\r\n                    w.on('MozMousePixelScroll' + namespace, handleMouseScroll);\r\n                    w.on('mousewheel' + namespace, handleMouseScroll);\r\n\r\n                    if (browser.mobile) {\r\n                        w.on('touchstart' + namespace, function (event) {\r\n                            var touch = event.originalEvent.touches && event.originalEvent.touches[0] || event;\r\n                            var originalTouch = {\r\n                                pageX: touch.pageX,\r\n                                pageY: touch.pageY\r\n                            };\r\n                            var originalScroll = {\r\n                                left: c.scrollLeft(),\r\n                                top: c.scrollTop()\r\n                            };\r\n                            $(document).on('touchmove' + namespace, function (event) {\r\n                                var touch = event.originalEvent.targetTouches && event.originalEvent.targetTouches[0] || event;\r\n                                c.scrollLeft(originalScroll.left + originalTouch.pageX - touch.pageX);\r\n                                c.scrollTop(originalScroll.top + originalTouch.pageY - touch.pageY);\r\n                                event.preventDefault();\r\n                            });\r\n                            $(document).on('touchend' + namespace, function () {\r\n                                $(document).off(namespace);\r\n                            });\r\n                        });\r\n                    }\r\n                }\r\n                if ($.isFunction(o.onInit)) {\r\n                    o.onInit.apply(this, [c]);\r\n                }\r\n            } else {\r\n                cssOptions = {\r\n                    \"height\": \"auto\",\r\n                    \"margin-bottom\": browser.scroll.height * -1 + 'px',\r\n                    \"max-height\": \"\"\r\n                };\r\n                cssOptions[o.isRtl ? 'margin-left' : 'margin-right'] = browser.scroll.width * -1 + 'px';\r\n                cw.css(cssOptions);\r\n            }\r\n\r\n            // init scrollbars & recalculate sizes\r\n            $.each(s, function (d, scrollx) {\r\n\r\n                var scrollCallback = null;\r\n                var scrollForward = 1;\r\n                var scrollOffset = (d === 'x') ? 'scrollLeft' : 'scrollTop';\r\n                var scrollStep = o.scrollStep;\r\n                var scrollTo = function () {\r\n                    var currentOffset = c[scrollOffset]();\r\n                    c[scrollOffset](currentOffset + scrollStep);\r\n                    if (scrollForward == 1 && (currentOffset + scrollStep) >= scrollToValue)\r\n                        currentOffset = c[scrollOffset]();\r\n                    if (scrollForward == -1 && (currentOffset + scrollStep) <= scrollToValue)\r\n                        currentOffset = c[scrollOffset]();\r\n                    if (c[scrollOffset]() == currentOffset && scrollCallback) {\r\n                        scrollCallback();\r\n                    }\r\n                }\r\n                var scrollToValue = 0;\r\n\r\n                if (!scrollx.scroll) {\r\n\r\n                    scrollx.scroll = S._getScroll(o['scroll' + d]).addClass('scroll-' + d);\r\n\r\n                    if (o.showArrows) {\r\n                        scrollx.scroll.addClass('scroll-element_arrows_visible');\r\n                    }\r\n\r\n                    scrollx.mousewheel = function (event) {\r\n\r\n                        if (!scrollx.isVisible || (d === 'x' && isVerticalScroll(event))) {\r\n                            return true;\r\n                        }\r\n                        if (d === 'y' && !isVerticalScroll(event)) {\r\n                            s.x.mousewheel(event);\r\n                            return true;\r\n                        }\r\n\r\n                        var delta = event.originalEvent.wheelDelta * -1 || event.originalEvent.detail;\r\n                        var maxScrollValue = scrollx.size - scrollx.visible - scrollx.offset;\r\n\r\n                        // fix new mozilla\r\n                        if (!delta) {\r\n                            if (d === 'x' && !!event.originalEvent.deltaX) {\r\n                                delta = event.originalEvent.deltaX * 40;\r\n                            } else if (d === 'y' && !!event.originalEvent.deltaY) {\r\n                                delta = event.originalEvent.deltaY * 40;\r\n                            }\r\n                        }\r\n\r\n                        if ((delta > 0 && scrollToValue < maxScrollValue) || (delta < 0 && scrollToValue > 0)) {\r\n                            scrollToValue = scrollToValue + delta;\r\n                            if (scrollToValue < 0)\r\n                                scrollToValue = 0;\r\n                            if (scrollToValue > maxScrollValue)\r\n                                scrollToValue = maxScrollValue;\r\n\r\n                            S.scrollTo = S.scrollTo || {};\r\n                            S.scrollTo[scrollOffset] = scrollToValue;\r\n                            setTimeout(function () {\r\n                                if (S.scrollTo) {\r\n                                    c.stop().animate(S.scrollTo, 240, 'linear', function () {\r\n                                        scrollToValue = c[scrollOffset]();\r\n                                    });\r\n                                    S.scrollTo = null;\r\n                                }\r\n                            }, 1);\r\n                        }\r\n\r\n                        event.preventDefault();\r\n                        return false;\r\n                    };\r\n\r\n                    scrollx.scroll\r\n                        .on('MozMousePixelScroll' + namespace, scrollx.mousewheel)\r\n                        .on('mousewheel' + namespace, scrollx.mousewheel)\r\n                        .on('mouseenter' + namespace, function () {\r\n                            scrollToValue = c[scrollOffset]();\r\n                        });\r\n\r\n                    // handle arrows & scroll inner mousedown event\r\n                    scrollx.scroll.find('.scroll-arrow, .scroll-element_track')\r\n                        .on('mousedown' + namespace, function (event) {\r\n\r\n                            if (event.which != 1) // lmb\r\n                                return true;\r\n\r\n                            scrollForward = 1;\r\n\r\n                            var data = {\r\n                                eventOffset: event[(d === 'x') ? 'pageX' : 'pageY'],\r\n                                maxScrollValue: scrollx.size - scrollx.visible - scrollx.offset,\r\n                                scrollbarOffset: scrollx.scroll.bar.offset()[(d === 'x') ? 'left' : 'top'],\r\n                                scrollbarSize: scrollx.scroll.bar[(d === 'x') ? 'outerWidth' : 'outerHeight']()\r\n                            };\r\n                            var timeout = 0, timer = 0;\r\n\r\n                            if ($(this).hasClass('scroll-arrow')) {\r\n                                scrollForward = $(this).hasClass(\"scroll-arrow_more\") ? 1 : -1;\r\n                                scrollStep = o.scrollStep * scrollForward;\r\n                                scrollToValue = scrollForward > 0 ? data.maxScrollValue : 0;\r\n                                if (o.isRtl) {\r\n                                    switch(true){\r\n                                        case browser.firefox:\r\n                                            scrollToValue = scrollForward > 0 ? 0: data.maxScrollValue * -1;\r\n                                            break;\r\n                                        case browser.msie || browser.msedge:\r\n                                            break;\r\n                                    }\r\n                                }\r\n                            } else {\r\n                                scrollForward = (data.eventOffset > (data.scrollbarOffset + data.scrollbarSize) ? 1\r\n                                    : (data.eventOffset < data.scrollbarOffset ? -1 : 0));\r\n                                if(d === 'x' && o.isRtl && (browser.msie || browser.msedge))\r\n                                    scrollForward = scrollForward * -1;\r\n                                scrollStep = Math.round(scrollx.visible * 0.75) * scrollForward;\r\n                                scrollToValue = (data.eventOffset - data.scrollbarOffset -\r\n                                    (o.stepScrolling ? (scrollForward == 1 ? data.scrollbarSize : 0)\r\n                                        : Math.round(data.scrollbarSize / 2)));\r\n                                scrollToValue = c[scrollOffset]() + (scrollToValue / scrollx.kx);\r\n                            }\r\n\r\n                            S.scrollTo = S.scrollTo || {};\r\n                            S.scrollTo[scrollOffset] = o.stepScrolling ? c[scrollOffset]() + scrollStep : scrollToValue;\r\n\r\n                            if (o.stepScrolling) {\r\n                                scrollCallback = function () {\r\n                                    scrollToValue = c[scrollOffset]();\r\n                                    clearInterval(timer);\r\n                                    clearTimeout(timeout);\r\n                                    timeout = 0;\r\n                                    timer = 0;\r\n                                };\r\n                                timeout = setTimeout(function () {\r\n                                    timer = setInterval(scrollTo, 40);\r\n                                }, o.duration + 100);\r\n                            }\r\n\r\n                            setTimeout(function () {\r\n                                if (S.scrollTo) {\r\n                                    c.animate(S.scrollTo, o.duration);\r\n                                    S.scrollTo = null;\r\n                                }\r\n                            }, 1);\r\n\r\n                            return S._handleMouseDown(scrollCallback, event);\r\n                        });\r\n\r\n                    // handle scrollbar drag'n'drop\r\n                    scrollx.scroll.bar.on('mousedown' + namespace, function (event) {\r\n\r\n                        if (event.which != 1) // lmb\r\n                            return true;\r\n\r\n                        var eventPosition = event[(d === 'x') ? 'pageX' : 'pageY'];\r\n                        var initOffset = c[scrollOffset]();\r\n\r\n                        scrollx.scroll.addClass('scroll-draggable');\r\n\r\n                        $(document).on('mousemove' + namespace, function (event) {\r\n                            var diff = parseInt((event[(d === 'x') ? 'pageX' : 'pageY'] - eventPosition) / scrollx.kx, 10);\r\n                            if (d === 'x' && o.isRtl && (browser.msie || browser.msedge))\r\n                                diff = diff * -1;\r\n                            c[scrollOffset](initOffset + diff);\r\n                        });\r\n\r\n                        return S._handleMouseDown(function () {\r\n                            scrollx.scroll.removeClass('scroll-draggable');\r\n                            scrollToValue = c[scrollOffset]();\r\n                        }, event);\r\n                    });\r\n                }\r\n            });\r\n\r\n            // remove classes & reset applied styles\r\n            $.each(s, function (d, scrollx) {\r\n                var scrollClass = 'scroll-scroll' + d + '_visible';\r\n                var scrolly = (d == \"x\") ? s.y : s.x;\r\n\r\n                scrollx.scroll.removeClass(scrollClass);\r\n                scrolly.scroll.removeClass(scrollClass);\r\n                cw.removeClass(scrollClass);\r\n            });\r\n\r\n            // calculate init sizes\r\n            $.each(s, function (d, scrollx) {\r\n                $.extend(scrollx, (d == \"x\") ? {\r\n                    offset: parseInt(c.css('left'), 10) || 0,\r\n                    size: c.prop('scrollWidth'),\r\n                    visible: w.width()\r\n                } : {\r\n                    offset: parseInt(c.css('top'), 10) || 0,\r\n                    size: c.prop('scrollHeight'),\r\n                    visible: w.height()\r\n                });\r\n            });\r\n\r\n            // update scrollbar visibility/dimensions\r\n            this._updateScroll('x', this.scrollx);\r\n            this._updateScroll('y', this.scrolly);\r\n\r\n            if ($.isFunction(o.onUpdate)) {\r\n                o.onUpdate.apply(this, [c]);\r\n            }\r\n\r\n            // calculate scroll size\r\n            $.each(s, function (d, scrollx) {\r\n\r\n                var cssOffset = (d === 'x') ? 'left' : 'top';\r\n                var cssFullSize = (d === 'x') ? 'outerWidth' : 'outerHeight';\r\n                var cssSize = (d === 'x') ? 'width' : 'height';\r\n                var offset = parseInt(c.css(cssOffset), 10) || 0;\r\n\r\n                var AreaSize = scrollx.size;\r\n                var AreaVisible = scrollx.visible + offset;\r\n\r\n                var scrollSize = scrollx.scroll.size[cssFullSize]() + (parseInt(scrollx.scroll.size.css(cssOffset), 10) || 0);\r\n\r\n                if (o.autoScrollSize) {\r\n                    scrollx.scrollbarSize = parseInt(scrollSize * AreaVisible / AreaSize, 10);\r\n                    scrollx.scroll.bar.css(cssSize, scrollx.scrollbarSize + 'px');\r\n                }\r\n\r\n                scrollx.scrollbarSize = scrollx.scroll.bar[cssFullSize]();\r\n                scrollx.kx = ((scrollSize - scrollx.scrollbarSize) / (AreaSize - AreaVisible)) || 1;\r\n                scrollx.maxScrollOffset = AreaSize - AreaVisible;\r\n            });\r\n\r\n            c.scrollLeft(initScroll.scrollLeft).scrollTop(initScroll.scrollTop).trigger('scroll');\r\n        },\r\n        /**\r\n         * Get scrollx/scrolly object\r\n         *\r\n         * @param {Mixed} scroll\r\n         * @returns {jQuery} scroll object\r\n         */\r\n        _getScroll: function (scroll) {\r\n            var types = {\r\n                advanced: [\r\n                    '<div class=\"scroll-element\">',\r\n                    '<div class=\"scroll-element_corner\"></div>',\r\n                    '<div class=\"scroll-arrow scroll-arrow_less\"></div>',\r\n                    '<div class=\"scroll-arrow scroll-arrow_more\"></div>',\r\n                    '<div class=\"scroll-element_outer\">',\r\n                    '<div class=\"scroll-element_size\"></div>', // required! used for scrollbar size calculation !\r\n                    '<div class=\"scroll-element_inner-wrapper\">',\r\n                    '<div class=\"scroll-element_inner scroll-element_track\">', // used for handling scrollbar click\r\n                    '<div class=\"scroll-element_inner-bottom\"></div>',\r\n                    '</div>',\r\n                    '</div>',\r\n                    '<div class=\"scroll-bar\">', // required\r\n                    '<div class=\"scroll-bar_body\">',\r\n                    '<div class=\"scroll-bar_body-inner\"></div>',\r\n                    '</div>',\r\n                    '<div class=\"scroll-bar_bottom\"></div>',\r\n                    '<div class=\"scroll-bar_center\"></div>',\r\n                    '</div>',\r\n                    '</div>',\r\n                    '</div>'\r\n                ].join(''),\r\n                simple: [\r\n                    '<div class=\"scroll-element\">',\r\n                    '<div class=\"scroll-element_outer\">',\r\n                    '<div class=\"scroll-element_size\"></div>', // required! used for scrollbar size calculation !\r\n                    '<div class=\"scroll-element_track\"></div>', // used for handling scrollbar click\r\n                    '<div class=\"scroll-bar\"></div>', // required\r\n                    '</div>',\r\n                    '</div>'\r\n                ].join('')\r\n            };\r\n            if (types[scroll]) {\r\n                scroll = types[scroll];\r\n            }\r\n            if (!scroll) {\r\n                scroll = types['simple'];\r\n            }\r\n            if (typeof (scroll) == 'string') {\r\n                scroll = $(scroll).appendTo(this.wrapper);\r\n            } else {\r\n                scroll = $(scroll);\r\n            }\r\n            $.extend(scroll, {\r\n                bar: scroll.find('.scroll-bar'),\r\n                size: scroll.find('.scroll-element_size'),\r\n                track: scroll.find('.scroll-element_track')\r\n            });\r\n            return scroll;\r\n        },\r\n        _handleMouseDown: function (callback, event) {\r\n\r\n            var namespace = this.namespace;\r\n\r\n            $(document).on('blur' + namespace, function () {\r\n                $(document).add('body').off(namespace);\r\n                callback && callback();\r\n            });\r\n            $(document).on('dragstart' + namespace, function (event) {\r\n                event.preventDefault();\r\n                return false;\r\n            });\r\n            $(document).on('mouseup' + namespace, function () {\r\n                $(document).add('body').off(namespace);\r\n                callback && callback();\r\n            });\r\n            $('body').on('selectstart' + namespace, function (event) {\r\n                event.preventDefault();\r\n                return false;\r\n            });\r\n\r\n            event && event.preventDefault();\r\n            return false;\r\n        },\r\n        _updateScroll: function (d, scrollx) {\r\n\r\n            var container = this.container,\r\n                containerWrapper = this.containerWrapper || container,\r\n                scrollClass = 'scroll-scroll' + d + '_visible',\r\n                scrolly = (d === 'x') ? this.scrolly : this.scrollx,\r\n                offset = parseInt(this.container.css((d === 'x') ? 'left' : 'top'), 10) || 0,\r\n                wrapper = this.wrapper;\r\n\r\n            var AreaSize = scrollx.size;\r\n            var AreaVisible = scrollx.visible + offset;\r\n\r\n            scrollx.isVisible = (AreaSize - AreaVisible) > 1; // bug in IE9/11 with 1px diff\r\n            if (scrollx.isVisible) {\r\n                scrollx.scroll.addClass(scrollClass);\r\n                scrolly.scroll.addClass(scrollClass);\r\n                containerWrapper.addClass(scrollClass);\r\n            } else {\r\n                scrollx.scroll.removeClass(scrollClass);\r\n                scrolly.scroll.removeClass(scrollClass);\r\n                containerWrapper.removeClass(scrollClass);\r\n            }\r\n\r\n            if (d === 'y') {\r\n                if (container.is('textarea') || AreaSize < AreaVisible) {\r\n                    containerWrapper.css({\r\n                        \"height\": (AreaVisible + browser.scroll.height) + 'px',\r\n                        \"max-height\": \"none\"\r\n                    });\r\n                } else {\r\n                    containerWrapper.css({\r\n                        //\"height\": \"auto\", // do not reset height value: issue with height:100%!\r\n                        \"max-height\": (AreaVisible + browser.scroll.height) + 'px'\r\n                    });\r\n                }\r\n            }\r\n\r\n            if (scrollx.size != container.prop('scrollWidth')\r\n                || scrolly.size != container.prop('scrollHeight')\r\n                || scrollx.visible != wrapper.width()\r\n                || scrolly.visible != wrapper.height()\r\n                || scrollx.offset != (parseInt(container.css('left'), 10) || 0)\r\n                || scrolly.offset != (parseInt(container.css('top'), 10) || 0)\r\n                ) {\r\n                $.extend(this.scrollx, {\r\n                    offset: parseInt(container.css('left'), 10) || 0,\r\n                    size: container.prop('scrollWidth'),\r\n                    visible: wrapper.width()\r\n                });\r\n                $.extend(this.scrolly, {\r\n                    offset: parseInt(container.css('top'), 10) || 0,\r\n                    size: this.container.prop('scrollHeight'),\r\n                    visible: wrapper.height()\r\n                });\r\n                this._updateScroll(d === 'x' ? 'y' : 'x', scrolly);\r\n            }\r\n        }\r\n    };\r\n\r\n    var CustomScrollbar = BaseScrollbar;\r\n\r\n    /*\r\n     * Extend jQuery as plugin\r\n     *\r\n     * @param {Mixed} command to execute\r\n     * @param {Mixed} arguments as Array\r\n     * @return {jQuery}\r\n     */\r\n    $.fn.scrollbar = function (command, args) {\r\n        if (typeof command !== 'string') {\r\n            args = command;\r\n            command = 'init';\r\n        }\r\n        if (typeof args === 'undefined') {\r\n            args = [];\r\n        }\r\n        if (!$.isArray(args)) {\r\n            args = [args];\r\n        }\r\n        this.not('body, .scroll-wrapper').each(function () {\r\n            var element = $(this),\r\n                instance = element.data(browser.data.name);\r\n            if (instance || command === 'init') {\r\n                if (!instance) {\r\n                    instance = new CustomScrollbar(element);\r\n                }\r\n                if (instance[command]) {\r\n                    instance[command].apply(instance, args);\r\n                }\r\n            }\r\n        });\r\n        return this;\r\n    };\r\n\r\n    /**\r\n     * Connect default options to global object\r\n     */\r\n    $.fn.scrollbar.options = defaults;\r\n\r\n\r\n    /**\r\n     * Check if scroll content/container size is changed\r\n     */\r\n\r\n    var updateScrollbars = (function () {\r\n        var timer = 0,\r\n            timerCounter = 0;\r\n\r\n        return function (force) {\r\n            var i, container, options, scroll, wrapper, scrollx, scrolly;\r\n            for (i = 0; i < browser.scrolls.length; i++) {\r\n                scroll = browser.scrolls[i];\r\n                container = scroll.container;\r\n                options = scroll.options;\r\n                wrapper = scroll.wrapper;\r\n                scrollx = scroll.scrollx;\r\n                scrolly = scroll.scrolly;\r\n                if (force || (options.autoUpdate && wrapper && wrapper.is(':visible') &&\r\n                    (container.prop('scrollWidth') != scrollx.size || container.prop('scrollHeight') != scrolly.size || wrapper.width() != scrollx.visible || wrapper.height() != scrolly.visible))) {\r\n                    scroll.init();\r\n\r\n                    if (options.debug) {\r\n                        window.console && console.log({\r\n                            scrollHeight: container.prop('scrollHeight') + ':' + scroll.scrolly.size,\r\n                            scrollWidth: container.prop('scrollWidth') + ':' + scroll.scrollx.size,\r\n                            visibleHeight: wrapper.height() + ':' + scroll.scrolly.visible,\r\n                            visibleWidth: wrapper.width() + ':' + scroll.scrollx.visible\r\n                        }, true);\r\n                        timerCounter++;\r\n                    }\r\n                }\r\n            }\r\n            if (debug && timerCounter > 10) {\r\n                window.console && console.log('Scroll updates exceed 10');\r\n                updateScrollbars = function () {};\r\n            } else {\r\n                clearTimeout(timer);\r\n                timer = setTimeout(updateScrollbars, 300);\r\n            }\r\n        };\r\n    })();\r\n\r\n    /* ADDITIONAL FUNCTIONS */\r\n    /**\r\n     * Get native browser scrollbar size (height/width)\r\n     *\r\n     * @param {Boolean} actual size or CSS size, default - CSS size\r\n     * @returns {Object} with height, width\r\n     */\r\n    function getBrowserScrollSize(actualSize) {\r\n\r\n        if (browser.webkit && !actualSize) {\r\n            return {\r\n                height: 0,\r\n                width: 0\r\n            };\r\n        }\r\n\r\n        if (!browser.data.outer) {\r\n            var css = {\r\n                \"border\": \"none\",\r\n                \"box-sizing\": \"content-box\",\r\n                \"height\": \"200px\",\r\n                \"margin\": \"0\",\r\n                \"padding\": \"0\",\r\n                \"width\": \"200px\"\r\n            };\r\n            browser.data.inner = $(\"<div>\").css($.extend({}, css));\r\n            browser.data.outer = $(\"<div>\").css($.extend({\r\n                \"left\": \"-1000px\",\r\n                \"overflow\": \"scroll\",\r\n                \"position\": \"absolute\",\r\n                \"top\": \"-1000px\"\r\n            }, css)).append(browser.data.inner).appendTo(\"body\");\r\n        }\r\n\r\n        browser.data.outer.scrollLeft(1000).scrollTop(1000);\r\n\r\n        return {\r\n            height: Math.ceil((browser.data.outer.offset().top - browser.data.inner.offset().top) || 0),\r\n            width: Math.ceil((browser.data.outer.offset().left - browser.data.inner.offset().left) || 0)\r\n        };\r\n    }\r\n\r\n    /**\r\n     * Check if native browser scrollbars overlay content\r\n     *\r\n     * @returns {Boolean}\r\n     */\r\n    function isScrollOverlaysContent() {\r\n        var scrollSize = getBrowserScrollSize(true);\r\n        return !(scrollSize.height || scrollSize.width);\r\n    }\r\n\r\n    function isVerticalScroll(event) {\r\n        var e = event.originalEvent;\r\n        if (e.axis && e.axis === e.HORIZONTAL_AXIS)\r\n            return false;\r\n        if (e.wheelDeltaX)\r\n            return false;\r\n        return true;\r\n    }\r\n\r\n\r\n    /**\r\n     * Extend AngularJS as UI directive\r\n     * and expose a provider for override default config\r\n     *\r\n     */\r\n    if (window.angular) {\r\n        (function (angular) {\r\n            angular.module('jQueryScrollbar', [])\r\n                .provider('jQueryScrollbar', function () {\r\n                    var defaultOptions = defaults;\r\n                    return {\r\n                        setOptions: function (options) {\r\n                            angular.extend(defaultOptions, options);\r\n                        },\r\n                        $get: function () {\r\n                            return {\r\n                                options: angular.copy(defaultOptions)\r\n                            };\r\n                        }\r\n                    };\r\n                })\r\n                .directive('jqueryScrollbar', ['jQueryScrollbar', '$parse', function (jQueryScrollbar, $parse) {\r\n                        return {\r\n                            restrict: \"AC\",\r\n                            link: function (scope, element, attrs) {\r\n                                var model = $parse(attrs.jqueryScrollbar),\r\n                                    options = model(scope);\r\n                                element.scrollbar(options || jQueryScrollbar.options)\r\n                                    .on('$destroy', function () {\r\n                                        element.scrollbar('destroy');\r\n                                    });\r\n                            }\r\n                        };\r\n                    }]);\r\n        })(window.angular);\r\n    }\r\n}));\r\n"

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0)(__webpack_require__(26))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0)(__webpack_require__(27))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// load Bootstrap's JS
__webpack_require__(1);

// first initialize our app component
__webpack_require__(4);

// load Basecoat components
__webpack_require__(2);
__webpack_require__(6);
__webpack_require__(21);
__webpack_require__(12);
__webpack_require__(8);
__webpack_require__(7);
__webpack_require__(9);
__webpack_require__(5);
__webpack_require__(18);
__webpack_require__(15);
__webpack_require__(25);
__webpack_require__(20);
__webpack_require__(13);
__webpack_require__(24);
__webpack_require__(14);
__webpack_require__(23);
__webpack_require__(19);
__webpack_require__(17);
__webpack_require__(16);
__webpack_require__(11);
__webpack_require__(22);
__webpack_require__(10);
__webpack_require__(3);


/***/ })
/******/ ]);
//# sourceMappingURL=ntt.basecoat.js.map