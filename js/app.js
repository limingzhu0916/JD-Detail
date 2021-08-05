$(function () {
    showhide()
    hoverShowMenu()
    search()
    share()
    address()
    clickTabs()
    hoverMiniCart()
    clickMainTabs()
    clickPreview()
    showImage()
    zoomInImg()

    function zoomInImg() {
        var $mediumImg = $('#mediumImg')
        var $mask = $('#mask')
        var $maskTop = $('#maskTop')
        var $largeImgContainer = $('#largeImgContainer')
        var $loading = $('#loading')
        var $largeImg = $('#largeImg')
        var $maskWidth = $mask.width()
        var $maskHeight = $mask.height()
        var $mediumImgWidth = $mediumImg.width()
        var $mediumImgHeight = $mediumImg.height()


        $maskTop.hover(function () {
            $mask.show()
            var src = $mediumImg.attr('src').replace('-m', '-l')
            $largeImg.attr('src', src)
            $largeImgContainer.show()
            // 大图加载完成
            $largeImg.on('load', function () {
                var $largeImgWidth = $largeImg.width()
                var $largeImgHeight = $largeImg.height()
                $largeImgContainer.css({
                    width: $largeImgWidth/2,
                    height: $largeImgWidth/2
                })
                $loading.hide()
                $largeImg.show()

                // 绑定鼠标移动监听
                $maskTop.mousemove(function (e) {
                    // values: e.clientX, e.clientY, e.pageX, e.pageY
                    // 鼠标在小黄块中间
                    var left = e.offsetX - $maskWidth / 2
                    var top = e.offsetY - $maskHeight / 2
                    // 控制小黄块不能移出
                    if (left <= 0) {
                        left = 0
                    } else if (left >= $mediumImgWidth - $maskWidth) {
                        left = $mediumImgWidth - $maskWidth
                    }
                    if (top <= 0) {
                        top = 0
                    } else if (top >= $mediumImgHeight - $maskHeight) {
                        top = $mediumImgHeight - $maskHeight
                    }

                    // 控制小黄块移动位置
                    $mask.css({
                        left: left,
                        top: top
                    })


                    $largeImg.css({
                        left: -left * $largeImgWidth / $mediumImgWidth,
                        top: -top * $largeImgHeight / $mediumImgHeight
                    })
                })





            })
        }, function () {
            $mask.hide()
            $largeImgContainer.hide()
            $largeImg.hide()
        })
    }

    function showImage() {
        var $lis = $('#icon_list>li')
        $lis.hover(function () {
            $(this).children().addClass('hoveredThumb')
            var newStr = $(this).children().attr('src').slice(0, -4) + '-m.jpg'
            $('#mediumImg').attr('src', newStr)

        }, function () {
            $(this).children().removeClass('hoveredThumb')
        })
    }

    function clickPreview() {
        var $previewA1 = $('#preview>h1>a').first()
        var $previewA2 = $('#preview>h1>a').last()
        var $ul = $('#preview>h1>div>ul')
        var imgCount = $('#icon_list').children('li').length
        var SHOW_COUNT = 5

        if (imgCount > SHOW_COUNT) {
            $previewA2.attr('class', 'forward')
        }
        $previewA1.click(function () {
            $previewA2.attr('class', 'forward')
            if ($previewA1.attr('class') === 'backward') {
                var currentLeft = $ul.position().left
                var targetLeft = currentLeft + 62
                if (targetLeft === 0) {
                    $previewA1.attr('class', 'backward_disabled')
                    $ul.css('left', targetLeft)
                } else {
                    $ul.css('left', targetLeft)
                }
            }
        })
        $previewA2.click(function () {
            $previewA1.attr('class', 'backward')
            if ($previewA2.attr('class') === 'forward') {
                var currentLeft = $ul.position().left
                var targetLeft = currentLeft - 62
                if (targetLeft === -62 * (imgCount - SHOW_COUNT)) {
                    $previewA2.attr('class', 'forward_disabled')
                    $ul.css('left', targetLeft)
                } else {
                    $ul.css('left', targetLeft)
                }
            }

        })
    }

    function clickMainTabs() {
        var $divs = $('#product_detail>div:gt(0)')
        var $lis = $('#product_detail>ul>li')
        var current = 0
        $lis.click(function () {
            this.className = 'current'
            $lis[current].className = ''
            // $($divs[current]).hide()
            $divs[current].style.display = 'none'
            current = $(this).index()
            // $($divs[current]).show()
            $divs[current].style.display = 'block'
        })
    }

    function hoverMiniCart() {
        $('#minicart').hover(function () {
            this.className = 'minicart'
            $(this).children(':last').show()
        }, function () {
            this.className = ''
            $(this).children(':last').hide()
        })
    }

    function clickTabs() {
        $('#store_tabs>li').click(function (params) {
            $('#store_tabs>li').removeClass('hover')
            // $(this).addClass('hover')
            this.className = 'hover'
        })
    }

    function address() {
        var $store_select = $('#store_select')
        var $stores = $store_select.children(':gt(0)')
        $store_select
            .hover(function () {
                $stores.show()
            }, function () {
                $stores.hide()
            })
            .children(':last')
            .click(function () {
                $stores.hide()
            })

    }

    function share() {
        var isOpen = false
        var $shareMore = $('#shareMore')
        var $parent = $shareMore.parent()
        var $as = $shareMore.prevAll('a:lt(2)')
        var $b = $shareMore.children()

        $shareMore.click(function () {
            if (isOpen) {
                isOpen = false
                $parent.width(155)
                $as.hide()
                $b.removeClass('backword')

            } else {
                isOpen = true
                $parent.width(200)
                $as.show()
                $b.addClass('backword')
            }
        })
    }

    function search() {
        $('#txtSearch')
            .on('keyup focus', function () {
                var txt = this.value.trim()
                if (txt) {
                    $('#search_helper').show()
                }
            })
            .blur(function () {
                $('#search_helper').hide()
            });
    }

    function showhide() {
        $('[name=show_hide]').hover(function () {
            var id = this.id + '_items'
            $('#' + id).show()
        }, function () {
            var id = this.id + '_items'
            $('#' + id).hide()
        })
    }

    function hoverShowMenu() {
        $('#category_items>div').hover(function () {
            $(this).children(':last').show()
        }, function () {
            $(this).children(':last').hide()
        })
    }
})