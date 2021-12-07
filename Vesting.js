var grantQtyElt = document.getElementById("grantQty");
var vestPeriodElt = document.getElementById("vestPeriod");
var vestFrequencyElt = document.getElementById("vestFrequency");
var cliffElt = document.getElementById("cliff");
var firstVestPercentElt = document.getElementById("vestPercent"); //10
var grantDateElt = document.getElementById("grantDate");

const decimal = 2;

function Calculate() {

   var grantQty = parseFloat(grantQtyElt.value);
   var vestPeriod = parseFloat(vestPeriodElt.value);
   var division = parseInt(vestFrequencyElt.options[vestFrequencyElt.selectedIndex].value);
   var cliff = parseFloat(cliffElt.value);
   var firstVestPercent = parseFloat(firstVestPercentElt.value);
  
  if(grantQtyElt.value=="" || vestPeriodElt.value==""  || cliffElt.value=="" || firstVestPercentElt.value=="" ||grantQty==0 || vestPeriod==0){
    alert("Please enter values!!!");
   }
   else{
   if (firstVestPercent === 0) {
      var vestFrequency = parseFloat(vestPeriod) / division;
   }
   else if (firstVestPercent !== 0 && cliff !==0){
      var vestFrequency = (vestPeriod - cliff) / division;
   }
   else if (firstVestPercent !== 0 && cliff === 0) {
      alert("Cliff Can't be 0 when 1st Vest % is Non-zero!");
   }

   //DATE
   var grantDate = new Date(grantDateElt.value);
   var year = grantDate.getFullYear();
   var month = grantDate.getMonth() + 1;
   var day = grantDate.getDate();
   console.log(day+"-"+month+"-"+year);

   var totalRemianingPercent = 100 - parseFloat(firstVestPercent);  //100-10 = 90
   var vest1_vestwiseunit = grantQty * firstVestPercent / 100;  //190
   var percent = totalRemianingPercent / vestFrequency; //7.5
   var vestwiseunit = grantQty * percent / 100; //142.5

   //Creating Table
   let table = document.createElement('table');
   let thead = document.createElement('thead');
   let tbody = document.createElement('tbody');
   table.appendChild(thead);
   table.appendChild(tbody);
   document.getElementById('tableBody').appendChild(table);

   //Creating Headings
   let headingArr = ["Vest Names", "Vesting %", "Cumulative %", "Cumulative Units", "Vest wise units", "Vesting Date"];
   let row1 = document.createElement('tr');
   for (let i = 0; i < 6; i++) {
      let heading = document.createElement('th');
      heading.innerHTML = headingArr[i];
      row1.appendChild(heading);
   }
   thead.appendChild(row1);

   var initial_val = 1;
   //row2 for First Vest Percent
   if (firstVestPercent === 0) {
      initial_val = 0;
   }
   else {
      let row2 = document.createElement('tr');
      let r2_d1 = document.createElement('td');
      r2_d1.innerHTML = "Vest1";
      let r2_d2 = document.createElement('td');
      r2_d2.innerHTML = firstVestPercent;
      let r2_d3 = document.createElement('td');
      r2_d3.innerHTML = firstVestPercent;
      let r2_d4 = document.createElement('td');
      r2_d4.innerHTML = vest1_vestwiseunit;
      let r2_d5 = document.createElement('td');
      r2_d5.innerHTML = vest1_vestwiseunit;
      let r2_d6 = document.createElement('td');
      r2_d6.innerHTML = dateConverter(grantDate,cliff).toString();
      

      row2.appendChild(r2_d1);
      row2.appendChild(r2_d2);
      row2.appendChild(r2_d3);
      row2.appendChild(r2_d4);
      row2.appendChild(r2_d5);
      row2.appendChild(r2_d6);
      tbody.appendChild(row2);
   }
   //Cumulative Calculation
   var percentSum = parseFloat(firstVestPercent); //10
   var vestwiseunitSum = vest1_vestwiseunit;  //190
   for (var i = initial_val; i < vestFrequency + initial_val; i++) {   //12
      percentSum += percent;
      vestwiseunitSum += vestwiseunit;

      var row = document.createElement('tr');
      var rowData1 = document.createElement('td');
      var rowData2 = document.createElement('td');
      var rowData3 = document.createElement('td');
      var rowData4 = document.createElement('td');
      var rowData5 = document.createElement('td');
      var rowData6 = document.createElement('td');
      rowData1.innerHTML = "Vest" + (i + 1);
      rowData2.innerHTML = percent.toFixed(decimal);
      rowData3.innerHTML = percentSum.toFixed(decimal);
      rowData4.innerHTML = vestwiseunitSum.toFixed(decimal);
      rowData5.innerHTML = vestwiseunit.toFixed(decimal);

      if(i===initial_val){
         if(cliff==0)  //initial_val = 0
          rowData6.innerHTML = dateConverter(grantDate, cliff).toString();
       else  
            if (firstVestPercent != 0) //initial_val = 1
               rowData6.innerHTML = dateConverter(grantDate, division).toString();
            else //initial_val = 0
               rowData6.innerHTML = dateConverter(grantDate, cliff).toString();
      }
      else {
         rowData6.innerHTML = dateConverter(grantDate, division).toString();
      }


      row.appendChild(rowData1);
      row.appendChild(rowData2);
      row.appendChild(rowData3);
      row.appendChild(rowData4);
      row.appendChild(rowData5);
      row.appendChild(rowData6);
      tbody.appendChild(row);


   }

}


function dateConverter(grantDate, cliff) {
   var date =  new Date(grantDate.setMonth(grantDate.getMonth() + cliff));
   return date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
}
}