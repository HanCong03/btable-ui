/**
 * @file
 * @author hancong03@baiud.com
 */

angular.module('app').directive('bSheetlist', [
    '$timeout',
    'btableService',

    function ($timeout, btableService) {

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

                //$timeout(refresh, 1000);

                var $list = $(".b-sl-list", $ele);
                var $shadowList = $(".b-sl-shadow-list", $ele);

                /* ---- scope 挂载 start ---- */
                $scope.status = status;
                $scope.sheets = btableService.queryCommandValue('sheetnames');

                btableService.on('sheetchange', function () {
                    $scope.sheets = btableService.queryCommandValue('sheetnames');
                    status.selected = btableService.queryCommandValue('sheetindex');
                    btableService.execCommand(['inputfocus']);

                    $scope.$apply();

                    refresh();
                });

                btableService.on('init', function () {
                    startIndex = 0;
                    endIndex = -1;

                    $.extend(status, {
                        selected: 0,

                        overflow: false,
                        leftMore: false,
                        rightMore: false
                    });

                    $scope.sheets = btableService.queryCommandValue('sheetnames');
                    status.selected = btableService.queryCommandValue('sheetindex');
                    btableService.execCommand(['inputfocus']);

                    $scope.$apply();

                    refresh();
                });

                $scope.addSheet = function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();

                    btableService.execCommand(['createsheet', true]);
                    btableService.execCommand(['inputfocus']);
                };

                $scope.leftClick = function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();

                    if (startIndex === 0) {
                        return;
                    }

                    startIndex -= 1;
                    btableService.execCommand(['switchsheet', startIndex]);
                    btableService.execCommand(['inputfocus']);
                };

                $scope.rightClick = function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();

                    var count = $scope.sheets.length;

                    if (endIndex === count - 1) {
                        return;
                    }

                    btableService.execCommand(['switchsheet', endIndex + 1]);
                    btableService.execCommand(['inputfocus']);
                };

                $scope.itemClick = function (evt, index) {
                    evt.stopPropagation();
                    evt.preventDefault();

                    btableService.execCommand(['switchsheet', index]);
                    btableService.execCommand(['inputfocus']);
                };

                // init item click
                (function () {
                    $list.on('mousedown', '.b-sl-item', function (evt) {
                        evt.stopPropagation();
                        evt.preventDefault();

                        var index = this.getAttribute('data-index') | 0;

                        btableService.execCommand(['switchsheet', index]);
                        btableService.execCommand(['inputfocus']);
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
                    var tpl = '<li class="b-sl-item ${active}" data-index="${index}"><div class="b-sl-item-top-space"></div><span class="b-sl-item-label">${sheetname}</span><div class="b-sl-item-bottom-space"></div></li>'

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
}]);