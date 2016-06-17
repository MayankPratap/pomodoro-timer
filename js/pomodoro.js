$(document).ready(function(){

   $('#break-length').val(5);
   $('#session-length').val(25);

   $('#break-minus').click(function(){
      console.log($('#break-length').val());
      var newTime=parseInt($('#break-length').val())-1;
      if(newTime<0)
        newTime=0;

      $('#break-length').val(newTime.toString());

   });

   $('#break-plus').click(function(){

      var newTime=parseInt($('#break-length').val())+1;
      $('#break-length').val(newTime.toString());

   });

   $('#session-minus').click(function(){

      var newTime=parseInt($('#session-length').val())-1;
      if(newTime<0)
        newTime=0;
      $('#session-length').val(newTime.toString());

   });

   $('#session-plus').click(function(){

      var newTime=parseInt($('#session-length').val())+1;
      $('#session-length').val(newTime.toString());

   });
   
});
