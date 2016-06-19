$(document).ready(function(){

   var status=0; // Represents that timer is off now. Click on circle/ellipse to turn on//
   $('#break-length').val("5");
   $('#session-length').val("130");
   updateTime();

   function updateTime(){
    // function to update time
     time=parseInt($('#session-length').val());
     time=time*60;
     var showTime="";
     var h=Math.floor(time/3600);
     var m=Math.floor(time/60-h*60);
     var s=Math.floor(time%60);
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

    $('#break-minus').click(function(){
       console.log($('#break-length').val());
       var newTime=parseInt($('#break-length').val())-1;
       if(newTime<0)  // No body can reduce time beyond zero
          newTime=0;

       $('#break-length').val(newTime.toString());
    });

    $('#break-plus').click(function(){

       var newTime=parseInt($('#break-length').val())+1;
       if(newTime>1440) // You cannot increase time more than one day.
         newTime=1440;
       $('#break-length').val(newTime.toString());
    });

    $('#session-minus').click(function(){

       var newTime=parseInt($('#session-length').val())-1;
       if(newTime<0)
         newTime=0;
       $('#session-length').val(newTime.toString());
       updateTime();  // update session time in timer

   });

   $('#session-plus').click(function(){

      var newTime=parseInt($('#session-length').val())+1;
      if(newTime>1440)  // Not more than 24 hours :P
        newTime=1440;
      $('#session-length').val(newTime.toString());
      updateTime();  // Update session time in timer.
   });

   $('#data').click(function(){

      if(status===0)
        status=1;   // Timer is resumed ...
      else if(status==1)
         status=0;  // Timer is paused .

      if(status==1){

         var time=parseInt($('#session-length').val());
         time=time*60;
         console.log(time);

         function sessionStart(){
            time-=1;
            if(time===0){
                tryTakingBreak();
            }

            $('#type').text("Session");

            var showTime="";

            var h=Math.floor(time/3600);
            var m=Math.floor(time/60);
            var s=Math.floor(time%60);

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
            else{

               showTime+=":00";
            }
            if(s!=0){

                showTime+=":";
                if(s<10)
                   showTime+="0"+s.toString();
                else
                   showTime+=s.toString();
            }
            else{
             showTime+=":00";
            }
            console.log(showTime);
            console.log($('#time').text());
            $('#time').text(showTime);

            console.log(time);
         }
         var t=setInterval(sessionStart,1000);

         function tryTakingBreak(){
           console.log("Break Time");
           clearInterval(t);
         }

      }




   });

});
