$(document).ready(function(){

   var status=0; // Represents that timer is off now. Click on circle/ellipse to turn on//
   $('#break-length').val("5");
   $('#session-length').val("130");
   var time;
   time=parseInt($('#session-length').val());
   time=time*60;
   updateTime(time);
   /**** Function to update time on timer *****/

   function updateTime(nTime){
    // function to update time
     var showTime="";
     var h=Math.floor(nTime/3600);
     var m=Math.floor(nTime/60-h*60);
     var s=Math.floor(nTime%60);
     //console.log(h);
     //console.log(m);
     //console.log(s);
     if(h!=0){
         if(h<10)
           showTime+="0"+h.toString();
         else
           showTime+=h.toString();
     }
     else
       showTime+="00";
     if(m!=0){
        showTime+=":";
        if(m<10)
          showTime+="0"+m.toString();
       else
          showTime+=m.toString();
     }
     else
       showTime+=":00";
     if(s!=0){
        showTime+=":";
        if(s<10)
          showTime+="0"+s.toString();
       else
          showTime+=s.toString();
     }
      else
       showTime+=":00";

      $('#time').text(showTime);
   }

   /***** Button Click Events *****/

    $('#break-minus').click(function(){
       if(status===0){  // Change break length only when timer is paused.
         console.log($('#break-length').val());
         var newTime=parseInt($('#break-length').val())-1;
         if(newTime<0)  // No body can reduce time beyond zero
           newTime=0;
         $('#break-length').val(newTime.toString());
      }
    });

    $('#break-plus').click(function(){
       if(status===0){
          var newTime=parseInt($('#break-length').val())+1;
          if(newTime>1440) // You cannot increase time more than one day.
            newTime=1440;
          $('#break-length').val(newTime.toString());
       }
    });

    $('#session-minus').click(function(){
       if(status===0){
         var newTime=parseInt($('#session-length').val())-1;
         if(newTime<0)
            newTime=0;
         $('#session-length').val(newTime.toString());
         newTime*=60;  // Convert newTime to seconds before sending to updateTime function
         console.log(newTime);
         updateTime(newTime);
      }
   });

   $('#session-plus').click(function(){
      if(status===0){
         var newTime=parseInt($('#session-length').val())+1;
         if(newTime>1440)  // Not more than 24 hours :P
           newTime=1440;
         $('#session-length').val(newTime.toString());
         newTime*=60;  // Convert newTime to seconds before sending to updateTime function
         console.log(newTime);
         updateTime(newTime);  // Update session time in timer.
      }
   });

   $('#data').click(function(){

       if(status===0)
         status=1;
       else if(status==1)
         status=0;
       if(status==1){

         time=parseInt($('#session-length').val());
         time=time*60;
         function sessionStart(){
            time=time-1;
            console.log(time);
            if(time===0)
              tryTakingBreak();
            $('#type').text("Session");
            updateTime(time);
         }
         var t=setInterval(sessionStart,1000);
         function tryTakingBreak(){
            console.log("Break Time");
            clearInterval(t);
         }

       }

   });

});
