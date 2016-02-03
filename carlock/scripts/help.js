/* 
* @Author: ocean
* @Date:   2016-01-04 16:38:57
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-04 16:40:13
*/

// 页面data-href跳转事件
$(function(){
    $(document).on(oTools.clickEvent, '*[data-href]', function(){
        var $_this = $(this);

        location.href = $_this.attr('data-href');
    });
});