// Adding validation to income.
document.getElementById('adddetails1').addEventListener('submit', function(event) {
  event.preventDefault(); //not to refresh the page

  var amount = parseInt(document.getElementById('amount').value);
  var catogery = document.getElementById('catogery').value;

  var amountvalid = !isNaN(amount) && parseFloat(amount) >= 1;
  var catogeryvalid = /^[a-zA-Z]+$/.test(catogery);
  
  if(catogeryvalid&&amountvalid){
    
    income();

    totalbalance();
  }
  else {
    if(!amountvalid){
      alert('Please enter a valid positive number for income.');
    }
    else if(!catogeryvalid){
      alert('Enter a valid catogery(Only including alphabets).');
    }
  }
});


// Adding validation to expense.
document.getElementById('adddetails2').addEventListener('submit', function(event) {
  event.preventDefault(); //not to refresh the page

  var amount = parseInt(document.getElementById('amount2').value);
  var catogery = document.getElementById('catogery2').value;

  var amountvalid = !isNaN(amount) && parseFloat(amount) >= 1;
  var catogeryvalid = /^[a-zA-Z]+$/.test(catogery);
  
  if(catogeryvalid&&amountvalid){

    expense();

    totalbalance();
  }
  else {
    if(!amountvalid){
      alert('Please enter a valid positive number for Expense.');
    }
    else if(!catogeryvalid){
      alert('Enter a valid catogery(Only including alphabets).');
    }
  }
});


// Input a new row of income and updating total income.
  function income(){
    var amount = parseInt(document.getElementById('amount').value);
    var catogery = document.getElementById('catogery').value;
    var mid = "-";

    // totalincome
    var totalin = parseInt(document.getElementById('totali').innerText);

    // Created a new row in the table
    var table = document.getElementById('Tabledetailes1');
    var newRow = table.insertRow();

    // Inserting new columns in the row created
    var Col1 = newRow.insertCell(0);
    var Col2 = newRow.insertCell(1);
    var Col3 = newRow.insertCell(2);

    // inserting values to the created columns
    Col1.innerHTML = catogery;
    Col2.innerHTML = mid;
    Col3.innerHTML = amount;

    // updating totalincome
    var newtotal = totalin + amount;
    document.getElementById('totali').innerText = newtotal;

    // To clear the inputfield
    document.getElementById('catogery').value = '';
    document.getElementById('amount').value = '';
  }


// Input a new row of expense and updating total expense.
  function expense(){
    var amount = parseInt(document.getElementById('amount2').value);
    var catogery = document.getElementById('catogery2').value;
    var mid = "-";

    // totalexpense
    var totalex = parseInt(document.getElementById('totale').innerText);
  
    // Created a new row in the table
    var table = document.getElementById('Tabledetailes2');
    var newRow = table.insertRow();
  
    // Inserting new columns in the row created
    var Col1 = newRow.insertCell(0);
    var Col2 = newRow.insertCell(1);
    var Col3 = newRow.insertCell(2);
  
    // inserting values to the created columns
    Col1.innerHTML = catogery;
    Col2.innerHTML = mid;
    Col3.innerHTML = amount;

    // updating total expense
    var newtotal =  totalex + amount;
    document.getElementById('totale').innerText = newtotal;

    // To clear the inputfield
    document.getElementById('catogery2').value = '';
    document.getElementById('amount2').value = '';
  }
  

// Total Balance
  function totalbalance(){

    let income = parseInt(document.getElementById('totali').innerText);
    let expense = parseInt(document.getElementById('totale').innerText);
 
    let totalbal = parseInt(document.getElementById('Balance').innerText);

    totalbal = income-expense;

    document.getElementById('Balance').innerText = totalbal;
    createChart();
  }


  // chart
  let myDoughnutChart;
  function createChart() {

    let income = parseInt(document.getElementById('totali').innerText);
    let expense = parseInt(document.getElementById('totale').innerText);
    let totalb = parseInt(document.getElementById('Balance').innerText);

    if (!myDoughnutChart) {   // Check whether myDoughnutChart is created or not and if not, it will create.
        myDoughnutChart = new Chart(document.getElementById('doughnut-chart'), {
            type: 'doughnut',
            data: {
                labels: ['Total Income', 'Total Expense','Total Balance'],
                datasets: [{
                    label:'',
                    data: [income, expense, totalb],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverOffset:15
                }]
            }
        });
    }
    else {
        myDoughnutChart.data.datasets[0].data = [income, expense, totalb];
        myDoughnutChart.update();     // Else if it is created it will update to the next value added.
    }
}