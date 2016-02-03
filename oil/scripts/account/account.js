/* 
* @Author: ocean
* @Date:   2015-12-18 13:06:50
* @Last Modified by:   ocean
* @Last Modified time: 2015-12-21 14:29:08
*/

'use strict';

function tipsDialog(obj){

    var tips = new Dialog({
        'msg': obj.mess,
        'type': 'alert',
        'lock':true,
        'width':'70%',
        'height': 'auto',
        'top': '40%',
        'closeButton': false,
        'animation':'animated bounceInDown',
        'showButtons': true,
        'submitButton': obj.btnTxt,
        'bConStyle': {
            'padding': '40px 10px 20px 10px'
        },
        'subStyle': {
            'border': 'none',
            'display': 'block',
            'width': '100%',
            'margin': '0 auto',
            'position': 'relative',
            'z-index': 9,
            'height': '50px',
            'border-top': '1px solid #e8e8e8',
            'background': 'none',
            'color': '#ff9000',
            'font-size': '16px'
        },
        'cancelButton': false,
        'contentStyle': {
            'background': '#fff',
            'border-radius': '5px',
            'font-size': '14px'
        },
        'onReady': function(){},
        'onSubmit': function(){
            if(obj.fn){
                obj.fn();
            }
        },
        'onClose': function() {}
    });
}