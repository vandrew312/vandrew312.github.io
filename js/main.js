var intervalSliderInfo;
function startSliderInfo() 
{
	$("#promo li").css({opacity: 0});
	$("#promo li:first").css({opacity: 1});
	intervalSliderInfo = setInterval('sliderInfo()', 4000); /*4000*/
}
 
function sliderInfo() 
{	
	var current = ($('#promo li.show')?  $('#promo li.show') : $('#promo li:first'));
	var next = ((current.next().length) ? ((current.next().hasClass('show')) ? $('#promo li:first') :current.next()) : $('#promo li:first'));	
	next.css({opacity: 0}).addClass('show').animate({opacity: 1}, 1500);  /*1500*/
	current.animate({opacity: 0}, 1500, function() {  /*1500*/
	
	}).removeClass('show');
}

$(document).ready(function() {
	startSliderInfo();
});