
/* Common */

$("input[type='text']").css("border","lightgrey 1px solid");
$("button").css("outline","none");
$("input[type='text']:enabled").change(function() {
	if($(this).val() != '') {
		$(this).css("border-color","lightgrey");
	}
});
$("button[type='submit']").click(function() {
	var flag = 0;
	if(this.id == 'btn_sell_to_manufacturer') {
		if($("#id_cutting_polisher_name").val() == '') {
			$("#id_cutting_polisher_name").css("border-color","red");
			flag = 1;
		}
		if($("#id_cutting_polisher_country").val() == '') {
			$("#id_cutting_polisher_country").css("border-color","red");
			flag = 1;
		}
		if($("#id_cutting_polisher_town_village").val() == '') {
			$("#id_cutting_polisher_town_village").css("border-color","red");
			flag = 1;
		}
		if($("#id_cutting_polisher_br").val() == '') {
			$("#id_cutting_polisher_br").css("border-color","red");
			flag = 1;
		}
	}
	if(this.id == 'btn_sell_to_retailer') {
		if($("#id_manufacturer_name").val() == '') {
			$("#id_manufacturer_name").css("border-color","red");
			flag = 1;
		}
		if($("#id_manufacturer_country").val() == '') {
			$("#id_manufacturer_country").css("border-color","red");
			flag = 1;
		}
		if($("#id_manufacturer_town_village").val() == '') {
			$("#id_manufacturer_town_village").css("border-color","red");
			flag = 1;
		}
		if($("#id_manufacturer_br").val() == '') {
			$("#id_manufacturer_br").css("border-color","red");
			flag = 1;
		}
	}
	if(this.id == 'btn_sell_to_customer') {
		if($("#id_retailer_name").val() == '') {
			$("#id_retailer_name").css("border-color","red");
			flag = 1;
		}
		if($("#id_retailer_country").val() == '') {
			$("#id_retailer_country").css("border-color","red");
			flag = 1;
		}
		if($("#id_retailer_town_village").val() == '') {
			$("#id_retailer_town_village").css("border-color","red");
			flag = 1;
		}
		if($("#id_retailer_br").val() == '') {
			$("#id_retailer_br").css("border-color","red");
			flag = 1;
		}
	}
	if($("#parcelID").val() == '') {
		$("#parcelID").css("border-color","red");
		flag = 1;
	}
	if($("#dCarat").val() == '') {
		$("#dCarat").css("border-color","red");
		flag = 1;
	}
	if($("#dValue").val() == '') {
		$("#dValue").css("border-color","red");
		flag = 1;
	}
	/*if(flag == 0) {
		$(this).parent().closest('form').submit();
	}*/
});

/* Miner */

$("#id_select_rough_trader").css("border","lightgrey 1px solid");
$("#id_parcel_details").click(function() {
	$("#icon_parcel_details").toggleClass('fa-minus-circle');
});
$("#id_rough_trader").click(function() {
	$("#icon_rough_trader").toggleClass('fa-minus-circle');
});
$("#id_select_rough_trader").change(function() {
	var op = this.value, country = '', br = '';
	switch(op) {
	    case '1':
	        country = 'South Africa';
	        br = 'BR5009';
        break;
	    case '2':
	        country = 'Brazil';
	        br = 'BR4007';
        break;
		case '3':
	        country = 'Canada';
	        br = 'BR2008';
        break;
	    default:
	        country = '';
	        br = '';
        break;
	}
	/*$("#id_rtc").val(country);*/
	$("#id_rtbr").val(br);
});

/* Rough Trader */

$("#id_select_cutting_polisher").css("border","lightgrey 1px solid");
$("#id_miner").click(function() {
	$("#icon_miner").toggleClass('fa-minus-circle');
});
$("#id_cutting_polisher").click(function() {
	$("#icon_cutting_polisher").toggleClass('fa-minus-circle');
});
$("#id_select_cutting_polisher").change(function() {
	var op = this.value, country = '', br = '';
	switch(op) {
	    case '1':
	        country = 'Kenya';
	        br = 'BR6003';
        break;
	    case '2':
	        country = 'Ghana';
	        br = 'BR7004';
        break;
		case '3':
	        country = 'Morocco';
	        br = 'BR7007';
        break;
	    default:
	        country = '';
	        br = '';
        break;
	}
	$("#id_cutting_polisher_country").val(country);
	$("#id_cutting_polisher_br").val(br);
});

/* Cutting Polisher */

/* Manufacturer */

$("#id_manufacturer").click(function() {
	$("#icon_manufacturer").toggleClass('fa-minus-circle');
});

/* Retailer */

$("#id_retailer").click(function() {
	$("#icon_retailer").toggleClass('fa-minus-circle');
});

