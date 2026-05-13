// Prime Number Generator
function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function generatePrimes() {
  const start = parseInt(document.getElementById("start").value);
  const end = parseInt(document.getElementById("end").value);
  const output = document.getElementById("output");

  if (isNaN(start) || isNaN(end) || start > end) {
    output.value = "Please enter a valid range.";
    return;
  }

  let primes = [];
  for (let i = start; i <= end; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }

  output.value =
    primes.length > 0
      ? primes.join(", ")
      : "No prime numbers found in this range.";
}

// Mark-Sheet Calculator
function calculateMarks() {
  const subjects = ["hindi", "english", "maths", "science", "art", "computer"];
  let total = 0;
  let valid = true;

  subjects.forEach((id) => {
    const val = parseInt(document.getElementById(id).value) || 0;
    if (val < 0 || val > 100) valid = false;
    total += val;
  });

  const totalField = document.getElementById("total");
  const percentageField = document.getElementById("percentage");
  const gradeField = document.getElementById("grade");

  if (!valid) {
    totalField.value = "";
    percentageField.value = "";
    gradeField.value = "Invalid marks entered!";
    return;
  }

  totalField.value = total;
  const percentage = (total / (subjects.length * 100)) * 100;
  percentageField.value = percentage.toFixed(2) + "%";

  let grade;
  if (percentage >= 90) grade = "A+";
  else if (percentage >= 75) grade = "A";
  else if (percentage >= 60) grade = "B";
  else if (percentage >= 40) grade = "C";
  else grade = "F";

  gradeField.value = grade;
}
