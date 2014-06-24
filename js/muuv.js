Muuv=function(){

}

Muuv.Person=function(){
	this.location=newLocation();
	this.isDriver=false;
	this.seatsAvailable=0;
	this.places
}

Muuv.Location=function(){
	this.locLat=0.0;
	this.locLong=0.0;
	this.locText="";

	//takesanotherlocationandreturnsthe'crowflies'distancetothatlocation.
	//thisistobeusedifthegoogleapiisunavailable
	this.calcCrow=function(that){
		returnMath.sqrt(
			Math.pow((this.locLat-that.locLat),2)+
			Math.pow((this.locLong-that.locLong),2)
			);
	}

	//takesanotherlocatonandreturnsthegoogledrivetimedistancetothatlocaiton
	this.calcTime=function(that){

	}

}