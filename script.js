let patients =
    JSON.parse(localStorage.getItem("patients")) || [
        {
            name: "Arun Kumar",
            age: 28,
            gender: "Male",
            blood: "B+",
            department: "General Medicine",
            phone: "9876543210",
            status: "Active",
            date: "2026-09-15"
        },
        {
            name: "Priya Sharma",
            age: 34,
            gender: "Female",
            blood: "O+",
            department: "Cardiology",
            phone: "9876501234",
            status: "Admitted",
            date: "2026-09-20"
        },
        {
            name: "Karthik Raj",
            age: 42,
            gender: "Male",
            blood: "A+",
            department: "Orthopedics",
            phone: "9876547890",
            status: "Discharged",
            date: "2026-08-28"
        }
    ];


let editIndex = -1;

const form = document.getElementById("patientForm");


form.addEventListener("submit", function(event) {

    event.preventDefault();

    const patient = {

        name:
            document.getElementById("patientName").value,

        age:
            document.getElementById("patientAge").value,

        gender:
            document.getElementById("gender").value,

        blood:
            document.getElementById("bloodGroup").value,

        department:
            document.getElementById("department").value,

        phone:
            document.getElementById("phone").value,

        status:
            document.getElementById("status").value,

        date:
            document.getElementById("registrationDate").value
    };


    if (editIndex === -1) {

        patients.push(patient);

        alert("Patient registered successfully!");

    } else {

        patients[editIndex] = patient;

        editIndex = -1;

        form.querySelector("button").innerText =
            "Register Patient";

        alert("Patient updated successfully!");
    }


    savePatients();

    form.reset();

    displayPatients();

    document
        .getElementById("patients")
        .scrollIntoView({
            behavior: "smooth"
        });
});


function savePatients() {

    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );
}


function displayPatients() {

    const table =
        document.getElementById("patientTable");

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const filter =
        document.getElementById("filterStatus").value;

    table.innerHTML = "";


    const filteredPatients =
        patients.filter(patient => {

            const matchesSearch =
                patient.name
                    .toLowerCase()
                    .includes(search) ||

                patient.department
                    .toLowerCase()
                    .includes(search) ||

                patient.phone
                    .includes(search);


            const matchesStatus =
                filter === "All" ||
                patient.status === filter;


            return matchesSearch && matchesStatus;
        });


    filteredPatients.forEach(patient => {

        const originalIndex =
            patients.indexOf(patient);


        let statusClass = "active";


        if (patient.status === "Admitted") {
            statusClass = "admitted";
        }

        if (patient.status === "Discharged") {
            statusClass = "discharged";
        }


        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${patient.name}</td>

            <td>${patient.age}</td>

            <td>${patient.gender}</td>

            <td>${patient.blood}</td>

            <td>${patient.department}</td>

            <td>${patient.phone}</td>

            <td>
                <span class="status ${statusClass}">
                    ${patient.status}
                </span>
            </td>

            <td>${patient.date}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editPatient(${originalIndex})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deletePatient(${originalIndex})"
                >
                    Delete
                </button>

            </td>

        `;


        table.appendChild(row);
    });


    updateStats();
}


function editPatient(index) {

    const patient = patients[index];

    document.getElementById("patientName").value =
        patient.name;

    document.getElementById("patientAge").value =
        patient.age;

    document.getElementById("gender").value =
        patient.gender;

    document.getElementById("bloodGroup").value =
        patient.blood;

    document.getElementById("department").value =
        patient.department;

    document.getElementById("phone").value =
        patient.phone;

    document.getElementById("status").value =
        patient.status;

    document.getElementById("registrationDate").value =
        patient.date;


    editIndex = index;

    form.querySelector("button").innerText =
        "Update Patient";


    document
        .getElementById("add-patient")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function deletePatient(index) {

    if (
        confirm(
            "Are you sure you want to delete this patient?"
        )
    ) {

        patients.splice(index, 1);

        savePatients();

        displayPatients();
    }
}


function updateStats() {

    document.getElementById("totalPatients")
        .innerText = patients.length;


    document.getElementById("activePatients")
        .innerText =
        patients.filter(
            patient => patient.status === "Active"
        ).length;


    document.getElementById("admittedPatients")
        .innerText =
        patients.filter(
            patient => patient.status === "Admitted"
        ).length;


    document.getElementById("dischargedPatients")
        .innerText =
        patients.filter(
            patient => patient.status === "Discharged"
        ).length;
}


displayPatients();