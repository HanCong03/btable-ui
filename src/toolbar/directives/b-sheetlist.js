/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bSheetlist', [
    '$timeout',
    'btableService',
    'sheetlistService',

    function ($timeout, btableService, sheetlistService) {

    return {
        restrict: 'A',
        replace: true,
        scope: {
        },
        templateUrl: 'template/widget/sheetlist.html',
        link: {
            post: function ($scope, $ele, $attr, $controller) {
                var MAX_WIDTH = 800;

                var startIndex = 0;
                var endIndex = -1;

                var status = {
                    selected: 0,

                    overflow: false,
                    leftMore: false,
                    rightMore: false
                };

                var $list = $(".b-sl-list", $ele);
                var $shadowList = $(".b-sl-shadow-list", $ele);
                var customHandler;

                /* ---- scope 挂载 start ---- */
                $scope.status = status;
                $scope.sheets = clone(btableService.queryCommandValue('sheetnames'));

                btableService.on('beforedataready', function () {
                    $scope.sheets = clone(btableService.queryCommandValue('sheetnames'));
                    status.selected = btableService.queryCommandValue('activesheetindex');

                    refresh();
                });

                btableService.on('sheetschange', function () {
                    $scope.sheets = clone(btableService.queryCommandValue('sheetnames'));
                    status.selected = btableService.queryCommandValue('activesheetindex');

                    refresh();
                });

                btableService.on('sheetswitch', function () {
                    status.selected = btableService.queryCommandValue('activesheetindex');
                    refresh();
                });

                (function () {
                    startIndex = 0;
                    endIndex = -1;

                    $.extend(status, {
                        selected: 0,

                        overflow: false,
                        leftMore: false,
                        rightMore: false
                    });

                    $scope.sheets = clone(btableService.queryCommandValue('sheetnames'));
                    status.selected = btableService.queryCommandValue('activesheetindex');

                    refresh();
                })();

                $scope.addSheet = function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();

                    btableService.execCommand(['addsheet']);
                };

                $scope.leftClick = function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();

                    if (startIndex === 0) {
                        return;
                    }

                    startIndex -= 1;

                    customHandler = sheetlistService.getHandler();

                    // 当前有自定义处理器，则通知自定义处理器
                    if (customHandler) {
                        customHandler(startIndex);

                    // 否则，执行默认动作
                    } else {
                        btableService.execCommand(['switchsheet', startIndex]);
                    }
                };

                $scope.rightClick = function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();

                    var count = $scope.sheets.length;

                    if (endIndex === count - 1) {
                        return;
                    }

                    customHandler = sheetlistService.getHandler();

                    // 当前有自定义处理器，则通知自定义处理器
                    if (customHandler) {
                        customHandler(endIndex + 1);

                        // 否则，执行默认动作
                    } else {
                        btableService.execCommand(['switchsheet', endIndex + 1]);
                    }
                };

                var lastClickTime = -1;

                // init item click
                (function () {
                    $list.on('mousedown', '.b-sl-item', function (evt) {
                        evt.stopPropagation();
                        evt.preventDefault();

                        var now = Date.now();

                        if (!window.BTB_READ_ONLY && Date.now() - lastClickTime < 500) {
                            lastClickTime = now;

                            $timeout(function () {
                                var $input = $('.b-sl-item-label-input', $list.find('.b-active'));
                                $('.b-sl-item-label', $list.find('.b-active')).hide();
                                $input.show();
                                $input[0].focus();
                                $input[0].setSelectionRange(0, 99999);
                            }, 0);
                            return;
                        }

                        lastClickTime = now;

                        var index = this.getAttribute('data-index') | 0;

                        customHandler = sheetlistService.getHandler();

                        // 当前有自定义处理器，则通知自定义处理器
                        if (customHandler) {
                            customHandler(index);

                            // 否则，执行默认动作
                        } else {
                            btableService.execCommand(['switchsheet', index]);
                        }
                    }).on('mousedown', '.b-sl-item-label-input', function (evt) {
                        evt.stopPropagation();
                    }).on('blur', '.b-sl-item-label-input', function () {
                        if (!btableService.execCommand(['renamesheet', this.value, +this.getAttribute('data-index')])) {
                            alert('重命名失败，名称冲突: ' + this.value);
                        } else {
                            btableService.execCommand(['focus']);
                        }
                    }).on('keydown', '.b-sl-item-label-input', function (evt) {
                        // enter
                        if (evt.keyCode === 13) {
                            evt.preventDefault();
                            this.blur();
                        // esc
                        } else if (evt.keyCode === 27) {
                            var $input = $('.b-sl-item-label-input', $list.find('.b-active'));
                            $('.b-sl-item-label', $list.find('.b-active')).show();
                            $input.hide();
                            btableService.execCommand(['focus']);
                        }
                    });
                })();

                function refresh() {
                    updateItem();

                    var $items = $(".b-sl-item", $shadowList);

                    var width = getAllWidth($items);

                    if (width < MAX_WIDTH) {
                        startIndex = 0;
                        endIndex = startIndex + $items.length - 1;
                        $list.append($items);

                        status.overflow = false;
                        status.leftMore = false;
                        status.rightMore = false;
                    } else {
                        status.overflow = true;
                        checkOffset($items);
                    }
                }

                function updateItem() {
                    var tpl = '<li class="b-sl-item ${active}" data-index="${index}"><div class="b-sl-item-top-space"></div><input type="text" data-index="${index}" class="b-sl-item-label-input" value="${sheetname}"><span class="b-sl-item-label">${sheetname}</span><div class="b-sl-item-bottom-space"></div></li>'

                    var sheets = $scope.sheets;
                    var info = {};
                    var result = [];

                    for (var i = 0, len = sheets.length; i < len; i++) {
                        if (i === status.selected) {
                            info.active = 'b-active'
                        } else {
                            info.active = '';
                        }

                        info.index = i;
                        info.sheetname = sheets[i];

                        result.push(tpl.replace(/\$\{([^}]+)\}/g, function (match, key) {
                            return info[key] || '';
                        }));
                    }

                    $shadowList.html(result.join(''));
                    $list.html('');
                }

                // 检测当前显示的item是否被隐藏， 如果被隐藏，则要进行偏移校正
                function checkOffset($items) {
                    var items = [].slice.call($items, 0);

                    // 可确定已经发生左溢出
                    if (startIndex > status.selected) {
                        startIndex = status.selected;
                        endIndex = startIndex + items.length - 1;
                        items = getBoundingItems(items.slice(startIndex));
                        $list.append(items);

                        status.leftMore = startIndex > 0;
                        status.rightMore = startIndex + items.length < $items.length;
                        return;
                    }

                    // 检测右溢出
                    var currentItems = items.slice(startIndex, status.selected + 1);
                    var width = getAllWidth(currentItems);

                    // 可确定发生了右溢出
                    if (width > MAX_WIDTH) {
                        currentItems.reverse();
                        items = getBoundingItems(currentItems);
                        items.reverse();
                        startIndex += (currentItems.length - items.length);

                        $list.append(items);
                    // 未发生右溢出，直接选取元素设置即可
                    } else {
                        items = getBoundingItems(items.slice(startIndex));
                        $list.append(items);
                    }

                    // 更新状态
                    status.leftMore = startIndex > 0;
                    status.rightMore = startIndex + items.length < $items.length;

                    endIndex = startIndex + items.length - 1;
                }

                function getAllWidth($items) {
                    var sum = 0;
                    var rect;

                    for (var i = 0, len = $items.length; i < len; i++) {
                        rect = __getRect($items[i]);

                        sum += Math.round(rect.width);
                    }

                    return sum - (len - 1);
                }

                function getBoundingItems($items) {
                    var result = [];
                    var sum = 1;
                    var rect;

                    for (var i = 0, len = $items.length; i < len; i++) {
                        rect = __getRect($items[i]);
                        sum += Math.round(rect.width) - 1;

                        if (sum > MAX_WIDTH) {
                            break;
                        }

                        result.push($items[i]);
                    }

                    return result;
                }

                function __getRect(node) {
                    return node.getBoundingClientRect();
                }
            }
        }
    };

    function clone(arr) {
        var keys = Object.keys(arr);
        var result = [];

        for (var i = 0, len = keys.length; i < len; i++) {
            result[keys[i]] = arr[keys[i]];
        }

        return result;
    }
}]);