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
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// load and apply syntax highlighting
basecoat.HighlightJs = __webpack_require__(27);
basecoat.HighlightJs.registerLanguage('html', __webpack_require__(30));
basecoat.HighlightJs.registerLanguage('javascript', __webpack_require__(28));
basecoat.HighlightJs.registerLanguage('scss', __webpack_require__(29));
// basecoat.HighlightJs.registerLanguage('css', require('highlight.js/lib/languages/css.js')); // just use scss instead?
basecoat.HighlightJs.initHighlightingOnLoad();

// load clipboard copy tool
basecoat.ClipboardJs = __webpack_require__(20);

+function ($) {
  var tooltipTimeout;
  var tooltipHoverTitle = 'Copy source';
  var tooltipClickTitle = 'Copied!';

  // clipboard copy button
  var clipboard = new basecoat.ClipboardJs('[data-action="clipboard"]', {
    target: function (trigger) {
      return $(trigger).parent().find('pre')[0];
    }
  });

  $(function () {

    // clipboard copy button's tooltip
    $('[data-action="clipboard"]').tooltip({
      title: tooltipHoverTitle,
      placement: 'left'
    });

    // change tooltip text on success
    clipboard.on('success', function (e) {
      $(e.trigger).attr('data-original-title', tooltipClickTitle).tooltip('show');
      window.clearTimeout(tooltipTimeout);
      tooltipTimeout = window.setTimeout(function () {
        $(e.trigger).attr('data-original-title', tooltipHoverTitle).tooltip('hide');
      }, 1000);
    });

    // prevent page jump whenever an anchor in the demo area is clicked
    $('.code-section .code-demo').on('click', '[href="#"]', function (e) {
      e.preventDefault();
    });

  });
}(jQuery);



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* DEMO CODE just for demonstrating CSS/HTML states. Actual file upload JS would be application specific. */
window.fd = { logging: false };
basecoat.Filedrop = __webpack_require__(23);

+function ($) {
  $(function () {

    // simple file field button
    $('[data-file-picker-example="simple"]').each(function () {
      var $picker = $(this);
      var $input = $picker.find('input[type="file"]');
      var $details = $picker.find('.file-details');

      // update file list on change
      $input.on('change', function () {
        var files = $input[0].files;
        $details.empty();
        if (files.length > 0) {
          $details.append('<div class="collapsed" data-toggle="collapse">' + files.length + ' Attachment' + (files.length > 1 ? 's' : '') + '</div>');
          $details.append('<div class="collapse"/>');
        }
        for (var i = 0; i < files.length; i++) {
          $details.find('.collapse').append('<div class="file-label">' + files.item(i).name + '</div>');
        }
      });
    });

    // advanced file drag-n-drop with (simulated) upload
    $('[data-file-picker-example="advanced"]').each(function () {
      var $picker = $(this);
      var $uploader = $picker.find('.file-uploader');
      var $details = $picker.find('.file-details');
      var $dropzone = $picker.find('.file-dropzone');

      // delete uploaded files
      $picker.on('click', '.file-details .close', function () {
        var $picker = $(this).closest('.file-picker');
        var $details = $picker.find('.file-details');
        $(this).closest('.file-label').remove();
        var attachmentCount = $picker.find('.file-label').length;
        if (attachmentCount === 0) {
          $details.empty();
        } else {
          $details.find('[data-toggle="collapse"]').text(attachmentCount + ' Attachment' + (attachmentCount > 1 ? 's' : ''));
        }
      });

      // attach filedrop plugin
      $picker.data('filedrop',
        new FileDrop($dropzone[0], {
          multiple: true
        })
        .event('dragOver', function () {
          $dropzone.addClass('active');
        })
        .event('dragEnter', function () {
          $dropzone.removeClass('active');
        })
        .event('send', function (files) {
          if ($dropzone.hasClass('disabled')) return;
          $dropzone.addClass('disabled');

          // simulated upload of a files
          function uploadPart(fileIndex, uploadPercent) {
            var file = files[fileIndex];
            var fileName = file.name;
            var fileSize = file.size / 1000;

            $uploader.empty();
            $uploader.append('Uploading <strong>' + fileName + '</strong> <span class="upload-status">' + Number((uploadPercent / 100 * fileSize).toFixed(1)) + ' of ' + Number(fileSize.toFixed(1)) + 'KB</span>');
            $uploader.append('<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="' + uploadPercent + '" aria-valuemin="0" aria-valuemax="100" style="width:' + uploadPercent + '%;" /></div>');
            uploadPercent += 3;
            if (uploadPercent <= 100) {
              setTimeout(uploadPart, (50 + 0.01 * Math.max(fileSize, 1000)), fileIndex, uploadPercent);
            } else {
              if ($picker.find('.file-label').length === 0) {
                $details.append('<div class="collapsed" data-toggle="collapse">1 Attachment</div>');
                $details.append('<div class="collapse"/>');
              } else {
                $details.find('[data-toggle="collapse"]').text(($picker.find('.file-label').length + 1) + ' Attachments');
              }
              $details.find('.collapse').append('<div class="file-label">' + fileName + '<span class="close"></span></div>');
              fileIndex++;
              if (fileIndex < files.length) {
                setTimeout(uploadPart, 0, fileIndex, 0);
              } else {
                $uploader.empty();
                $dropzone.removeClass('disabled');
                $dropzone.removeClass('active');
              }
            }
          }
          uploadPart(0, 0);

        })
      );
    });

  });
}(jQuery);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {
  $(function () {

    // default loader example
    $('[data-modal-loader-default-example]').on('click', function () {
      var $modal = basecoat.loaderModal();
      window.setTimeout(function () {
        $modal.modal('hide');
      }, 3000);
    });

    // custom loader example
    $('[data-modal-loader-custom-example]').on('click', function () {
      var $modal = basecoat.loaderModal('Please wait...');
      window.setTimeout(function () {
        $modal.modal('hide');
      }, 3000);
    });

    // button loader example
    $('[data-button-loader-example]').on('click', function () {
      var $btn = $(this).button('loading');
      window.setTimeout(function () {
        $btn.button('reset');
      }, 3000);
    });

    // panel placeholder example
    $('[data-async-panel-example-trigger]').on('click', function () {
      var $btn = $(this).button('loading');
      var $content = $('[data-async-panel-example]');
      var loadedHtml = ''
      + '<div class="panel-heading">'
        + '<div class="panel-title">Integer feugiat nisl</div>'
        + '<div class="panel-subtitle">Fusce a dui ac erat posuere ornare nec ac libero</div>'
      + '</div>'
      + '<img src="img/components/imagery/dd-img5.jpg" class="no-margin" />';
      $content.data('loadingHtml') || $content.data('loadingHtml', $content.html());
      $content.html($content.data('loadingHtml'));
      window.setTimeout(function () {
        $content.html(loadedHtml);
        $btn.button('reset');
      }, 2000);
    });

    // article placeholder example
    $('[data-async-article-example-trigger]').on('click', function () {
      var $btn = $(this).button('loading');
      var $content = $('[data-async-article-example]');
      var loadedHtml = ''
      + '<h4 class="sub-title">Praesent mi erat</h4>'
      + '<p>Cras eget risus commodo, consequat nulla a, ullamcorper neque. In hac habitasse platea dictumst. Donec ac eros nec ligula tincidunt fermentum vitae eget erat. Curabitur in erat ac.</p>'
      + '<p>In a venenatis ipsum, quis dictum sem. Nunc non lorem convallis, efficitur nisi vitae, scelerisque orci. In hac habitasse platea dictumst. Quisque luctus erat diam, nec pulvinar risus lacinia tincidunt.</p>'
      + '<p>Curabitur sapien quam, faucibus quis nunc eget, congue imperdiet arcu. Ut ac metus cursus, scelerisque ipsum eu, convallis ante. Sed nisi ligula, blandit vitae tempor nec, eleifend sit amet libero.</p>';
      $content.data('loadingHtml') || $content.data('loadingHtml', $content.html());
      $content.html($content.data('loadingHtml'));
      window.setTimeout(function () {
        $content.html(loadedHtml);
        $btn.button('reset');
      }, 2000);
    });

    // accordion placeholder example
    $('[data-async-accordion-example]').on('show.bs.collapse', function () {
      var $content = $(this).find('.panel-body');
      var loadedHtml = '';

      switch ($(this).data('async-accordion-example')) {
      case 1:
        loadedHtml = '<p>Vestibulum sagittis, tortor sit amet aliquet malesuada, erat erat sollicitudin magna, eget ullamcorper tortor nibh eget mauris. Maecenas dui libero, volutpat non pellentesque non, pharetra ut ipsum. Nunc ullamcorper nunc tellus, eu convallis arcu accumsan quis. Proin congue elit ut metus faucibus commodo eu a ipsum. Nam at felis nec magna ornare congue non condimentum enim. Vivamus efficitur pretium nibh ut sollicitudin. Etiam leo felis, scelerisque non tellus et, pellentesque porta neque. Aliquam erat volutpat.</p>';
        break;
      case 2:
        loadedHtml = ''
        + '<div class="row">'
          + '<div class="col-xs-12">'
            + '<p>Phasellus venenatis consectetur eros quis cursus. Nullam vel sodales justo. Cras sollicitudin, eros a rutrum venenatis, dui leo congue nisl, lacinia laoreet diam ipsum eget metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend congue diam, eget commodo nunc fringilla eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus cursus eleifend erat, in eleifend diam luctus eget.</p>'
          + '</div>'
          + '<div class="col-xs-12 col-md-6">'
            + '<img src="img/components/imagery/dd-img1.jpg" />'
            + '<p>Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.</p>'
          + '</div>'
          + '<div class="col-xs-12 col-md-6">'
            + '<p>Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>'
            + '<p>Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.</p>'
            + '<p>Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien.</p>'
          + '</div>'
        + '</div>';
        break;
      default:
      }

      $content.data('loadingHtml') || $content.data('loadingHtml', $content.html());
      $content.html($content.data('loadingHtml'));
      window.setTimeout(function () {
        $content.html(loadedHtml);
      }, 2000);
    });

    $('[data-infinite-scroll-container]').each(function () {
      var $container = $(this);
      var $content = $(this).find('[data-infinite-scroll-pages]');
      var $loader = $(this).find('[data-infinite-scroll-loader]');
      var $button = $loader.find('button');
      var loading = false;

      var scrollOffset = 0;
      var numberOfPages = 3;
      var page = 1;

      var loadedHtml = '<p>Pellentesque ultricies facilisis nunc quis posuere. Nullam elementum iaculis erat, nec dignissim magna. Donec fermentum sed lectus in elementum. Donec vitae nulla ut diam tincidunt semper tincidunt laoreet leo. Pellentesque sed tortor elit. Fusce tincidunt tempor tempor.</p><p>Pellentesque ultricies facilisis nunc quis posuere. Nullam elementum iaculis erat, nec dignissim magna. Donec fermentum sed lectus in elementum. Donec vitae nulla ut diam tincidunt semper tincidunt laoreet leo. Pellentesque sed tortor elit. Fusce tincidunt tempor tempor.</p><p>Pellentesque ultricies facilisis nunc quis posuere. Nullam elementum iaculis erat, nec dignissim magna. Donec fermentum sed lectus in elementum. Donec vitae nulla ut diam tincidunt semper tincidunt laoreet leo. Pellentesque sed tortor elit. Fusce tincidunt tempor tempor.</p><p>Pellentesque ultricies facilisis nunc quis posuere. Nullam elementum iaculis erat, nec dignissim magna. Donec fermentum sed lectus in elementum. Donec vitae nulla ut diam tincidunt semper tincidunt laoreet leo. Pellentesque sed tortor elit. Fusce tincidunt tempor tempor.</p><p>Pellentesque ultricies facilisis nunc quis posuere. Nullam elementum iaculis erat, nec dignissim magna. Donec fermentum sed lectus in elementum. Donec vitae nulla ut diam tincidunt semper tincidunt laoreet leo. Pellentesque sed tortor elit. Fusce tincidunt tempor tempor.</p>';

      if ($button.length) {
        $button.on('click', function () {
          $button.button('loading');
          // simulating an ajax request to fetch the next page
          window.setTimeout(function () {
            if (page <= numberOfPages) {
              $content.append('<h4>Page ' + page + '</h4>' + loadedHtml);
              $button.button('reset');
            } else {
              $loader.replaceWith('<p class="text-center">End of content</p>');
            }
          }, 1000);
          page++;
        });
      } else {
        $container.on('scroll', function () {
          if (page <= numberOfPages + 1 && !loading && $container.scrollTop() + $container.height() > $content.height() - scrollOffset) {
            // debounce the scroll event
            loading = true;
            page++;
            // simulating an ajax request to fetch the next page
            window.setTimeout(function () {
              if (page <= numberOfPages) {
                if (loading) {
                  $content.append('<h4>Page ' + page + '</h4>' + loadedHtml);
                  loading = false;
                }
              } else {
                $loader.replaceWith('<p class="text-center">End of content</p>');
              }
            }, 1000);
          }
        });
      }

    });

  });
}(jQuery);



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* EXAMPLE script to demonstrate modals */
+function ($) {
  $(function () {
    /* eslint-disable no-console */

    // simple alert dialog
    $('[data-alert-example]').on('click', function () {
      basecoat.alert('Server CI3748204-5 has gone offline!')
      .on('accept', function () {
        console.log('accept');
      });
    });

    // confirm dialog that goes into an alert dialog
    $('[data-confirm-example]').on('click', function () {
      basecoat.confirm('Are you sure you want to delete Server CI3748204-5?', null, 'Yes', 'No') // the same can be achieved with: basecoat.dialogModal('heading', 'message', { accept: 'Yes', reject: 'No' customEvent: 'Custom Button', ... });
      .on('reject', function () {
        console.log('reject');
      })
      .on('accept', function () {
        console.log('accept');
        basecoat.alert('Server CI3748204-5 deleted.')
        .on('hide.bs.modal', function () {
          console.log('hide.bs.modal');
        });
      });
    });

    // full-modal demo
    $('[data-full-modal-example]')
    .on('hide.bs.modal', function () {
      // reset the the form
      $(this).find('form').trigger('reset');
    }).find('form')
    .on('formValid', function () {
      // on submit of a valid form - close and popup an alert
      $(this).closest('.modal').modal('hide');
      basecoat.dialogModal('Your configuration has been saved', 'Please allow up to 1 hour for changes to propagate to all your instances.', { gotit: 'Got it!' })
      .on('gotit', function () {
        console.log('Custom "Got it" button with custom event triggered!');
      });
    });

    /* eslint-enable no-console */
  });
}(jQuery);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {
  $(function () {

    $('[data-notification-example]').on('click', function () {
      var messages = [
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quaerat, molestiae ad. Rerum iure laborum necessitatibus provident esse quis, nemo eum assumenda amet temporibus aspernatur placeat praesentium excepturi. Ullam, <a href="#">reprehenderit</a>.',
        'Tempore quaerat, molestiae ad. Rerum iure laborum necessitatibus provident esse quis, nemo eum assumenda amet temporibus aspernatur placeat praesentium excepturi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, reprehenderit. Tempore quaerat, molestiae ad. Ullam, <a href="#">reprehenderit</a>. Rerum iure laborum necessitatibus provident esse quis, nemo eum assumenda amet temporibus aspernatur placeat praesentium excepturi. Ullam, reprehenderit.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'Accusantium, dolorem et sint non consequatur debitis neque cumque quia necessitatibus incidunt.',
        'Aperiam corporis aut excepturi nam minima.',
        'Distinctio quos quis!',
        'Fugiat aut.'
      ];
      var heading = 'Notification ' + Math.ceil(Math.random() * 100000);
      var message = messages[Math.floor(Math.random() * messages.length)];
      var timestamp = 'Added just now';
      // create and show a new notification
      basecoat.notification(heading, message, timestamp).trigger('show');
    });

  });
}(jQuery);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {
  $(function () {

    // custom text popover example
    $('[data-popover-text-example]').popover({
      placement: 'auto bottom',
      title: 'Headline',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum quis impedit, voluptatibus dignissimos incidunt totam doloremque, quo tempore animi vitae, molestias dolore mollitia, doloribus commodi ipsum unde! Voluptate, laudantium, veritatis!'
    });
    // custom HTML popover example
    $('[data-popover-html-example]').popover({
      placement: 'auto top',
      html: true,
      content: ''
      + '<div class="btn-link-toolbar">'
        + '<button type="button" class="btn btn-link" data-dismiss="popover"><i class="fa fa-random"></i><span>Track item</span></button>'
        + '<span class="btn-separator"></span>'
        + '<button type="button" class="btn btn-link" data-dismiss="popover"><i class="fa fa-ticket"></i><span>View ticket</span></button>'
        + '<span class="btn-separator"></span>'
        + '<button type="button" class="btn btn-link" data-dismiss="popover"><i class="fa fa-ellipsis-v"></i></button>'
      + '</div>'
    });
    // Actions menu example
    $('[data-popover-actions-example]').popover({
      placement: 'auto bottom',
      html: true,
      content: ''
      + '<nav class="btn-link-toolbar">'
        + '<ul class="popover-menu">'
          + '<li><button class="btn btn-sm btn-link" data-dismiss="popover">Download last three</button></li>'
          + '<li><button class="btn btn-sm btn-link" data-dismiss="popover">More information</button></li>'
          + '<li><button class="btn btn-sm btn-link" data-dismiss="popover">Request help</button></li>'
        + '</ul>'
      + '</nav>'
    });

  });
}(jQuery);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {
  $(function () {

    // set initial value to current theme
    var theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    $('[data-theme-radios-example]').find(':input').prop('checked', false).filter('[value="' + theme + '"]').prop('checked', true);

    // listen for theme change events
    $(document)
    .on('themeChanged.bc.themeToggle', function (e, theme) {
      $('[data-theme-radios-example]').find(':input').prop('checked', false).filter('[value="' + theme + '"]').prop('checked', true);
    });

    // change theme on click of radios
    $('[data-theme-radios-example] :input')
    .on('change', function () {
      var theme = $(this).val() === 'dark' ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      basecoat.applyTheme(theme);
    });

  });
}(jQuery);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {
  $(function () {

    $('[data-toast-example]').on('click', function () {
      // create the new toast
      var messages = [
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'Accusantium, dolorem et sint non consequatur debitis neque cumque quia necessitatibus incidunt.',
        'Aperiam corporis aut excepturi nam minima.',
        '<span class="fa fa-exclamation"></span> Distinctio quos quis!',
        '<span class="fa fa-check"></span> Fugiat.',
        'Illbay Urraymay'
      ];
      var $toast = basecoat.toast(messages[Math.floor(Math.random() * messages.length)], $(this).attr('data-toast-example'));
      // show the new toast
      $toast.trigger('show');
    });

  });
}(jQuery);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {
  $(document).ready(function () {
    $('#menuLeft').click(function () {
      $('#map-ct .utility-menu').toggleClass('left');
      $(this).text(function (i, contents) {
        return contents === 'Place menu left' ? 'Place menu right' : 'Place menu left';
      });
    });
    $('#menuBottom').click(function () {
      $('#map-ct .utility-menu').toggleClass('bottom');
      $(this).text(function (i, contents) {
        return contents === 'Place menu bottom' ? 'Place menu top' : 'Place menu bottom';
      });
    });
  });
}(jQuery);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* EXAMPLE validation script only for demonstating the CSS!!! */
+function ($) {
  $(function () {

    // note: this is not a complete test for valid email
    function isValidEmailAddress(emailAddress) {
      var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
      return pattern.test(emailAddress);
    }

    // note: this is not an accurate test for a strong password
    function isValidPassword(password) {
      // var pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/); // too strict!
      var pattern = new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/);
      return pattern.test(password);
    }

    // simple function to remove/reset validation classes
    function resetValidation($formGroup) {
      $formGroup.find('.help-block').show();
      $formGroup.find('[data-validation-error]').hide();
      return $formGroup.removeClass('has-success').removeClass('has-error').removeClass('has-warning').removeClass('has-feedback');
    }

    // make a form group go red (invalid) or green (valid)
    function setValidation($formGroup, valid) {
      if (!valid) {
        if ($formGroup.find('[data-validation-error]').length > 0) {
          $formGroup.find('.help-block').hide();
          $formGroup.find('[data-validation-error]').show();
        }
      }

      $formGroup.addClass('has-feedback');
      $formGroup.toggleClass('has-error', !valid);
      $formGroup.toggleClass('has-success', valid);
    }

    // validation logic for every form example
    $('[data-validation-example]').each(function () {
      var $form = $(this);
      var $button = $form.find('button[type="submit"]');

      resetValidation($form.find('.form-group')); // hide any validation messages

      // valdiation on form submit
      $button.click(function (e) {
        e.preventDefault();

        // just touch all fields on submit (to run validation on them)
        $form.find(':input').trigger('validate');

        // show error/success alerts
        $form.find('.alert').addClass('hidden');
        if ($form.find('.has-error').length == 0 && $form.find('.has-success').length > 0) {
          $form.find('.alert-success').removeClass('hidden');
          $form.data('isValid', true).trigger('formValid');
        } else {
          $form.find('.alert-danger').removeClass('hidden');
          $form.data('isValid', false).trigger('formInvalid');
        }
      });

      // reset validation on focus for all but radios and checkboxes
      $form.find(':input:not(:button):not(:checkbox):not(:radio)').on('focus', function () {
        resetValidation($(this).parents('.form-group').last());
      });

      // general fields validate trigger
      $form.find(':input:not(:button):not(:checkbox):not(:radio)').on('validate', function () {
        var $formGroup = resetValidation($(this).parents('.form-group').last());
        var valid = true;

        $formGroup.find(':input:not(:button)').each(function () {
          var $input = $(this);

          // validate pattern
          if ($input.attr('pattern')) {
            var pattern = new RegExp($input.attr('pattern'));
            valid = valid && pattern.test($input.val());
          }

          // validate email
          if ($input.attr('type') == 'email') {
            valid = valid && isValidEmailAddress($input.val());
          }

          // validate password
          if ($input.closest('.has-password-toggle').length > 0) {
            valid = valid && isValidPassword($input.val());
          }

          // validate required
          if ($input.attr('required') && !$input.val()) {
            valid = false;
          }
        });

        setValidation($formGroup, valid);
      });

      $form.find(':input:not(:button):not(:checkbox):not(:radio)').on('blur', function () {
        $(this).trigger('validate');
      });

      // checkboxes validate trigger
      $form.find(':checkbox').on('validate', function () {
        var $formGroup = resetValidation($(this).parents('.form-group').last());
        var valid = $formGroup.find(':input[required]:not(:checked)').length < 1;
        setValidation($formGroup, valid);
      });

      $form.find(':checkbox').on('change', function () {
        var $formGroup = $(this).parents('.form-group').last();
        var valid = $formGroup.find(':checkbox[required]:not(:checked)').length < 1;
        if (valid || $formGroup.hasClass('has-feedback')) {
          $(this).trigger('validate');
        }
      });

      // radio buttons validate trigger
      $form.find(':radio').on('validate', function () {
        var $formGroup = resetValidation($(this).parents('.form-group').last());
        var valid = $formGroup.find(':checked').length > 0;
        setValidation($formGroup, valid);
      });

      $form.find(':radio').on('change', function () {
        $(this).trigger('validate');
      });

    });

    // when one of these [data-validation-example] forms is reset, do all the following things
    $(document).on('reset', '[data-validation-example]', function () {
      $(this)
      .find('.alert')
      .addClass('hidden')
      .end()
      .find(':input')
      .not(':button, :submit, :reset')
      .val('')
      .removeAttr('checked')
      .removeAttr('selected')
      .trigger('change');

      resetValidation($(this).find('.form-group'));
    });

  });
}(jQuery);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {
  var currentPage = window.location.pathname;

  function frameReady() {
    var $responsiveFrame = $('#responsiveFrame');
    $responsiveFrame.on('load', function () {
      $(this).contents().find('a').attr('target', '_self');
      var $removeNav = $(this).contents().find('.switcher-menu');
      return $removeNav.remove();
    });
    var $removePreviewParentMenus = $('.preview-open').find('.mobile-menu, .desktop-menu');
    return $removePreviewParentMenus.remove();
  }

  $('[data-switch-preview]').click(function () {
    var previewSize = $(this).data('switch-preview');

    function addFrame() {
      $('html').addClass('preview-open');
      $('#responsivePreview').append('<div class="preview__over"><iframe id="responsiveFrame" class="preview__frame preview--' + previewSize + '" src="' + currentPage + '"></iframe></div>');
      frameReady();
    }

    function resizeFrame() {
      $('.preview__frame').removeClass('preview--mobile preview--tablet preview--laptop').addClass('preview--' + previewSize);
    }

    $('[data-switch-preview]').not(this).removeClass('active');

    $(this).addClass('active');

    if ($('html').hasClass('preview-open')) {
      resizeFrame();
    } else {
      addFrame();
    }
  });

  $(document).on('click', '[data-switch-off-preview]', function () {
    function removeFrame() {
      var currentPage = window.location.pathname;
      top.window.location.replace(currentPage);
    }
    removeFrame();
  });

}(jQuery);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// todo: revise this component. it gets the job done, but it's buggy hence it's only being used in app and not in core.



+function ($) {
  $(function () {

    var $navbar = $('.site-header .navbar-fixed-top');
    var navbarHeight = $navbar.height();

    // Smooth scroll to a specific $target element on the page and offset navbar if on desktop, but hide the navbar if on mobile
    function animateTo($target, duration) {
      if ($target.length < 1) return;

      var $page = $('html, body');
      var animateComplete = false;
      var origin = window.scrollY;
      var destination = $target.offset().top - navbarHeight;
      // var isMobile = $('.hidden-mobile').is(':hidden');

      // just a variable to inform header.js to not show/hide the header during this scrolling animation
      basecoat.scrollJacking = true;

      destination = destination < 0 ? 0 : Math.round(destination);
      duration = duration || 1;

      // abort if there's nowhere new to scroll to
      if (window.scrollY === destination) {
        basecoat.scrollJacking = false;
        $navbar.addClass('no-transition'); // Disable transitions
        $navbar.removeClass('navbar-hide');
        $navbar[0].offsetHeight; // Trigger a reflow, flushing the CSS changes
        $navbar.removeClass('no-transition'); // Re-enable transitions
        return;
      }

      $page.animate({
        scrollTop: destination
      },
      duration,
      'swing',
      function () {
        // debounce the callback (otherwise it fires for html and for body)
        if (animateComplete) clearTimeout(animateComplete);
        animateComplete = setTimeout(function () {

          // delayed scroll correction (because everything moves while the page is still loading)
          window.setTimeout(function () {
            // if we're stuck (eg the bottom of the page) then we can just wrap things up here
            if (window.scrollY === origin) {
              basecoat.scrollJacking = false;
              $navbar.addClass('no-transition'); // Disable transitions
              $navbar.removeClass('navbar-hide');
              $navbar[0].offsetHeight; // Trigger a reflow, flushing the CSS changes
              $navbar.removeClass('no-transition'); // Re-enable transitions
            } else {
              // try again (just in case $target has moved)
              animateTo($target);
            }
          }, 100);

        }, 25);
      });

    }

    // Scroll to #id on initial page load
    if (window.location.hash && $(window.location.hash).length > 0) {
      animateTo($(window.location.hash));
    }

    // Smooth scroll to #id on click
    $(document).on('click', 'a[href*="#"]', function (e) {

      // is this a bootstrap href?
      if ($(this).attr('data-toggle')) {
        return true;
      }

      // is this an empty hash?
      if (this.hash.length < 1) {
        return true;
      }

      // is this link to a different page?
      if (this.href.split('#')[0] !== document.location.href.split('#')[0]) {
        return true;
      }

      e.preventDefault();

      animateTo($(this.hash), 500);

    });

  });
}(jQuery);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {
  // Simple check to see if the element exists before trying to execute JS
  if ($('.to-page-top').length) {
    $(window).scroll(function () {
      // Determine the height of the viewport
      // var $moveHeight = $(window).height();
      // Applying a fixed value for scroll distance
      var $moveHeight = 100;
      // Only show the button once we have scrolled beyond the fold
      // We also require .hide-btn on .to-page-top to hide the button initially
      if ($(this).scrollTop() > $moveHeight) {
        // Remove the class that hides the button
        $('.to-page-top').removeClass('hide-btn');
      } else {
        // Add a class to hide the button
        $('.to-page-top').addClass('hide-btn');
      }
    });
  }

}(jQuery);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {
  $(function () {

    $('body')
    .on('activate.bs.scrollspy', function () {
      var $activeLink = $('[data-anchor-nav-dropdown]').find('li.active > a');
      if ($activeLink.length > 0) {
        // change the heading in the dropdown to the active section
        var title = $activeLink.text();
        $('[data-anchor-nav-dropdown] > a').html(title + '<span class="caret"/>');
        // change address bar URL
        var href = $activeLink.attr('href');
        if (href && href !== '#') {
          href = href == '#pageTop' ? window.location.pathname : href;
          top.history.replaceState({}, '', href);
        }
      }
    });

    // Move the active navigation list item into view
    $(document).ready(function () {
      var listTop = $('li.active').offset().top;
      var viewportBottom = $(window).scrollTop() + $(window).innerHeight();
      if (viewportBottom < listTop) {
        $('li.active')[0].scrollIntoView();
      }
    });

  });
}(jQuery);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


basecoat.FuseJs = __webpack_require__(24);

+function ($) {
  $(function () {

    $('.site-search').on('shown.bc.siteSearch', function () {
      $(this).find('.search-input').attr('placeholder', 'Search the styleguide');
    });

    // search functionality (specific to app)
    if (basecoat.siteSearchIndex) {
      var resultLimit = 7;
      var fuse = new basecoat.FuseJs(basecoat.siteSearchIndex, {
        shouldSort: true,
        tokenize: true,
        findAllMatches: true,
        threshold: 0.35,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        includeScore: true,
        keys: [
          { name: 'sectionTitle', weight: 0.4 },
          { name: 'pageTitle', weight: 0.3 },
          { name: 'tags', weight: 0.2 },
          { name: 'categoryTitle', weight: 0.1 },
          { name: 'url', weight: 0.1 }
        ]
      });

      // special actions for special keys (up, down, enter)
      $('.site-search').on('keydown', '.search-input', function (e) {
        var $results = $('.site-search .search-results');
        var $active = $results.find('li.active');

        if (e.which === 13) { // enter
          if ($active.length === 0) {
            $results.find('li a')[0].click();
          }
          $active.find('a')[0].click();
        } else if (e.which === 38) { // up
          if ($active.length === 0) {
            $results.find('li a').last().closest('li').addClass('active');
          } else {
            $active.removeClass('active').prev().find('a').closest('li').addClass('active');
          }
        } else if (e.which === 40) { // down
          if ($active.length === 0) {
            $results.find('li a').first().closest('li').addClass('active');
          } else {
            $active.removeClass('active').next().find('a').closest('li').addClass('active');
          }
        }

        if ([27, 13, 38, 40].includes(e.which)) {
          return false;
        }
      });

      // remove .active on hover (let the mouse take over)
      $('.site-search').on('mouseover', function () {
        $(this).find('li.active').removeClass('active');
      });

      // do search on keyup
      var phrase;
      $('.site-search').on('keyup', '.search-input', function () {
        if ($(this).val() === phrase) {
          return false;
        }

        phrase = $(this).val();
        var $results = $('.site-search .search-results');
        var results = fuse.search(phrase);
        var resultCount = Math.min(results.length, resultLimit);
        $results.empty();
        for (var i = 0; i < resultCount; i++) {
          var result = results[i].item;
          var resultHtml = '' +
          '<li>' +
            '<a href="' + result.url + '" ' + (result.target ? 'target="' + result.target + '"' : '') + '>' +
              '<div class="breadcrumb">' + (result.categoryTitle ? result.categoryTitle : 'Site') + (result.pageTitle ? ' / ' + result.pageTitle : '') + '</div>' +
              '<h4 class="title">' + result.sectionTitle + '</h4>' +
            '</a>' +
          '</li>';
          $results.append(resultHtml);
        }
        if (phrase.length > 0) {
          if (resultCount === 0) {
            $results.append('<li class="search-status">No results found</li>');
          } else if (resultCount >= resultLimit) {
            $results.append('<li class="search-status">Found ' + resultLimit + ' results</li>');
          } else {
            $results.append('<li class="search-status">Found ' + resultCount + ' ' + (resultCount === 1 ? 'result' : 'results') + '</li>');
          }
        }
      });
    }

  });
}(jQuery);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// switch between light/dark themes
basecoat.toggleTheme = function () {
  var theme = localStorage.getItem('theme') !== 'dark' ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  basecoat.applyTheme(theme);
};

// change css href to apply a theme
basecoat.applyTheme = function (theme) {
  if (theme === 'dark') {
    $('html').attr('theme', 'dark');
  } else {
    $('html').attr('theme', 'light');
  }
  $(document).trigger('themeChanged.bc.themeToggle', theme);
};

// listen for theme change in any other tab
window.addEventListener('storage', function (e) {
  if (e.key === 'theme') {
    basecoat.applyTheme(e.newValue);
  }
});

+function ($) {
  // theme toggler functionality
  $('[data-toggle-theme]').on('click', function () {
    basecoat.toggleTheme();
    return false;
  });
}(jQuery);


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/* eslint-disable */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-121777611-3', 'auto');
  ga('send', 'pageview');
/* eslint-enable */


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {
  // Replace all images with Bill Murray's face
  function fillMurray() {

    $('img').each(function () {
      var w = $(this).width();
      var h = $(this).height();
      w = (w < 30) ? 30 : w;
      h = (h < 30) ? 30 : h;
      $(this).attr('src', '//fillmurray.com/' + w + '/' + h);
    });

    $('.logo-image').css('background-image', 'url(//fillmurray.com/104/24)');
    $('.logo-image').css('background-size', 'cover');
    $('.jumbotron.jumbo').css('background-image', 'url(//fillmurray.com/g/1720/1000)');

    return 'you\'ve been Murried!';
  }

  $(function () {
    $(document).on('blur', ':input', function () {
      if ($(this).val().toLowerCase() == 'bill murray') {
        fillMurray();
      }
    });
  });

  // Make inline code the normal red color
  function devMode() {
    $('body').append(''
      + '<code class="visible-xs" style="position:fixed;right:0;bottom:0">xs</code>'
      + '<code class="visible-sm" style="position:fixed;right:0;bottom:0">sm</code>'
      + '<code class="visible-md" style="position:fixed;right:0;bottom:0">md</code>'
      + '<code class="visible-lg" style="position:fixed;right:0;bottom:0">lg</code>'
      + '<code class="visible-xl" style="position:fixed;right:0;bottom:0">xl</code>'
      + '<code class="visible-xxl" style="position:fixed;right:0;bottom:0">xxl</code>'
    );

    $('code:not(.hljs)').css({
      'color': '#c7254e',
      'background': '#f9f2f4'
    });

    return 'do you prefer gray or red?';
  }

  $('code').dblclick(function () {
    $(this).dblclick(function () {
      devMode();
    });
  });

  // Export module functions
  module.exports = {
    fillMurray: fillMurray,
    devMode: devMode
  };
}(jQuery);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable no-console */
if ('serviceWorker' in navigator) {

  // Get all the registered service workers for the domain

  navigator.serviceWorker.getRegistrations().then(
    function (registrations) {
      if (registrations && registrations.length > 0) {
        for (var i in registrations) {
          if (registrations[i]) {
            registrations[i].unregister();
          }
        }
      }
    }
  ).catch(function (err) {

    console.info('Service Worker registration failed: ', err);

  });
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(31)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, require('select'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.select);
        global.clipboardAction = mod.exports;
    }
})(this, function (module, _select) {
    'use strict';

    var _select2 = _interopRequireDefault(_select);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var ClipboardAction = function () {
        /**
         * @param {Object} options
         */
        function ClipboardAction(options) {
            _classCallCheck(this, ClipboardAction);

            this.resolveOptions(options);
            this.initSelection();
        }

        /**
         * Defines base properties passed from constructor.
         * @param {Object} options
         */


        _createClass(ClipboardAction, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = options.action;
                this.container = options.container;
                this.emitter = options.emitter;
                this.target = options.target;
                this.text = options.text;
                this.trigger = options.trigger;

                this.selectedText = '';
            }
        }, {
            key: 'initSelection',
            value: function initSelection() {
                if (this.text) {
                    this.selectFake();
                } else if (this.target) {
                    this.selectTarget();
                }
            }
        }, {
            key: 'selectFake',
            value: function selectFake() {
                var _this = this;

                var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

                this.removeFake();

                this.fakeHandlerCallback = function () {
                    return _this.removeFake();
                };
                this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;

                this.fakeElem = document.createElement('textarea');
                // Prevent zooming on iOS
                this.fakeElem.style.fontSize = '12pt';
                // Reset box model
                this.fakeElem.style.border = '0';
                this.fakeElem.style.padding = '0';
                this.fakeElem.style.margin = '0';
                // Move element out of screen horizontally
                this.fakeElem.style.position = 'absolute';
                this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
                // Move element to the same position vertically
                var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                this.fakeElem.style.top = yPosition + 'px';

                this.fakeElem.setAttribute('readonly', '');
                this.fakeElem.value = this.text;

                this.container.appendChild(this.fakeElem);

                this.selectedText = (0, _select2.default)(this.fakeElem);
                this.copyText();
            }
        }, {
            key: 'removeFake',
            value: function removeFake() {
                if (this.fakeHandler) {
                    this.container.removeEventListener('click', this.fakeHandlerCallback);
                    this.fakeHandler = null;
                    this.fakeHandlerCallback = null;
                }

                if (this.fakeElem) {
                    this.container.removeChild(this.fakeElem);
                    this.fakeElem = null;
                }
            }
        }, {
            key: 'selectTarget',
            value: function selectTarget() {
                this.selectedText = (0, _select2.default)(this.target);
                this.copyText();
            }
        }, {
            key: 'copyText',
            value: function copyText() {
                var succeeded = void 0;

                try {
                    succeeded = document.execCommand(this.action);
                } catch (err) {
                    succeeded = false;
                }

                this.handleResult(succeeded);
            }
        }, {
            key: 'handleResult',
            value: function handleResult(succeeded) {
                this.emitter.emit(succeeded ? 'success' : 'error', {
                    action: this.action,
                    text: this.selectedText,
                    trigger: this.trigger,
                    clearSelection: this.clearSelection.bind(this)
                });
            }
        }, {
            key: 'clearSelection',
            value: function clearSelection() {
                if (this.trigger) {
                    this.trigger.focus();
                }

                window.getSelection().removeAllRanges();
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.removeFake();
            }
        }, {
            key: 'action',
            set: function set() {
                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';

                this._action = action;

                if (this._action !== 'copy' && this._action !== 'cut') {
                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
                }
            },
            get: function get() {
                return this._action;
            }
        }, {
            key: 'target',
            set: function set(target) {
                if (target !== undefined) {
                    if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                        if (this.action === 'copy' && target.hasAttribute('disabled')) {
                            throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                        }

                        if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                            throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                        }

                        this._target = target;
                    } else {
                        throw new Error('Invalid "target" value, use a valid Element');
                    }
                }
            },
            get: function get() {
                return this._target;
            }
        }]);

        return ClipboardAction;
    }();

    module.exports = ClipboardAction;
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(19), __webpack_require__(32), __webpack_require__(26)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, require('./clipboard-action'), require('tiny-emitter'), require('good-listener'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.clipboardAction, global.tinyEmitter, global.goodListener);
        global.clipboard = mod.exports;
    }
})(this, function (module, _clipboardAction, _tinyEmitter, _goodListener) {
    'use strict';

    var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

    var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

    var _goodListener2 = _interopRequireDefault(_goodListener);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Clipboard = function (_Emitter) {
        _inherits(Clipboard, _Emitter);

        /**
         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
         * @param {Object} options
         */
        function Clipboard(trigger, options) {
            _classCallCheck(this, Clipboard);

            var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

            _this.resolveOptions(options);
            _this.listenClick(trigger);
            return _this;
        }

        /**
         * Defines if attributes would be resolved using internal setter functions
         * or custom functions that were passed in the constructor.
         * @param {Object} options
         */


        _createClass(Clipboard, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
                this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
                this.text = typeof options.text === 'function' ? options.text : this.defaultText;
                this.container = _typeof(options.container) === 'object' ? options.container : document.body;
            }
        }, {
            key: 'listenClick',
            value: function listenClick(trigger) {
                var _this2 = this;

                this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
                    return _this2.onClick(e);
                });
            }
        }, {
            key: 'onClick',
            value: function onClick(e) {
                var trigger = e.delegateTarget || e.currentTarget;

                if (this.clipboardAction) {
                    this.clipboardAction = null;
                }

                this.clipboardAction = new _clipboardAction2.default({
                    action: this.action(trigger),
                    target: this.target(trigger),
                    text: this.text(trigger),
                    container: this.container,
                    trigger: trigger,
                    emitter: this
                });
            }
        }, {
            key: 'defaultAction',
            value: function defaultAction(trigger) {
                return getAttributeValue('action', trigger);
            }
        }, {
            key: 'defaultTarget',
            value: function defaultTarget(trigger) {
                var selector = getAttributeValue('target', trigger);

                if (selector) {
                    return document.querySelector(selector);
                }
            }
        }, {
            key: 'defaultText',
            value: function defaultText(trigger) {
                return getAttributeValue('text', trigger);
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.listener.destroy();

                if (this.clipboardAction) {
                    this.clipboardAction.destroy();
                    this.clipboardAction = null;
                }
            }
        }], [{
            key: 'isSupported',
            value: function isSupported() {
                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];

                var actions = typeof action === 'string' ? [action] : action;
                var support = !!document.queryCommandSupported;

                actions.forEach(function (action) {
                    support = support && !!document.queryCommandSupported(action);
                });

                return support;
            }
        }]);

        return Clipboard;
    }(_tinyEmitter2.default);

    /**
     * Helper function to retrieve attribute value.
     * @param {String} suffix
     * @param {Element} element
     */
    function getAttributeValue(suffix, element) {
        var attribute = 'data-clipboard-' + suffix;

        if (!element.hasAttribute(attribute)) {
            return;
        }

        return element.getAttribute(attribute);
    }

    module.exports = Clipboard;
});

/***/ }),
/* 21 */
/***/ (function(module, exports) {

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

module.exports = closest;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var closest = __webpack_require__(21);

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(elements, selector, type, callback, useCapture) {
    // Handle the regular Element usage
    if (typeof elements.addEventListener === 'function') {
        return _delegate.apply(null, arguments);
    }

    // Handle Element-less usage, it defaults to global delegation
    if (typeof type === 'function') {
        // Use `document` as the first parameter, then apply arguments
        // This is a short way to .unshift `arguments` without running into deoptimizations
        return _delegate.bind(null, document).apply(null, arguments);
    }

    // Handle Selector-based usage
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }

    // Handle Array-like based usage
    return Array.prototype.map.call(elements, function (element) {
        return _delegate(element, selector, type, callback, useCapture);
    });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

/*!
  FileDrop Revamped - HTML5 & legacy file upload
  in public domain  | http://filedropjs.org
  by Proger_XP      | http://proger.me

  Supports IE 6+, FF 3.6+, Chrome 7+, Safari 5+, Opera 11+.
  Fork & report problems at https://github.com/ProgerXP/FileDrop
*/

window.fd = window.fd || {}
;(function (global, exports) {
  /***
    Global Utility Functions
   ***/

  // Produces random ID (non necessary unique to anything) with given prefix
  // or 'fd' if it's not passed.
  //
  //? randomID()        //=> 'fd_9854'
  //? randomID('foo')   //=> 'foo_1582'
  global.randomID = function (prefix) {
    return (prefix || 'fd') + '_' + (Math.random() * 10000).toFixed()
  }

  // Generates random DOM node ID that's unique to this document with given prefix
  // or 'fd' if it's not passed.
  //
  //? randomID()        //=> 'fd_9854'
  //? randomID('foo')   //=> 'foo_1582'
  global.uniqueID = function (prefix) {
    do { var id = global.randomID(prefix) } while (global.byID(id))
    return id
  }

  // Retrieves DOM element by its ID attribute or returns id itself if it's
  // an element.
  //
  //? byID('foo')       //=> <p id="foo">
  //? byID('abracadabra!')  //=> null
  //? byID({foo: 1})    //=> null
  //? byID(null)        //=> null
  //
  //? byID(document.createElement('p'))
  //    //=> <p>
  global.byID = function (id) {
    return global.isTag(id) ? id : document.getElementById(id)
  }

  // Checks if given object is a proper DOM node. If tag is passed also
  // checks if that DOM node is of the same tag (case-insensitive).
  // Returns true or false.
  //
  //? isTag('foo')        //=> false
  //? isTag({foo: 1})     //=> false
  //? isTag(null)         //=> false
  //? isTag(window)       //=> false
  //? isTag(document.body)          //=> true
  //? isTag(document.body, 'BoDy')  //=> true
  //? isTag(document.body, 'head')  //=> false
  //
  //? var el = byID('foo')    //=> <p id="foo">
  //  isTag(el, 'p')    //=> true
  //  isTag(el, 'P')    //=> true
  //  isTag(el, 'div')  //=> false
  //  isTag(el, 'DiV')  //=> false
  //
  //? isTag(document.createElement('p'))
  //    //=> true
  //
  //? isTag(document.createElement('p'), 'div')
  //    //=> false
  global.isTag = function (element, tag) {
    return typeof element == 'object' && element && element.nodeType == 1 &&
           ( !tag || element.tagName.toUpperCase() == tag.toUpperCase() )
  }

  // Creates new XMLHttpRequest object. Falls back for ActiveX for IE 6.
  // Throws an exception if couldn't succeed (this shouldn't happen these days).
  //
  //? newXHR()    //=> XMLHttpRequest
  global.newXHR = function () {
    try {
      return new XMLHttpRequest
    } catch (e) {
      // IE 6.
      var activex = ['MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP.5.0',
                     'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0',
                     'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP']

      for (var i = 0; i < activex.length; i++) {
        try {
          return new ActiveXObject(activex[i])
        } catch (e) {}
      }
    }

    throw 'Cannot create XMLHttpRequest.'
  }

  // Checks if given value is a native Array object. Note that jQuery and
  // other pseudo-arrays are reported as false.
  //
  //? isArray([])       //=> true
  //? isArray([])       //=> true
  //? isArray(new Array)    //=> true
  //? isArray({})       //=> false
  //? isArray('foo')    //=> false
  //? isArray(null)     //=> false
  //? isArray($('a'))   //=> false
  //? isArray(arguments)    //=> false
  //? isArray($('a').toArray())   //=> true
  global.isArray = function (value) {
    return Object.prototype.toString.call(value) === '[object Array]'
  }

  // Converts passed value into an array. If value is already an array its
  // copy is returned (so changing value later doesn't affect the returned
  // clone).
  //
  // skipFirst, if given, omits specified number of elements from the start.
  // Useful for turning arguments into arrays.
  //
  //? toArray([])           //=> [] (copy)
  //? toArray(['foo'])      //=> ['foo'] (copy)
  //? toArray(['foo'], 1)   //=> []
  //? toArray(['foo'], 999)   //=> []
  //? toArray('foo')        //=> ['foo']
  //? toArray('foo', 1)     //=> []
  //? toArray('foo', 999)   //=> []
  //? toArray({foo: 1})     //=> [{foo: 1}]
  //? toArray({foo: 1}, 1)  //=> []
  //? toArray(null)         //=> []
  //? toArray(new Array('foo', 'bar'))      => ['foo', 'bar'] (copy)
  //? toArray(new Array('foo', 'bar'), 1)   => ['bar']
  //? toArray(new Array('foo', 'bar'), 2)   => []
  //
  //? function showMessage(func, line1, line2, ...) {
  //    window[func](toArray(arguments, 1).join('\n'))
  //  }
  //
  //  showMessage('confirm', 'It\'s first line.', 'Second line.')
  //    //=> confirm('It\'s first line.\nSecond line.')
  //
  //  showMessage('alert', 'First', 'Second')
  //    //=> alert('First\nSecond')
  global.toArray = function (value, skipFirst) {
    if (value === null || typeof value == 'undefined') {
      return []
    } else if (!global.isArray(value) && (typeof value != 'object' || !('callee' in value))) {
      // Made sure it's not 'arguments'.
      value = [value]
    }

    return Array.prototype.slice.call(value, skipFirst || 0)
  }

  // Adds an event listener to a DOM element. Works for old IE as well
  // as modern W3C-compliant browsers. type is short event name (without
  // 'on' prefix). Does nothing if any parameter is invalid.
  // Returns the DOM element itself or whatever was given as this argument.
  //
  //? addEvent(byID('p'), 'mousemove', function () { alert('Whoosh!') })
  //? addEvent(window, 'load', function () { alert('Done loading.') })
  //
  //? addEvent(null, 'blur', function () { })   // nothing.
  //? addEvent(window, null, function () { })   // nothing.
  //? addEvent(window, 'blur', null)            // nothing.
  //
  //? addEvent(window, 'nonstandard', function () { })
  //      // works.
  global.addEvent = function (element, type, callback) {
    if (element && type && callback) {
      if (element.attachEvent) {
        element['e' + type + callback] = callback
        element[type + callback] = function() {
          element['e' + type + callback](window.event)
        }
        element.attachEvent('on' + type, element[type + callback])
      } else {
        element.addEventListener(type, callback, false)
      }
    }

    return element
  }

  // Stops propagation and default browser action of an event.
  // Works for old IE and modern W3C-compliant browsers.
  //
  //? byID('p').onmousemove = function (e) { stopEvent(e) }
  global.stopEvent = function (event) {
    event.cancelBubble = true
    event.returnValue = false
    event.stopPropagation && event.stopPropagation()
    event.preventDefault && event.preventDefault()
    return event
  }

  // Adds or removes HTML class of a DOM element. Keeps old classes.
  // element can be either ID string or a DOM node.
  // Returns the element (even if ID was passed) or null if passed value
  // is neither a string nor a DOM node or if there's no element with
  // this ID.
  //
  //? setClass(byID('p'), 'foo')      //=> <p class="... foo">
  //? setClass(byID('p'), 'foo', true)  // equivalent to above
  //? setClass(byID('p'), 'foo', false)   //=> <p class="..."> (no 'foo')
  //? setClass('anID', 'foo')         //=> <a id="anID" class="... foo">
  //? setClass('anID', 'foo', false)  //=> <a> without 'foo' class
  //?
  global.setClass = function (element, className, append) {
    if ((element = global.byID(element)) && className != null) {
      if (typeof append != 'undefined' && !append) {
        element.className = element.className.replace(global.classRegExp(className), ' ')
      } else if (!global.hasClass(element, className)) {
        element.className += ' ' + className
      }
    }

    return element
  }

  // Determines if given element has class attribute containing the className
  // word. Accepts DOM element or ID string. Returns true or false.
  // Examples below refer to <p class="cls1 cls2" id="anID">
  //
  //? hasClass(byID('anID'), 'cls1')  //=> true
  //? hasClass('anID', 'cls1')        // equivalent to above
  //? hasClass('anID', 'cls')         //=> false
  //? hasClass('anID', 'foo')         //=> false
  //? hasClass('abra!', 'cls1')       //=> false (no such element)
  //? hasClass('anID', '')            //=> false (empty class)
  //? hasClass('anID', null)          //=> false
  //? hasClass('anID', {foo: 1})      //=> false (not a string)
  //? hasClass(null, 'foo')           //=> false
  //? hasClass({foo: 1}, 'foo')       //=> false (not a DOM node)
  //? hasClass(window, foo)           //=> false
  global.hasClass = function (element, className) {
    return global.classRegExp(className).test( (global.byID(element) || {}).className )
  }

  // Returns a regular expression suitable for testing of HTML class-like
  // strings to find out if it contains a given word or not (it's not as
  // simple as a substring match: 'some class' contains words 'some' and
  // 'class' but not 'som' and 'cl' or 'ame' and 'ass').
  //
  // Shouldn't be used for testing multiple words (space-separated) - will
  // only match if they are in the same position in testing string which
  // doesn't have to be true: classRegExp('some class') would match
  // 'this is some class' but won't match 'some of the class'.
  //
  // Returns a never matching regexp for bad parameter like object or an
  // empty string.
  //
  //? classRegExp('foo')        //=> RegExp /(^|\s+)foo(\s+|$)/ig
  //? classRegExp('x').test('x y z')  //=> true
  //? classRegExp('foo bar')    // works but not advised
  //? classRegExp({foo: 1})     //=> RegExp /$o_O/
  //? classRegExp(null)         // the same as above
  //? classRegExp(window)       // the same as above
  //? classRegExp(null).test('foo')  //=> false (always)
  global.classRegExp = function (className) {
    if (className == '' || typeof className == 'object') {
      return /$o_O/  // never matches.
    } else {
      return new RegExp('(^|\\s+)' + className + '(\\s+|$)', 'gi')
    }
  }

  // Copies properties from object base to object child. If overwrite
  // is passed and true then base's properties will replace those
  // in child even if child has its own properties of that name.
  // Note that it doesn't clone child, it's edited in-place.
  // Also note that defined properties that are 'undefined' on child are
  // replaced by base's even if overwrite is false (see examples).
  //
  // Returns the modified child (first argument).
  //
  //? extend({common: 1, child: false}, {common: 'foo', base: true})
  //    //=> {common: 1, child: false, base: true}
  //
  //? extend({common: 1, child: false}, {common: 'foo', base: true}, true)
  //    //=> {common: 'foo', child: false, base: true}
  //
  //? extend({x: undefined}, {x: 1})    //=> {x: 1}
  //? extend({x: null}, {x: 1})         //=> {x: null}
  //
  //? var child = {y: 1}
  //  extend(child, {x: 1}) === child   //=> true (same object)
  //  console.dir(child)    //=> {y: 1, x: 1}
  global.extend = function (child, base, overwrite) {
    child = child || {}
    base = base || {}

    for (var prop in base) {
      if (overwrite || typeof child[prop] == 'undefined') {
        child[prop] = base[prop]
      }
    }

    return child
  }

  /***
    Event Manipulation Functions
   ***/

  // Calls every handler of the passed callback list with given arguments
  // and in context of obj or 'this' if it's omitted.
  //
  // list can be undefined, a single function or an array (non-function members
  // are skipped). Throws exception if list is something else.
  // args is converted to array with toArray() so it can be a single value,
  // an arguments object or something else - see that function for info.
  //
  // Returns result of the last called function. If any function returns
  // a non-null and non-undefined value all following handlers are skipped.
  //
  //? callAll(function (a) { return a + 'foo' }, 'arg1')
  //    //=> 'arg1foo'
  //? callAll([ function () { } ], ['arg1'])
  //    // equivalent to above
  //
  //? var list = [function (a) { return a[0] == 'a' ? a + 'foo' : null },
  //              function (a) { alert(a) }]
  //  callAll(list, 'arg1')   //=> 'arg1foo' (first handler)
  //  callAll(list, 'foo')    //=> alert('foo') (second handler)
  //
  //? callAll(function () { alert(this.x) }, [], {x: 'foo'})
  //    //=> alert('foo')
  //
  //? callAll(function () { alert(this.x) }).call({x: 'foo'})
  //    // equivalent to above
  //
  //? window.onload = function () {
  //    callAll([...], arguments, window)
  //      // equivalent to callAll([...], toArray(arguments), window)
  //  }
  global.callAll = function (list, args, obj) {
    var res
    args = global.toArray(args)
    typeof list == 'function' && (list = [list])

    if (global.isArray(list)) {
      for (var i = 0; i < list.length; i++) {
        if (typeof list[i] == 'function') {
          res = list[i].apply(obj || this, args)
          if (res != null) { break }
        }
      }
    } else if (list) {
      throw 'FileDrop event list must be either an Array, Function, undefined or' +
            ' null but ' + (typeof list) + ' was given.'
    }

    return res
  }

  // Calls event handlers attached on given FileDrop object to passed
  // event name with arguments. Hands off most work to callAll().
  // obj is an object with the 'events' property (object with keys = event
  // names and values = arrays of functions).
  //
  // Before calling handlers of obj looks if global configuration has
  // a preview handler specified - if it does then calls that handler
  // and if it returns non-null and non-undefined value doesn't call
  // obj's handlers but returns that value immediately. After the global
  // preview function it checks for object-wise preview - its 'any' event
  // handlers which are treated likewise.
  // Preview functions are called with event name pushed in front of
  // the other event args.
  //
  //? var obj = {events: { foo: [function (a) { alert(a); return true }] }}
  //  callAllOfObject(obj, 'foo', 'arg1')   //=> true after alert('arg1')
  //
  //? window.fd.onObjectCall = function (e) { alert(e + ': tee hee'); return false }
  //  var obj = ...   // as above
  //  callAllOfObject(obj, 'foo', 'arg1')   //=> false after alert('foo: tee hee')
  //
  //? var obj = {events: { any: [function (e) { return false }] }}
  //  callAllOfObject(obj, 'anyevent')
  //    // because of the object-wise preview handler that returns false
  //    // any event we call will return false bypassing its actual handlers.
  global.callAllOfObject = function (obj, event, args) {
    if (global.logging && global.hasConsole) {
      var handlers = obj.events[event] ? obj.events[event].length || 0 : 0
      console.info('FileDrop ' + event + ' event (' + handlers + ') args:')
      console.dir([args])
    }

    var preview = [global.onObjectCall].concat(obj.events.any)
    var res = global.callAll(preview, [event].concat(global.toArray(args)), obj)
    return res != null ? res : global.callAll(obj.events[event], args, obj)
  }

  // Appends event listeners to given object with 'events' property according
  // to passed parameters. See DropHandle.event() for details.
  // 'this' must be set to the object which events are updated.
  global.appendEventsToObject = function (events, funcs) {
    if (global.addEventsToObject(this, false, arguments)) {
      return this
    }

    switch (arguments.length) {
    case 0:
      return global.extend({}, this.events)

    case 1:
      if (events === null) {
        this.events = {}
        return this
      } else if (global.isArray(events)) {
        var res = {}

        for (var i = 0; i < events.length; i++) {
          res[events[i]] = global.toArray(this.events[events[i]])
        }

        return res
      } else if (typeof events == 'function') {
        return global.funcNS(events)
      } else if (typeof events == 'string') {
        return global.toArray(this.events[events])
      }

    case 2:
      events = global.toArray(events)

      if (funcs === null) {
        for (var i = 0; i < events.length; i++) {
          var ns = global.splitNS(events[i])

          if (!ns[0]) {
            for (var event in this.events) {
              arguments.callee.call(this, [event + ':' + ns[1]], null)
            }
          } else if (!ns[1]) {
            this.events[ns[0]] = []
          } else if (this.events[ns[0]]) {
            for (var fi = this.events[ns[0]].length - 1; fi >= 0; fi--) {
              if (global.funcNS( this.events[ns[0]][fi] ) == ns[1]) {
                this.events[ns[0]].splice(fi, 1)
              }
            }
          }
        }

        return this
      }
    }

    throw 'Bad parameters for FileDrop event().'
  }

  // Prepends event listeners to given object with 'events' property according
  // to passed parameters. See DropHandle.event() for details.
  // 'this' must be set to the object which events are updated.
  global.previewToObject = function (events, funcs) {
    if (global.addEventsToObject(this, true, arguments)) {
      return this
    } else {
      throw 'Bad parameters for FileDrop preview().'
    }
  }

  // Adds event listeners to given object with 'events' property according
  // to passed parameters. See DropHandle.event() for details.
  // Returns nothing if couldn't handle given parameter combination.
  global.addEventsToObject = function (obj, prepend, args) {
    var events = args[0]
    var funcs = args[1]

    switch (args.length) {
    case 1:
      if (events && typeof events == 'object' && !global.isArray(events)) {
        for (var event in events) {
          arguments.callee(obj, prepend, [event, events[event]])
        }

        return true
      }

    case 2:
      if (typeof funcs == 'function' || global.isArray(funcs)) {
        events = global.toArray(events)
        funcs = global.toArray(funcs)
        var pusher = prepend ? 'unshift' : 'push'

        for (var i = 0; i < events.length; i++) {
          var ns = global.splitNS(events[i])
          for (var fi = 0; fi < funcs.length; fi++) {
            global.funcNS(funcs[fi], ns[1])
          }

          obj.events[ns[0]] = obj.events[ns[0]] || []
          obj.events[ns[0]][pusher].apply(obj.events[ns[0]], funcs)
        }

        return true
      }
    }
  }

  // Adds namespace identifier to a Function object. Used when labeling event
  // listeners in DropHandle.event(). If given just one parameter reads
  // attached namespace, if present.
  //
  //? funcNS(function () { }, 'foo')
  //? funcNS(function () { })   //=> 'foo'
  global.funcNS = function (func, ns) {
    if (typeof func != 'function') {
      return func
    } else if (arguments.length == 1) {
      return (func[global.nsProp] || '').toString()
    } else {
      func[global.nsProp] = (ns || '').toString()
      return func
    }
  }

  // Extracts namespace identifier from the string. Uses jQuery notation:
  // 'event:namespace'. Both parts can be empty. If colon is omitted returns
  // '' instead of namespace.
  // Returns array with two items - event name (or other prefix) and namespace.
  //
  //? splitNS('')       //=> ['', '']
  //? splitNS(null)     // identical to above
  //? splitNS(':')      // identical to above
  //? splitNS('x:')     //=> ['x', '']
  //? splitNS(':y')     //=> ['', 'y']
  //? splitNS('x:y')    //=> ['x', 'y']
  //? splitNS('x:y:z')  //=> ['x', 'y:z']
  global.splitNS = function (str) {
    return (str || '').match(/^([^:]*):?(.*)$/).slice(1)
  }

  /***
    Global Configuration
   ***/

  global.extend(global, {
    // If set all event calls will be logged to console if one is present.
    logging: true,

    // Indicates if console.log and console.dir are available for usage.
    hasConsole: 'console' in window && console.log && console.dir,

    // If set must be a function that's called on every event being fired.
    // See how it works in callAllOfObject().
    onObjectCall: null,

    // All DropHandle objects that were instantinated on this page.
    // Note that these are not FileDrop instances as not all DropHandles
    // might be part of FileDrops. Use DropHandle.filedrop property.
    all: [],

    // Tests for IE versions, must be true for 6-7/9 and below and
    // false for any other version/browser.
    // IE 6 on XP SP 3 gives JScript version 5.7 while IE 8 - 5.8.
    // IE 9 on Win7 gives 9.
    isIE6: /*@cc_on/*@if(@_jscript_version<=5.7)true@else@*/false/*@end@*/,
    isIE9: /*@cc_on/*@if(@_jscript_version<=9)true@else@*/false/*@end@*/,

    // Test for Google Chrome. This isn't used to determine available
    // File API but only to work around certain event glitches.
    isChrome: (navigator.vendor || '').indexOf('Google') != -1,

    // Name of Function object property where event namespace is stored.
    // See funcNS(), splitNS(), DropHandle.event().
    nsProp: '_fdns'
  })

  /***
    Basic Drop Handle Class
   ***

    Has some file upload functionality (mostly legacy <iframe>) but is mainly
    used to handle all drag & drop operations in a cross-browser way.
    You can use it as a basis for your own component.
    Main FileDrop class extends it and listens for produced drop events.
   ***/

  // Parameters:
  // * zone - ID or DOM element which accepts drag & drop. This is often a
  //          <fieldset>. If such element doesn't exist an exception is thrown
  //          when trying to create the class. DropHandle will add some children
  //          to this element to facilitate external drop events. Once created this
  //          element is accessible as (new DropHandle(...)).el property.
  //
  // * opt -  object, key/value pairs of options. See the code for the list of
  //          keys and their purpose. Can be omitted or empty to use defaults.
  //          Current option values are accessible as the opt property.
  //
  //? new fd.DropHandle('anID')
  //? new fd.DropHandle(document.body, {zoneClass: 'with-filedrop'})
  global.DropHandle = function (zone, opt) {
    // Persistent 'this' instance reference.
    var self = this

    self.el = zone = global.byID(zone)
    if (!zone) { throw 'Cannot locate DOM node given to new FileDrop class.' }

    /***
      DropHandle Options
     ***

      Changing these on runtime after the class was created doesn't affect
      anything so make sure to pass desired values to the constructor.
     ***/

    self.opt = {
      // The zone element gets this HTML class appended immediately after
      // the DropHandle object is created.
      zoneClass: 'fd-zone',

      // DropHandle creates a hidden form and <input type="file">. The input
      // is completely transparent so the contents underneath is visible
      // but at the same time a dropped object lands on the input triggering
      // its DOM events. This option specifies the class name assigned
      // to this input.
      inputClass: 'fd-file',

      // Options for fallback upload via <iframe> for browsers lacking
      // native drag & drop support - IE and others.
      iframe: {
        // URL to send uploaded file to. It's a regular form upload with
        // enctype="multipart/form-data" so if you're using PHP it's handled
        // with $_FILES as usual. The URL can have query string. It will have
        // the 'fd-callback' parameter appended containing the name of
        // function your server script must call when generating JavaScript
        // output - if it does the upload succeeds, otherwise it "fails".
        // Calling external function is the only reliable way to know that
        // we've uploaded the file right. Plus you can pass any data to
        // that function as its parameters.
        // For the practical server-side example see included upload.php.
        //
        // If unset <iframe> upload is disabled so only drag & drop-aware
        // browsers (Firefox and Crhome-based) will handle this drop zone.
        url: '',

        // Name of GET input variable containing the name of the global window
        // callback function to be called by the server in the generated
        // page after uploading a file via <iframe>.
        callbackParam: 'fd-callback',

        // Name of POST file input variable (<input type="file" name="$nameParam">).
        // Maps to $_FILE[] in PHP.
        fileParam: 'fd-file'
      },

      // Contains DOM nodes of fallback upload via <iframe>. If null necessary
      // elements for <iframe> upload will be created automatically.
      //
      // If this is false (boolean) then DropHandle creates no input at all.
      // This is useful if you need pure drag & drop upload that works in
      // Firefox and Chrome-based browsers, no <iframe> uploads for IE 9-,
      // Opera, Safari and others. This creates "perfect" drop zone that
      // doesn't prevent user interaction with underlying components so the
      // zone can be extended onto large document area or the entire window.
      input: null,

      // After construction opt.input's structure is as follows: {
        // If unset DropHandle will first recursively look for <input type="file">
        // among the children of the zone element and having opt.inputClass among
        // its HTML classes. If found no new element will be created. This makes it
        // safe to create multiple DropHandle objects for the same zone handle (not
        // tested though).
        //
        // If unset but no suitable node would be found (see above) then DropHandle
        // creates the input automatically along with the form which is usually
        // exactly what you need.
        //file: null,

        // This value is set to match the parent form of <input type="file">.
        // Changing it isn't recommended.
        //form: null
      //},

      // If using <input type="file"> (legacy <iframe> upload, see input option)
      // some browsers including IE 6-10 and Opera will keep last selected file
      // in the input after upload which will prevent the user from uploading
      // the same file twice in a row (this doesn't apply to drag & drop uploads).
      // When enabled, this option will let FileDrop recreate the file input
      // thus resetting file selection. This is safe in most cases but if your
      // project does some extra customization on opt.input.file this might erase
      // them and attached events unless you are doing that in inputSetup event.
      // When disabled, input will be cleared in Firefox/Chrome thus preventing
      // user from reuploading the same file one after another in other browsers.
      recreateInput: true,

      // Chrome, unlike Firefox, dispatches drop events for the entire document
      // rather than the input element. For Chrome this option is always true.
      // If you want the same behaviout in Firefox then you can manually set
      // it to true to let all of your drop zones receive drop events as soon
      // as they enter the browser's window but not those zones' bounds.
      fullDocDragDetect: false,

      // Initial state of the multiple selection in browser's Open File dialog
      // appearing when clickin on the drop zone (<input type="file">).
      // After this object was created toggle this setting with this.multiple().
      multiple: false,

      // Cursor displayed when a user drags an object over this drop zone.
      // Working values depend on the browser. 'copy' and 'none' work for
      // Firefox and Chrome; the latter also supports 'move', 'link'.
      // Setting to 'none' will cause "No Drop" cursor and will cause drop
      // operation to be ignored on this drop zone (on-drop event not fired).
      // This option can be set on runtime.
      dropEffect: 'copy'
    }

    // Keeping track of all DropHandle instances.
    global.all.push(self)
    // If this DropHandle was created by a FileDrop instance this property
    // will point to that instance.
    self.filedrop = null

    var iframe = self.opt.iframe
    global.extend(self.opt, opt, true)
    // In case user options contained {iframe} without full set of properties.
    global.extend(self.opt.iframe, iframe)

    // Chrome dispatches drop events document-wise rather than zone-wise.
    // If unset we won't receive any reaction on individual elements.
    global.isChrome && (self.opt.fullDocDragDetect = true)

    /***
      DropHandle Events
     ***

      Attach new listeners with (new DropHandle).event('dragEnter', function ...).
      As a low-level alternative you can change/move items around this array
      directly but it's not future-proof.

      Note that all callbacks are executed with 'this' pointing to this
      object so it's easy to know which DropHandle has caused that particular
      event. For example:

        var dh = new DropHandle('myzone')
        dh.event('dragEnter', function () {
          alert('Entering the ' + this.el.id + ' drop zone!')
        })
     ***/

    self.events = {
      // Object-wise event preview handlers. They get executed on any event
      // of this object (like dragEnter) and if any of them returns a non-null
      // and non-undefined value actual event handlers are not called and
      // that value is returned. These callbacks receive the same arguments
      // as the target event plus that event's name in front.
      // See callAllOfObject() for more details.
      any: [],

      // Occurs when a user drags something across this zone element (Firefox)
      // or across the entire browser window (Chrome or if opt.fullDocDragDetect
      // is set).
      //
      // function (eventObject)
      dragEnter: [],

      // Occurs when user drags the object away from the zone element (Firefox)
      // or outside of the window (Chrome or opt.fullDocDragDetect).
      //
      // function (eventObject)
      dragLeave: [],

      // Occurs periodically after dragEnter while user is still dragging an
      // object inside the drop zone. If not using DropHandle be aware that
      // Chrome requires a listener attached to ondragover or it will discard
      // the drop operation. DropHandle takes care of this for you.
      //
      // function (eventObject)
      dragOver: [],

      // The following 2 events are somewhat superficient and not really useful
      // or working but they're still listened to in case you need to hook them.
      //
      // function (eventObject)
      dragEnd: [],
      dragExit: [],

      // Occurs when a file has been dropped on the zone element or when a file
      // was selected in/dropped onto fallback <form> to trigger <iframe> upload.
      // The former occurs in Firefox and Chrome-based browsers that support
      // drag & drop natively. The latter occurs in Opera and others that only
      // work with regular form file uploads.
      //
      // function (eventObject)
      //    - is passed native browser-dependent event object.
      upload: [],

      // Occurs when another DropHandle object on the page initiates upload
      // event. Can be used to reset some visual state of all drop zones but
      // the one that's actually got the file landed.
      //
      // function (DropHandle)
      //    - is passed another DropHandle object that has initiated the
      //      upload event.
      uploadElsewhere: [],

      // Occurs after <input type="file"> used to accept file drops was created
      // or found (see the description of the 'input' option). Here it's used to
      // assign it some HTML classes. You can do similar setup.
      // Is also fired after recreating file input on upload if opt.recreateInput
      // is set - in this case is passed old <input type="file"> (that was cloned).
      //
      // function ({ file: DOM_Input, form: DOM_Form }, oldFileInput)
      //    - is passed an object with the same keys as 'input' option -
      //      the DOM element of the <input type="file"> and its parent
      //      <form> DOM element.
      inputSetup: [],

      // Occurs when a fallback <iframe> element was created. Can be used for
      // setup actions similar to inputSetup.
      //
      // function (DOM_Iframe)
      //    - is passed the DOM element of the new <iframe>.
      iframeSetup: [],

      // Occurs when a file was successfully uploaded to the server, i.e.
      // when the form was submitted and the server has returned the output
      // that calls 'fd-callback' function to indicate successful (or unsuccessful)
      // upload to the client page. See the 'iframe' option and included upload.php
      // for samples and explanations.
      //
      // function (response)
      //    - is passed the same data as given by the server-generated JavaScript
      //      to the global 'fd-callback'. Note that it's the first argument to
      //      that function, all others are ignored.
      //      This object will mimic some of XMLHttpRequest properties so you
      //      can use single handler for both XHR and <iframe> uploads - see
      //      sendViaIFrame() for details.
      iframeDone: []
    }

    // Old FireDrop compatibility. Now deprecated.
    self.on = self.events
    self.zone = self.el

    /***
      DropHandle Methods
     ***/

    // Prepares target DOM element for drag & drop and <iframe> uploads by
    // adding more child nodes and listening to appropriate events.
    // Usually you don't need to call this function since it's automatically
    // called for the zone element (given to the constructor).
    //
    //? hook(byID('myzone'))
    self.hook = function (zoneNode) {
      // If <input type="file"> support was turned off then we're not aiming
      // for the support of uploads without File API, i.e. via <iframe> for
      // all but Firefox and Chrome. If such we're not creating the form and
      // other supportive elements.
      if (self.opt.input != false) {
        self.opt.input = self.opt.input || self.prepareInput(zoneNode)
        self.opt.input && global.callAllOfObject(self, 'inputSetup', self.opt.input)
      }

      self.hookDragOn(zoneNode)
      self.hookDropOn(zoneNode)
    }

    // Attaches listeners for drag events - when an object is moved in or out
    // the scope of the zone element (or document for Chrome). This provides
    // common layer for various browser-specific ways to utilize drag* events.
    // Once a suitable event occurs DropHandle's own event callbacks are invoked.
    self.hookDragOn = function (zoneNode) {
      // With dragenter we detect when user moves object over our zone or
      // document window to display some feedback.
      //
      // With dragleave we do the opposite and restore previous component state
      // when an object is being moved away or drag & drop is cancelled.

      if (self.opt.fullDocDragDetect) {
        self.delegate(document.body, 'dragEnter')

        global.addEvent(document, 'dragleave', function (e) {
          // Chrome (at least in earlier versions) fires dragleave randomly,
          // this is used to normalize it to just one real occurrence.
          if ((e.clientX == 0 && e.clientY == 0) || global.isTag(e.relatedTarget, 'html')) {
            global.stopEvent(e)
            global.callAllOfObject(self, 'dragLeave', e)
          }
        })
      } else {
        self.delegate(zoneNode, 'dragEnter')
        self.delegate(zoneNode, 'dragLeave')
      }

      self.delegate(zoneNode, 'dragOver')
      self.delegate(zoneNode, 'dragEnd')    // doesn't work anywhere; unused by FileDrop.
      self.delegate(zoneNode, 'dragExit')   // works in Firefox; unused by FileDrop.
    }

    // Attaches listeners to drop events. Just like hookDragOn provides
    // common browser-independent ground by normalizing occurred events
    // and calling DropHandle's own event handlers.
    self.hookDropOn = function (zoneNode) {
      // IE 6-9 fire 'drop' event if you drop a file onto a file input. However,
      // if the form is submitted after this event IE will send empty POST body
      // instead of the actual file data. So handling of this event is disabled here
      // although technically it could've worked since IE 6 if not for that bug (?).
      //
      // Firefox and Chrome-based browsers are the only ones supporting this
      // event which we use to read dropped file data in the FileDrop class.
      global.isIE9 || self.delegate(zoneNode, 'drop', 'upload')
    }

    // Listens for DOM events and initiates corresponding DropHandle's events.
    // Third argument can specify DropHandle's event name if it differs from
    // the DOM event. Propagation of caught events is stopped.
    //
    //? delegate(byID('myzone'), 'dragleave')
    //? delegate(byID('myzone'), 'drop', 'upload')
    self.delegate = function (zoneNode, domEvent, selfEvent) {
      global.addEvent(zoneNode, domEvent.toLowerCase(), function (e) {
        global.stopEvent(e)
        global.callAllOfObject(self, selfEvent || domEvent, e)
      })
    }

    // Finds or creates <input type="file"> used to facilitate non-drag & drop
    // uploads for browsers othat than Firefox and Chrome-based.
    // Returns that input's DOM element and its parent <form> or, if none,
    // throws an exception since there's no meaning in having <input type="file">
    // and no <form> as both are only reuqired for fallback <iframe> upload.
    // This result is assigned to 'input' option.
    self.prepareInput = function (parent) {
      var file = self.findInputRecursive(parent) || self.createInputAt(parent)

      if (file) {
        var form = file.parentNode
        while (form && !global.isTag(form, 'form')) {
          form = form.parentNode
        }

        if (!form) { throw 'FileDrop file input has no parent form element.' }

        // See if the located form has proper target and if that target
        // (supposedly <iframe>) really exists - we don't want to reload
        // the entire document on file upload since it defeats the purpose
        // of AJAX and is probably an error condition.
        var target = form ? form.getAttribute('target') : ''

        if (target && global.isTag(global.byID(target), 'iframe')) {
          // Once here it means the setup is good to go. Return with success.
          return {file: file, form: form}
        }
      }

      // Similarly to opt.input == false this means there's input/form found
      // so turn off <iframe> upload or create our own elements.
      return false
    }

    // Searches for <input type="file"> containing HTML class opt.inputClass
    // among the children of parent. Is used to autodetect pre-created input
    // of a drop zone. parent must be a DOM element.
    // Returns DOM element or null.
    //
    //? // <form id="myzone"><input type="file" class="fd-input"></form>
    //  findInputRecursive(byID('myzone'))
    //    //=> <input type="file" class="fd-input">
    //
    //? findInputRecursive(byID('foo'))   //=> null
    self.findInputRecursive = function (parent) {
      for (var i = 0; i < parent.childNodes.length; i++) {
        var node = parent.childNodes[i]

        if (global.isTag(node, 'input') && node.getAttribute('type') == 'file' &&
            global.hasClass(node, self.opt.inputClass)) {
          return node
        } else if (node = arguments.callee(node)) {
          return node
        }
      }
    }

    // Creates elements necessary for <iframe> upload to work - the input,
    // form and iframe itself. A random unique ID is generated and assigned to
    // the iframe, plus new form's target attribute. Once <input type="file">
    // gets clicked (and file chosen in the appeared dialog) or once it gets
    // a file dropped onto (supported by some browsers) its onchange event
    // occurs which we're intercepting in hookDropOn(). With that we trigger
    // <form> submission which sends data to our hidden <iframe>. Just like
    // old times.
    //
    // Returns the DOM element of (new) <input type="file">.
    self.createInputAt = function (parent) {
      do { var id = global.randomID() } while (global.byID(id))

      var cont = document.createElement('div')
      // <iframe> code and several other things around are courtesy of
      // QQ File Uploader (https://github.com/valums/file-uploader).
      cont.innerHTML = '<iframe src="javascript:false" name="' + id + '"></iframe>' +
                       '<form method="post" enctype="multipart/form-data">' +
                         '<input type="hidden" name="' + self.opt.iframe.callbackParam + '" />' +
                         '<input type="file" name="' + self.opt.iframe.fileParam + '" />' +
                       '</form>'

      // <iframe>.
      cont.firstChild.setAttribute('id', id)
      cont.firstChild.style.display = 'none'
      // <form>.
      cont.lastChild.setAttribute('target', id)

      var nextChild = parent.firstChild
      // Opera doesn't recognize <legend> and doesn't put it on top of the fieldset
      // unless it's the first child. For this we skip over <legend> which can
      // happen if parent is a <fieldset>.
      while (nextChild && (!global.isTag(nextChild) || global.isTag(nextChild, 'legend'))) {
        nextChild = nextChild.nextSibling
      }

      // Now put our controls as first child so they overlap the contents and
      // <input type="file"> can be clicked or dropped onto to fire the events.
      if (nextChild) {
        // Firefox 10 requires that immediate parent has position: relative for
        // overflow: hidden to work on the input this in turn requires that the
        // parent is the first child, otherwise top: 0 of the file input won't work.
        parent.insertBefore(cont, nextChild)
      } else {
        // parent has no children or it's just <legend> - append controls to the end.
        parent.appendChild(cont)
      }

      // The file input.
      return cont.lastChild.lastChild
    }

    // Can be used to abort <iframe> upload. Isn't guaranteed to work since
    // it's unreliable and highly browser-dependent (especially IE) but at
    // least it might work. Does nothing if this DropHandle doesn't use
    // <iframe> upload (see the input option).
    self.abortIFrame = function () {
      if (self.opt.input.form) {
        var iframe = global.byID(self.opt.input.form.getAttribute('target'))
        iframe && iframe.setAttribute('src', 'javascript:false')
      }
    }

    // Sends the data via <iframe> as a fallback for proper File API AJAX upload.
    // If url is omitted iframe.url option is used. See its description for more
    // info. Does nothing if this DropHandle doesn't use <iframe> upload (see
    // the input option). FileDrop class calls this automatically if an upload
    // was triggered by an unsupported browser (neither Firefox nor Chrome-based).
    //
    // Unlike FileAPI events that let you decide what to do with the file - read,
    // upload or descrad it - <iframe> upload is an imitation that simply submits
    // the form as logn as <input type="file"> was changed according to onchange
    // event. There's no way to make sure it was populated or retrieve any info
    // about the file - this can only be done by the server which may return
    // something useful in response. For this reason DropHandle automatically
    // facilitates the upload and offers only one 'iframeDone' event when all
    // went fine.
    //
    // Returns true if upload was sent (but no guarantees about its success,
    // use 'iframeDone' event for this purpose).
    //
    //? sendViaIFrame('http://my.host/upload.php?var=foo&var2=123')
    //? sendViaIFrame()   // uses opt.iframe.url
    self.sendViaIFrame = function (url) {
      url = url || self.opt.iframe.url
      var form = (self.opt.input || {}).form

      if (url && form) {
        do { var callback = global.randomID() } while (callback in window)

        // This function is meant for calling by the code generated by the
        // server-side script to which we've sent the file via the <form>.
        // callback is that function's globally unique name (window-wise).
        window[callback] = function (resp) {
          // If server didn't pass a JS object let's mimic XMLHttpRequest
          // and put that response data there.
          if (typeof resp != 'object') {
            resp = {
              response: resp,
              responseXML: '',
              responseText: (resp || '').toString(),
              readyState: 4,
              status: 200,
              statusText: 'OK',
              // A bunch of XMLHttpRequest/jqXHR stub methods.
              getAllResponseHeaders: function () { return '' },
              getResponseHeader: function () { return '' },
              setRequestHeader: function () { return this },
              statusCode: function () { return this },
              abort: function () { return this }
            }
          }

          // These are extra properties given to event handlers so they
          // can differentiate between AJAX upload and <iframe> fallback.
          // Note that if properties with these names are already present
          // in response they won't be overwritten.
          global.extend(resp, {
            // Just an indicator that it's an upload via <iframe>.
            iframe: true,
            // This URL contains full URL to which the data was sent (usually
            // opt.iframe.url) that might include 'fd-callback' parameter.
            url: url
          })

          global.callAllOfObject(self, 'iframeDone', resp)
        }

        // Setting the hidden input with the callback name to our newly generated name.
        var cbInput = form.firstChild
        while (cbInput && (!global.isTag(cbInput, 'input') ||
               cbInput.name != self.opt.iframe.callbackParam)) {
          cbInput = cbInput.nextSibling
        }

        if (cbInput) {
          cbInput.value = callback
        } else {
          // This shouldn't happen with standard usage but if the hidden field
          // is missing let's append callback name to the URL itself.
          url = url.replace(/[?&]+$/, '') +
                (url.indexOf('?') == -1 ? '?' : '&') +
                self.opt.iframe.callbackParam + '=' + callback
        }

        form.setAttribute('action', url)
        global.callAllOfObject(self, 'iframeSetup', form)
        form.submit()
        setTimeout(self.resetForm, 300)

        return true
      }
    }

    // Clears value of the file input so that the same file (with the same
    // local path) can be uploaded again without reloading the page.
    // Thanks to @rafaelmaiolla for the tips.
    self.resetForm = function () {
      var input = self.opt.input && self.opt.input.file
      if (input) {
        // Works in Firefox/Chrome only. Funny fact is that cloneNode() there
        // will clone file selection too. IE doesn't support value = '' but
        // node cloning erases it.
        input.value = ''

        if (self.opt.recreateInput) {
          var clone = self.opt.input.file = input.cloneNode(true)
          input.parentNode.replaceChild(clone, input)
          global.callAllOfObject(self, 'inputSetup', [self.opt.input, input])
        }
      }
    }

    // Toggles selection of multiple files in the browser's open file dialog
    // that appears when you click on <input type="file">. Does nothing if
    // this DropHandle doesn't use <iframe> upload (see the input option).
    //
    // If an argument is given it's used to set the new state. If no arguments
    // are passed then current state is read.
    //
    // When doing initial setup on object construction you can pass {multiple: true}
    // as an option instead of calling this method right after.
    //
    //? multiple(true)    //=> true; multiple file selection is possible
    //? multiple(false)   //=> false; only one file can be selected
    //? multiple()        //=> true if multiple selection is enabled or false otherwise
    //? multiple(undefined)   // equivalent to above
    self.multiple = function (enable) {
      if (self.opt.input && typeof enable != 'undefined') {
        enable ? self.opt.input.file.setAttribute('multiple', 'multiple')
               : self.opt.input.file.removeAttribute('multiple')
      }

      return self.opt.input && !!self.opt.input.file.getAttribute('multiple')
    }

    // Function to manipulate events that correspond to DropHandle's events - not
    // DOM node events. If you need to listen to them instead then use this:
    //   addEvent(yourDropHandle.el, 'mousemove', function ...)
    // Or any other standard way, e.g. with jQuery:
    //   $(yourDropHandle.el).mousemove(function () { ... })
    //
    // Without parameters returns copy of {event: [func, func, ...], ...}
    // event map - all handlers attached to this zone.
    //
    // When given a single non-array parameter returns array of handlers
    // of that particular event:
    //   event('iframeDone')     //=> [function () { ... }, func, ...]
    //
    // When givne a single array parameter acts similarly to parameterless
    // form - returns event map of those particular events:
    //   event(['inputSetup', 'iframeDone'])
    //     //=> { inputSetup: [function () { ... }], iframeDone: [func, ...] }
    //
    // When givne one object parameter - an event map - all its handlers
    // are added (values can be either functions or arrays, namespaces are
    // not supported by this call form):
    //   event({ inputSetup: [func, func, ...], iframeDone: func })
    //     //=> this (DropHandle)
    //
    // When given two parameters and the second is null removes all handlers
    // of event(s) listen in the first parameter (array or string):
    //   event('inputSetup', null)    //=> this (DropHandle) - and below
    //   event(['inputSetup', 'iframeDone'], null)
    //
    // When given two parameters and the second is either a function or array
    // adds listeners to listed event(s):
    //   event('inputSetup', function () { alert('New listener') })
    //     //=> this (DropHandle) - here and below
    //   event(['inputSetup', 'iframeDone'], function () { ... })
    //   event('inputSetup', [func_1, func_2, ...])
    //   event(['inputSetup', 'iframeDone'], [func_1, func_2, ...])
    //
    // Since two parameter-long calls return 'this' you can easily chain
    // multiple calls to the object methods like in jQuery.
    //
    // New listeners are pushed at the end of event chain (see callAll()).
    // Use preview() to add handlers in front of others.
    //
    // Event names can contain namespaces in form 'event:namespace' - this
    // string identifier (not necessary unique) is assigned to every function
    // handler and can be used later to remove that handler or a bunch of others
    // with the same ID. Empty namespace ('event:') is the same as just 'event'.
    // Registering new handler with the same NS in the same event doesn't remove
    // the former (NS can duplicate). On unlisten, empty event name with non-empty
    // namespace looks over all events.
    //
    //   event('event:myns', [func_1, func_2])
    //     // adds 2 handlers, both under 'myns' namespace.
    //   event('event', func_3)
    //     // adds third function under empty namespace.
    //   event('event:myns', null)    // removes 2 functions added first.
    //   event(':myns', null)   // removes all 'myns' functions from all events.
    //   event('event')   //=> {event: func_3}
    //
    // Any other parameter combination will result in exception.
    //
    // You can preview any event (execute your own handlers before any occurring
    // event's handlers are executed) with 'any' event name (see callAllOfObject()):
    //
    //   event('any', function () { return false })
    //     // suppresses all events.
    //   event('any:myns', function () { return false })
    //     // the same but lets you later remove this namespaced handler.
    //   event('any:myns', null)    // removes the handler set above.
    //
    // There are also more special call forms. With one null parameter all
    // handlers on this zone are removed - can be used to transfer all handlers
    // from one DropHandle to another or save/restore their state:
    //   var old = event()    //=> {event: [func], ...}
    //   event(null)
    //   event(old)
    //
    // With one function parameter this function's namespace is returned
    // or empty strign if there's none:
    //   event(function () { })     //=> ''
    //
    //? event('inputSetup', function (input) {
    //    alert('Setting up file input of ' + input.form.target)
    //  })
    //
    //? event('iframeDone', [handler_1, handler_2, ...])
    //? event(['inputSetup', 'iframeDone'], function () { alert(this.el.id) })
    //? event('any:namespace', ...)
    self.event = function (events, funcs) {
      return global.appendEventsToObject.apply(self, arguments)
    }

    // A simplified companion of event() that adds listeners not after
    // existing but in front of them. Useful for intercepting and overriding
    // calls of certain events. Supports namespaces.
    //
    // Has several call forms which are identical to event():
    // 1. One parameter - object (event map)
    // 2. Two parameters - array/array, array/func, string/array, string/func
    //
    // Any other parameter combination will result in exception.
    //
    //? preview('iframeDone', function () { alert('Abort!'); return false })
    //? preview(['inputSetup:myns'], [func, func])
    //? preview('any:myns', function () { alert('Stop that!'); return false })
    self.preview = function (events, funcs) {
      return global.previewToObject.apply(self, arguments)
    }

    /***
      Standard DropHandle Event Callbacks
     ***

      These are used to support default behaviour like assignment of HTML
      classes to zone and input nodes.
     ***/

    self.onInputSetup = function (input, oldInput) {
      if (oldInput) {
        // IE clones elements "by reference" so when one's attributes or
        // events are changed the other also reflects the change.
        // Taken from jQuery which borrowed that from MooTools.
        input.file.clearAttributes && input.file.clearAttributes()
        input.file.mergeAttributes && input.file.mergeAttributes(oldInput)
      } else {
        self.multiple(self.opt.multiple)
      }

      global.setClass(input.file, self.opt.inputClass)

      // We listen for <input type="file">'s onchange event - when it occurs
      // we trigger submission of the hidden form which navigates hidden
      // <iframe> to upload the file to the server script and read its response.
      // This can be used in drag & drop-aware browsers (Firefox and Chrome-based)
      // to create a "Browse for file" button as an alternative to drag & drop.
      // For more details see the 'iframe' option.
      self.delegate(input.file, 'change', 'upload')

      var parent = input.file.parentNode
      if (parent && parent.style.display.match(/^(static)?$/)) {
        // We need to anchor <input>'s position relative to its parent node.
        parent.style.position = 'relative'
      }

      if (global.isTag(zone, 'fieldset')) {
        // Firefox 13 or so has started to ignore overflow: hidden on fieldsets.
        // We need to wrap it in a <div> that by itself will hide any overflow.
        var div = document.createElement('div')
        div.style.position = 'relative'
        div.style.overflow = 'hidden'
        zone.parentNode.insertBefore(div, zone)
        div.appendChild(zone)
      }
    }

    self.onDragOver = function (e) {
      global.stopEvent(e)
      e.dataTransfer && (e.dataTransfer.dropEffect = self.opt.dropEffect)
    }

    self.onUpload = function () {
      for (var i = 0; i < global.all.length; i++) {
        if (global.all[i] !== self && global.all[i].events) {
          global.callAllOfObject(global.all[i], 'uploadElsewhere', self)
        }
      }
    }

    self.event({
      inputSetup: self.onInputSetup,
      dragOver: self.onDragOver,
      upload: self.onUpload
    })

    // Initialization.
    global.setClass(zone, self.opt.zoneClass)
    self.hook(zone)
  }

  /***
    Main FileDrop Class
   ***

    Based on DropHandle to abstract from browser-specific drag & drop
    and fallback <iframe> upload quirks, this class adds actual upload
    functionality. It listens for drop events and <iframe> submission
    triggering dedicated events with normalized parameters. Underlying
    DropHandle class can be accessed via this.handle property. It shares
    options and events with FileDrop object so changing one affects another.

    DropHandle properties and methods are available on this object as well.

    This object is defined in window.fd and aliased as window.FileDrop.
   ***/

  // Parameters - identical to DropHandle, see its note for details.
  //? new FileDrop('anID')
  //? new FileDrop(document.body, {zoneClass: 'with-filedrop'})
  global.FileDrop = function (zone, opt) {
    // Persistent 'this' instance reference.
    var self = this

    zone = global.byID(zone)

    // Underlying DropHandle instance providing browser-independent
    // handlers for drag & drop and <iframe> upload facility.
    // Constructor will throw an exception if zone is invalid/undefined.
    self.handle = new global.DropHandle(zone, opt)
    self.handle.filedrop = self

    /***
      FileDrop Options
     ***

      Changing these on runtime after the class was created doesn't affect
      anything so make sure to pass desired values to the constructor.

      Extends DropHandle options so check that class for more options and info.
     ***/

    global.extend(self.handle.opt, {
      // HTML class name for the zone DOM node that is set when an object
      // is being dragged over that zone (Firefox) or over entire document
      // (Chrome-powered browsers). It's removed once the object was dragged
      // away or drag & drop was cancelled.
      dragOverClass: 'over'
    })

    global.extend(self.handle.opt.iframe, {
      // opt.iframe.force - if set FileDrop will always upload files by using
      // fallback <iframe> method. This only makes sense in debugging and
      // for some browsers (Opera before migrating to Chrome engine).
      force: false
    })

    /***
      FileDrpo Events
     ***

      Attach new listeners with (new FileDrop).event('send', function ...).
      Extends DropHandle options so check that class for more events and info.

      This only applies to FileDrop zone overall - it doesn't define events
      for individual File objects being generated by this zone. This means
      that to determine upload state or progress you need to attach listeners
      to each produced File object - either inside FileDrpo's 'send' event
      before sending a file to the server or inside its 'fileSetup' event
      which is fired right after the creation of File object.

      Note that all callbacks are executed with 'this' pointing to this
      object so it's easy to know which FileDrop has caused that particular
      event. For example:

        var dh = new FileDrop('myzone')
        dh.event('send', function (files) {
          alert('Sending files via ' + this.el.id)

          for (var i = 0; i < files.length; i++) {
            files[i].sendTo('http://my.host/upload.php')
          }
        })
     ***/

    global.extend(self.handle.events, {
      // Occurs when a file is ready to be sent via drag & drop. Doesn't
      // occur for <iframe> uploads since the only thing you can do about them
      // is submit the file to the server (no file info is available).
      // If for some reason you still need to know when a file was *potentially*
      // placed into <input type="file"> for such fallback uploads listen or
      // preview the 'upload' event (inherited from DropHandle).
      //
      // function (fd.FileList)
      //    - is passed list of files that were dropped onto this zone - see
      //      the description of this object for more details.
      send: [],

      // Occurs when a new fd.File object was created. You can use this to
      // attach your own events if you don't want to do this on every 'send'
      // occurrence.
      //
      // function (fd.File)
      //    - is passed instance of the newly created File object.
      fileSetup: []
    })

    // Handles upload that happens when a user drops a file onto the zone
    // (Firefox, Chrome-based) or its <input type="file" (Opera, others).
    self.onUpload = function (e) {
      var files = !self.opt.iframe.force && self.eventFiles(e, true)

      // This was likely triggered by onchange event of <input type="file">
      // which means the browser doesn't support drag & drop or the user
      // has picked file by clicking on the drop zone, bringing up Open File
      // dialog and selecting a file there.
      // If that's the case we don't have any file info available so just
      // submit the form to the server and see what it responds with (only
      // if <iframe> upload was enabled by filling out opt.iframe.url).
      if (!files) {
        if (!self.handle.sendViaIFrame() && global.hasConsole) {
          // Must set opt.iframe.url if <iframe> fallback needs to work.
          console.warn('FileDrop fallback upload triggered but iframe options' +
                       ' were not configured - doing nothing.')
        }
      } else if (files.length > 0) {
        // Dropped one or more files and we have FileAPI available (Firefox,
        // Chrome-based) so fire off the usual on-drop event.
        global.callAllOfObject(self, 'send', [files])
      }
    }

    // Retrieves fd.File objects from an on-drop event. Returns a fd.FileList
    // array-like object (not W3C FileList).
    // If orFalse is unset always returns a FileList even if event was invalid,
    // otherwise returns false in such occurrences instead of empty FileList.
    self.eventFiles = function (e, orFalse) {
      var result = new global.FileList(e)

      // IE 8 supplies dataTransfer but it's of its own format (getData(), etc.)
      // and not standardized. Has no file objects.
      if (e.dataTransfer && (e.dataTransfer.length || e.dataTransfer.files)) {
        var list = e.dataTransfer
      } else {
        // IE 10 provides dataTransfer on drag & drop but when selecting with
        // Open File dialog of <input type="file"> it only has e.srcElement.files.
        // Thanks to @rafaelmaiolla for this correction.
        var list = (e.target && e.target.files) || (e.srcElement && e.srcElement.files)
      }

      if (list) {
        var entries = list.items || []
        list.files && (list = list.files)   // Firefox 3.6.
        var names = {}

        for (var i = 0; i < list.length; i++) {
          var file = new global.File(list[i])

          // Safari Windows adds first file several times so skip them.
          // ...while iOS Safari adds files under the same name - image.jpg (#30).
          if (!names[file.name] || file.name == 'image.jpg') {
            names[file.name] = true
            file.setNativeEntry(entries[i])
            global.callAllOfObject(self, 'fileSetup', file)

            // Directories have zero size but in Chrome they are useful
            // since you can access underlying DIrectoryEntry and read files.
            if (file.size > 0 || file.nativeEntry) {
              result.push(file)
            }
          }
        }
      } else if (orFalse) {
        result = false
      }

      return result
    }

    // Linking both classes together. Objects become references so changing,
    // for example, handle.events affects this.events. Functions of DropHandle
    // become available on this FileDrop instance which is fine since they
    // operate on 'self' bound to DropHandle object rather than 'this' of FileDrop.
    global.extend(self, self.handle)

    /***
      Standard FileDrop Event Callbacks
     ***

      These are used to support default behaviour like actual upload process
      after dropping a file or updating zone HTML classes on drag over/out.
     ***/

    function dragClassChanger(isHovered) {
      return function () {
        global.setClass(zone, self.opt.dragOverClass, isHovered)
      }
    }

    self.event({
      upload:           self.onUpload,
      send:             self.resetForm,
      // Add/remove on-drag HTML classes to/from the zone element.
      dragEnter:        dragClassChanger(true),
      dragLeave:        dragClassChanger(false),
      uploadElsewhere:  dragClassChanger(false)
    })

    self.preview({
      // Placing handler to reset on-drop state of the zone for better
      // visual feedback - the user immediately recognizes that the file is no
      // more dragged even if actual upload handler takes some time to execute.
      upload:           dragClassChanger(false)
    })
  }

  /***
    FileList Class
   ***

    It's sort of W3C class (that has no special methods defined in the spec)
    with a bunch of File-oriented methods that this object is meant to contain.
    It's an array-like object with length, splice and other methods.
   ***/

  global.FileList = function (event) {
    // Persistent 'this' instance reference.
    var self = this

    // If set can be 'copy', 'move' or other action. Doesn't reliably work
    // cross-browser and cross-platform. See MDN for more info:
    // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer
    self.dropEffect = (event && event.dropEffect) || ''
    self.length = 0

    // No need to hold the reference to this variable.
    event = null

    self.push = function (file) {
      self[self.length++] = file
      return self
    }

    // Returns undefind if this list is empty.
    self.pop = function () {
      if (self.length > 0) {
        var file = self.last()
        delete self[--self.length]
        return file
      }
    }

    self.first = function () {
      return self[0]
    }

    self.last = function () {
      return self[self.length - 1]
    }

    self.remove = function (i) {
      for (; i < self.length - 1; i++) {
        self[i] = self[i + 1]
      }

      se.f.pop()
      return self
    }

    self.clear = function () {
      for (var i = 0; i < self.length; i++) {
        delete self[i]
      }

      self.length = 0
      return self
    }

    // Reverses order of files in this list (changes self).
    self.reverse = function () {
      for (var i = 0; i < Math.floor(self.length / 2); i++) {
        self[i] = self[self.length - i - 1]
      }
      return self
    }

    // Creates copy of this list and adds items from FileList or array
    // to the end of the returned copy.
    self.concat = function (list) {
      var copy = new global.FileList
      for (var i = 0; i < self.length; i++) {
        copy[i] = self[i]
      }

      for (var i = 0; list && i < list.length; i++) {
        copy[self.length + i + 1] = list[i]
      }

      copy.length = self.length + (list || []).length
      return self
    }

    // Sorts this list by calling comparator in context cx (or 'this' FileList).
    // func = function (File a, File b, aIndex, bIndex) - if returns < 0 second
    // file (b) must go before first (a). Very similar to Array.sort().
    //
    //? sort(function (a, b) { return a.name > b.name ? +1 : -1 })
    self.sort = function (func, cx) {
      for (var i = 0; i < self.length; i++) {
        for (var j = 0; j < self.length; j++) {
          if (func.call(cx || this, self[i], self[j], i, j) < 0) {
            var temp = self[i]
            self[i] = self[j]
            self[j] = temp
          }
        }
      }

      return self
    }

    // Sorts this list by calling func on each File alone and using that value
    // (hash) to compare itsems between themselves. Like Underscore's sortBy().
    // func = function (File, index) - returns something comparable, e.g. string,
    // number or Date.
    //
    //? sortBy(function (file) { return file.modDate })
    //? sortBy(function () { return Math.random() })
    self.sortBy = function (func, cx) {
      var list = []

      for (var i = 0; i < self.length; i++) {
        list.push([ i, func.call(cx || this, self[i], i) ])
      }

      list.sort(function (a, b) {
        return a[1] > b[1] ? +1 : (a[1] < b[1] ? -1 : 0)
      })

      for (var i = 0; i < list.length; i++) {
        self[i] = list[i][0]
      }

      return self
    }

    // Calls func in context cx for every File in the list and if it returns
    // a non-null value returns the File object on which func was invoked.
    // If this list is empty or if func didn't return anything for any file
    // returns undfined.
    //
    //? find(function (f) { return f.name[0] == 'a' })
    //    // returns first File which local name starts with 'a', if any.
    self.find = function (func, cx) {
      for (var i = 0; i < self.length; i++) {
        var res = func.call(cx || this, self[i], i)
        if (res != null) { return self[i] }
      }
    }

    // The same as find() but ignores returned value of the callback invoking
    // it for every File in the list.
    //
    //? each(function (f) { alert(f.name) })
    self.each = function (func, cx) {
      self.find(function () { func.apply(this, arguments) }, cx)
      return self
    }

    // Calls method on every contained object with given arguments. Returns self.
    //
    //? invoke('fileMethod', 'arg1', 2, 3.33)
    self.invoke = function (method, arg_1) {
      var args = global.toArray(arguments, 1)
      return this.each(function (file) { file[method].apply(file, args) })
    }

    // Aborts all uploads of files contained in this list. Does nothing if
    // upload isn't active. Doesn't abort <iframe> uploads - for this call
    // abortIFrame() on the corresponding DropHandle object.
    //
    //? abort()
    self.abort = function () {
      return this.invoke('abort')
    }

    // Runs through over all items in this list calling func in context cx (or
    // this) and storing returned values. Returns File object for which func
    // generated the largest value (or first such File for multiple same values).
    // Returns undefined if this list is empty.
    //
    //? findCompare(function (f) { return f.size })
    //    // returns largest file.
    self.findCompare = function (func, cx) {
      var file, value = null, res

      self.each(function (f) {
        if (value == null || value < (res = func.call(cx, file))) {
          file = f
        }
      }, cx)

      return file
    }

    // Returns new list that only contains items for which func called in context
    // cx (or this) has returned a truthy value.
    self.filter = function (func, cx) {
      var list = new global.FileList

      self.each(function (f) {
        func.apply(this, arguments) && list.push(f)
      }, cx)

      return list
    }

    // Finds File with biggest size or undefined for empty list.
    self.largest = function () {
      return self.findCompare(function (f) { return f.size })
    }

    // Finds File with smallest size or undefined for empty list.
    self.smallest = function () {
      return self.findCompare(function (f) { return -f.size })
    }

    // Finds File that was changed the longest time before or undefined for empty list.
    self.oldest = function () {
      return self.findCompare(function (f) { return -f.modDate.getTime() })
    }

    // Finds File that was most recently changed or undefined for empty list.
    self.newest = function () {
      return self.findCompare(function (f) { return f.modDate })
    }

    // Returns new list of all files which MIME type matches. MIME shouldn't contain
    // RegExp symbols except for '/'. To match MIME group like 'image/*' don't
    // include trailing '/*' - just 'image'.
    //
    //? ofType('image').first()   //=> File or undefined if none
    self.ofType = function (mime) {
      mime += mime.indexOf('/') == -1 ? '/' : '$'
      mime = new RegExp('^' + mime, 'i')
      return self.filter(function (f) { return mime.test(f.type) })
    }

    // Returns new list with File items with image/* MIME type.
    self.images = function () {
      return self.ofType('image')
    }

    // If name is string returns File with name exactly matching that string
    // If name is RegExp returns new list containing File items which 'name'
    // match given RegExp.
    //
    //? named('myfile.txt')     //=> File or undefined
    //? named(/^start_\..+$/i)  //=> FileList (copy)
    self.named = function (name) {
      if (typeof name == 'string') {
        return self.find(function (f) { return f.name == name })
      } else {
        return self.filter(function (f) { return name.test(f.name) })
      }
    }
  }

  // Making FileList array-like.
  global.FileList.prototype.length = 0
  global.FileList.prototype.splice = Array.prototype.splice

  /***
    Browser-Independent File Class
   ***

    It's passed on FileDrop 'send' event as members fd.FileList and provides
    cross-browser access to file information and ability to upload it to the server.
    Wraps around native browser's File object.
   ***/

  // Parameters:
  // * file - native browser File object that was retrieved from the on-drop
  //          event object. Can be accessed via this.nativeFile property.
  global.File = function (file) {
    // Persistent 'this' instance reference.
    var self = this

    // Native browser's File object as it was given in the on-drop event.
    // Is null for directory entries if on lists produced by listEntries().
    self.nativeFile = file

    // In Chrome 21+ will be set to native Entry (FileEntry, DirectoryEntry, etc.)
    // instance. See W3C spec: http://www.w3.org/TR/file-system-api/#the-entry-interface
    self.nativeEntry = null

    // Local file name.
    self.name = file.fileName || file.name || ''

    // Local file size (bytes).
    self.size = file.fileSize || file.size || 0

    // Local file MIME type.
    self.type = self.mime = file.fileType || file.type || ''

    // Last modification of the local time. Standard Date object.
    self.modDate = file.lastModifiedDate || new Date

    // XMLHttpRequest object that was used to upload the file to the server.
    // Only filled after sendTo() was called.
    self.xhr = null

    /***
      File Options
     ***

      Values here specify default values for sendTo() options - like HTTP
      method used to submit the data. They can be overriden by passing an
      object to sendTo() - e.g. sendTo('upload.php', {method: 'PUT'}).
     ***/

    self.opt = {
      // If enabled this object will add several X-... headers to provide
      // information about the original file to the server (e.g. name and size).
      extraHeaders: true,

      // The value of X-Requested-With header sent with XMLHttpRequest used
      // to upload the dropped file(s). If false then this header is not set
      // (but you can use xhrSetup/xhrSend events to set it). If true - it's
      // set to one of 'FileDrop-XHR-...'. A string sets it to that string -
      // e.g. 'XMLHttpRequest' would simulate regular $.ajax() request.
      xRequestedWith: true,

      // HTTP method used to submit the upload data. Useful for contacting
      // WebDAV services which might accept PUT or DELETE. Given in sendTo()
      // to XMLHttpRequest.open().
      method: 'POST'
    }

    /***
      File Events
     ***

      These are different from FileDrop events and are individual to each File.
      See FileDrop events for more info on how to attach listeners here.
     ***/

    self.events = {
      // Object-wise event preview handlers. See DropHandle's 'any' description.
      any: [],

      // Occurs after an XMLHttpRequest object was prepared to submit the file
      // to the server. All FileDrop-specific headers and other customization
      // (Content-Type, etc.) was already done. You can set extra headers or add
      // event listeners here before it's dispatched to the server.
      //
      // function (XMLHttpRequest, opt)
      //    - is passed the request object and the options object that was
      //      passed to sendTo() with missing fields populated as this.opt.
      xhrSetup: [],

      // Occurs when a file and XMLHttpRequest were prepared for upload and need
      // to be sent. It's handled by fd.File.xhrSend() but you might want to
      // add your logic here.
      //
      // function (XMLHttpRequest, data, opt)
      //    - is passed the request object, options and raw file data that is
      //      browser-specific (it might not be raw binary stream in some
      //      older browsers as it is in Firefox and Chrome-based). opt is the
      //      object passed to sendTo() with missing fields populated as this.opt.
      xhrSend: [],

      // Occurs during file upload with information on current upload progress.
      // This happens on browser-sepcific intervals and usually on somewhat large
      // files only.
      //
      // function (sentBytes, totalBytes, XMLHttpRequest, eventObject)
      //    - is passed two integers (already uploaded bytes and total amount
      //      of data - local file size, of which first or both might be unset
      //      if browser can't provide this info), the request object that is
      //      uploading this file and native browser event object that was
      //      given to the XHR's event handler of fd.File.
      progress: [],

      // Occurs when a file has successfully finished uploading.
      //
      // function (XMLHttpRequest, eventObject)
      //    - is passed the request object that was used to upload the file and
      //      native browser event object that was given to the XHR's event handler
      //      of fd.File.
      done: [],

      // Occurs when a file has failed during upload much like regular XHR error.
      // Note that "failing" means all response code except for 200 - even 2xx like
      // 202 Accepted (WebDAV and such) or 3xx (redirects).
      // This isn't called when upload was aborted - if you specifically need to
      // track this call fd.addEvent(fileObject, 'abort', function ...).
      //
      // function (eventObject, [XMLHttpRequest])
      //    - using passed objects you can determine the type of error as you
      //      would outside of FileDrop - e.g. by XMLHttpRequest.statusText.
      //      If XHR object is not passed this marks an error that has occurred
      //      while reading file from local file system with readAsArrayBuffer().
      error: []
    }

    // Old FireDrop compatibility. Now deprecated.
    self.events.sendXHR = self.events.xhrSend

    /***
      File Methods
     ***/

    // Aborts current upload, if any.
    //
    //? file.abort()
    self.abort = function () {
      self.xhr && self.xhr.abort && self.xhr.abort()
      return self
    }

    // Submits the dropped file to the server script at given URL and with
    // optional options (fields default to this fd.File.opt).
    // Incapsulates browser-specific logic behind reading a local file.
    // If an upload request has been already made on this fd.File instance will
    // abort it (unless it's finished) and start anew.
    //
    //? sendTo('http://my.host/upload.php?var=foo&var2=123')
    //? sendTo('upload.php', {method: 'PUT'})
    self.sendTo = function (url, opt) {
      opt = global.extend(opt, self.opt)
      opt.url = url

      if (!self.size) {
        // Zero size also indicates that it might be a directory.
        global.hasConsole && console.warn('Trying to send an empty FileDrop.File.')
      } else if (window.FileReader) {
        // Using Firefox FileAPI.
        var reader = new FileReader

        reader.onload = function (e) { self.sendDataReadyTo(opt, e) }
        reader.onerror = function (e) { global.callAllOfObject(self, 'error', [e]) }

        reader.readAsArrayBuffer(self.nativeFile)
      } else {
        // Using early Chrome/Safari File API.
        self.sendDataReadyTo(opt)
      }

      return self
    }

    // Internal method that's called when file data was read and is ready for
    // upload. For FileAPI (Firefox) gets called on readAsArrayBuffer() onload
    // event; for Safari/early Chrome it's called immediately and gets passed
    // the native file object itself.
    self.sendDataReadyTo = function (opt, e) {
      self.abort()

      self.xhr = global.newXHR()
      self.hookXHR(self.xhr)

      self.xhr.open(opt.method, opt.url, true)
      // Missing in IE.
      self.xhr.overrideMimeType && self.xhr.overrideMimeType('application/octet-stream')
      self.xhr.setRequestHeader('Content-Type', 'application/octet-stream')

      if (opt.extraHeaders) {
        self.xhr.setRequestHeader('X-File-Name', encodeURIComponent(self.name))
        self.xhr.setRequestHeader('X-File-Size', self.size)
        self.xhr.setRequestHeader('X-File-Type', self.type)
        self.xhr.setRequestHeader('X-File-Date', self.modDate.toGMTString())

        var reqWith = opt.xRequestedWith
        if (reqWith === true) {
          var api = window.FileReader ? 'FileAPI' : 'Webkit'
          reqWith = 'FileDrop-XHR-' + api
        }

        reqWith && self.xhr.setRequestHeader('X-Requested-With', reqWith)
      }

      global.callAllOfObject(self, 'xhrSetup', [self.xhr, opt])

      // Some browsers allow reading raw data, some don't. See if ours allows
      // and if not then it should support just passing the native file object
      // to XMLHttpRequest.send().
      var data = (e && e.target && e.target.result) ? e.target.result : self.nativeFile
      global.callAllOfObject(self, 'xhrSend', [self.xhr, data, opt])
      return self.xhr
    }

    // Attaches internal event listeners to the XMLHttpRequest object that is
    // used to upload the dropped file. Not all browsers trigger upload events
    // on the XHR object itself (hence evtHost).
    self.hookXHR = function (xhr) {
      var evtHost = xhr.upload || xhr

      xhr.onreadystatechange = function (e) {
        if (xhr.readyState == 4) {
          try {
            var event = xhr.status == 200 ? 'done' : 'error'
          } catch (e) {
            var event = 'error'
          }

          var args = event == 'error' ? [e, xhr] : [xhr, e]
          global.callAllOfObject(self, event, args)
        }
      }

      evtHost.onprogress = function (e) {
        var current = e.lengthComputable ? e.loaded : null
        global.callAllOfObject(self, 'progress', [current, e.total || null, xhr, e])
      }
    }

    // Browser-independent way of reading binary data. Doesn't work on all browsers.
    // Asynchronous. If onError is omitted then onDone is called with the usual
    // arguments (errorObject). If onError is false errors are not reported
    // (onDone not called).
    //
    // Third parameter specifies the way to read the file and if omitted or 'bin'
    // reads binary data, if 'url', 'uri' or 'src' reads Data URI (very nice for
    // generating thumbnails), if 'array' reads it as ArrayBuffer, if 'text' reads
    // data as UTF-8 string, if starts with 'read' is assumed to be a method name on
    // native File object which will be called. Any other string value istreated as
    // character encoding (e.g. 'cp1251') and data is read as text in that encoding.
    // If 3rd parameter is an array its first element is treated as File's method
    // name and all other parameters are parameters for that method.
    //
    // Note that readAsBinaryString() is deprecated, missing in IE 10 and simulated
    // by FileDrop using readAsArrayBuffer().
    //
    // errorObject will fdError string property describing the type of the problem:
    // 1. 'read'      - browser has failed to read file data.
    // 2. 'support'   - browser doesn't support File API.
    //
    // onDone   = function (string|array)
    // onError  = function (errorObject)
    //
    //?
    //  readData(function (uri) { byID('myImg').src = uri },
    //           function (e) { alert('Terrible error!') },
    //           'uri')
    //      // reads dropped image into a thumbnail (Data URI).
    //
    //? readData(function (bytes) { alert(bytes) }, false)
    //      // shows message with raw read byte string.
    //
    //? readData(function (bytes) { alert(bytes) }, false, 'bin')
    //      // identical to above.
    //
    //? readData(function (bytes) { alert(bytes) }, false, 'readAsBinaryString')
    //      // identical to above.
    //
    //? readData(function (bytes) { alert(bytes) }, false, ['readAsBinaryString'])
    //      // identical to above but won't automatically fall back to
    //      // readAsArrayBuffer() failing in IE and early Chrome.
    //
    //? readData(function (bytes) { alert(Array.prototype.slice.call(bytes)) }, false, 'array')
    //      // shows message with comma-separated list of byte values.
    //
    //? readData(function (str) { alert(str) }, false, 'cp1251')
    //      // shows message with file read as a string in CP-1251 charset.
    //
    //? readData(function (str) { alert(str), false, ['readAsText', 'cp1251'])
    //      // identical to above.
    //
    //? readData(function (str) { alert(str), false, 'text')
    //      // similar to above but treats string as UTF-8 encoded (default charset).
    //
    //? readData(function (str) { alert(str), false, 'utf-8')
    //      // identical to above.
    //
    //? readData(function (str) { alert(str), false, 'readAsText')
    //      // identical to above.
    self.readData = function (onDone, onError, func) {
      return self.read({onDone: onDone, onError: onError, func: func})
    }

    // Alias to readData() that reads Data URI suitable for <img src> attribute.
    // Unlike readData() if onError isn't passed explicitly it's set to false
    // (errors suppressed, onDone not called instead).
    //
    //?
    //  readDataURI(function (uri) {
    //    var img = new Image
    //    img.src = uri
    //    document.body.appendChild(img)
    //  })
    self.readDataURL = function (onDone, onError) {
      return self.readData(onDone, onError || false, 'uri')
    }

    // Alias to readDataURL().
    self.readDataURI = self.readDataURL;

    // Advanced reading function that can be used to read Blobs and make
    // slices of this file rather than load the entire data into memory.
    // Accepts various options, see the code for information.
    //
    //? read({onDone: function (str) { alert(str) }, func: 'text', start: 0, end: 5})
    //    // reads first 4 bytes of the file, treats them as UTF-8 and shows them.
    self.read = function (opt) {
      function error(reason, e) {
        typeof e == 'object' || (e.message = e)
        e.fdError = reason

        if (opt.onError !== false) {
          (opt.onError || opt.onDone).apply(this, arguments)
        }
      }

      global.extend(opt, {
        // function (data) - gets passed data according to selected func (below).
        onDone: new Function,

        // function (e), false (errors are not reported), null (calls onDone).
        onError: null,

        // Target File or Blob object to read data from.
        blob: self.nativeFile,

        // Reading method alias (e.g. 'uri'), name (e.g. 'readAsText') or
        // array like ['readAsText', 'arg-1', ...].
        func: '',

        // New Blob slice options. Negative becomes 0.
        start: 0,

        // null = this.size. Note that according to W3C byte with this offset
        // is not included in result (so last byte read is end - 1).
        // If negative offset is counted from the end (-1 skips last 2 bytes).
        end: null,

        // contentType assigned to new Blob (empty leaves default).
        mime: ''
      })

      if (!window.FileReader) {
        return error('support', e)
      }

      if (opt.start > 0 || opt.end != null && opt.end) {
        if (opt.blob.slice) {
          opt.end == null && (opt.end = opt.blob.size || opt.blob.fileSize)
          opt.blob = opt.blob.slice(opt.start, opt.end, opt.mime)
        } else if (global.hasConsole) {
          console.warn('File Blob/slice() are unsupported - operating on entire File.')
        }
      }

      var reader = new FileReader
      reader.onerror = function (e) { error('read', e) }

      reader.onload = function (e) {
        if (e.target && e.target.result) {
          if (opt.func == 'readAsBinaryString') {
            // Function actually used was readAsArrayBuffer() - see the note below.
            e.target.result = String.fromCharCode.apply(null, new Uint8Array(e.target.result))
          }

          opt.onDone(e.target.result)
        } else {
          reader.onerror(e)
        }
      }

      var func = opt.func

      if (global.isArray(func)) {
        var name = func[0]
        func[0] = opt.blob
        return reader[name].apply(reader, func)
      } else {
        if (!func || func == 'bin') {
          func = 'readAsBinaryString'
        } else if (func == 'url' || func == 'uri' || func == 'src') {
          func = 'readAsDataURL'
        } else if (func == 'array') {
          func = 'readAsArrayBuffer'
        } else if (func == 'text') {
          func = 'readAsText'   // reads as UTF-8 by default.
        } else if (func.substr(0, 4) != 'read') {
          return reader.readAsText(opt.blob, func)
        }

        // readAsBinaryString() has been deprecated since mid-2012 in favour
        // of readAsArrayBuffer(). Additionally, IE 10 only supports the latter.
        // Result that's been read will be converted to string in onload.
        func == 'readAsBinaryString' && (func = 'readAsArrayBuffer')

        return reader[func](opt.blob)
      }
    }

    // Uses W3C draft File System API to traverse this DirectoryEntry.
    // Currently supported in Chrome 21+. Spec: http://www.w3.org/TR/file-system-api/
    // Thanks to @kevinkrouse for pointing me to this wonderful interface.
    // This function is not recursive.
    //
    // onDone is a function callback that receives FileDrop.FileList object.
    // Each entry there can be either a file or a directory. Files have nativeFile
    // set (but not in case of error - if so use nativeEntry's isDirectory and
    // isFile props to determine which one is which). On these, correct files you
    // can use any of FileDrop methods - sendTo(), readFile(), etc. On directories
    // (but not failed files) you can use listEntries() to traverse them further.
    //
    // onError is an optional function called by the browser when it runs into errors.
    // It gets passed error object. Note that it might be called multiple times
    // and that onDone can be still called (this might happen if FileEntry can't
    // read particular File object when using file()).
    //
    //? listEntries(function (files) { files.images().invoke('sendTo', 'upload.php') })
    //      // sends all images in the dropped directory to upload.php; errors are
    //      // ignored but if one has occurred while retrieving File API object this
    //      // call with fail with a JavaScript error - this is fixed by removing
    //      // all entries with null nativeFile before doing sendTo().
    //
    //? listEntries(function (files) { files.each(...) },
    //              function (e) { alert('File System API error ' + e.code) })
    self.listEntries = function (onDone, onError) {
      if (self.nativeEntry && self.nativeEntry.isDirectory) {
        onError = onError || new Function
        var reader = self.nativeEntry.createReader()
        var files = new global.FileList
        var enqueued = 0

        function dequeue(count) {
          enqueued -= count
          if (enqueued == 0 && onDone) {
            onDone(files)
            onDone = null
          }
        }

        reader.readEntries(function (list) {
          for (var i = 0; i < list.length; i++) {
            var nativeEntry = list[i]

            if (nativeEntry.file) {
              // This entry is a file (FileEntry).
              enqueued++
              nativeEntry.file(
                function (nativeFile) {
                  var file = new global.File(nativeFile)
                  file.setNativeEntry(nativeEntry)
                  files.push(file)
                  dequeue(1)
                },
                function () {
                  // Error getting a File object. Let's still insert it
                  // into the resulting list but without nativeFile (which
                  // makes sendTo(), readData(), etc. unavailable).
                  files.push( global.File.fromEntry(nativeEntry) )
                  dequeue(1)
                  onError.apply(this, arguments)
                }
              )
            } else {
              // This is a DirectoryEntry. It has no File object (that comes
              // from File API spec: http://dev.w3.org/2006/webapi/FileAPI/).
              // Don't try calling sendTo(), readFile() and the likes on the
              // FileDrop.File items returned in the FileList passed to onDone.
              files.push( global.File.fromEntry(nativeEntry) )
            }
          }

          i ? reader.readEntries(arguments.callee, onError) : dequeue(0)
        }, onError)

        return true
      }
    }

    // Internal method to assign data from a native Entry object.
    self.setNativeEntry = function (item) {
      self.nativeEntry = item && item.webkitGetAsEntry && item.webkitGetAsEntry()
    }

    // Adds event listeners to this object. See DropHandle.event() for
    // extended comment and examples.
    self.event = function (events, funcs) {
      return global.appendEventsToObject.apply(self, arguments)
    }

    // Adds event listeners to this object in front of existing handlers.
    // Can be used to intercept/override certain events. See DropHandle.event()
    // for extended comment and examples.
    self.preview = function (events, funcs) {
      return global.previewToObject.apply(self, arguments)
    }

    /***
      Standard File Event Callbacks
     ***/

    // Takes care of reading binary stream from file and sending it
    // to the remote server using prepared XMLHttpRequest.
    // data is either an ArrayBuffer (Gecko/Chrome) or a native file object
    // (Safari). Either way, send() handles both. This used to deal with
    // sendAsBinary() but it's specific to Firefox 3.6 and is removed now.
    self.onXhrSend = function (xhr, data) {
      xhr.send(data)
    }

    self.event({
      xhrSend:        self.onXhrSend
    })
  }

  // Static method of File that creates an object without attaching to any
  // File API's File object. It's only useful if you have an Entry object
  // that lets you get at least some of the info (e.g. file name) and list
  // contents for DirectoryEntry. See listEntries(). Using sendTo(), readData()
  // and others on such an instance will result in errors.
  //
  //? fromEntry( e.dataTransfer.items[0].webkitGetAsEntry() )
  //      //=> FileDrop.File
  global.File.fromEntry = function (nativeEntry) {
    var file = new global.File(nativeEntry)
    file.setNativeEntry(nativeEntry)
    file.nativeFile = null
    return file
  }

  /***
    FileDrop jQuery Interface
   ***

    After both FileDrop and jQuery (v1 or v2) scripts have loaded call fd.jQuery().
    Don't forget to include/write your FileDrop's CSS as well.

    Once done it becomes possible to access FileDrop as $('#zone').filedrop()
    and avoid accessing its methods and bind event altogether. FileDrop will
    trigger events as if they originated from the DOM node itself and prefix
    each event with either 'fd' (DropHandle/FileDrop classes) or 'file'
    (File class). Arguments remain the same except that:
    * jQuery always passes event object as the first argument so just skip it.
    * File events ('file' prefix) get passed File object as second argument
      (after jQuery event).

    Note that 'this' points to jQuery collection and no more to the FileDrop
    or File instance that has initiated the event.

      $('<div><p>Drop something here...</p></div>')
        .appendTo(document.body)
        .filedrop()
        .on('fdsend', function (e, files) {
          // Occurs when FileDrop's 'send' event is initiated.
          $.each(files, function (i, file) {
            file.sendTo('upload.php')
          })
        })
        .on('filedone', function (e, file) {
          // Occurs when a File object has done uploading.
          alert('Done uploading ' + file.name + ' on ' + this.tagName)
        })

    When constructing FileDrpo instance by jQuery in addition to regular 'el'
    property '$el' is set to point to $(el) - zone DOM node as jQuery collection.

    Also, it's still possible to attach listeners to FileDrop object with
    fd.event('event', func) but these events are called after corresponding
    DOM events (added with jQuery). If a DOM event handler returns a non-null
    and non-undefined value - FileDrop's handlers won't be called.

    Event preview handlers ('any' event) can only be attached directly to FileDrop:

      $('#zone')
        .fildrop()
        .filedrop().event('any', function () { ... })

    You can access underlying FileDrop object by calling filedrop() without
    parameters (first such call creates FileDrop, later calls return the
    instance on the first element in the collection):

      $('#zone')            // select <p id="zone">
        .filedrop()         // turn it into a FileDrop zone
        .css({color: red})  // any normal jQuery code
        .filedrop()         // retrieve FileDrop object
        .multiple(true)     // call its method

    Alternatively you can pass a string to filedrop() to select a property
    or call a method - in this case their value/result is returned

      $('#zone')
        .filedrop()
        .filedrop('multiple', true)
          // returns the new state of 'multiple' option, not jQuery object.

    It's also possible to pass custom options to FileDrop constructor:

      $('#zone')
        .filedrop({
          multiple: true,
          iframe: {url: '/upload.php'}
        })
   ***/

  global.jQuery = function ($) {
    $ = $ || jQuery || window.jQuery
    if (!$) { throw 'No window.jQuery object to integrate FileDrop into.' }

    $.fn.filedrop = function (options) {
      function delegate(prefix, firstArgs) {
        return function (event) {
          var args = (firstArgs || []).concat(global.toArray(arguments, 1))
          return $node.triggerHandler((prefix + event).toLowerCase(), args)
        }
      }

      var $node = this
      var host = this.data('filedrop')

      if (typeof options == 'string') {
        if (!host) {
          $.error("$.filedrop('comment') needs an initialized FilrDrop on this element.")
        } else if (typeof host[options] == 'undefined') {
          $.error("There's no method or property FileDrop." + options + ".")
        } else {
          var value = host[options]
          if (typeof value == 'function') {
            return value.apply(host, global.toArray(arguments, 1))
          } else {
            return value
          }
        }
      } else if (!options || typeof options == 'object') {
        if (!host) {
          var zone = new FileDrop(this[0], options)
          zone.$el = $(this)
          this.first().data('filedrop', zone)

          zone.event('any', delegate('fd'))

          zone.on.fileSetup.push(function (file) {
            file.event('any', delegate('file', [file]))
          })
        } else if (!options) {
          return host
        } else {
          global.extend(host.opt, options, true)
        }
      } else {
        $.error('Invalid $.filedrop() parameter - expected nothing (creates new zone),' +
                ' a string (property to access) or an object (custom zone options).')
      }

      return $node
    }
  }

  // Alias window.fd.FileDrop class to just window.FileDrop since it's most used.
  exports.FileDrop = global.FileDrop
})(window.fd, window)

// Prevent concatenation with other scripts from triggering a function call from braces.
;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Fuse.js v3.3.0 - Lightweight fuzzy-search (http://fusejs.io)
 * 
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Fuse", [], factory);
	else if(typeof exports === 'object')
		exports["Fuse"] = factory();
	else
		root["Fuse"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (obj) {
  return !Array.isArray ? Object.prototype.toString.call(obj) === '[object Array]' : Array.isArray(obj);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bitapRegexSearch = __webpack_require__(5);
var bitapSearch = __webpack_require__(7);
var patternAlphabet = __webpack_require__(4);

var Bitap = function () {
  function Bitap(pattern, _ref) {
    var _ref$location = _ref.location,
        location = _ref$location === undefined ? 0 : _ref$location,
        _ref$distance = _ref.distance,
        distance = _ref$distance === undefined ? 100 : _ref$distance,
        _ref$threshold = _ref.threshold,
        threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
        _ref$maxPatternLength = _ref.maxPatternLength,
        maxPatternLength = _ref$maxPatternLength === undefined ? 32 : _ref$maxPatternLength,
        _ref$isCaseSensitive = _ref.isCaseSensitive,
        isCaseSensitive = _ref$isCaseSensitive === undefined ? false : _ref$isCaseSensitive,
        _ref$tokenSeparator = _ref.tokenSeparator,
        tokenSeparator = _ref$tokenSeparator === undefined ? / +/g : _ref$tokenSeparator,
        _ref$findAllMatches = _ref.findAllMatches,
        findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
        _ref$minMatchCharLeng = _ref.minMatchCharLength,
        minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng;

    _classCallCheck(this, Bitap);

    this.options = {
      location: location,
      distance: distance,
      threshold: threshold,
      maxPatternLength: maxPatternLength,
      isCaseSensitive: isCaseSensitive,
      tokenSeparator: tokenSeparator,
      findAllMatches: findAllMatches,
      minMatchCharLength: minMatchCharLength
    };

    this.pattern = this.options.isCaseSensitive ? pattern : pattern.toLowerCase();

    if (this.pattern.length <= maxPatternLength) {
      this.patternAlphabet = patternAlphabet(this.pattern);
    }
  }

  _createClass(Bitap, [{
    key: 'search',
    value: function search(text) {
      if (!this.options.isCaseSensitive) {
        text = text.toLowerCase();
      }

      // Exact match
      if (this.pattern === text) {
        return {
          isMatch: true,
          score: 0,
          matchedIndices: [[0, text.length - 1]]
        };
      }

      // When pattern length is greater than the machine word length, just do a a regex comparison
      var _options = this.options,
          maxPatternLength = _options.maxPatternLength,
          tokenSeparator = _options.tokenSeparator;

      if (this.pattern.length > maxPatternLength) {
        return bitapRegexSearch(text, this.pattern, tokenSeparator);
      }

      // Otherwise, use Bitap algorithm
      var _options2 = this.options,
          location = _options2.location,
          distance = _options2.distance,
          threshold = _options2.threshold,
          findAllMatches = _options2.findAllMatches,
          minMatchCharLength = _options2.minMatchCharLength;

      return bitapSearch(text, this.pattern, this.patternAlphabet, {
        location: location,
        distance: distance,
        threshold: threshold,
        findAllMatches: findAllMatches,
        minMatchCharLength: minMatchCharLength
      });
    }
  }]);

  return Bitap;
}();

// let x = new Bitap("od mn war", {})
// let result = x.search("Old Man's War")
// console.log(result)

module.exports = Bitap;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(0);

var deepValue = function deepValue(obj, path, list) {
  if (!path) {
    // If there's no path left, we've gotten to the object we care about.
    list.push(obj);
  } else {
    var dotIndex = path.indexOf('.');
    var firstSegment = path;
    var remaining = null;

    if (dotIndex !== -1) {
      firstSegment = path.slice(0, dotIndex);
      remaining = path.slice(dotIndex + 1);
    }

    var value = obj[firstSegment];

    if (value !== null && value !== undefined) {
      if (!remaining && (typeof value === 'string' || typeof value === 'number')) {
        list.push(value.toString());
      } else if (isArray(value)) {
        // Search each item in the array.
        for (var i = 0, len = value.length; i < len; i += 1) {
          deepValue(value[i], remaining, list);
        }
      } else if (remaining) {
        // An object. Recurse further.
        deepValue(value, remaining, list);
      }
    }
  }

  return list;
};

module.exports = function (obj, path) {
  return deepValue(obj, path, []);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  var matchmask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var minMatchCharLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var matchedIndices = [];
  var start = -1;
  var end = -1;
  var i = 0;

  for (var len = matchmask.length; i < len; i += 1) {
    var match = matchmask[i];
    if (match && start === -1) {
      start = i;
    } else if (!match && start !== -1) {
      end = i - 1;
      if (end - start + 1 >= minMatchCharLength) {
        matchedIndices.push([start, end]);
      }
      start = -1;
    }
  }

  // (i-1 - start) + 1 => i - start
  if (matchmask[i - 1] && i - start >= minMatchCharLength) {
    matchedIndices.push([start, i - 1]);
  }

  return matchedIndices;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (pattern) {
  var mask = {};
  var len = pattern.length;

  for (var i = 0; i < len; i += 1) {
    mask[pattern.charAt(i)] = 0;
  }

  for (var _i = 0; _i < len; _i += 1) {
    mask[pattern.charAt(_i)] |= 1 << len - _i - 1;
  }

  return mask;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SPECIAL_CHARS_REGEX = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

module.exports = function (text, pattern) {
  var tokenSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : / +/g;

  var regex = new RegExp(pattern.replace(SPECIAL_CHARS_REGEX, '\\$&').replace(tokenSeparator, '|'));
  var matches = text.match(regex);
  var isMatch = !!matches;
  var matchedIndices = [];

  if (isMatch) {
    for (var i = 0, matchesLen = matches.length; i < matchesLen; i += 1) {
      var match = matches[i];
      matchedIndices.push([text.indexOf(match), match.length - 1]);
    }
  }

  return {
    // TODO: revisit this score
    score: isMatch ? 0.5 : 1,
    isMatch: isMatch,
    matchedIndices: matchedIndices
  };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (pattern, _ref) {
  var _ref$errors = _ref.errors,
      errors = _ref$errors === undefined ? 0 : _ref$errors,
      _ref$currentLocation = _ref.currentLocation,
      currentLocation = _ref$currentLocation === undefined ? 0 : _ref$currentLocation,
      _ref$expectedLocation = _ref.expectedLocation,
      expectedLocation = _ref$expectedLocation === undefined ? 0 : _ref$expectedLocation,
      _ref$distance = _ref.distance,
      distance = _ref$distance === undefined ? 100 : _ref$distance;

  var accuracy = errors / pattern.length;
  var proximity = Math.abs(expectedLocation - currentLocation);

  if (!distance) {
    // Dodge divide by zero error.
    return proximity ? 1.0 : accuracy;
  }

  return accuracy + proximity / distance;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bitapScore = __webpack_require__(6);
var matchedIndices = __webpack_require__(3);

module.exports = function (text, pattern, patternAlphabet, _ref) {
  var _ref$location = _ref.location,
      location = _ref$location === undefined ? 0 : _ref$location,
      _ref$distance = _ref.distance,
      distance = _ref$distance === undefined ? 100 : _ref$distance,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
      _ref$findAllMatches = _ref.findAllMatches,
      findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
      _ref$minMatchCharLeng = _ref.minMatchCharLength,
      minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng;

  var expectedLocation = location;
  // Set starting location at beginning text and initialize the alphabet.
  var textLen = text.length;
  // Highest score beyond which we give up.
  var currentThreshold = threshold;
  // Is there a nearby exact match? (speedup)
  var bestLocation = text.indexOf(pattern, expectedLocation);

  var patternLen = pattern.length;

  // a mask of the matches
  var matchMask = [];
  for (var i = 0; i < textLen; i += 1) {
    matchMask[i] = 0;
  }

  if (bestLocation !== -1) {
    var score = bitapScore(pattern, {
      errors: 0,
      currentLocation: bestLocation,
      expectedLocation: expectedLocation,
      distance: distance
    });
    currentThreshold = Math.min(score, currentThreshold);

    // What about in the other direction? (speed up)
    bestLocation = text.lastIndexOf(pattern, expectedLocation + patternLen);

    if (bestLocation !== -1) {
      var _score = bitapScore(pattern, {
        errors: 0,
        currentLocation: bestLocation,
        expectedLocation: expectedLocation,
        distance: distance
      });
      currentThreshold = Math.min(_score, currentThreshold);
    }
  }

  // Reset the best location
  bestLocation = -1;

  var lastBitArr = [];
  var finalScore = 1;
  var binMax = patternLen + textLen;

  var mask = 1 << patternLen - 1;

  for (var _i = 0; _i < patternLen; _i += 1) {
    // Scan for the best match; each iteration allows for one more error.
    // Run a binary search to determine how far from the match location we can stray
    // at this error level.
    var binMin = 0;
    var binMid = binMax;

    while (binMin < binMid) {
      var _score3 = bitapScore(pattern, {
        errors: _i,
        currentLocation: expectedLocation + binMid,
        expectedLocation: expectedLocation,
        distance: distance
      });

      if (_score3 <= currentThreshold) {
        binMin = binMid;
      } else {
        binMax = binMid;
      }

      binMid = Math.floor((binMax - binMin) / 2 + binMin);
    }

    // Use the result from this iteration as the maximum for the next.
    binMax = binMid;

    var start = Math.max(1, expectedLocation - binMid + 1);
    var finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;

    // Initialize the bit array
    var bitArr = Array(finish + 2);

    bitArr[finish + 1] = (1 << _i) - 1;

    for (var j = finish; j >= start; j -= 1) {
      var currentLocation = j - 1;
      var charMatch = patternAlphabet[text.charAt(currentLocation)];

      if (charMatch) {
        matchMask[currentLocation] = 1;
      }

      // First pass: exact match
      bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;

      // Subsequent passes: fuzzy match
      if (_i !== 0) {
        bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
      }

      if (bitArr[j] & mask) {
        finalScore = bitapScore(pattern, {
          errors: _i,
          currentLocation: currentLocation,
          expectedLocation: expectedLocation,
          distance: distance
        });

        // This match will almost certainly be better than any existing match.
        // But check anyway.
        if (finalScore <= currentThreshold) {
          // Indeed it is
          currentThreshold = finalScore;
          bestLocation = currentLocation;

          // Already passed `loc`, downhill from here on in.
          if (bestLocation <= expectedLocation) {
            break;
          }

          // When passing `bestLocation`, don't exceed our current distance from `expectedLocation`.
          start = Math.max(1, 2 * expectedLocation - bestLocation);
        }
      }
    }

    // No hope for a (better) match at greater error levels.
    var _score2 = bitapScore(pattern, {
      errors: _i + 1,
      currentLocation: expectedLocation,
      expectedLocation: expectedLocation,
      distance: distance
    });

    // console.log('score', score, finalScore)

    if (_score2 > currentThreshold) {
      break;
    }

    lastBitArr = bitArr;
  }

  // console.log('FINAL SCORE', finalScore)

  // Count exact matches (those with a score of 0) to be "almost" exact
  return {
    isMatch: bestLocation >= 0,
    score: finalScore === 0 ? 0.001 : finalScore,
    matchedIndices: matchedIndices(matchMask, minMatchCharLength)
  };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bitap = __webpack_require__(1);
var deepValue = __webpack_require__(2);
var isArray = __webpack_require__(0);

var Fuse = function () {
  function Fuse(list, _ref) {
    var _ref$location = _ref.location,
        location = _ref$location === undefined ? 0 : _ref$location,
        _ref$distance = _ref.distance,
        distance = _ref$distance === undefined ? 100 : _ref$distance,
        _ref$threshold = _ref.threshold,
        threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
        _ref$maxPatternLength = _ref.maxPatternLength,
        maxPatternLength = _ref$maxPatternLength === undefined ? 32 : _ref$maxPatternLength,
        _ref$caseSensitive = _ref.caseSensitive,
        caseSensitive = _ref$caseSensitive === undefined ? false : _ref$caseSensitive,
        _ref$tokenSeparator = _ref.tokenSeparator,
        tokenSeparator = _ref$tokenSeparator === undefined ? / +/g : _ref$tokenSeparator,
        _ref$findAllMatches = _ref.findAllMatches,
        findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
        _ref$minMatchCharLeng = _ref.minMatchCharLength,
        minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng,
        _ref$id = _ref.id,
        id = _ref$id === undefined ? null : _ref$id,
        _ref$keys = _ref.keys,
        keys = _ref$keys === undefined ? [] : _ref$keys,
        _ref$shouldSort = _ref.shouldSort,
        shouldSort = _ref$shouldSort === undefined ? true : _ref$shouldSort,
        _ref$getFn = _ref.getFn,
        getFn = _ref$getFn === undefined ? deepValue : _ref$getFn,
        _ref$sortFn = _ref.sortFn,
        sortFn = _ref$sortFn === undefined ? function (a, b) {
      return a.score - b.score;
    } : _ref$sortFn,
        _ref$tokenize = _ref.tokenize,
        tokenize = _ref$tokenize === undefined ? false : _ref$tokenize,
        _ref$matchAllTokens = _ref.matchAllTokens,
        matchAllTokens = _ref$matchAllTokens === undefined ? false : _ref$matchAllTokens,
        _ref$includeMatches = _ref.includeMatches,
        includeMatches = _ref$includeMatches === undefined ? false : _ref$includeMatches,
        _ref$includeScore = _ref.includeScore,
        includeScore = _ref$includeScore === undefined ? false : _ref$includeScore,
        _ref$verbose = _ref.verbose,
        verbose = _ref$verbose === undefined ? false : _ref$verbose;

    _classCallCheck(this, Fuse);

    this.options = {
      location: location,
      distance: distance,
      threshold: threshold,
      maxPatternLength: maxPatternLength,
      isCaseSensitive: caseSensitive,
      tokenSeparator: tokenSeparator,
      findAllMatches: findAllMatches,
      minMatchCharLength: minMatchCharLength,
      id: id,
      keys: keys,
      includeMatches: includeMatches,
      includeScore: includeScore,
      shouldSort: shouldSort,
      getFn: getFn,
      sortFn: sortFn,
      verbose: verbose,
      tokenize: tokenize,
      matchAllTokens: matchAllTokens
    };

    this.setCollection(list);
  }

  _createClass(Fuse, [{
    key: 'setCollection',
    value: function setCollection(list) {
      this.list = list;
      return list;
    }
  }, {
    key: 'search',
    value: function search(pattern) {
      this._log('---------\nSearch pattern: "' + pattern + '"');

      var _prepareSearchers2 = this._prepareSearchers(pattern),
          tokenSearchers = _prepareSearchers2.tokenSearchers,
          fullSearcher = _prepareSearchers2.fullSearcher;

      var _search2 = this._search(tokenSearchers, fullSearcher),
          weights = _search2.weights,
          results = _search2.results;

      this._computeScore(weights, results);

      if (this.options.shouldSort) {
        this._sort(results);
      }

      return this._format(results);
    }
  }, {
    key: '_prepareSearchers',
    value: function _prepareSearchers() {
      var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var tokenSearchers = [];

      if (this.options.tokenize) {
        // Tokenize on the separator
        var tokens = pattern.split(this.options.tokenSeparator);
        for (var i = 0, len = tokens.length; i < len; i += 1) {
          tokenSearchers.push(new Bitap(tokens[i], this.options));
        }
      }

      var fullSearcher = new Bitap(pattern, this.options);

      return { tokenSearchers: tokenSearchers, fullSearcher: fullSearcher };
    }
  }, {
    key: '_search',
    value: function _search() {
      var tokenSearchers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var fullSearcher = arguments[1];

      var list = this.list;
      var resultMap = {};
      var results = [];

      // Check the first item in the list, if it's a string, then we assume
      // that every item in the list is also a string, and thus it's a flattened array.
      if (typeof list[0] === 'string') {
        // Iterate over every item
        for (var i = 0, len = list.length; i < len; i += 1) {
          this._analyze({
            key: '',
            value: list[i],
            record: i,
            index: i
          }, {
            resultMap: resultMap,
            results: results,
            tokenSearchers: tokenSearchers,
            fullSearcher: fullSearcher
          });
        }

        return { weights: null, results: results };
      }

      // Otherwise, the first item is an Object (hopefully), and thus the searching
      // is done on the values of the keys of each item.
      var weights = {};
      for (var _i = 0, _len = list.length; _i < _len; _i += 1) {
        var item = list[_i];
        // Iterate over every key
        for (var j = 0, keysLen = this.options.keys.length; j < keysLen; j += 1) {
          var key = this.options.keys[j];
          if (typeof key !== 'string') {
            weights[key.name] = {
              weight: 1 - key.weight || 1
            };
            if (key.weight <= 0 || key.weight > 1) {
              throw new Error('Key weight has to be > 0 and <= 1');
            }
            key = key.name;
          } else {
            weights[key] = {
              weight: 1
            };
          }

          this._analyze({
            key: key,
            value: this.options.getFn(item, key),
            record: item,
            index: _i
          }, {
            resultMap: resultMap,
            results: results,
            tokenSearchers: tokenSearchers,
            fullSearcher: fullSearcher
          });
        }
      }

      return { weights: weights, results: results };
    }
  }, {
    key: '_analyze',
    value: function _analyze(_ref2, _ref3) {
      var key = _ref2.key,
          _ref2$arrayIndex = _ref2.arrayIndex,
          arrayIndex = _ref2$arrayIndex === undefined ? -1 : _ref2$arrayIndex,
          value = _ref2.value,
          record = _ref2.record,
          index = _ref2.index;
      var _ref3$tokenSearchers = _ref3.tokenSearchers,
          tokenSearchers = _ref3$tokenSearchers === undefined ? [] : _ref3$tokenSearchers,
          _ref3$fullSearcher = _ref3.fullSearcher,
          fullSearcher = _ref3$fullSearcher === undefined ? [] : _ref3$fullSearcher,
          _ref3$resultMap = _ref3.resultMap,
          resultMap = _ref3$resultMap === undefined ? {} : _ref3$resultMap,
          _ref3$results = _ref3.results,
          results = _ref3$results === undefined ? [] : _ref3$results;

      // Check if the texvaluet can be searched
      if (value === undefined || value === null) {
        return;
      }

      var exists = false;
      var averageScore = -1;
      var numTextMatches = 0;

      if (typeof value === 'string') {
        this._log('\nKey: ' + (key === '' ? '-' : key));

        var mainSearchResult = fullSearcher.search(value);
        this._log('Full text: "' + value + '", score: ' + mainSearchResult.score);

        if (this.options.tokenize) {
          var words = value.split(this.options.tokenSeparator);
          var scores = [];

          for (var i = 0; i < tokenSearchers.length; i += 1) {
            var tokenSearcher = tokenSearchers[i];

            this._log('\nPattern: "' + tokenSearcher.pattern + '"');

            // let tokenScores = []
            var hasMatchInText = false;

            for (var j = 0; j < words.length; j += 1) {
              var word = words[j];
              var tokenSearchResult = tokenSearcher.search(word);
              var obj = {};
              if (tokenSearchResult.isMatch) {
                obj[word] = tokenSearchResult.score;
                exists = true;
                hasMatchInText = true;
                scores.push(tokenSearchResult.score);
              } else {
                obj[word] = 1;
                if (!this.options.matchAllTokens) {
                  scores.push(1);
                }
              }
              this._log('Token: "' + word + '", score: ' + obj[word]);
              // tokenScores.push(obj)
            }

            if (hasMatchInText) {
              numTextMatches += 1;
            }
          }

          averageScore = scores[0];
          var scoresLen = scores.length;
          for (var _i2 = 1; _i2 < scoresLen; _i2 += 1) {
            averageScore += scores[_i2];
          }
          averageScore = averageScore / scoresLen;

          this._log('Token score average:', averageScore);
        }

        var finalScore = mainSearchResult.score;
        if (averageScore > -1) {
          finalScore = (finalScore + averageScore) / 2;
        }

        this._log('Score average:', finalScore);

        var checkTextMatches = this.options.tokenize && this.options.matchAllTokens ? numTextMatches >= tokenSearchers.length : true;

        this._log('\nCheck Matches: ' + checkTextMatches);

        // If a match is found, add the item to <rawResults>, including its score
        if ((exists || mainSearchResult.isMatch) && checkTextMatches) {
          // Check if the item already exists in our results
          var existingResult = resultMap[index];
          if (existingResult) {
            // Use the lowest score
            // existingResult.score, bitapResult.score
            existingResult.output.push({
              key: key,
              arrayIndex: arrayIndex,
              value: value,
              score: finalScore,
              matchedIndices: mainSearchResult.matchedIndices
            });
          } else {
            // Add it to the raw result list
            resultMap[index] = {
              item: record,
              output: [{
                key: key,
                arrayIndex: arrayIndex,
                value: value,
                score: finalScore,
                matchedIndices: mainSearchResult.matchedIndices
              }]
            };

            results.push(resultMap[index]);
          }
        }
      } else if (isArray(value)) {
        for (var _i3 = 0, len = value.length; _i3 < len; _i3 += 1) {
          this._analyze({
            key: key,
            arrayIndex: _i3,
            value: value[_i3],
            record: record,
            index: index
          }, {
            resultMap: resultMap,
            results: results,
            tokenSearchers: tokenSearchers,
            fullSearcher: fullSearcher
          });
        }
      }
    }
  }, {
    key: '_computeScore',
    value: function _computeScore(weights, results) {
      this._log('\n\nComputing score:\n');

      for (var i = 0, len = results.length; i < len; i += 1) {
        var output = results[i].output;
        var scoreLen = output.length;

        var currScore = 1;
        var bestScore = 1;

        for (var j = 0; j < scoreLen; j += 1) {
          var weight = weights ? weights[output[j].key].weight : 1;
          var score = weight === 1 ? output[j].score : output[j].score || 0.001;
          var nScore = score * weight;

          if (weight !== 1) {
            bestScore = Math.min(bestScore, nScore);
          } else {
            output[j].nScore = nScore;
            currScore *= nScore;
          }
        }

        results[i].score = bestScore === 1 ? currScore : bestScore;

        this._log(results[i]);
      }
    }
  }, {
    key: '_sort',
    value: function _sort(results) {
      this._log('\n\nSorting....');
      results.sort(this.options.sortFn);
    }
  }, {
    key: '_format',
    value: function _format(results) {
      var finalOutput = [];

      if (this.options.verbose) {
        this._log('\n\nOutput:\n\n', JSON.stringify(results));
      }

      var transformers = [];

      if (this.options.includeMatches) {
        transformers.push(function (result, data) {
          var output = result.output;
          data.matches = [];

          for (var i = 0, len = output.length; i < len; i += 1) {
            var item = output[i];

            if (item.matchedIndices.length === 0) {
              continue;
            }

            var obj = {
              indices: item.matchedIndices,
              value: item.value
            };
            if (item.key) {
              obj.key = item.key;
            }
            if (item.hasOwnProperty('arrayIndex') && item.arrayIndex > -1) {
              obj.arrayIndex = item.arrayIndex;
            }
            data.matches.push(obj);
          }
        });
      }

      if (this.options.includeScore) {
        transformers.push(function (result, data) {
          data.score = result.score;
        });
      }

      for (var i = 0, len = results.length; i < len; i += 1) {
        var result = results[i];

        if (this.options.id) {
          result.item = this.options.getFn(result.item, this.options.id)[0];
        }

        if (!transformers.length) {
          finalOutput.push(result.item);
          continue;
        }

        var data = {
          item: result.item
        };

        for (var j = 0, _len2 = transformers.length; j < _len2; j += 1) {
          transformers[j](result, data);
        }

        finalOutput.push(data);
      }

      return finalOutput;
    }
  }, {
    key: '_log',
    value: function _log() {
      if (this.options.verbose) {
        var _console;

        (_console = console).log.apply(_console, arguments);
      }
    }
  }]);

  return Fuse;
}();

module.exports = Fuse;

/***/ })
/******/ ]);
});
//# sourceMappingURL=fuse.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports) {

/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var is = __webpack_require__(25);
var delegate = __webpack_require__(22);

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

module.exports = listen;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/*
Syntax highlighting with language autodetection.
https://highlightjs.org/
*/

(function(factory) {

  // Find the global object for export to both the browser and web workers.
  var globalObject = typeof window === 'object' && window ||
                     typeof self === 'object' && self;

  // Setup highlight.js for different environments. First is Node.js or
  // CommonJS.
  if(true) {
    factory(exports);
  } else if(globalObject) {
    // Export hljs globally even when using AMD for cases when this script
    // is loaded with others that may still expect a global hljs.
    globalObject.hljs = factory({});

    // Finally register the global hljs with AMD.
    if(typeof define === 'function' && define.amd) {
      define([], function() {
        return globalObject.hljs;
      });
    }
  }

}(function(hljs) {
  // Convenience variables for build-in objects
  var ArrayProto = [],
      objectKeys = Object.keys;

  // Global internal variables used within the highlight.js library.
  var languages = {},
      aliases   = {};

  // Regular expressions used throughout the highlight.js library.
  var noHighlightRe    = /^(no-?highlight|plain|text)$/i,
      languagePrefixRe = /\blang(?:uage)?-([\w-]+)\b/i,
      fixMarkupRe      = /((^(<[^>]+>|\t|)+|(?:\n)))/gm;

  var spanEndTag = '</span>';

  // Global options used when within external APIs. This is modified when
  // calling the `hljs.configure` function.
  var options = {
    classPrefix: 'hljs-',
    tabReplace: null,
    useBR: false,
    languages: undefined
  };


  /* Utility functions */

  function escape(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function tag(node) {
    return node.nodeName.toLowerCase();
  }

  function testRe(re, lexeme) {
    var match = re && re.exec(lexeme);
    return match && match.index === 0;
  }

  function isNotHighlighted(language) {
    return noHighlightRe.test(language);
  }

  function blockLanguage(block) {
    var i, match, length, _class;
    var classes = block.className + ' ';

    classes += block.parentNode ? block.parentNode.className : '';

    // language-* takes precedence over non-prefixed class names.
    match = languagePrefixRe.exec(classes);
    if (match) {
      return getLanguage(match[1]) ? match[1] : 'no-highlight';
    }

    classes = classes.split(/\s+/);

    for (i = 0, length = classes.length; i < length; i++) {
      _class = classes[i]

      if (isNotHighlighted(_class) || getLanguage(_class)) {
        return _class;
      }
    }
  }

  function inherit(parent) {  // inherit(parent, override_obj, override_obj, ...)
    var key;
    var result = {};
    var objects = Array.prototype.slice.call(arguments, 1);

    for (key in parent)
      result[key] = parent[key];
    objects.forEach(function(obj) {
      for (key in obj)
        result[key] = obj[key];
    });
    return result;
  }

  /* Stream merging */

  function nodeStream(node) {
    var result = [];
    (function _nodeStream(node, offset) {
      for (var child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType === 3)
          offset += child.nodeValue.length;
        else if (child.nodeType === 1) {
          result.push({
            event: 'start',
            offset: offset,
            node: child
          });
          offset = _nodeStream(child, offset);
          // Prevent void elements from having an end tag that would actually
          // double them in the output. There are more void elements in HTML
          // but we list only those realistically expected in code display.
          if (!tag(child).match(/br|hr|img|input/)) {
            result.push({
              event: 'stop',
              offset: offset,
              node: child
            });
          }
        }
      }
      return offset;
    })(node, 0);
    return result;
  }

  function mergeStreams(original, highlighted, value) {
    var processed = 0;
    var result = '';
    var nodeStack = [];

    function selectStream() {
      if (!original.length || !highlighted.length) {
        return original.length ? original : highlighted;
      }
      if (original[0].offset !== highlighted[0].offset) {
        return (original[0].offset < highlighted[0].offset) ? original : highlighted;
      }

      /*
      To avoid starting the stream just before it should stop the order is
      ensured that original always starts first and closes last:

      if (event1 == 'start' && event2 == 'start')
        return original;
      if (event1 == 'start' && event2 == 'stop')
        return highlighted;
      if (event1 == 'stop' && event2 == 'start')
        return original;
      if (event1 == 'stop' && event2 == 'stop')
        return highlighted;

      ... which is collapsed to:
      */
      return highlighted[0].event === 'start' ? original : highlighted;
    }

    function open(node) {
      function attr_str(a) {return ' ' + a.nodeName + '="' + escape(a.value).replace('"', '&quot;') + '"';}
      result += '<' + tag(node) + ArrayProto.map.call(node.attributes, attr_str).join('') + '>';
    }

    function close(node) {
      result += '</' + tag(node) + '>';
    }

    function render(event) {
      (event.event === 'start' ? open : close)(event.node);
    }

    while (original.length || highlighted.length) {
      var stream = selectStream();
      result += escape(value.substring(processed, stream[0].offset));
      processed = stream[0].offset;
      if (stream === original) {
        /*
        On any opening or closing tag of the original markup we first close
        the entire highlighted node stack, then render the original tag along
        with all the following original tags at the same offset and then
        reopen all the tags on the highlighted stack.
        */
        nodeStack.reverse().forEach(close);
        do {
          render(stream.splice(0, 1)[0]);
          stream = selectStream();
        } while (stream === original && stream.length && stream[0].offset === processed);
        nodeStack.reverse().forEach(open);
      } else {
        if (stream[0].event === 'start') {
          nodeStack.push(stream[0].node);
        } else {
          nodeStack.pop();
        }
        render(stream.splice(0, 1)[0]);
      }
    }
    return result + escape(value.substr(processed));
  }

  /* Initialization */

  function expand_mode(mode) {
    if (mode.variants && !mode.cached_variants) {
      mode.cached_variants = mode.variants.map(function(variant) {
        return inherit(mode, {variants: null}, variant);
      });
    }
    return mode.cached_variants || (mode.endsWithParent && [inherit(mode)]) || [mode];
  }

  function compileLanguage(language) {

    function reStr(re) {
        return (re && re.source) || re;
    }

    function langRe(value, global) {
      return new RegExp(
        reStr(value),
        'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : '')
      );
    }

    function compileMode(mode, parent) {
      if (mode.compiled)
        return;
      mode.compiled = true;

      mode.keywords = mode.keywords || mode.beginKeywords;
      if (mode.keywords) {
        var compiled_keywords = {};

        var flatten = function(className, str) {
          if (language.case_insensitive) {
            str = str.toLowerCase();
          }
          str.split(' ').forEach(function(kw) {
            var pair = kw.split('|');
            compiled_keywords[pair[0]] = [className, pair[1] ? Number(pair[1]) : 1];
          });
        };

        if (typeof mode.keywords === 'string') { // string
          flatten('keyword', mode.keywords);
        } else {
          objectKeys(mode.keywords).forEach(function (className) {
            flatten(className, mode.keywords[className]);
          });
        }
        mode.keywords = compiled_keywords;
      }
      mode.lexemesRe = langRe(mode.lexemes || /\w+/, true);

      if (parent) {
        if (mode.beginKeywords) {
          mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')\\b';
        }
        if (!mode.begin)
          mode.begin = /\B|\b/;
        mode.beginRe = langRe(mode.begin);
        if (mode.endSameAsBegin)
          mode.end = mode.begin;
        if (!mode.end && !mode.endsWithParent)
          mode.end = /\B|\b/;
        if (mode.end)
          mode.endRe = langRe(mode.end);
        mode.terminator_end = reStr(mode.end) || '';
        if (mode.endsWithParent && parent.terminator_end)
          mode.terminator_end += (mode.end ? '|' : '') + parent.terminator_end;
      }
      if (mode.illegal)
        mode.illegalRe = langRe(mode.illegal);
      if (mode.relevance == null)
        mode.relevance = 1;
      if (!mode.contains) {
        mode.contains = [];
      }
      mode.contains = Array.prototype.concat.apply([], mode.contains.map(function(c) {
        return expand_mode(c === 'self' ? mode : c)
      }));
      mode.contains.forEach(function(c) {compileMode(c, mode);});

      if (mode.starts) {
        compileMode(mode.starts, parent);
      }

      var terminators =
        mode.contains.map(function(c) {
          return c.beginKeywords ? '\\.?(' + c.begin + ')\\.?' : c.begin;
        })
        .concat([mode.terminator_end, mode.illegal])
        .map(reStr)
        .filter(Boolean);
      mode.terminators = terminators.length ? langRe(terminators.join('|'), true) : {exec: function(/*s*/) {return null;}};
    }

    compileMode(language);
  }

  /*
  Core highlighting function. Accepts a language name, or an alias, and a
  string with the code to highlight. Returns an object with the following
  properties:

  - relevance (int)
  - value (an HTML string with highlighting markup)

  */
  function highlight(name, value, ignore_illegals, continuation) {

    function escapeRe(value) {
      return new RegExp(value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'm');
    }

    function subMode(lexeme, mode) {
      var i, length;

      for (i = 0, length = mode.contains.length; i < length; i++) {
        if (testRe(mode.contains[i].beginRe, lexeme)) {
          if (mode.contains[i].endSameAsBegin) {
            mode.contains[i].endRe = escapeRe( mode.contains[i].beginRe.exec(lexeme)[0] );
          }
          return mode.contains[i];
        }
      }
    }

    function endOfMode(mode, lexeme) {
      if (testRe(mode.endRe, lexeme)) {
        while (mode.endsParent && mode.parent) {
          mode = mode.parent;
        }
        return mode;
      }
      if (mode.endsWithParent) {
        return endOfMode(mode.parent, lexeme);
      }
    }

    function isIllegal(lexeme, mode) {
      return !ignore_illegals && testRe(mode.illegalRe, lexeme);
    }

    function keywordMatch(mode, match) {
      var match_str = language.case_insensitive ? match[0].toLowerCase() : match[0];
      return mode.keywords.hasOwnProperty(match_str) && mode.keywords[match_str];
    }

    function buildSpan(classname, insideSpan, leaveOpen, noPrefix) {
      var classPrefix = noPrefix ? '' : options.classPrefix,
          openSpan    = '<span class="' + classPrefix,
          closeSpan   = leaveOpen ? '' : spanEndTag

      openSpan += classname + '">';

      return openSpan + insideSpan + closeSpan;
    }

    function processKeywords() {
      var keyword_match, last_index, match, result;

      if (!top.keywords)
        return escape(mode_buffer);

      result = '';
      last_index = 0;
      top.lexemesRe.lastIndex = 0;
      match = top.lexemesRe.exec(mode_buffer);

      while (match) {
        result += escape(mode_buffer.substring(last_index, match.index));
        keyword_match = keywordMatch(top, match);
        if (keyword_match) {
          relevance += keyword_match[1];
          result += buildSpan(keyword_match[0], escape(match[0]));
        } else {
          result += escape(match[0]);
        }
        last_index = top.lexemesRe.lastIndex;
        match = top.lexemesRe.exec(mode_buffer);
      }
      return result + escape(mode_buffer.substr(last_index));
    }

    function processSubLanguage() {
      var explicit = typeof top.subLanguage === 'string';
      if (explicit && !languages[top.subLanguage]) {
        return escape(mode_buffer);
      }

      var result = explicit ?
                   highlight(top.subLanguage, mode_buffer, true, continuations[top.subLanguage]) :
                   highlightAuto(mode_buffer, top.subLanguage.length ? top.subLanguage : undefined);

      // Counting embedded language score towards the host language may be disabled
      // with zeroing the containing mode relevance. Usecase in point is Markdown that
      // allows XML everywhere and makes every XML snippet to have a much larger Markdown
      // score.
      if (top.relevance > 0) {
        relevance += result.relevance;
      }
      if (explicit) {
        continuations[top.subLanguage] = result.top;
      }
      return buildSpan(result.language, result.value, false, true);
    }

    function processBuffer() {
      result += (top.subLanguage != null ? processSubLanguage() : processKeywords());
      mode_buffer = '';
    }

    function startNewMode(mode) {
      result += mode.className? buildSpan(mode.className, '', true): '';
      top = Object.create(mode, {parent: {value: top}});
    }

    function processLexeme(buffer, lexeme) {

      mode_buffer += buffer;

      if (lexeme == null) {
        processBuffer();
        return 0;
      }

      var new_mode = subMode(lexeme, top);
      if (new_mode) {
        if (new_mode.skip) {
          mode_buffer += lexeme;
        } else {
          if (new_mode.excludeBegin) {
            mode_buffer += lexeme;
          }
          processBuffer();
          if (!new_mode.returnBegin && !new_mode.excludeBegin) {
            mode_buffer = lexeme;
          }
        }
        startNewMode(new_mode, lexeme);
        return new_mode.returnBegin ? 0 : lexeme.length;
      }

      var end_mode = endOfMode(top, lexeme);
      if (end_mode) {
        var origin = top;
        if (origin.skip) {
          mode_buffer += lexeme;
        } else {
          if (!(origin.returnEnd || origin.excludeEnd)) {
            mode_buffer += lexeme;
          }
          processBuffer();
          if (origin.excludeEnd) {
            mode_buffer = lexeme;
          }
        }
        do {
          if (top.className) {
            result += spanEndTag;
          }
          if (!top.skip && !top.subLanguage) {
            relevance += top.relevance;
          }
          top = top.parent;
        } while (top !== end_mode.parent);
        if (end_mode.starts) {
          if (end_mode.endSameAsBegin) {
            end_mode.starts.endRe = end_mode.endRe;
          }
          startNewMode(end_mode.starts, '');
        }
        return origin.returnEnd ? 0 : lexeme.length;
      }

      if (isIllegal(lexeme, top))
        throw new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || '<unnamed>') + '"');

      /*
      Parser should not reach this point as all types of lexemes should be caught
      earlier, but if it does due to some bug make sure it advances at least one
      character forward to prevent infinite looping.
      */
      mode_buffer += lexeme;
      return lexeme.length || 1;
    }

    var language = getLanguage(name);
    if (!language) {
      throw new Error('Unknown language: "' + name + '"');
    }

    compileLanguage(language);
    var top = continuation || language;
    var continuations = {}; // keep continuations for sub-languages
    var result = '', current;
    for(current = top; current !== language; current = current.parent) {
      if (current.className) {
        result = buildSpan(current.className, '', true) + result;
      }
    }
    var mode_buffer = '';
    var relevance = 0;
    try {
      var match, count, index = 0;
      while (true) {
        top.terminators.lastIndex = index;
        match = top.terminators.exec(value);
        if (!match)
          break;
        count = processLexeme(value.substring(index, match.index), match[0]);
        index = match.index + count;
      }
      processLexeme(value.substr(index));
      for(current = top; current.parent; current = current.parent) { // close dangling modes
        if (current.className) {
          result += spanEndTag;
        }
      }
      return {
        relevance: relevance,
        value: result,
        language: name,
        top: top
      };
    } catch (e) {
      if (e.message && e.message.indexOf('Illegal') !== -1) {
        return {
          relevance: 0,
          value: escape(value)
        };
      } else {
        throw e;
      }
    }
  }

  /*
  Highlighting with language detection. Accepts a string with the code to
  highlight. Returns an object with the following properties:

  - language (detected language)
  - relevance (int)
  - value (an HTML string with highlighting markup)
  - second_best (object with the same structure for second-best heuristically
    detected language, may be absent)

  */
  function highlightAuto(text, languageSubset) {
    languageSubset = languageSubset || options.languages || objectKeys(languages);
    var result = {
      relevance: 0,
      value: escape(text)
    };
    var second_best = result;
    languageSubset.filter(getLanguage).filter(autoDetection).forEach(function(name) {
      var current = highlight(name, text, false);
      current.language = name;
      if (current.relevance > second_best.relevance) {
        second_best = current;
      }
      if (current.relevance > result.relevance) {
        second_best = result;
        result = current;
      }
    });
    if (second_best.language) {
      result.second_best = second_best;
    }
    return result;
  }

  /*
  Post-processing of the highlighted markup:

  - replace TABs with something more useful
  - replace real line-breaks with '<br>' for non-pre containers

  */
  function fixMarkup(value) {
    return !(options.tabReplace || options.useBR)
      ? value
      : value.replace(fixMarkupRe, function(match, p1) {
          if (options.useBR && match === '\n') {
            return '<br>';
          } else if (options.tabReplace) {
            return p1.replace(/\t/g, options.tabReplace);
          }
          return '';
      });
  }

  function buildClassName(prevClassName, currentLang, resultLang) {
    var language = currentLang ? aliases[currentLang] : resultLang,
        result   = [prevClassName.trim()];

    if (!prevClassName.match(/\bhljs\b/)) {
      result.push('hljs');
    }

    if (prevClassName.indexOf(language) === -1) {
      result.push(language);
    }

    return result.join(' ').trim();
  }

  /*
  Applies highlighting to a DOM node containing code. Accepts a DOM node and
  two optional parameters for fixMarkup.
  */
  function highlightBlock(block) {
    var node, originalStream, result, resultNode, text;
    var language = blockLanguage(block);

    if (isNotHighlighted(language))
        return;

    if (options.useBR) {
      node = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
      node.innerHTML = block.innerHTML.replace(/\n/g, '').replace(/<br[ \/]*>/g, '\n');
    } else {
      node = block;
    }
    text = node.textContent;
    result = language ? highlight(language, text, true) : highlightAuto(text);

    originalStream = nodeStream(node);
    if (originalStream.length) {
      resultNode = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
      resultNode.innerHTML = result.value;
      result.value = mergeStreams(originalStream, nodeStream(resultNode), text);
    }
    result.value = fixMarkup(result.value);

    block.innerHTML = result.value;
    block.className = buildClassName(block.className, language, result.language);
    block.result = {
      language: result.language,
      re: result.relevance
    };
    if (result.second_best) {
      block.second_best = {
        language: result.second_best.language,
        re: result.second_best.relevance
      };
    }
  }

  /*
  Updates highlight.js global options with values passed in the form of an object.
  */
  function configure(user_options) {
    options = inherit(options, user_options);
  }

  /*
  Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
  */
  function initHighlighting() {
    if (initHighlighting.called)
      return;
    initHighlighting.called = true;

    var blocks = document.querySelectorAll('pre code');
    ArrayProto.forEach.call(blocks, highlightBlock);
  }

  /*
  Attaches highlighting to the page load event.
  */
  function initHighlightingOnLoad() {
    addEventListener('DOMContentLoaded', initHighlighting, false);
    addEventListener('load', initHighlighting, false);
  }

  function registerLanguage(name, language) {
    var lang = languages[name] = language(hljs);
    if (lang.aliases) {
      lang.aliases.forEach(function(alias) {aliases[alias] = name;});
    }
  }

  function listLanguages() {
    return objectKeys(languages);
  }

  function getLanguage(name) {
    name = (name || '').toLowerCase();
    return languages[name] || languages[aliases[name]];
  }

  function autoDetection(name) {
    var lang = getLanguage(name);
    return lang && !lang.disableAutodetect;
  }

  /* Interface definition */

  hljs.highlight = highlight;
  hljs.highlightAuto = highlightAuto;
  hljs.fixMarkup = fixMarkup;
  hljs.highlightBlock = highlightBlock;
  hljs.configure = configure;
  hljs.initHighlighting = initHighlighting;
  hljs.initHighlightingOnLoad = initHighlightingOnLoad;
  hljs.registerLanguage = registerLanguage;
  hljs.listLanguages = listLanguages;
  hljs.getLanguage = getLanguage;
  hljs.autoDetection = autoDetection;
  hljs.inherit = inherit;

  // Common regexps
  hljs.IDENT_RE = '[a-zA-Z]\\w*';
  hljs.UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
  hljs.NUMBER_RE = '\\b\\d+(\\.\\d+)?';
  hljs.C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float
  hljs.BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...
  hljs.RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';

  // Common modes
  hljs.BACKSLASH_ESCAPE = {
    begin: '\\\\[\\s\\S]', relevance: 0
  };
  hljs.APOS_STRING_MODE = {
    className: 'string',
    begin: '\'', end: '\'',
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  hljs.QUOTE_STRING_MODE = {
    className: 'string',
    begin: '"', end: '"',
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  hljs.PHRASAL_WORDS_MODE = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  };
  hljs.COMMENT = function (begin, end, inherits) {
    var mode = hljs.inherit(
      {
        className: 'comment',
        begin: begin, end: end,
        contains: []
      },
      inherits || {}
    );
    mode.contains.push(hljs.PHRASAL_WORDS_MODE);
    mode.contains.push({
      className: 'doctag',
      begin: '(?:TODO|FIXME|NOTE|BUG|XXX):',
      relevance: 0
    });
    return mode;
  };
  hljs.C_LINE_COMMENT_MODE = hljs.COMMENT('//', '$');
  hljs.C_BLOCK_COMMENT_MODE = hljs.COMMENT('/\\*', '\\*/');
  hljs.HASH_COMMENT_MODE = hljs.COMMENT('#', '$');
  hljs.NUMBER_MODE = {
    className: 'number',
    begin: hljs.NUMBER_RE,
    relevance: 0
  };
  hljs.C_NUMBER_MODE = {
    className: 'number',
    begin: hljs.C_NUMBER_RE,
    relevance: 0
  };
  hljs.BINARY_NUMBER_MODE = {
    className: 'number',
    begin: hljs.BINARY_NUMBER_RE,
    relevance: 0
  };
  hljs.CSS_NUMBER_MODE = {
    className: 'number',
    begin: hljs.NUMBER_RE + '(' +
      '%|em|ex|ch|rem'  +
      '|vw|vh|vmin|vmax' +
      '|cm|mm|in|pt|pc|px' +
      '|deg|grad|rad|turn' +
      '|s|ms' +
      '|Hz|kHz' +
      '|dpi|dpcm|dppx' +
      ')?',
    relevance: 0
  };
  hljs.REGEXP_MODE = {
    className: 'regexp',
    begin: /\//, end: /\/[gimuy]*/,
    illegal: /\n/,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      {
        begin: /\[/, end: /\]/,
        relevance: 0,
        contains: [hljs.BACKSLASH_ESCAPE]
      }
    ]
  };
  hljs.TITLE_MODE = {
    className: 'title',
    begin: hljs.IDENT_RE,
    relevance: 0
  };
  hljs.UNDERSCORE_TITLE_MODE = {
    className: 'title',
    begin: hljs.UNDERSCORE_IDENT_RE,
    relevance: 0
  };
  hljs.METHOD_GUARD = {
    // excludes method names from keyword processing
    begin: '\\.\\s*' + hljs.UNDERSCORE_IDENT_RE,
    relevance: 0
  };

  return hljs;
}));


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function(hljs) {
  var IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
  var KEYWORDS = {
    keyword:
      'in of if for while finally var new function do return void else break catch ' +
      'instanceof with throw case default try this switch continue typeof delete ' +
      'let yield const export super debugger as async await static ' +
      // ECMAScript 6 modules import
      'import from as'
    ,
    literal:
      'true false null undefined NaN Infinity',
    built_in:
      'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent ' +
      'encodeURI encodeURIComponent escape unescape Object Function Boolean Error ' +
      'EvalError InternalError RangeError ReferenceError StopIteration SyntaxError ' +
      'TypeError URIError Number Math Date String RegExp Array Float32Array ' +
      'Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array ' +
      'Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require ' +
      'module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect ' +
      'Promise'
  };
  var EXPRESSIONS;
  var NUMBER = {
    className: 'number',
    variants: [
      { begin: '\\b(0[bB][01]+)' },
      { begin: '\\b(0[oO][0-7]+)' },
      { begin: hljs.C_NUMBER_RE }
    ],
    relevance: 0
  };
  var SUBST = {
    className: 'subst',
    begin: '\\$\\{', end: '\\}',
    keywords: KEYWORDS,
    contains: []  // defined later
  };
  var TEMPLATE_STRING = {
    className: 'string',
    begin: '`', end: '`',
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  SUBST.contains = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    TEMPLATE_STRING,
    NUMBER,
    hljs.REGEXP_MODE
  ]
  var PARAMS_CONTAINS = SUBST.contains.concat([
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.C_LINE_COMMENT_MODE
  ]);

  return {
    aliases: ['js', 'jsx'],
    keywords: KEYWORDS,
    contains: [
      {
        className: 'meta',
        relevance: 10,
        begin: /^\s*['"]use (strict|asm)['"]/
      },
      {
        className: 'meta',
        begin: /^#!/, end: /$/
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      TEMPLATE_STRING,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      NUMBER,
      { // object attr container
        begin: /[{,]\s*/, relevance: 0,
        contains: [
          {
            begin: IDENT_RE + '\\s*:', returnBegin: true,
            relevance: 0,
            contains: [{className: 'attr', begin: IDENT_RE, relevance: 0}]
          }
        ]
      },
      { // "value" container
        begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
        keywords: 'return throw case',
        contains: [
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.REGEXP_MODE,
          {
            className: 'function',
            begin: '(\\(.*?\\)|' + IDENT_RE + ')\\s*=>', returnBegin: true,
            end: '\\s*=>',
            contains: [
              {
                className: 'params',
                variants: [
                  {
                    begin: IDENT_RE
                  },
                  {
                    begin: /\(\s*\)/,
                  },
                  {
                    begin: /\(/, end: /\)/,
                    excludeBegin: true, excludeEnd: true,
                    keywords: KEYWORDS,
                    contains: PARAMS_CONTAINS
                  }
                ]
              }
            ]
          },
          { // E4X / JSX
            begin: /</, end: /(\/\w+|\w+\/)>/,
            subLanguage: 'xml',
            contains: [
              {begin: /<\w+\s*\/>/, skip: true},
              {
                begin: /<\w+/, end: /(\/\w+|\w+\/)>/, skip: true,
                contains: [
                  {begin: /<\w+\s*\/>/, skip: true},
                  'self'
                ]
              }
            ]
          }
        ],
        relevance: 0
      },
      {
        className: 'function',
        beginKeywords: 'function', end: /\{/, excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {begin: IDENT_RE}),
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            contains: PARAMS_CONTAINS
          }
        ],
        illegal: /\[|%/
      },
      {
        begin: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      },
      hljs.METHOD_GUARD,
      { // ES6 class
        className: 'class',
        beginKeywords: 'class', end: /[{;=]/, excludeEnd: true,
        illegal: /[:"\[\]]/,
        contains: [
          {beginKeywords: 'extends'},
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        beginKeywords: 'constructor', end: /\{/, excludeEnd: true
      }
    ],
    illegal: /#(?!!)/
  };
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = function(hljs) {
  var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  var VARIABLE = {
    className: 'variable',
    begin: '(\\$' + IDENT_RE + ')\\b'
  };
  var HEXCOLOR = {
    className: 'number', begin: '#[0-9A-Fa-f]+'
  };
  var DEF_INTERNALS = {
    className: 'attribute',
    begin: '[A-Z\\_\\.\\-]+', end: ':',
    excludeEnd: true,
    illegal: '[^\\s]',
    starts: {
      endsWithParent: true, excludeEnd: true,
      contains: [
        HEXCOLOR,
        hljs.CSS_NUMBER_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.APOS_STRING_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        {
          className: 'meta', begin: '!important'
        }
      ]
    }
  };
  return {
    case_insensitive: true,
    illegal: '[=/|\']',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'selector-id', begin: '\\#[A-Za-z0-9_-]+',
        relevance: 0
      },
      {
        className: 'selector-class', begin: '\\.[A-Za-z0-9_-]+',
        relevance: 0
      },
      {
        className: 'selector-attr', begin: '\\[', end: '\\]',
        illegal: '$'
      },
      {
        className: 'selector-tag', // begin: IDENT_RE, end: '[,|\\s]'
        begin: '\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b',
        relevance: 0
      },
      {
        begin: ':(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)'
      },
      {
        begin: '::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)'
      },
      VARIABLE,
      {
        className: 'attribute',
        begin: '\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b',
        illegal: '[^\\s]'
      },
      {
        begin: '\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b'
      },
      {
        begin: ':', end: ';',
        contains: [
          VARIABLE,
          HEXCOLOR,
          hljs.CSS_NUMBER_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          {
            className: 'meta', begin: '!important'
          }
        ]
      },
      {
        begin: '@', end: '[{;]',
        keywords: 'mixin include extend for if else each while charset import debug media page content font-face namespace warn',
        contains: [
          VARIABLE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          HEXCOLOR,
          hljs.CSS_NUMBER_MODE,
          {
            begin: '\\s[A-Za-z0-9_.-]+',
            relevance: 0
          }
        ]
      }
    ]
  };
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = function(hljs) {
  var XML_IDENT_RE = '[A-Za-z0-9\\._:-]+';
  var TAG_INTERNALS = {
    endsWithParent: true,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: 'attr',
        begin: XML_IDENT_RE,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: 'string',
            endsParent: true,
            variants: [
              {begin: /"/, end: /"/},
              {begin: /'/, end: /'/},
              {begin: /[^\s"'=<>`]+/}
            ]
          }
        ]
      }
    ]
  };
  return {
    aliases: ['html', 'xhtml', 'rss', 'atom', 'xjb', 'xsd', 'xsl', 'plist'],
    case_insensitive: true,
    contains: [
      {
        className: 'meta',
        begin: '<!DOCTYPE', end: '>',
        relevance: 10,
        contains: [{begin: '\\[', end: '\\]'}]
      },
      hljs.COMMENT(
        '<!--',
        '-->',
        {
          relevance: 10
        }
      ),
      {
        begin: '<\\!\\[CDATA\\[', end: '\\]\\]>',
        relevance: 10
      },
      {
        className: 'meta',
        begin: /<\?xml/, end: /\?>/, relevance: 10
      },
      {
        begin: /<\?(php)?/, end: /\?>/,
        subLanguage: 'php',
        contains: [
          // We don't want the php closing tag ?> to close the PHP block when
          // inside any of the following blocks:
          {begin: '/\\*', end: '\\*/', skip: true},
          {begin: 'b"', end: '"', skip: true},
          {begin: 'b\'', end: '\'', skip: true},
          hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null, className: null, contains: null, skip: true}),
          hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null, className: null, contains: null, skip: true})
        ]
      },
      {
        className: 'tag',
        /*
        The lookahead pattern (?=...) ensures that 'begin' only matches
        '<style' as a single word, followed by a whitespace or an
        ending braket. The '$' is needed for the lexeme to be recognized
        by hljs.subMode() that tests lexemes outside the stream.
        */
        begin: '<style(?=\\s|>|$)', end: '>',
        keywords: {name: 'style'},
        contains: [TAG_INTERNALS],
        starts: {
          end: '</style>', returnEnd: true,
          subLanguage: ['css', 'xml']
        }
      },
      {
        className: 'tag',
        // See the comment in the <style tag about the lookahead pattern
        begin: '<script(?=\\s|>|$)', end: '>',
        keywords: {name: 'script'},
        contains: [TAG_INTERNALS],
        starts: {
          end: '\<\/script\>', returnEnd: true,
          subLanguage: ['actionscript', 'javascript', 'handlebars', 'xml']
        }
      },
      {
        className: 'tag',
        begin: '</?', end: '/?>',
        contains: [
          {
            className: 'name', begin: /[^\/><\s]+/, relevance: 0
          },
          TAG_INTERNALS
        ]
      }
    ]
  };
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        var isReadOnly = element.hasAttribute('readonly');

        if (!isReadOnly) {
            element.setAttribute('readonly', '');
        }

        element.select();
        element.setSelectionRange(0, element.value.length);

        if (!isReadOnly) {
            element.removeAttribute('readonly');
        }

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

module.exports = select;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//components
// require('./components/service-worker-registration');
__webpack_require__(18);
__webpack_require__(10);
__webpack_require__(11);
__webpack_require__(0);
__webpack_require__(14);
__webpack_require__(15);
__webpack_require__(13);
__webpack_require__(12);

// examples
__webpack_require__(3);
__webpack_require__(9);
__webpack_require__(4);
__webpack_require__(7);
__webpack_require__(5);
__webpack_require__(2);
__webpack_require__(1);
__webpack_require__(6);
__webpack_require__(8);

//tracking
__webpack_require__(16);

//other things
basecoat.treats = __webpack_require__(17);


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map