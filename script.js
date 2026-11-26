// Names of the grade components
var componentNames = ["assignments", "quizzes", "midterm", "final"];

var PASS_THRESHOLD = 45;

var form = document.getElementById("gradeForm");
var errorBox = document.getElementById("errorBox");
var resultSection = document.getElementById("resultSection");

// runs when the form is submitted
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // read the numbers from the form
  var obtainedMarks = [];
  var totalMarks = [];
  var weights = [];

  for (var i = 0; i < componentNames.length; i++) {
    var name = componentNames[i];
    var obtained = parseFloat(document.getElementById(name + "-obtained").value);
    var total = parseFloat(document.getElementById(name + "-total").value);
    var weight = parseFloat(document.getElementById(name + "-weight").value);

    obtainedMarks.push(obtained);
    totalMarks.push(total);
    weights.push(weight);
  }

  // check for mistakes
  var errors = checkForErrors(obtainedMarks, totalMarks, weights);

  if (errors.length > 0) {
    showErrors(errors);
    resultSection.hidden = true;
    return;
  }

  hideErrors();

  // do the math and show the result
  var totalPercentage = 0;
  var breakdownText = "";

  for (var j = 0; j < componentNames.length; j++) {
    var componentPercent = (obtainedMarks[j] / totalMarks[j]) * 100;
    var contribution = componentPercent * (weights[j] / 100);
    totalPercentage = totalPercentage + contribution;

    var label = capitalize(componentNames[j]);
    breakdownText = breakdownText +
      "<p>" + label + ": " + componentPercent.toFixed(1) + "% of assesments &times; " +
      weights[j] + "% weightage = " + contribution.toFixed(2) + " absolutes</p>";
  }

  var letter = "";
  var gpa = 0;

  if (totalPercentage >= 90) {
    letter = "A";
    gpa = 4.00;
  } else if (totalPercentage >= 85) {
    letter = "A-";
    gpa = 3.67;
  } else if (totalPercentage >= 80) {
    letter = "B+";
    gpa = 3.33;
  } else if (totalPercentage >= 75) {
    letter = "B";
    gpa = 3.00;
  } else if (totalPercentage >= 70) {
    letter = "B-";
    gpa = 2.67;
  } else if (totalPercentage >= 65) {
    letter = "C+";
    gpa = 2.33;
  } else if (totalPercentage >= 60) {
    letter = "C";
    gpa = 2.00;
  } else if (totalPercentage >= 55) {
    letter = "C-";
    gpa = 1.67;
  } else if (totalPercentage >= 50) {
    letter = "D+";
    gpa = 1.33;
  } else if (totalPercentage >= 45) {
    letter = "D";
    gpa = 1.00;
  } else {
    letter = "F";
    gpa = 0.00;
  }

  var passed = totalPercentage >= PASS_THRESHOLD;

  showResult(totalPercentage, letter, gpa, passed, breakdownText);
});

// reset button
form.addEventListener("reset", function () {
  hideErrors();
  resultSection.hidden = true;
});

// Looks for problems with what the user typed in
function checkForErrors(obtainedMarks, totalMarks, weights) {
  var errors = [];
  var weightSum = 0;

  for (var i = 0; i < componentNames.length; i++) {
    var label = capitalize(componentNames[i]);
    var obtained = obtainedMarks[i];
    var total = totalMarks[i];
    var weight = weights[i];

    if (isNaN(obtained) || isNaN(total) || isNaN(weight)) {
      errors.push(label + ": all fields must be filled in.");
      continue;
    }

    if (obtained < 0) {
      errors.push(label + ": marks obtained cannot be negative.");
    }
    if (total <= 0) {
      errors.push(label + ": total marks must be greater than zero.");
    }
    if (obtained > total) {
      errors.push(label + ": marks obtained cannot exceed total marks.");
    }
    if (weight < 0) {
      errors.push(label + ": weight cannot be negative.");
    }

    weightSum = weightSum + weight;
  }

  if (Math.abs(weightSum - 100) > 0.01) {
    errors.push("Weights must add up to 100% (currently " + weightSum.toFixed(1) + "%).");
  }

  return errors;
}

// shows the final grade on the page
function showResult(totalPercentage, letter, gpa, passed, breakdownText) {
  document.getElementById("resultPercentage").textContent = totalPercentage.toFixed(2) + "%";
  document.getElementById("resultLetter").textContent = letter;
  document.getElementById("resultGpa").textContent = gpa.toFixed(2);

  var statusEl = document.getElementById("resultStatus");
  if (passed) {
    statusEl.textContent = "Pass";
    statusEl.className = "result-status pass";
  } else {
    statusEl.textContent = "Fail";
    statusEl.className = "result-status fail";
  }

  document.getElementById("resultBreakdown").innerHTML = breakdownText;

  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Shows error messages above the form
function showErrors(errors) {
  var errorHtml = "";
  for (var i = 0; i < errors.length; i++) {
    errorHtml = errorHtml + "<p>" + errors[i] + "</p>";
  }
  errorBox.innerHTML = errorHtml;
  errorBox.hidden = false;
}

// remove error
function hideErrors() {
  errorBox.hidden = true;
  errorBox.innerHTML = "";
}

// capital
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}