// To disable past dates
let today = new Date().toISOString().split('T')[0]; 
document.querySelector(".date").setAttribute("min", today); // to disabled future dates

// Do not allow numbers in employee name
Validate = () => {
    let empName = document.querySelector(".name").value;
    let reg = new RegExp('^[a-zA-Z\\s.Ññ ]+$');
    let test = reg.test(empName);
    
    return test;
  }

// Clear fields
ClearFields = () => {
    const name = document.querySelector(".name");
    const date = document.querySelector(".date");
    const status = document.querySelector(".status");

    name.value = "";
    date.value = "";
    status.value = "";
}

// Make the first Letter capital
document.querySelector(".name").addEventListener("input", function() {
    let input = this.value;
    if(input.length > 0) {
        input = input.charAt(0).toUpperCase() + input.slice(1);
    }
    this.value = input;
});

