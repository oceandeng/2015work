var filelist = [];
var $upload = $('#upload');

$('#btn').on('click', function(){
	$upload.click();
});

//图片
$upload.on('change', function(e){
	var evt = e || window.event;
	var file = evt.target.files;
	var filemain = file[0];
	var blob = getBlobURL(file[0]);
	var html = '';
	var d = Date.now();
	var base64str;
	var orien = {
		compress: false
	};

	html += '<div id="img' + d + '" class="item">' + 
			'<div class="progress" style="width:0%"></div>' + 
			'<div class="shade"></div>' + 
			'<div class="item-img"><img src=""/></div></div>';
	$('#preview').append(html);

	var reader= new FileReader();

	reader.onload = function(e){

		if(filemain.type == 'image/jpeg'){
			try{
				var jpeg = new JpegMeta.JpegFile(this.result, filemain.name);

				if (jpeg.tiff && jpeg.tiff.Orientation) {
				orien = $.extend(orien, {
					orien: jpeg.tiff.Orientation.value
				});
			}
			}catch(e){
				alert(e);
			}
		}
		if(ImageCompresser.support()){

			var img = new Image();

			img.onload = function(){
				try{
					base64str = ImageCompresser.getImageBase64(img, orien);
				}catch(e){
					alert('error' + e);
					$('#img' + d).remove();
					return false;
				}
				if(base64str.indexOf('data:image') < 0){
					alert('上传格式不正确');
					$('#img' + d).remove();
					return false;
				}

				$('#img' + d).find('img').attr('src', blob);
				revokeBlobURL(blob);


				//ajax
				uploadFile({
					url: gConfig.ajaxURL,
					cur: 'base',
					curfile: base64con(base64str),
					success: function(){
						$('#img' + d).find('.shade').remove();
					},
					progress: function(rate){
						$('#img' + d).find('.progress').css('width', rate + '%');
					},
					complete: function(){
						$('#img' + d).find('.progress').remove();
					}
				});
			}
			img.src = blob;
		}
	}
	reader.readAsBinaryString(filemain);
});

//方法
function base64con(str){
	var arr = str.split(',');
	return arr[arr.length-1];
}
//ajax
function uploadFile(obj) {
    var xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);

    // xhr.upload.onprogress = function(event){
    // 	uploadProgress(event, obj);
    // }

    xhr.open("POST", obj.url, true);

    var fd = new FormData();
    fd.append(obj.cur, obj.curfile);

    xhr.send(fd);
    xhr.onreadystatechange=function(){
    	if(xhr.readyState == 2){
    		return;
    	}
        if(xhr.readyState == 4){
            if(xhr.status == 200){
	            console.log(xhr.responseText);
	            obj.success();
	        }else{
	            console.log("获取数据错误！错误代号："+ xhr.status +"错误信息："+ xhr.statusText);
	        }
        }
    }
	function uploadComplete(){
            console.log('All 上传成功');
            obj.complete();
            return;
    };
	function uploadFailed(){
	    alert("网络超时!请重新选择图片！");
	};
	function uploadCanceled(){
	    alert("上传已由用户或浏览器连接被取消掉了!");
	};
	function uploadProgress(event){
		if(event.lengthComputable){
			if(event.loaded == event.total){
				var rate = 100;
			}else{
				rate = 100 * (event.loaded / event.total);
			}
			if(rate > 100){
				rate = 100;
			}
		}else{
			alert('不能确定文件的大小');
		}
		obj.progress(rate);
	}
}

// function ajaxmethod(base64str){
// 	$.ajax({
// 		url: 'file.php',
// 		type: 'POST',
// 		data: {'base': base64str},
// 		success: function(res){
// 			console.log(res);
// 		}
// 	});
// }
// function checkPicType(file){
// 	if(file.type.indexOf('image/') == 0){
// 		return true;
// 	}else{
// 		return false;
// 	}
// }
// function checkPicSize(file){
// 	if(file.size > 10000000){
// 		return false;
// 	}
// 	return true;
// }