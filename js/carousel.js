
var app = angular.module("myApp", []);
app.directive("ngCarousel", function () {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        scope: {
            speed: '@',
            motion: '@',
            srcInit: '='
        },
        template: '<div class="ng-carousel" style="z-index:1;"><div id="carousel-sub" style="position:absolute; width:auto;">'
                    + '<img class="carousel-img" ng-repeat="s in srcInit" src="{{s}}" /><div>'
                    + '<table style="z-index:10;display:none;position:fixed;height:auto;" id="carousel-target"><tr>'
                    + '<td id="toLeft" style="text-align:left;cursor:pointer;width:10%;">◀</td><td style="width:80%"></td>'
                    + '<td id="toRight" style="text-align:right;cursor:pointer;width:10%;">▶</td>'
                    + '</tr></table>'
                    + '</div>',
        link: function (scope, element, attrs) {

            var carousel = $(element);
            var moveDiv = $("#carousel-sub", carousel);

            var srclength = scope.srcInit.length;
            var offset = carousel.offset();

            carousel.bind("mouseover", function (e) {
                $("#carousel-target", carousel).css({
                    "top": offset.top,
                    "left": offset.left,
                    "width": carousel.outerWidth(),
                    "height": carousel.outerHeight()
                }).show();
                $("#toLeft").css({
                    "line-height": carousel.outerHeight() + "px"
                });
                $("#toRigth").css({
                    "line-height": carousel.outerHeight() + "px"
                });
                clearInterval(refreshIntervalId);
            });

            carousel.bind("mouseleave", function () {
                $("#carousel-target", carousel).hide();
                scope.speed = speed;
                MOVE();
            });

            $("#toRight", carousel).bind("click", function () {
                rightpaly();
            });
            $("#toLeft", carousel).bind("click", function () {
                leftplay();
            });

            var rightpaly = function () {

                if (scope.motion == 'makereturn') {
                    left = left % 100 == 0 ? left - 3 : left
                    var next = ((Math.floor(-left / $(".carousel-img", carousel).width())) * 100);
                    left = next <= ($(".carousel-img", carousel).width()) ? 0 : -(next - 100);
                    moveDiv.css({ left: left });
                } else if (scope.motion == 'continuous') {

                    var im = $(".carousel-img:last", carousel).clone();
                    im.insertBefore(".carousel-img:first", carousel);
                    $(".carousel-img:last", carousel).remove();
                    moveDiv.css({ left: 0 });
                }
            }

            var leftplay = function () {
                if (scope.motion == 'makereturn') {
                    if (left > -(moveDiv.width() - $(".carousel-img", carousel).width())) {
                        left = left % 100 == 0 ? left - 3 : left
                        var next = -((Math.ceil(-left / $(".carousel-img", carousel).width())) * 100);
                        left = next;
                        moveDiv.css({ left: left });
                    }
                } else if (scope.motion == 'continuous') {
                    if (left > -(moveDiv.width() - $(".carousel-img", carousel).width())) {
                        left = left % 100 == 0 ? left - 3 : left
                        var next = -((Math.ceil(-left / $(".carousel-img", carousel).width())) * 100);

                        if (-(next) >= $(".carousel-img", carousel).width()) {

                            var im = $(".carousel-img:first", carousel).clone().insertAfter($(".carousel-img:last", carousel));
                            $(".carousel-img:first", carousel).remove();
                            left = 0;

                            left = 0;
                        }
                    }
                    moveDiv.css({ left: left });
                }
            }


            var left = 0;
            var toLeft = true;
            var refreshIntervalId;
            var firsttime = true;
            if (scope.speed == null || scope.speed == '' || scope.speed <= 0) {
                scope.speed = 50;
            };
            var speed = scope.speed;
            function MOVE() {
                refreshIntervalId = setInterval(function move() {
                    if (firsttime) {
                        var w = srclength * $(".carousel-img", carousel).width();
                        moveDiv.width(w); //重新設定移動的圖片容器大小                                 
                        firsttime = false;
                    }

                    //圖片容器大小位大於外層容器大小停止移動
                    if (moveDiv.width() <= $(element).width()) {
                        clearInterval(refreshIntervalId);
                    };

                    if (scope.motion == 'continuous') {
                        left--;
                        if (left <= -($(".carousel-img", carousel).width())) {
                            var im = $(".carousel-img:first", carousel).clone().insertAfter($(".carousel-img:last", carousel));
                            $(".carousel-img:first", carousel).remove();
                            left = 0;
                        }

                    }

                        /*移動判斷 移動容器寬度加外容器左距大於外容器寬度將改變方向往右 
                        移動容器左距小於外容器左距改變方向往左*/
                    else if (scope.motion == 'makereturn') {
                        var v = moveDiv.width() + left;
                        if ((v > $(element).width()) && toLeft) {
                            left--;
                        }
                        else {
                            toLeft = false;
                        }
                        var r = $(element).width() + offset.left;

                        if ((moveDiv.offset().left <= offset.left) && !toLeft) {
                            left++;
                        }
                        else {
                            toLeft = true;
                        }
                    };
                    moveDiv.css({ left: left });
                }, scope.speed);
            };

            MOVE();
        }
    }
});

//app.controller("myCtrl", function ($scope) {
//    $scope.img = ["pictures/1.jpg", "pictures/2.jpg", "pictures/3.jpg", "pictures/4.jpg"
//                  , "pictures/5.jpg", "pictures/6.jpg", "pictures/7.jpg"];
//});
