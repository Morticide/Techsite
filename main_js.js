/*global $*/
/*global jQuery*/
$(document).ready(function(){
	$('#1').click(function(){ homePageFunct(1)});
	$('#2').click(function(){ homePageFunct(2)});
});

function removeHelp(){
	console.log("attempting removal of help box");
	$(".help_box").remove();
}

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
	return total;
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
			slctOptions.push(temp.clone().children().remove().end().text());
			activeItems.push(1);
		}
		else{
			activeItems.push(0);
		}
	}
	
	slctOptions.push($(".bread_crumb").last().text());
	
	if(use == 1){
		removeContents(3,slctOptions,1);
	}
	else{return activeItems;}
}

function btnOptions(id){
	console.log("Service Choice Button Clicked");
	
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

function triangleInfo(id){
	console.log("Triangle Clicked");
	$(document).on("mousedown",removeHelp);
	var helpBox = $("<div class= 'help_box' onclick = removeHelp()></div>");
	var helpBoxText = $("<ul></ul>");
	switch(id){
		case 7:
			helpBoxText.text("Diagnostics:");
				helpBoxText.append($("<li>Hardware Diagnostics</li>").addClass("bullet_point"));
				helpBoxText.append($("<li>Physical Inspection</li>").addClass("bullet_point"));
				helpBoxText.append($("<li>Software Troubleshooting</li>").addClass("bullet_point"));
				break;
		case 8:
			helpBoxText.text("Virus/Malware Removal:");
				helpBoxText.append($("<li>Malicious program removal</li>").addClass("bullet_point"));
				helpBoxText.append($("<li>Startup Optimization</li>").addClass("bullet_point"));
				helpBoxText.append($("<li>Temp File Cleanup</li>").addClass("bullet_point"));
				helpBoxText.append($("<li>Malicious extension removal</li>").addClass("bullet_point"));
				helpBoxText.append($("<li>Windows Updates and AV updates</li>").addClass("bullet_point"));
				helpBoxText.append($("<li>Diagnostics service bundling is suggested</li>").addClass("bullet_point"));
				break;
		case 9:
			helpBoxText.text(" Password Reset:");
				helpBoxText.append($("<li>Local password removal or</li>").addClass("bullet_point"));
				helpBoxText.append($("<li>Password recovery help</li>").addClass("bullet_point"));
				break;
		case 10:
			helpBoxText.text(" Software Install:");
				helpBoxText.append($("<li>Software Installation includes driver installations, software product installation and configuration</li>").addClass("bullet_point"));
				helpBoxText.append($("<li>Software Update</li>").addClass("bullet_point"));
				break;
		case 11:
			helpBoxText.text(" Hardware Install:");
				helpBoxText.append($("<li>Physical installation of hardware</li>").addClass("bullet_point"));
				helpBoxText.append($("<li>Hardware Parts that we install are GPU's, Power Supplies, Storage Drives, DVD drives, Cases/Case Swaps, Fans, Closed Liquid Cooling units </li>").addClass("bullet_point"));
				helpBoxText.append($("<li>Software Install maybe bundled depending on hardware part</li>").addClass("bullet_point"));
				break;
		
	}
	helpBox.append(helpBoxText);
	event.stopImmediatePropagation();
	$("#7").before(helpBox);
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
	var newElements = ["Diagnostics","Virus Removal","Password Reset", "Software Install","Hardware Install","Not Sure?"];
	if(action == 1){removeContents(newElements,7,1);}
	else if(action == 2){removeContents(newElements,7,2);}
	addBreadCrumb('Estimate: $ 0');
}

function drawClientPage(slctOptions){
	
	var formTable = $("<table></table>");
	
	var firstRow = $("<tr></tr>").addClass("input_row");
		var firstInput = $("<div></div>").addClass("input_pair");
		var secondInput = $("<div></div>").addClass("input_pair");
	var secondRow = $("<tr></tr>").addClass("input_row");
		var thirdInput = $("<div></div>").addClass("input_pair");
		var fourthInput = $("<div></div>").addClass("input_pair");
	var thirdRow = $("<tr></tr>").addClass("input_row");
		var fifthInput = $("<div></div>").addClass("input_pair");
		var sixthInput = $("<div></div>").addClass("input_pair");
	var fourthRow = $("<tr></tr>").addClass("input_row");
		var seventhInput = $("<div></div>").addClass("input_pair");
		var eighthInput = $("<div></div>").addClass("input_pair");
	
	var firstNameLab = $("<th><label for='firstname'>* First Name:</label></th>");
	var firstName = $("<th><input type='text' name = 'firstname'></th>");
	var lastNameLab = $("<th><label for='lastname'>* Last Name:</label></th>");
	var lastName = $("<th><input type='text' mame = 'lastname'></th>");
	
	firstInput.append(firstNameLab,firstName);
	secondInput.append(lastNameLab,lastName);
	firstRow.append(firstInput,secondInput);
	
	var emailLab = $("<th><label for='email'>* Email:</label></th>");
	var email = $("<th><input type='text' mame = 'email'></th>");
	var addressLab = $("<th><label for='address'>Home Address:</label></th>");
	var address = $("<th><input type='text' mame = 'address'></th>");
	
	thirdInput.append(emailLab,email);
	fourthInput.append(addressLab,address);
	secondRow.append(thirdInput,fourthInput);
	
	var cityLab = $("<th><label for='city'>City:</label></th>");
	var city = $("<th><input type='text' mame = 'city'></th>");
	var zipLab = $("<th><label for='address'>Zip:</label></th>");
	var zip = $("<th><input type='text' mame = 'zip'></th>");
	
	fifthInput.append(cityLab,city);
	sixthInput.append(zipLab,zip);
	thirdRow.append(fifthInput,sixthInput);
	
	var dateLab = $("<th><label for='schDate'>Schedule a visit date</label></th>");
	var date = $("<th><input type='date' name='schDate'></th>");
	
	var timeLab = $("<th><label for='time'>Pick a Time</label></th>");
	var time = $("<th><input name='time' type='time'></th>");
	date.addClass("date_picker");
	
	seventhInput.append(dateLab,date);
	eighthInput.append(timeLab,time);
	fourthRow.append(seventhInput,eighthInput);
	
	var labels = [firstNameLab,lastNameLab,emailLab,addressLab,cityLab,zipLab,dateLab,timeLab];
	var inputText = [firstName,lastName,email,address,city,zip,date,time];
	
	labels.forEach(function(labels){
		labels.addClass("input_label");
	});
	inputText.forEach(function(inputText){
		inputText.addClass("input_label");
	});
	
	var fifthRow = $("<tr class='input_row'></tr>");
	slctOptions.forEach(function(slctOptions){
		if(slctOptions == 'Other'){
		}
		else{
			var repairOpt = $("<th></th>");
			repairOpt.append(slctOptions);
			repairOpt.addClass("input input_label repair_opts");
			fifthRow.append(repairOpt);
		}
	});
	var otherExp = $("<tr class = 'input_row'><th>Please describe your problem below if applicable</th></tr>");
	var textField = $("<tr class = 'input_row' ><th><textarea name = 'other' type='text' rows='4' cols='50' class = 'other_text'></textarea></th></tr>");
	formTable.append(firstRow,secondRow,thirdRow,fourthRow,fifthRow,otherExp,textField);
	
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
		
		if (id >= 15){
				newDynContainer.width("75%");
				newDynContainer.css('background-color','rgba(7,3,36,.85');
				newDynContainer.append(content);
		}
		else{
			content.forEach(function(content){
			if(id >= 3 && id <= 14){
				newDynContainer.width("75%");
				var tempContainer = $("<div onclick='btnOptions("+id+")' id = "+id+"></div>");
				if(id >= 7 && id <= 11){
					var tempTriangle = "<div class ='triangle' onclick = triangleInfo("+id+")><div class= 'triangle_text'>?</div></div>";
					tempContainer.append(content);
					tempContainer.append(tempTriangle);
					tempContainer.addClass("item_container");
				}
				else{
					tempContainer.addClass("item_container");
					tempContainer.append(content);
				}
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
		
		}
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
		
		
		newDynContainer.hide();
		newDynContainer.fadeIn(300);
		$(".main_container").append(newDynContainer);
}