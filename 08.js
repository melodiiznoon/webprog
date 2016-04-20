var source;
$(document).ready(function(){
	
	$("#btn-dtw").click(dtw);
	$("#result").hide();
	$("#img1").hide();
	$("#img2").hide();
	$(function () {
	    $("#in-img1:file").change(function () {
	        if (this.files && this.files[0]) {
	            var reader = new FileReader();
	            reader.onload = imageIsLoaded1;
	            
	            reader.readAsDataURL(this.files[0]);
	        }
	    });
	});

	$(function () {
	    $("#in-img2:file").change(function () {
	        if (this.files && this.files[0]) {
	            var reader = new FileReader();
	            reader.onload = imageIsLoaded2;
	            
	            reader.readAsDataURL(this.files[0]);
	        }
	    });
	});
});

function imageIsLoaded1(e) {
    $('#img1').attr('src', e.target.result);
    $("#img1").show();
    source1 = e.target.result;
    $('#imgSource').attr('src', source1);
};

function imageIsLoaded2(e) {
    $('#img2').attr('src', e.target.result);
    $("#img2").show();
    source2 = e.target.result;
    $('#imgSource').attr('src', source2);
};


function showImage(e) {
    $('<img>').appendTo($("#result")).attr('src', e.target.result);

};

function dtw(e){
	$("#func").hide();
	getRGB();
	$("#result").show();
};

function getRGB(e){
	var c = document.getElementById("cv1");
    var ctx=c.getContext("2d");
    var img = document.getElementById("img1");
    c.width = img.width;
    c.height = img.height;
	ctx.drawImage(img, 0, 0);
	var rgb = ctx.getImageData(0, 0, c.width, c.height).data;
	red = rgb[0];
	green = rgb[1];
	alert(red+" "+green);
};