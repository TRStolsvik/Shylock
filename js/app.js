(function (app) {
  app.shylock = function () {
    getValues();
  };

  // Get te values from the user input and trigger other function calls.
  function getValues() {
    // Get the value from amount input.
    let loanAmount = document.getElementById('loanAmount').value;
    // Get the value from term input.
    let loanTerm = document.getElementById('loanTerm').value;
    // Get the value from Interest input.
    let loanInterest = document.getElementById('loanInterest').value;

    // Parse values from amount and term to integers, and interest to float.
    loanAmount = Number.parseFloat(loanAmount);
    loanTerm = Number.parseInt(loanTerm);
    loanInterest = Number.parseFloat(loanInterest);

    let monthlyPayment = 0;
    let currentBalance = loanAmount;
    let totalInterest = 0;

    // Calculate monthly interest
    let interestRate = loanInterest / 1200;

    for (let i = 0; i < loanTerm; i++) {
      // Calculate Payment amount
      monthlyPayment = calcMonthPay(loanAmount, interestRate, loanTerm);

      // Calculate Interest amount
      let monthlyInterest = calcMonthInt(currentBalance, interestRate);

      // Calculate Total Interest amount
      totalInterest += monthlyInterest;

      // Calculate Principal amount
      let monthlyPrincipal = monthlyPayment - monthlyInterest;

      // Calculate Current balance amount
      currentBalance = currentBalance - monthlyPrincipal;

      // console.log(monthlyPayment);
      // console.log(monthlyInterest);
      // console.log(totalInterest);
      // console.log(monthlyPrincipal);
      // console.log(currentBalance);
    }
    let totalCost = totalInterest + loanAmount;

    displayLoanHeader(monthlyPayment, loanAmount, totalInterest, totalCost);
  }

  // Calculates the monthly interest amount
  function calcMonthInt(currentBalance, interestRate) {
    return currentBalance * interestRate;
  }

  // Calculates the monthly payment
  function calcMonthPay(loanAmount, interestRate, loanTerm) {
    return (loanAmount * interestRate) / (1 - (1 + interestRate) ** -loanTerm);
  }

  // Display loan header
  function displayLoanHeader(
    monthlyPayment,
    loanAmount,
    totalInterest,
    totalCost
  ) {
    // Get the elements in the header of the calculator
    const displayHeader = document.getElementById('displayHeader');
    headerMonthlyPayment = displayHeader.querySelector('#monthlyPayment');
    headerTotalPrincipal = displayHeader.querySelector('#totalPrincipal');
    headerTotalInterest = displayHeader.querySelector('#totalInterest');
    headerTotalCost = displayHeader.querySelector('#totalCost');

    // Clear out the text inside the header to make it ready for the new data
    headerMonthlyPayment.innerText = '';
    headerTotalPrincipal.innerText = '';
    headerTotalInterest.innerText = '';
    headerTotalCost.innerText = '';

    // Post the new header data to the page
    headerMonthlyPayment.innerText = `${monthlyPayment.toFixed(2)}`;
    headerTotalPrincipal.innerText = `${loanAmount.toFixed(2)}`;
    headerTotalInterest.innerText = `${totalInterest.toFixed(2)}`;
    headerTotalCost.innerText = `${totalCost.toFixed(2)}`;
  }

  // Display the resulting loan calculation and amoritization(?) table
})((window.app = window.app || {}));
