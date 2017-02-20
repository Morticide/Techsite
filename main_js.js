$(document).ready(function(){
	
	$('#1').click(function(){ homePageFunct(1)});
	$('#2').click(function(){ homePageFunct(2)});
	
});

function homePageFunct(id){
	
	switch(id){
		case 1:
			addBreadCrumb("Repair my Device > ");
			var winImage = "Windows";
			var macImage = "MacOS";
			var chrImage = "ChromeOS";
			var contentArray = [winImage,macImage,chrImage];
			removeContents(contentArray,3,1);
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
		case 7:
			var tag = $("#7");
			selToggle(tag);
			break;
		case 8:
			var tag = $("#8");
			selToggle(tag);
			break;
		case 9:
			var tag = $("#9");
			selToggle(tag);
			break;
		case 10:
			var tag = $("#10");
			selToggle(tag);
			break;
		case 11:
			var tag = $("#11");
			selToggle(tag);
			break;
		case 12:
			var tag = $("#12");
			selToggle(tag);
			break;
			
	}
}

function selToggle(tag){
	if(tag.attr('class') == 'item_container item_container_selected'){
		tag.removeClass("item_container_selected");
	}
	else{
		tag.addClass("item_container_selected");
	}
}

function backBtnClick(id){
	switch(id){
		case 6:
			var repairDevice = "Repair my Device";
			var clientInfo =   "Look up my Appointment";
			var newElements = [repairDevice,clientInfo];
			$(".bread_crumb").last().fadeOut(600,'swing');
			$(".bread_crumb").last().promise().done(function(){
				$(".bread_crumb").last().remove();
			});
			removeContents(newElements,1,2);
			break;
		case 13:
			var winImage = "Windows";
			var macImage = "MacOS";
			var chrImage = "ChromeOS";
			var contentArray = [winImage,macImage,chrImage];
			$(".bread_crumb").last().fadeOut(600,'swing').promise().done(function(){
				$(".bread_crumb").last().remove();
			});
			removeContents(contentArray,3,2);
			break;
	}
}

function problemPage(){
	var newElements = ["Diagnostics","Virus Removal","Tune Up", "Software Install","Hardware Install","Other"];
	removeContents(newElements,7,1);
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
	
function removeContents(content,id,direction){
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
		transistionSlideOutFadeIn(content,id);
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
function transistionSlideOutFadeIn(content,id) {
		var newDynContainer = $("<div></div>").addClass("sub_container");
		content.forEach(function(content){
			if(id >= 3){
				newDynContainer.width("75%");
				var tempContainer = $("<div onclick='osSelect("+id+")' id = "+id+"></div>");
			}
			else{
				var tempContainer = $("<div onclick = 'homePageFunct("+id+")'></div>");
			}
			tempContainer.addClass("item_container");
			osColorFunct(id,tempContainer);
			tempContainer.append(content);
			newDynContainer.append(tempContainer);
			id++;
		});
		if(id == 3){}
		else{
			var back_btn_container = $("<div></div>").addClass("back_btn_container");
			var back_btn = $("<div onclick='backBtnClick("+id+")'> < Go Back </div>").addClass("back_btn");
			if(id == 13){
				var continue_btn = $("<div onclick='continue()'> Continue </div>").addClass("back_btn");
				back_btn_container.append(back_btn,continue_btn);
			}
			else{back_btn_container.append(back_btn);}
			id++;
			newDynContainer.append(back_btn_container);
		}
		
		newDynContainer.hide();
		newDynContainer.fadeIn(300);
		$(".main_container").append(newDynContainer);
		
	} 