// SWIPER
var swiper = new Swiper('#tuto', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    observer: true,
    onReachEnd: function(swiper) {
  	//callback function code here
  		$("#tuto").hide();
  		$("#theMenu").modal("toggle");
 }
});  
var swiper2 = new Swiper('#aboutswiper', {
    paginationClickable: true,
    observer: true,
    onReachEnd: function(swiper) {
  	//callback function code here
  		$("#aboutswiper").hide();
  		$("#theMenu").modal("toggle");
 }
});  
var swiper3 = new Swiper('#tolswiper', {
    paginationClickable: true,
    observer: true,
    onReachEnd: function(swiper) {
  	//callback function code here
  		$("#tolswiper").hide();
  		$("#theMenu").modal("toggle");
 }
});  
var swiper4 = new Swiper('#contactswiper', {
    paginationClickable: true,
    observer: true,
    onReachEnd: function(swiper) {
  	//callback function code here
  		$("#contactswiper").hide();
  		$("#theMenu").modal("toggle");
 }
});  
var swiper5 = new Swiper('#shareswiper', {
    paginationClickable: true,
    observer: true,
    onReachEnd: function(swiper) {
  	//callback function code here
  		$("#shareswiper").hide();
  		$("#theMenu").modal("toggle");
 }
});  
