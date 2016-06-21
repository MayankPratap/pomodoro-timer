$(document).ready(function(){

   var status=0; // Represents that timer is off now. Click on circle/ellipse to turn on//
   var isFirstTime=0; // After page reload
   var isBreakTime=0;  //  Checks whether session or break is going on
   var isSessionTime=0;  // Checks whether session is running or not.
   var stimer,btimer;
   $('#break-length').val("5");
   $('#session-length').val("25");
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
        newTime*=60;
         if(isSessionTime===0)
           updateTime(newTime);
      }
    });

    $('#break-plus').click(function(){
       if(status===0){
          var newTime=parseInt($('#break-length').val())+1;
          if(newTime>1440) // You cannot increase time more than one day.
            newTime=1440;

          $('#break-length').val(newTime.toString());
          newTime*=60;
          if(isSessionTime===0)
            updateTime(newTime);
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
         if(isBreakTime===0)
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
         if(isBreakTime===0)   // If it is not break time then you can change time of timer by changing session time
           updateTime(newTime);  // Update session time in timer.
      }
   });

   $('#data').click(function(){


       if(status===0){
          status=1;
       }
       else if(status==1){
         status=0;
         if(isBreakTime===0)
            stimer.stop();
         else
            btimer.stop();

       }
       if(status==1){


         function sessionStart(){
               time=time-1;
               console.log(time);
               if(time===0){
                 $('#type').text("Break");
                 tryTakingBreak();
               }
               updateTime(time);
         }

         function tryTakingBreak(){
            console.log("Break Time");
            if(isSessionTime==1){
              stimer.stop();      // Stop session timer
              isBreakTime=1;   // Break time starts
              isSessionTime=0;  // Session time ends
              time=parseInt($('#break-length').val());
              time=time*60;
              btimer=$.timer(breakStart,1000,true);
            }
            else{

              var str=$('#time').text();
              var h=parseInt(str.substr(0,2));
              var m=parseInt(str.substr(3,2));
              var s=parseInt(str.substr(6,2));
              time=h*3600+m*60+s;
              btimer=$.timer(breakStart,1000,true);
            }

         }

         function breakStart(){


            time-=1;
            console.log(time);
            if(time===0){
               $('#type').text("Session");
              backToSession();
            }
            updateTime(time);
         }


         function backToSession(){
            console.log("Session Time");
            if(isBreakTime==1){   //  If break time is running then stop

               btimer.stop();
               isBreakTime=0;  // Break time ends
               isSessionTime=1;  // Session time starts
               time=parseInt($('#session-length').val());
               time=time*60;
               stimer=$.timer(sessionStart,1000,true);

            }
            else{

               var str=$('#time').text();
               var h=parseInt(str.substr(0,2));
               var m=parseInt(str.substr(3,2));
               var s=parseInt(str.substr(6,2));
               time=h*3600+m*60+s;
               stimer=$.timer(sessionStart,1000,true);


            }
         }


          if(isBreakTime===0){
            isSessionTime=1;
            $('#type').text("Session");
            backToSession();

          }

          else{
             $('#type').text("Break");
             tryTakingBreak();

          }



       }

   });

});
