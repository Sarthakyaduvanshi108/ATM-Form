// ✅ Digits-only inputs with optional exact length validation
function digitsOnly(id, length = null) {
  const input = document.getElementById(id);
  
  // Block typing of letters/symbols
  input.addEventListener("keypress", function (e) {
    const char = String.fromCharCode(e.which);
    if (!/[0-9]/.test(char)) e.preventDefault();
  });

  // Clean pasted input and apply length rule
  input.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, '');
    if (length && this.value.length !== length) {
      this.setCustomValidity(`${id} must be exactly ${length} digits.`);
    } else {
      this.setCustomValidity("");
    }
  });
}

// 🔁 Apply digitsOnly() to all fields
digitsOnly("mobile", 10);     // Mobile number - 10 digits
digitsOnly("aadhaar", 12);    // Aadhaar number - 12 digits
digitsOnly("pincode", 6);     // PIN code - 6 digits
digitsOnly("atm", 16);        // ATM card - 16 digits
digitsOnly("account");        // Bank account - no fixed length

// ✅ Valid Thru field - MM/YY format with / fixed
const validThru = document.getElementById("validThru");

validThru.addEventListener("input", function () {
  let val = this.value.replace(/\D/g, '');
  if (val.length >= 3) {
    this.value = val.slice(0, 2) + "/" + val.slice(2, 4);
  } else {
    this.value = val;
  }
});

validThru.addEventListener("keydown", function (e) {
  if (e.key === "Backspace" && this.selectionStart === 3) {
    e.preventDefault(); // Prevent deleting slash
  }
});

// ✅ DOB - 18+ age check
const dob = document.getElementById("dob");

dob.addEventListener("change", function () {
  const selectedDate = new Date(this.value);
  const today = new Date();
  const age = today.getFullYear() - selectedDate.getFullYear();
  const m = today.getMonth() - selectedDate.getMonth();
  const d = today.getDate() - selectedDate.getDate();
  const exactAge = m < 0 || (m === 0 && d < 0) ? age - 1 : age;

  if (exactAge < 18) {
    this.setCustomValidity("You must be at least 18 years old.");
  } else {
    this.setCustomValidity("");
  }
});
