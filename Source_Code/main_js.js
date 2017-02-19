$(document).ready(function(){
	
	var removableItem = $(".main_container");
	var removableItemTwo = $(".back_icon_container");
	var curElements = [removableItem,removableItemTwo];
	$("#1").click(function(){
		var winImage = "Windows";
		var macImage = "MacOS";
		var chrImage = "ChromeOS";
		
		/* var macImage = "MacOS";
		macImage.css('color':'#aaaaaa');
		var chrImage = "Chrome OS";
		chrImage.css('color':'#369a4b'); */
		var contentArray = [winImage,macImage,chrImage];
		addBreadCrumb("Repair my Device > ");
		removeContents(contentArray,curElements,3);
	});
	$("#2").click(function(){
		addBreadCrumb("Appointment Information > ");
		drawClientPage();
	}); 
	
});
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
			//addBreadCrumb("Windows > ");
			//problemPage();
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
	//curElements = function(){return this.curElements};
	removeContents(newElements,this.curElements,7);
}

function drawClientPage(){
	var custName = '<input type="submit" value="Submit">';
	var clientPage = '<div>Client Entry Page</div>';
	var newElements = [custName,clientPage];
	removeContents(newElements,this.curElements,7);
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
	
function removeContents(contentArray,curElements,id){
	console.log("removing contents");
	var item = $(".sub_container");
	slideFunct(item,600,'swing',-($(window).width()));
	item.promise().done(function(){
		item.remove();
		transistionSlideOutFadeIn(contentArray,id);
	});
	
	/* curElements[1].animate({right: ($(window).width())/1.5});
	curElements[1].promise().done(function(){
	curElements[1].remove(); */
	
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
		//removeContents();
		var newDynContainer = $("<div></div>").addClass("sub_container");
		//newDynContainer.attr('marginLeft', $(window).width());
		newDynContainer.width("75%");
		contentArray.forEach(function(contentArray){
			var tempContainer = $("<div onclick='osSelect("+id+")'></div>");
			tempContainer.addClass("item_container");
			osColorFunct(id,tempContainer);
			tempContainer.append(contentArray);
			newDynContainer.append(tempContainer);
			id++;
		});
		var back_btn_container = $("<div></div>").addClass("back_btn_container");
		var back_btn = $("<div onclick='backBtnClick("+id+")'> < Go Back </div>").addClass("back_btn");
		id++;
		back_btn_container.append(back_btn);
		newDynContainer.append(back_btn_container);
		newDynContainer.hide();
		newDynContainer.fadeIn(300);
		$(".main_container").append(newDynContainer);
	} 