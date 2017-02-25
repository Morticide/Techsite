/*global $*/
/*global jQuery*/
$(document).ready(function(){
	
	$('#1').click(function(){ homePageFunct(1)});
	$('#2').click(function(){ homePageFunct(2)});
});

function estTotal(){
	var activeItems = continueFunct(0);
	var price = [];
	price.push(69.99);
	price.push(99.99);
	price.push(39.99);
	price.push(29.99);
	price.push(49.99);
	
	var total = 0;
	var i = 0;
	price.forEach(function(){
		total += price[i] * activeItems[i];
		i++;
	});
	if(activeItems[1] == 1 && activeItems[0] == 1){
		total -= 24;
	}
	total = Math.round(total * 100) / 100;
	$(".bread_crumb").last().text('Estimate: $ '+total);
}

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

function continueFunct(use){
	var i;
	var slctOptions = [];
	var activeItems = [];
	for(i = 7; i <= 12; i++){
		var temp = $('#'+i);
		if(temp.attr('class') == "item_container item_container_selected"){
			slctOptions.push(temp.text());
			activeItems.push(1);
		}
		else{
			activeItems.push(0);
		}
	}
	if(use == 1){
		removeContents(3,slctOptions,1);
	}
	else{return activeItems;}
}

function btnOptions(id){
	var tag;
		switch(id){
		case 3:addBreadCrumb("Windows > ");problemPage(1);break;
		case 4:addBreadCrumb("MacOS > ");problemPage(1);break;
		case 5:addBreadCrumb("Chrome OS > ");problemPage(1);break;
		case 7:tag = $("#7");
			selToggle(tag);
			break;
		case 8:tag = $("#8");
			selToggle(tag);
			if(selToggle($("#7")) == 0){selToggle($("#7"));}
			break;
		case 9:tag = $("#9");
			selToggle(tag);
			break;
		case 10:tag = $("#10");
			selToggle(tag);
			break;
		case 11:tag = $("#11");
			selToggle(tag);
			break;
		case 12:tag = $("#12");
			selToggle(tag);
			break;
		}
		estTotal();
}

function selToggle(tag){
	var active;
	if(tag.attr('class') == 'item_container item_container_selected'){
		tag.removeClass("item_container_selected");
		return 0;
	}
	else{
		tag.addClass("item_container_selected");
		return 1;
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
				$(".bread_crumb").last().fadeOut(600,'swing').promise().done(function(){
					$(".bread_crumb").last().remove();
				});
			});
			
			removeContents(contentArray,3,2);
			break;
		default:
			$(".bread_crumb").last().promise().done(function(){
				$(".bread_crumb").last().remove();
					problemPage(2);
			});
			
			break;
	}
}

function problemPage(action){
	var newElements = ["Diagnostics","Virus Removal","Password Reset", "Software Install","Hardware Install","Other"];
	if(action == 1){removeContents(newElements,7,1);}
	else if(action == 2){removeContents(newElements,7,2);}
	addBreadCrumb('Estimate: $ 0');
}

function drawClientPage(slctOptions){
	
	var formTable = $("<table></table>");
	
	var firstRow = $("<tr></tr>");
	var secondRow = $("<tr></tr>");
	var thirdRow = $("<tr></tr>");
	var fourthRow = $("<tr></tr>");
	
	var firstNameLab = $("<th><label for='firstname'>First Name</label></th>");
	var firstName = $("<th><input type='text' name = 'firstname'></th>");
	var lastNameLab = $("<th><label for='lastname'>Last Name</label></th>");
	var lastName = $("<th><input type='text' mame = 'lastname'></th>");
	
	firstRow.append(firstNameLab,firstName,lastNameLab,lastName);
	
	var emailLab = $("<th><label for='email'>Email</label></th>");
	var email = $("<th><input type='text' mame = 'email'></th>");
	var addressLab = $("<th><label for='address'>Address</label></th>");
	var address = $("<th><input type='text' mame = 'address'></th>");
	
	secondRow.append(emailLab,email,addressLab,address);
	
	var cityLab = $("<th><label for='city'>City</label></th>");
	var city = $("<th><input type='text' mame = 'city'></th>");
	var zipLab = $("<th><label for='address'>Zip</label></th>");
	var zip = $("<th><input type='text' mame = 'zip'></th>");
	
	thirdRow.append(cityLab,city,zipLab,zip);
	
	var dateLab = $("<th><label for='address'>Scedule a visit date</label></th>");
	var date = $("<th><input type='date' name='schDate'></th>");
	
	fourthRow.append(dateLab,date);
	
	var fifthRow = $("<tr></tr>");
	
	slctOptions.forEach(function(slctOptions){
		var repairOpt = $("<th><div></div></th>");
		repairOpt.addClass("input");
		repairOpt.append(slctOptions);
		fifthRow.append(repairOpt);
	});
	
	formTable.append(firstRow,secondRow,thirdRow,fourthRow,fifthRow);
	transistionSlideOutFadeIn(formTable,15);
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
		console.log(content);
		
		if (id >= 15){
				newDynContainer.width("75%");
				newDynContainer.append(content);
		}
		else{
			content.forEach(function(content){
			if(id >= 3 && id <= 14){
				newDynContainer.width("75%");
				var tempContainer = $("<div onclick='btnOptions("+id+")' id = "+id+"></div>");
				tempContainer.addClass("item_container");
				tempContainer.append(content);
			}
			
			else{
				var tempContainer = $("<div onclick = 'homePageFunct("+id+")'></div>");
				tempContainer.addClass("item_container");
				tempContainer.append(content);
			}
			osColorFunct(id,tempContainer);
			newDynContainer.append(tempContainer);
			id++;
		});
			if(id == 3){}
			else{
				var back_btn_container = $("<div></div>").addClass("back_btn_container");
				var back_btn = $("<div onclick='backBtnClick("+id+")'> < Go Back </div>").addClass("back_btn");
				if(id == 13){
					id++;
					var continue_btn = $("<div id = "+id+" onclick='continueFunct(1)'> Continue </div>").addClass("back_btn");
					back_btn_container.append(back_btn,continue_btn);
				}
				else{back_btn_container.append(back_btn);}
				id++;
				newDynContainer.append(back_btn_container);
			}
		}
		
		
		newDynContainer.hide();
		newDynContainer.fadeIn(300);
		$(".main_container").append(newDynContainer);
}