/*global $*/
/*global jQuery*/
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
			break;
	}
}

function continueFunct(){
	var i;
	var slctOptions = [];
	for(i = 7; i <= 12; i++){
		var temp = $('#'+i);
		console.log("running through for loop");
		if(temp.attr('class') == "item_container item_container_selected"){
			console.log(temp.text());
			slctOptions.push(temp.text());
		}
	}
	removeContents(3,slctOptions,1);
}

function btnOptions(id){
	switch(id){
		case 3:addBreadCrumb("Windows > ");problemPage(1);break;
		case 4:addBreadCrumb("MacOS > ");problemPage(1);break;
		case 5:addBreadCrumb("Chrome OS > ");problemPage(1);break;
		case 7:var tag = $("#7");selToggle(tag);break;
		case 8:var tag = $("#8");selToggle(tag);break;
		case 9:var tag = $("#9");selToggle(tag);break;
		case 10:var tag = $("#10");selToggle(tag);break;
		case 11:var tag = $("#11");selToggle(tag);break;
		case 12:var tag = $("#12");selToggle(tag);break;
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
		default:
			problemPage(2);
			break;
	}
}

function problemPage(action){
	var newElements = ["Diagnostics","Virus Removal","Tune Up", "Software Install","Hardware Install","Other"];
	if(action == 1){removeContents(newElements,7,1);}
	else if(action == 2){removeContents(newElements,7,2);}
}

function drawClientPage(slctOptions){
	var form = $("<form></form>");
	var firstNameLab = $("<label for='firstname'>Last Name</label>");
	var firstName = $("<input type='text' name = 'firstname'>");
	var firstField = [firstNameLab,firstName];
	var lastNameLab = $("<label for='lastname'>Last Name</label>");
	var lastName = $("<input type='text' mame = 'lastname'>");
	var secondField = [lastNameLab,lastName];
	var newElements = [firstField,secondField];
	slctOptions.forEach(function(slctOptions){
		var repairOpt = $("<div></div>");
		repairOpt.addClass("input");
		repairOpt.append(slctOptions);
		newElements.push(repairOpt);
	});
	transistionSlideOutFadeIn(newElements,15);
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
	
function removeContents(content,id,action){
	var item = $(".sub_container");
	if(action == 1){
		slideFunct(item,600,'swing',-($(window).width()));
	}
	else{
		item.css('marginLeft','200px');
		item.css('position','fixed');
		slideFunct(item,600,'swing',($(window).width()));
	}
	
	item.promise().done(function(){
		item.remove();
		if(content == 3){drawClientPage(id);}
		else{
			transistionSlideOutFadeIn(content,id);
		}
		
	});
	
}

function osColorFunct(id,tempContainer){
	switch(id){
			case 3:tempContainer.css('background-color', 'rgba(0,173,239,.7)');break;
			case 4:tempContainer.css('background-color', 'rgba(170,170,170,.7)');break;
			case 5:tempContainer.css('background-color', 'rgba(54,154,75,.7)');break;
	}
	return tempContainer;
}
function transistionSlideOutFadeIn(content,id) {
		var newDynContainer = $("<div></div>").addClass("sub_container");
		content.forEach(function(content){
			if(id >= 3){
				newDynContainer.width("75%");
				var tempContainer = $("<div onclick='btnOptions("+id+")' id = "+id+"></div>");
				tempContainer.addClass("item_container");
			}
			else if (id >= 15){
				newDynContainer.width("75%");
				var tempContainer = $("<div id="+id+"></div>");
				tempContainer.addClass("input");
			}
			else{
				var tempContainer = $("<div onclick = 'homePageFunct("+id+")'></div>");
				tempContainer.addClass("item_container");
			}
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
				id++;
				var continue_btn = $("<div id = "+id+" onclick='continueFunct()'> Continue </div>").addClass("back_btn");
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