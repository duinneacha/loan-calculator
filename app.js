
// Listen for Calculate Submit

document.getElementById('loan-form').addEventListener('submit', function(e){

  
  // Hide Results
  document.getElementById('results').style.display = 'none';
  
  // Show Loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

// Function to Calculate Results
function calculateResults() {

  //console.log('Calculating . . .');

  // UI Variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute Monthly Payments

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
   
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    
    // Show Results
    document.getElementById('results').style.display = 'block';

    // Hide Spinner
    document.getElementById('loading').style.display = 'none';

  } else {
    //console.log('Please chack your numbers.');

    showError('Please check your numbers');
  }
  
  
}

function showError(error) {

  // Hide Results
   document.getElementById('results').style.display = 'none';

   // Hide Spinner
   document.getElementById('loading').style.display = 'none';

  // Create a div
  const errorDiv = document.createElement('div');

  // Get Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  //alert(card);
  // Add class to div
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert Error above Heading
  card.insertBefore(errorDiv, heading);

  // Clear Error after 3 seconds
  setTimeout(clearError, 3000);

}

function clearError() {
  document.querySelector('.alert').remove();
}
