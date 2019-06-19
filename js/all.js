
$(function () {
  console.log('ready');
  $('a[data-toggle="modal"][data-dismiss="modal"]').on('click', function () {
    console.log('click');
    var target = $(this).data('target');
    console.log('target', target);
    $(target).on('shown.bs.modal', function () {
      $('body').addClass('modal-open');
    });
  });
});

$(document).ready(function () {

  $('.search_btn').on("click", function (e) {
    $('#search_bar').submit();
  });
  // $('#search-bar-button').on("click", function(e) {
  // 	$('#search-bar').show();
  // 	$('#search-bar-button').hide();
  // });

  //Search bar active state and transitions
  //var submitIcon = $('.searchbox-icon');
  //var inputBox = $('.searchbox-input');
  //var searchBox = $('.searchbox');
  var isOpen = false;
  $('.searchbox-icon').click(function () {
    if (isOpen == false) {
      $('.searchbox').addClass('searchbox-open');
      $('.searchbox-input').focus();
      $('.searchbox-icon').addClass('searchbox-iconActive');
      isOpen = true;
    } else {
      $('.searchbox').removeClass('searchbox-open');
      $('.searchbox-input').focusout();
      $('.searchbox-icon').removeClass('searchbox-iconActive');
      isOpen = false;
    }
  });
  $('.searchbox-icon').mouseup(function () {
    return false;
  });
  $('.searchbox').mouseup(function () {
    return false;
  });
  $(document).mouseup(function () {
    if (isOpen == true) {
      $('.searchbox-icon').css('display', 'block');
      $('.searchbox-icon').click();
    }
  });
});

function buttonUp() {
  var inputVal = $('.searchbox-input').val();
  inputVal = $.trim(inputVal).length;
  if (inputVal !== 0) {
    $('.searchbox-icon').css('display', 'none');
    $('.searchbox-submit').attr("value");
  } else {
    $('.searchbox-input').val('');
    $('.searchbox-submit').attr("value", "GO");
    $('.searchbox-icon').css('display', 'block');
  }

}

// left aligned
$(document).ready(function () {
  $('.search_btn2').on("click", function (e) {
    $('#search_bar2').submit();
  });
  // $('#search-bar-button').on("click", function(e) {
  // 	$('#search-bar').show();
  // 	$('#search-bar-button').hide();
  // });

  //Search bar active state and transitions
  //var submitIcon = $('.searchbox-icon');
  //var inputBox = $('.searchbox-input');
  //var searchBox = $('.searchbox');
  var isOpen = false;
  $('.searchbox-icon2').click(function () {
    if (isOpen == false) {
      $('.searchbox2').addClass('searchbox-open2');
      $('.searchbox-input2').focus();
      $('.searchbox-icon2').addClass('searchbox-iconActive2');
      isOpen = true;
    } else {
      $('.searchbox2').removeClass('searchbox-open2');
      $('.searchbox-input2').focusout();
      $('.searchbox-icon2').removeClass('searchbox-iconActive2');
      isOpen = false;
    }
  });
  $('.searchbox-icon2').mouseup(function () {
    return false;
  });
  $('.searchbox2').mouseup(function () {
    return false;
  });
  $(document).mouseup(function () {
    if (isOpen == true) {
      $('.searchbox-icon2').css('display', 'block');
      $('.searchbox-icon2').click();
    }
  });
});

function buttonUp() {
  var inputVal = $('.searchbox-input2').val();
  inputVal = $.trim(inputVal).length;
  if (inputVal !== 0) {
    $('.searchbox-icon2').css('display', 'none');
    $('.searchbox-submit2').attr("value", "GO");
  } else {
    $('.searchbox-input2').val('');
    $('.searchbox-submit2').attr("value", "");
    $('.searchbox-icon2').css('display', 'block');
  }

}


/*stylewear*/
jQuery(document).ready(function ($) {
  // We only want these styles applied when javascript is enabled
  $('div.navigation').css({ 'width': '300px', 'float': 'left' });
  $('div.content').css('display', 'block');

  // Initially set opacity on thumbs and add
  // additional styling for hover effect on thumbs
  var onMouseOutOpacity = 0.67;
  $('#thumbs ul.thumbs li').opacityrollover({
    mouseOutOpacity: onMouseOutOpacity,
    mouseOverOpacity: 1.0,
    fadeSpeed: 'fast',
    exemptionSelector: '.selected'
  });

  // Initialize Advanced Galleriffic Gallery
  var gallery = $('#thumbs').galleriffic({
    delay: 2500,
    numThumbs: 15,
    preloadAhead: 10,
    enableTopPager: true,
    enableBottomPager: true,
    maxPagesToShow: 7,
    imageContainerSel: '#slideshow',
    ssControlsContainerSel: '#controls',
    navControlsContainerSel: '#nav',
    captionContainerSel: '#caption',
    loadingContainerSel: '#loading',
    renderSSControls: true,
    renderNavControls: true,
    playLinkText: 'Play Slideshow',
    pauseLinkText: 'Pause Slideshow',
    prevLinkText: '&lsaquo; Previous Photo',
    nextLinkText: 'Next Photo &rsaquo;',
    nextPageLinkText: 'Next &rsaquo;',
    prevPageLinkText: '&lsaquo; Prev',
    enableHistory: false,
    autoStart: false,
    syncTransitions: true,
    defaultTransitionDuration: 900,
    onSlideChange: function (prevIndex, nextIndex) {
      // 'this' refers to the gallery, which is an extension of $('#thumbs')
      this.find('ul.thumbs').children()
        .eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
        .eq(nextIndex).fadeTo('fast', 1.0);
    },
    onPageTransitionOut: function (callback) {
      this.fadeTo('fast', 0.0, callback);
    },
    onPageTransitionIn: function () {
      this.fadeTo('fast', 1.0);
    }
  });
});

//zoom//
$(function () {
  $('.mousetrap').live('click', function () {
    $('#zoom1').click();
  });
});



/* Carousel control*/
var Carousel = function (elId, mode) {
  var wrapper = document.getElementById(elId);
  var innerEl = wrapper.getElementsByClassName('carousel-inner')[0];
  var leftButton = wrapper.getElementsByClassName('carousel-left')[0];
  var rightButton = wrapper.getElementsByClassName('carousel-right')[0];
  var items = wrapper.getElementsByClassName('item');

  this.carouselSize = items.length;
  this.itemWidth = null;
  this.itemOuterWidth = null;
  this.currentStep = 0;
  this.itemsAtOnce = 3;
  this.minItemWidth = 200;
  this.position = innerEl.style;
  this.mode = mode;

  this.init = function (mode) {
    this.itemsAtOnce = mode;
    this.calcWidth(wrapper, innerEl, items);
    cb_addEventListener(leftButton, 'click', this.goLeft.bind(this));
    cb_addEventListener(rightButton, 'click', this.goRight.bind(this));
    cb_addEventListener(window, 'resize', this.calcWidth.bind(this, wrapper, innerEl, items));
  };
  return this.init(mode);
};
Carousel.prototype = {
  goLeft: function (e) {
    e.preventDefault();
    if (this.currentStep) {
      --this.currentStep;
    } else {
      this.currentStep = this.carouselSize - this.itemsAtOnce;
    }
    this.makeStep(this.currentStep);
    return false;
  },
  goRight: function (e) {
    e.preventDefault();
    if (this.currentStep < (this.carouselSize - this.itemsAtOnce)) {
      ++this.currentStep;
    } else {
      this.currentStep = 0;
    }
    this.makeStep(this.currentStep);
    return false;
  },
  makeStep: function (step) {
    this.position.left = -(this.itemOuterWidth * step) + 'px';
  },
  calcWidth: function (wrapper, innerEl, items) {
    this.beResponsive();

    var itemStyle = window.getComputedStyle(items[0]);
    var innerElStyle = innerEl.style;
    var carouselLength = this.carouselSize;
    var wrapWidth = wrapper.offsetWidth - parseInt(itemStyle.marginRight, 10) * (this.itemsAtOnce + 1);

    innerElStyle.display = 'none';
    this.itemWidth = wrapWidth / this.itemsAtOnce;
    this.itemOuterWidth = this.itemWidth + parseInt(itemStyle.marginRight, 10);
    for (i = 0; i < carouselLength; i++) {
      items[i].style.width = this.itemWidth + 'px';
    }
    innerElStyle.width = this.itemOuterWidth * this.carouselSize + 'px';
    innerElStyle.display = 'block';
  },

  beResponsive: function () {
    var winWidth = window.innerWidth;
    if (winWidth >= 650 && winWidth < 950 && this.itemsAtOnce >= 2) {
      this.itemsAtOnce = 2;
    }
    else if (winWidth < 650) {
      this.itemsAtOnce = 1;
    }
    else {
      this.itemsAtOnce = this.mode;
    }
  }
}
/*** Cross-browser Event Listener**/
function cb_addEventListener(obj, evt, fnc) {
  if (obj && obj.addEventListener) {
    obj.addEventListener(evt, fnc, false);
    return true;
  } else if (obj && obj.attachEvent) {
    return obj.attachEvent('on' + evt, fnc);
  }
  return false;
}
//Initializing carousel
if (document.getElementById('products')) {
  var productsCarousel = new Carousel('products', 3);
}
if (document.getElementById('products2')) {
  var productsCarousel = new Carousel('products2', 2);
}
if (document.getElementById('products3')) {
  var productsCarousel = new Carousel('products3', 1);
}

//Top
$(function () {
  $('#BackTop').click(function () {
    $('html,body').animate({ scrollTop: 0 }, 333);
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('#BackTop').fadeIn(222);
    } else {
      $('#BackTop').stop().fadeOut(222);
    }
  }).scroll();
});

