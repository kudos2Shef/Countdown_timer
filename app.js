const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  ];
  const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  ];
  
  const giveaway = document.querySelector('.giveaway');
  const deadline = document.querySelector('.deadline');
  const items = document.querySelectorAll('.deadline-format h4');
  //console.log(items);
  let tempDate = new Date();
  let tempYear = tempDate.getFullYear();
  let tempMonth = tempDate.getMonth();
  let tempDay = tempDate.getDate();
  /*
  let futureDate = new Date(2023,9,23,11,30,0);//Date(year: number, monthIndex: number, date?: number | undefined, hours?: number | undefined, minutes?: number | undefined, seconds?: number | undefined, ms?: number | undefined): Date
  //console.log(futureDate);*/

  const futureDate = new Date(tempYear,tempMonth,tempDay + 10,11,30,0) ;
  const year = futureDate.getFullYear();
  const hours = futureDate.getHours();
  const minutes = futureDate.getMinutes();
  let month = futureDate.getMonth();
  const date = futureDate.getDate();
  //console.log(month,months[month]);
  month = months[month];
  const weekday = weekdays[futureDate.getDay()];
  //console.log(weekday);
  giveaway.textContent = `Giveaway Ends On ${weekday}, ${year} ${month} ${date} ${hours}:${minutes}`;

  //future time is ms
  const futureTime = futureDate.getTime();
  //console.log(futureTime);


  function getRemainingTime(){
    const today = new Date().getTime();
    //console.log(today);
    const t = futureTime - today;
    //console.log(t,futureTime,today);
    //1s = 1000ms 
    //1m = 60s
    //1hr = 60min
    //1day = 24hr

    // values in ms
    const oneDay = 24*60*60*1000;
    const oneHour = 60*60*1000;
    const oneMinute = 60*1000;
    let days = t / oneDay;//
    //console.log(days);
    days = Math.floor(days);
    //console.log(days);

    let hours = Math.floor((t % oneDay)  / oneHour);
    //console.log(hours);
    let minutes = Math.floor((t % oneHour)  / oneMinute);
    let seconds = Math.floor((t % oneMinute)  / 1000);
    //console.log(minutes);
    const values = [days,hours,minutes,seconds];
    //console.log(values);
    function format(item){
        if(item < 10){
            return (item =`0${item}`);
        }
        return item;
    }
    items.forEach(function(item,index){
        item.innerHTML = format(values[index]);
    });

    if(t<0){
        clearInterval(countdown);
        deadline.innnerHTML = `<h4 class='expired'>sorry, this giveaway has expired</h4>`
    }
  }

  let countdown = setInterval(getRemainingTime, 1000);

  getRemainingTime();