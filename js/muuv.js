Muuv = function() {

}

Muuv.Person = function() {
    this.location = {};
    this.isDriver = false;
    this.seatsAvailable = 0;
}

Muuv.Location = function() {
    this.locLat = 0.0;
    this.locLong = 0.0;
    this.locText = "";

    //takes another location and returns the 'crowflies' distance to that location.
    //this is to be used if the google api is unavailable
    this.calcCrow = function(that) {
        returnMath.sqrt(
            Math.pow((this.locLat - that.locLat), 2) +
            Math.pow((this.locLong - that.locLong), 2)
        );
    }

    //takes another locaton and returns the google drive time to that locaiton
    this.calcTime = function(that) {

    }

}

addRow = function() {
    $('<div class="row" id="row_' + index + '"> <div class="col-sm-1 form-group"> <button class = "btn btn-default btn-block removePerson" id="'+index+'">x</button> </div> <div class="form-group col-sm-4"> <input type="text" class="form-control" id="name_' + index + '" placeholder="name"> </div> <div class=" form-group col-sm-3"  id="driverButton_' + index + '"> <button class="btn btn-info driverButton btn-block" id = "'+ index +'">driver</button> </div> <div class="form-group col-sm-3 changerBox hidden" id = "changerBox_'+ index +'"> <div class="input-group"> <span class="input-group-addon btn-danger numMinus" id = "' + index + '">x</span> <input type="text" class="form-control" id="car_' + index + '" value = "" placeholder="blank for pasenger"> <span class="input-group-addon numPlus" id="' + index + '">+</span> </div> </div> <div class="form-group col-sm-4"> <input type="text" class="form-control" id="loc_' + index + '" placeholder="location"> </div>  </div>').insertBefore("#placeBefore");
    index++;
}

// hideDriverButton = function(e){
// 	$(e).addClass('hidden');
// 	$('#changerBox_' + e.id).removeClass('hidden');
// }


index = 0;
numDeleted = 0;

$(document).ready(function() {
	$('#resultsContainer').hide();

    addRow();

    $('#newPersonButton').click(function() {
        addRow();
        $("html, body").animate({ scrollTop: $(document).height() }, 500);
    });

    $('body').on('click', '.numMinus', function() {

        box = $('#car_' + this.id);

        if($(this).html() == 'x'){
        	$('#car_' + this.id).html("");
        	$('#driverButton_' + this.id).removeClass('hidden');
    		$('#changerBox_' + this.id).addClass('hidden');
        }
       
        if (box.val() == "") {
            return;
        }
        val = parseInt(box.val());
        box.val(val - 1);
        if (box.val() < 1) {
            box.val(1);
        }
    });

    $('body').on('click', '.numPlus', function() {

        var box = $('#car_' + this.id);

        if (box.val() == "") {
            box.val(1);
            return;
        }
        var val = parseInt(box.val());
        box.val(val + 1);

    });

    $('body').on('click', '.numPlus, .numMinus', function(){
    	var num = this.id;

    	var button = $('#'+num+'.numMinus');
    	val = $('#car_'+num).val();
    	val = parseInt(val);
    	if(val == 1){
    		button.html("x");
    		button.addClass("btn-danger");
    	}else{
    		button.html("-");
    		button.removeClass("btn-danger");
    	}

    })

    $('body').on('click', '.driverButton', function(e){
    	e.preventDefault();
    	$('#car_'+this.id).val("1");
    	$('#driverButton_' + this.id).addClass('hidden');
    	$('#changerBox_' + this.id).removeClass('hidden');
    });

    $('body').on('click', '.removePerson', function(e){
    	e.preventDefault();
    	numDeleted++;
    	$('#row_'+this.id).remove();
    })

    $('body').on('click', '#submit', function(){
    	$('#formContainer').fadeOut(1500);
    	$("html, body").animate({ scrollTop: 0 }, 1500);
    	$('#resultsContainer').delay(1500).fadeIn(1000);

    	// OK HERE WE GO!
    	var personIndex = 0;
    	people = new Array(index-(numDeleted+10));
    	for(var i = 0; i < index; i++){
    		if($("#row_"+i)){
    			people[personIndex] = new Muuv.Person();
    			people[personIndex].name = $('#name_'+i).val();
    			if($("#car_"+i).val().length > 0){
	    			people[personIndex].isDriver = true;
	    			people[personIndex].seatsAvailable = parseInt($('#car_'+i).val());    				
    			}
    			people[personIndex].location = new Muuv.Location();
    			people[personIndex].location.text = $('#loc_'+i).val();
    			personIndex++;
    		}
    	}
    	var numPeople = personIndex;
    });

    $('#destinationText').blur(function(){
    	var text = $('#destinationText').val().replace(' ', "+");
    	$('#googleMap').attr('src') = text;
    });

});
