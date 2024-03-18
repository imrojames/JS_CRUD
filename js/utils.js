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
            const row = `<tr>
                            <td>${item.name}</td>
                            <td>${item.date}</td>
                            <td>${item.status}</td>
                            <td>
                                <button class="btn btn-danger remove">Remove</button>
                                <button class="btn btn-primary edit">Edit</button>
                            </td>
                        </tr>`
            table.innerHTML = table.innerHTML + row;
        });

        const btnRemove = document.querySelectorAll(".remove");
        btnRemove.forEach(btn => {
            btn.addEventListener("click", this.HandleRemove.bind(this));
        });
    }

    HandleSubmit = (event) => {
        event.preventDefault();
        const name = document.querySelector(".name").value;
        const date = document.querySelector(".date").value;
        const status = document.querySelector(".status").value;

        const newAppointment = {name, date, status};
        this.values.push(newAppointment);
        alert(`Success: Appointment successfully added.`);
        this.GetAllData();
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
}

const appointment = new CrudApp;

// display data upon window load
window.addEventListener("load", () => {
    appointment.GetAllData();
});