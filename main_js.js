$(document).ready(function(){
	
	var removableItem = $(".main_container");
	var removableItemTwo = $(".back_icon_container");
	var curElements = [removableItem,removableItemTwo];
	$('#1').click(function(){ homePageFunct(1)});
	$('#2').click(function(){ homePageFunct(2)});
	
});

function homePageFunct(id){
	
	switch(id){
		case 1:
			var winImage = "Windows";
			var macImage = "MacOS";
			var chrImage = "ChromeOS";
			var contentArray = [winImage,macImage,chrImage];
			addBreadCrumb("Repair my Device > ");
			removeContents(contentArray,this.curElements,3,1);
			break;
		case 2:
			addBreadCrumb("Appointment Information > ");
			drawClientPage();	
			break;
	}
}
	
function osSelect(id){
	switch(id){
		case 3:
			addBreadCrumb("Windows > ");
			problemPage();
			break;
		case 4:
			addBreadCrumb("MacOS > ");
			problemPage();
			break;
		case 5:
			addBreadCrumb("Chrome OS > ");
			problemPage();
			break;
	}
}

function backBtnClick(id){
	switch(id){
		case 6:
			var repairDevice = "Repair my Device";
			var clientInfo =   "<div>Look up my Appointment</div>";
			var newElements = [repairDevice,clientInfo];
			removeContents(newElements,this.curElements,1,2);
			break;
		case 4:
			//addBreadCrumb("MacOS > ");
			//problemPage();
			break;
		case 5:
			//addBreadCrumb("Chrome OS > ");
			//problemPage();
			break;
	}
}

function problemPage(){
	var newElements = ["Diagnostics","Virus Removal","Tune Up", "Software Install","Hardware Install","Other"];
	curElements = function(){return this.curElements};
	removeContents(newElements,curElements,7);
}

function drawClientPage(){
	
	var custName = '<input type="submit" value="Submit">';
	var clientPage = '<div>Client Entry Page</div>';
	var newElements = [custName,clientPage];
	curElements = function(){return this.curElements};
	removeContents(newElements,curElements,7);
}

function addBreadCrumb(breadCrumbText){
	var breadCrumb = $("<div></div>").addClass("bread_crumb");
		breadCrumb.text(breadCrumbText);
		breadCrumb.hide();
		$(".top_progress_bar").append(breadCrumb);
		breadCrumb.fadeIn("slow");
}

function slideFunct(animElement,duration,settings,marginValue) {
		return animElement.animate({
			marginLeft: marginValue
		}, jQuery.speed(duration,settings));
	};

function paddingAdjustFunct(animElement,duration,settings,paddingVal) {
		return animElement.animate({
			'padding-top': paddingVal,
			'padding-right': paddingVal,
			'padding-left': paddingVal,
			'padding-bottom': paddingVal,
		}, jQuery.speed(duration,settings));
	};
	
function removeContents(contentArray,curElements,id,direction){
	console.log("removing contents");
	var item = $(".sub_container");
	if(direction == 1){
		slideFunct(item,600,'swing',-($(window).width()));
	}
	else{
		item.css('margin-left','200px');
		item.css('position','fixed');
		slideFunct(item,600,'swing',($(window).width()));
	}
	
	item.promise().done(function(){
		item.remove();
		transistionSlideOutFadeIn(contentArray,id);
	});
	
}

function osColorFunct(id,tempContainer){
	switch(id){
			case 3:
				tempContainer.css('background-color', 'rgba(0,173,239,.7)');
				break;
			case 4:
				tempContainer.css('background-color', 'rgba(170,170,170,.7)');
				break;
			case 5:
				tempContainer.css('background-color', 'rgba(54,154,75,.7)');
				break;
	}
	console.log("Returning Recent Container");
	return tempContainer;
}
function transistionSlideOutFadeIn(contentArray,id) {
		console.log("Creating Content");
		var newDynContainer = $("<div></div>").addClass("sub_container");
		contentArray.forEach(function(contentArray){
			if(id >= 3){
				newDynContainer.width("75%");
				var tempContainer = $("<div onclick='osSelect("+id+")'></div>");
			}
			else{
				var tempContainer = $("<div onclick = 'homePageFunct("+id+")'></div>");
			}
			tempContainer.addClass("item_container");
			osColorFunct(id,tempContainer);
			tempContainer.append(contentArray);
			newDynContainer.append(tempContainer);
			id++;
		});
		if(id == 3){} else{
			var back_btn_container = $("<div></div>").addClass("back_btn_container");
			var back_btn = $("<div onclick='backBtnClick("+id+")'> < Go Back </div>").addClass("back_btn");
			id++;
			back_btn_container.append(back_btn);
			newDynContainer.append(back_btn_container);
		}
		
		newDynContainer.hide();
		newDynContainer.fadeIn(300);
		$(".main_container").append(newDynContainer);
		
	} 