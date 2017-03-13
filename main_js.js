/*global $*/
/*global jQuery*/
$(document).ready(function(){
	$('#1').click(function(){ homePageFunct(1)});
	$('#2').click(function(){ homePageFunct(2)});
	console.log("Hello?");
	if (screen.width < 1025) {
		$("#viewport").attr("content", "width=480");
		$(".main_container").css("margin-top","30%");
		$(".item_container").css("padding","4%");
		$(".")
	}
});

function removeHelp(){
	$(".help_box").remove();
}
function removeOpts(id){
	var item = $("#"+id);
	var price = item.children("th.price_opts");
	var service = item.children("th.repair_opts").text();
	slideFunct(item,600,'swing',-($(window).width()));
	item.promise().done(function(){
		item.remove();
		var total = $(".bread_crumb").last().text();
		total = total.substr(12,total.length);
		var priceVal = price.text();
		total = total - priceVal;
		var match_id;
		if(service == "Diagnostics"){
			match_id = id+1;
		}
		if(service == "Virus Removal"){
			match_id = id-1;
		}
		var match_service = $("#"+match_id).children("th.repair_opts").text();
		if(match_service == "Virus Removal" || match_service == "Diagnostics"){
				total +=24;
			}
		total = Math.round(total * 100) / 100;
		$(".bread_crumb").last().text('Estimate: $ '+total);
		$("th.price_opts").last().text(total);
	});
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
			$(".top_progress_bar").css('opacity','.7');
			break;
		case 2:
			break;
	}
}

function continueFunct(use){
	var i;
	var slctOptions = [];
	var activeItems = [];
	var prices = [];
	
	for(i = 7; i <= 12; i++){
		var temp = $('#'+i);
		if(temp.attr('class') == "item_container item_container_selected"){
			slctOptions.push(temp.clone().children().remove().end().text());
			prices.push(i);
			activeItems.push(1);
		}
		else{
			activeItems.push(0);
		}
	}
	slctOptions.push("Estimate: ");
	if(use == 1){
		prices.unshift(3);
		prices.push(estTotal());
		removeContents(prices,slctOptions,1);
	}
	
	else{return activeItems;}
}

function dataValFunct(){
	var firstName = $("#firstname").val();
	var lastName = $("#lastname").val();
	var email = $("#email").val();
	var textArea = $("#textarea").val();
	
	if(firstName == ""){
		$("#firstname").addClass("invalid_entry");
	}
	else{
		$("#firstname").removeClass("invalid_entry");
	}
	
	if(lastName == ""){
		$("#lastname").addClass("invalid_entry");
	}
	else{
		$("#lastname").removeClass("invalid_entry");
	}
	
	if(email == ""){
		$("#email").addClass("invalid_entry");
	}
	else{
		$("#email").removeClass("invalid_entry");
	}
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

function triangleInfo(id){
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
				break;
		case 9:
			helpBoxText.text(" Password Reset:");
				helpBoxText.append($("<li>Local password removal or</li>").addClass("bullet_point"));
				helpBoxText.append($("<li>Password recovery help</li>").addClass("bullet_point"));
				break;
		case 10:
			helpBoxText.text(" Software Install:");
				helpBoxText.append($("<li>Software Installation includes driver installations, software product installation and configuration</li>").addClass("bullet_point"));
				break;
		case 11:
			helpBoxText.text(" Hardware Install:");
				helpBoxText.append($("<li>Physical installation of hardware</li>").addClass("bullet_point"));
				helpBoxText.append($("<li>Software Install maybe bundled depending on hardware part</li>").addClass("bullet_point"));
				break;
		
	}
	helpBox.append(helpBoxText);
	event.stopImmediatePropagation();
	$("#7").before(helpBox);
}

function selToggle(tag){
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
			$(".top_progress_bar").css('opacity','.0');
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

function drawClientPage(pricing,slctOptions){
	var table = $("<div class='table'></div>");
	//var firstRow = $("<tr></tr>").addClass("input_row");
		var firstInput = $("<div></div>").addClass("input_pair");
		var secondInput = $("<div></div>").addClass("input_pair");
	//var secondRow = $("<tr></tr>").addClass("input_row");
		var thirdInput = $("<div></div>").addClass("input_pair");
	
	var firstNameLab = $("<div for='firstname'>* First Name:</div>");
	var firstName = $("<input type='text' value = '' id = 'firstname'>");
	var lastNameLab = $("<div for='lastname'>* Last Name:</div>");
	var lastName = $("<input type='text' id = 'lastname'>");
	firstName.addClass("input_field");
	lastName.addClass("input_field");
	
	firstInput.append(firstNameLab,firstName);
	secondInput.append(lastNameLab,lastName);
	//firstRow.append(firstInput,secondInput);
	
	var emailLab = $("<div for='email'>* Email:</div>");
	var email = $("<input type='text'  id = 'email'>");
	email.addClass("input_field");
	
	thirdInput.append(emailLab,email);
	//secondRow.append(thirdInput);
	
	var labels = [firstNameLab,lastNameLab,emailLab];
	
	labels.forEach(function(labels){
		labels.addClass("input_label");
	});
	var fifthBlock = $("<div class='input_block'></div>");
	var t = 1;
	var estIndex = slctOptions.length;
	slctOptions.forEach(function(slctOptions){
		if(slctOptions == 'Not Sure?'){
			console.log("item selected");
			t++;
		}
		else if(slctOptions == 3){
		}
		else{
			if(t == estIndex){
				var curPrice = pricing[t];
			}
			else{
				curPrice = getPrice(pricing[t]);
				var removeOpt = $("<th onclick = removeOpts("+t+")>X</th>").addClass("remove_opts");
			}
			
			var repairOptRow = $("<tr id = "+t+"></tr>").addClass("repair_opts_row");
			var repairOpt = $("<th></th>");
			var priceOpt = $("<th></th>").addClass("price_opts");
			
			priceOpt.append(curPrice);
			repairOpt.append(slctOptions);
			repairOptRow.append(repairOpt,priceOpt,removeOpt);
			repairOpt.addClass("repair_opts");
			fifthBlock.append(repairOptRow);
			t++;
		}
	});
	var otherExp = $("<div class = 'input_pair'>Please describe your problem below if applicable</div>");
	var textField = $("<div class = 'input_pair'><textarea id='textarea' name = 'other' type='text' class = 'text_area'></textarea></div>");
	table.append(firstInput,secondInput,thirdInput,fifthBlock,otherExp,textField);
	transistionSlideOutFadeIn(table,15);
}

function getPrice(id){
	switch(id){
		case 7: return 69.99;
			
		case 8: return 99.99;
			
		case 9: return 39.99;
			
		case 10: return 29.99;
			
		case 11: return 49.99;
	}
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
	}
	
function removeContents(content,element,action){
	var item = $(".sub_container");
	if(action == 1){
		slideFunct(item,600,'swing',-($(window).width()));
	}
	else{
		slideFunct(item,600,'swing',($(window).width()));
		item.css('position','fixed');
	}
	item.promise().done(function(){
		item.remove();
		if(content[0] == 3){drawClientPage(content,element);}
		else{
			transistionSlideOutFadeIn(content,element);
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
				newDynContainer.css('background-color','rgba(7,3,36,.85');
				newDynContainer.append(content);
		}
		else{
			content.forEach(function(content){
			if(id >= 3 && id <= 14){
				var tempContainer = $("<div onclick='btnOptions("+id+")' id = "+id+"></div>");
				if(id >= 7 && id <= 11){
					var tempTriangle = "<div class ='triangle' onclick = triangleInfo("+id+")><img class = 'question_mark_img' src='CSS/Images/question_mark.png'></div>";
					tempContainer.append(content);
					tempContainer.append(tempTriangle);
					tempContainer.addClass("item_container");
					if (screen.width < 1025) {
						tempContainer.css("padding","4%");
					}
				}
				else{
					tempContainer.addClass("item_container");
					if (screen.width < 1025) {
						tempContainer.css("padding","4%");
					}
					tempContainer.append(content);
				}
			}
			
			else{
				tempContainer = $("<div onclick = 'homePageFunct("+id+")'></div>");
				tempContainer.addClass("item_container");
				if (screen.width < 1025) {
						tempContainer.css("padding","4%");
				}
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
				else if(id == 15){
					id++;
					continue_btn = $("<div onclick='dataValFunct()'> Submit </div>").addClass("back_btn");
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