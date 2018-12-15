var hmainwrapper

// Количество снежинок на странице (Ставьте в границах 30-40, больше не рекомендую)
var snowmax=35; //35;
 
// Установите цвет снега, добавьте столько цветов сколько пожелаете
var snowcolor=new Array("#AAAACC","#DDDDFF","#CCCCDD","#F3F3F3","#F0FFFF","#FFFFFF","#EFF5FF")
 
// Поставьте шрифты из которых будет создана снежинка ставьте столько шрифтом сколько хотите
var snowtype=new Array("Arial Black","Arial Narrow","Times","Comic Sans MS");
 
// Символ из какого будут сделаны снежинки (по умолчанию * )
var snowletter="*";
 
// Скорость падения снега (рекомендую в границах от 0.3 до 2)
var sinkspeed=0.6; 
 
// Максимальный размер снежинки
var snowmaxsize=22;//22;
 
// Установите минимальный размер снежинки
var snowminsize=8;
 
// Устанавливаем положение снега
// Впишите 1 чтобы снег был по всему сайту, 2 только слева 
// 3 только по центру, 4 снег справа
var snowingzone=1;
 
 
/*
//   * ПОСЛЕ ЭТОЙ ФРАЗЫ БОЛЬШЕ НЕТ КОНФИГУРАЦИИ*
*/
 
// НИЧЕГО НЕ ИЗМЕНЯТЬ
 
var snow=new Array();
var marginbottom;
var marginright;
var timer;
var i_snow=0;
var x_mv=new Array();
var crds=new Array();
var lftrght=new Array();
var browserinfos=navigator.userAgent;
var ie5=document.all&&document.getElementById&&!browserinfos.match(/Opera/);
var ns6=document.getElementById&&!document.all;
var opera=browserinfos.match(/Opera/);
var browserok=ie5||ns6||opera;
function randommaker(range) {
	rand=Math.floor(range*Math.random());
	return rand;
}
function initsnow() {
	if (ie5 || opera) {
		marginbottom=hmainwrapper; //document.body.clientHeight;
		marginright=document.body.clientWidth-16;
	}
	else if (ns6) {
		marginbottom=hmainwrapper;  //window.innerHeight;
		marginright=window.innerWidth-16;
	}
	var snowsizerange=snowmaxsize-snowminsize;
	for (i=0;i<=snowmax;i++) {
		crds[i]=0;
		lftrght[i]=Math.random()*15;
		x_mv[i]=0.03+Math.random()/10;
		snow[i]=document.getElementById("s"+i);
		snow[i].style.fontFamily=snowtype[randommaker(snowtype/length)];
		snow[i].size=randommaker(snowsizerange)+snowminsize;
		snow[i].style.fontSize=snow[i].size+"px";
		snow[i].style.color=snowcolor[randommaker(snowcolor.length)];
		snow[i].sink=sinkspeed*snow[i].size/5;
		if (snowingzone==1) {snow[i].posx=randommaker(marginright-snow[i].size);
			//console.log(snow[i].posx);
		
		}
		if (snowingzone==2) {snow[i].posx=randommaker(marginright/2-snow[i].size)}
		if (snowingzone==3) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/4}
		if (snowingzone==4) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/2}
		snow[i].posy=randommaker(2*marginbottom-marginbottom-2*snow[i].size);
		snow[i].style.left=snow[i].posx+"px";
		snow[i].style.top=snow[i].posy+"px";
	}
	movesnow();
}
function movesnow() {
	for(i=0;i<=snowmax;i++) {
		crds[i]+=x_mv[i];
		snow[i].posy+=snow[i].sink;
		snow[i].style.left=snow[i].posx+lftrght[i]*Math.sin(crds[i])+"px";
		//var bodyx = document.getElementById('body').offsetWidth;
		//console.log(bodyx); //
		snow[i].style.top=snow[i].posy+"px";
		if (snow[i].posy>=marginbottom-4*snow[i].size || parseInt(snow[i].style.left)>(marginright-3*lftrght[i])) {
			if (snowingzone==1) {snow[i].posx=randommaker(marginright-snow[i].size);
				//console.log(snow[i].posx);
				
				//document.getElementById('snowpos').innerHTML = snow[i].size; //snow[i].posx;	
			}
			if (snowingzone==2) {snow[i].posx=randommaker(marginright/2-snow[i].size)}
			if (snowingzone==3) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/4}
			if (snowingzone==4) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/2}
			snow[i].posy=0;
		}
	}
	var timer=setTimeout("movesnow()",50);
}
for (i=0;i<=snowmax;i++) {
	document.write("<span id='s"+i+"' style='position:absolute;top:-"+snowmaxsize+"px;'>"+snowletter+"</span>");
}
if (browserok) {
	 window.onload = function () {
	 hmainwrapper = document.getElementById('main_wrapper').offsetHeight;
	 document.getElementById('background-img').style.height=hmainwrapper+"px"; 
	 initsnow();
	}
}