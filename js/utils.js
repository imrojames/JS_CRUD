class CrudApp {
    constructor() {
        this.values = [{name: "Rojames Binoya", date: "2024-03-14", status: "Pending"}];
        const form = document.querySelector("#appointmentForm");
        form.addEventListener("submit", this.HandleSubmit.bind(this));
    }

    GetAllData = () => {
        const table = document.querySelector("#myTable tbody");
        table.innerHTML = '';
        this.values.forEach((item, index) => {
            const row = `<tr style="background-color: ${item.status === "Approved" ? "green" : "orange"};">
                            <td>${item.name}</td>
                            <td>${item.date}</td>
                            <td>${item.status}</td>
                            <td>
                                <button class="btn btn-danger remove" data-index="${index}">Remove</button>
                                <button class="btn btn-primary edit" data-index="${index}">Edit</button>
                            </td>
                        </tr>`
            table.innerHTML = table.innerHTML + row;
        });

        const btnRemove = document.querySelectorAll(".remove");
        btnRemove.forEach(btn => {
            btn.addEventListener("click", this.HandleRemove.bind(this));
        });

        const btnEdit = document.querySelectorAll(".edit");
        btnEdit.forEach(btn => {
            btn.addEventListener("click", this.HandleFetchData.bind(this));
        })
    }

    HandleSubmit = (event) => {
        event.preventDefault();
        const buttonAddOrUpdate = document.querySelector(".btnAddOrUpdate");
        let empName = document.querySelector(".name").value;
        let date = document.querySelector(".date").value;
        let status = document.querySelector(".status").value;

        if (buttonAddOrUpdate.innerHTML === "Add Appointment") {
            if (Validate() === true){ // Validate if the name contains number. 
                if (empName === null || empName.match(/^ *$/) !== null) {
                    alert("Error. Employee Name is empty or contains only spaces");
                } else {
                    let name = empName.trim();
                    const newPersons = { name, date, status };
                    this.values.push(newPersons);
                    this.GetAllData();
    
                    alert("Appointment successfully added.");
                }
            } else {
                alert("Error. Employee name contains number, special characters or empty fields.");
            }
    
            ClearFields();
        } else if (buttonAddOrUpdate.innerHTML === "Update Appointment") {
            let id = document.querySelector(".index-holder").value;
            let valueOfIndex = this.values[id];
            let updatedValue;

            updatedValue = {name: empName, date: date, status: status};
            this.values[id] = updatedValue;

            this.GetAllData();
            alert("Success: Appointment successfully updated");
            ClearFields();

            document.querySelector(".btnAddOrUpdate").innerHTML = "Add Appointment";
            document.querySelector(".btn-cancel").setAttribute("hidden", "");
            document.querySelector(".edit").removeAttribute("disabled");
        }

        
    }

    HandleRemove = (event) => {
        const index = event.target.dataset.index;
        // Confirmation alert upon removing appointment
        if (confirm(`Are you sure do you want to remove this appointment ?`)) {
            this.values.splice(index, 1); 
            this.GetAllData();
            alert("Appointment successfully removed.");
        }
    }

    HandleFetchData = (event) => {
        const index = event.target.dataset.index;
        const name = this.values[index].name;
        const date = this.values[index].date;
        const status = this.values[index].status;

        document.querySelector(".name").value = name;
        document.querySelector(".date").value = date;
        document.querySelector(".status").value = status;
        document.querySelector(".index-holder").value = index

        document.querySelector(".btnAddOrUpdate").innerHTML = "Update Appointment";
        document.querySelector(".remove").setAttribute("disabled", true);
        document.querySelector(".btn-cancel").removeAttribute("hidden");
    }

}

const appointment = new CrudApp;

// display data upon window load
window.addEventListener("load", () => {
    appointment.GetAllData();
});

document.querySelector(".btn-cancel").addEventListener("click", () => {
    ClearFields();
    document.querySelector(".btnAddOrUpdate").innerHTML = "Add Appointment";
    document.querySelector(".btn-cancel").setAttribute("hidden", "");
    document.querySelector(".remove").removeAttribute("disabled");
});