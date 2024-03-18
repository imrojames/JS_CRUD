class CrudApp {
    constructor() {
        this.values = [{name: "Rojames Binoya", date: "2024-03-14", status: "Pending"}];
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
                                <button class="btn btn-danger">Remove</button>
                                <button class="btn btn-primary">Edit</button>
                            </td>
                        </tr>`
            table.innerHTML = table.innerHTML + row;
        });
    }
}

const appointment = new CrudApp;

// display data upon window load
window.addEventListener("load", () => {
    appointment.GetAllData();
});