async function getPulpit() {
    try {
        fetch('/api/pulpits', {
        method: 'GET',
        mode: 'no-cors',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
        .then((response) => {
        if (!response.ok) {
            throw new Error('get pulpits error');
        }
        return response.json()
        })
        .then((data) => {
            console.log(`data: ${data}`)
            displayPulpits(data);
        });
    } catch (error) {
        alert("error:", error);
    }
}

function displayPulpits(pulpits) {
    const listElement = document.getElementById("pulpit-list");
    listElement.innerHTML = "";

    if (pulpits.length === 0) {
        listElement.innerHTML = "<p>no pulpits</p>";
        return;
    }

    pulpits.forEach((pulpit) => {
        const item = document.createElement("div");
        item.className = "pulpit-item";
        item.innerHTML = `<strong>${pulpit.pulpit_name}</strong><br>code: ${pulpit.pulpit}<br>faculty: ${pulpit.faculty}<br>`;
        listElement.appendChild(item);
    });
}

async function postPulpit() {
    const pulpit = document.getElementById("pulpit").value;
    const pulpit_name = document.getElementById("pulpitName").value;
    const faculty = document.getElementById("facultyForPulpit").value;
    
    if(pulpit == '' || pulpit_name == '' || faculty == ''){
        alert('empty fields')
        return 
    }

    const newPulpit = { pulpit, pulpit_name, faculty };

    try {
        const response = await fetch("/api/pulpits", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(newPulpit),
        });

        if (!response.ok) {
          throw new Error("error post pulpit");
        }

        const result = await response.json();

        document.getElementById("pulpit").value = "";
        document.getElementById("pulpitName").value = "";
        document.getElementById("facultyForPulpit").value = "";
    } catch (error) {
        console.error("error:", error);
        alert(error.message);
    }
}

async function putPulpit() {
    const pulpit = document.getElementById("editPulpit").value;
    const pulpit_name = document.getElementById("editPulpitName").value;
    const faculty = document.getElementById("editFacultyForPulpit").value;

    if(pulpit == '' || pulpit_name == '' || faculty == ''){
        alert('empty fields')
        return 
    }

    const updatedPulpit = { pulpit, pulpit_name, faculty };

    try {
        const response = await fetch("/api/pulpits", {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPulpit),
        });

        if (!response.ok) {
          throw new Error("error put pulpit");
        }

        const result = await response.json();
        document.getElementById("editPulpit").value = "";
        document.getElementById("editPulpitName").value = "";
        document.getElementById("editFacultyForPulpit").value = "";
    } catch (error) {
        alert("error:", error);
    }
}

async function delPulpit() {
    const pulpit = document.getElementById("deletePulpit").value;

    if(pulpit == ''){
        alert('empty fields')
        return 
    }

    const deletedPulpit = { pulpit }
    try {
        const response = await fetch(`/api/pulpits`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(deletedPulpit),
        });

        if (!response.ok) {
          throw new Error("error del pulpit");
        }

        const result = await response.json();
        document.getElementById("deletePulpit").value = "";

    } catch (error) {
        alert("error:", error);
    }
}

async function getFaculties() {
    try {
        fetch('/api/faculties', {
        method: 'GET',
        mode: 'no-cors',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`get faculties error`);
            }
            return response.json()
        })
        .then((data) => {
            displayFaculties(data);
        });
    } catch (error) {
        alert("error:", error);
    }
}

function displayFaculties(faculties){
    const listElement = document.getElementById("faculties-list");
    listElement.innerHTML = "";

    if (faculties.length === 0) {
        listElement.innerHTML = "<p>no faculties</p>";
        return;
    }

    faculties.forEach((faculty) => {
        const item = document.createElement("div");
        item.className = "faculty-item";
        item.innerHTML = `<strong>${faculty.faculty_name}</strong><br>code: ${faculty.faculty}<br>`;
        listElement.appendChild(item);
    });
}

async function postFaculty() {
    const fac = document.getElementById("faculty").value;
    const faculty_name = document.getElementById("facultyName").value;
    
    if(fac == '' || faculty_name == ''){
        alert('Empty fields')
        return
    }

    const newFaculty = { faculty: fac, faculty_name };
    
    try {
        const response = await fetch("/api/faculties", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(newFaculty),
        });

        if (!response.ok) {
            throw new Error("error post faculty");
        }

        const result = await response.json().then((data) => console.log(data));

        document.getElementById("faculty").value = "";
        document.getElementById("facultyName").value = "";
    } catch (error) {
        alert(error.message);
    }
}

async function putFaculty() {
    const fac = document.getElementById("editFaculty").value;
    const faculty_name = document.getElementById("editFacultyName").value;
    
    if(fac == '' || faculty_name == ''){
        alert('Empty fields')
        return
    }

    const updatedFaculty = { faculty: fac, faculty_name };

    try {
        const response = await fetch("/api/faculties", {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFaculty),
        });

        if (!response.ok) {
          throw new Error("error put faculty");
        }

        const result = await response.json();
        document.getElementById("editFaculty").value = '';
        document.getElementById("editFacultyName").value = '';
    } catch (error) {
        alert(error.message);
        console.log(error.message);   
    }
}

async function delFaculty() {
    const fac = document.getElementById("deleteFaculty").value;
    const deletedFaculty = { faculty: fac }

    if(fac == ''){
        alert('Empty fields')
        return
    }

    try {
        const response = await fetch(`/api/faculties`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(deletedFaculty),
        });

        if (!response.ok) {
          throw new Error("error del faculty");
        }

        const result = await response.json();
        document.getElementById("deletePulpit").value = "";

    } catch (error) {
        alert(error);
    }
}

async function getSubject() {
    try {
        fetch('/api/subjects', {
        method: 'GET',
        mode: 'no-cors',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
        .then((response) => {
        if (!response.ok) {
            throw new Error('get subjects error');
        }
        return response.json()
        })
        .then((data) => {
            console.log(`data: ${data}`)
            displaySubjects(data);
        });
    } catch (error) {
        alert(error);
    }
}

function displaySubjects(subjects) {
    const listElement = document.getElementById("subject-list");
    listElement.innerHTML = "";

    if (subjects.length === 0) {
        listElement.innerHTML = "<p>no subjects</p>";
        return;
    }

    subjects.forEach((subject) => {
        const item = document.createElement("div");
        item.className = "subject-item";
        item.innerHTML = `<strong>${subject.subject_name}</strong><br>code: ${subject.subject}<br>pulpit: ${subject.pulpit}<br>`;
        listElement.appendChild(item);
    });
}

async function postSubject() {
    const subject = document.getElementById("subject").value;
    const subject_name = document.getElementById("subjectName").value;
    const pulpit = document.getElementById("pulpitForSubject").value;

    if(subject == '' || subject_name == '' || pulpit == ''){
        alert('empty fields')
        return
    }

    const newSubject = { subject, subject_name, pulpit };
console.log(newSubject);

    try {
        const response = await fetch("/api/subjects", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(newSubject),
        });

        if (!response.ok) {
          throw new Error("error post subject");
        }

        const result = await response.json();

        document.getElementById("subject").value = '';
        document.getElementById("subjectName").value = '';
        document.getElementById("pulpitForSubject").value = '';
    } catch (error) {
        alert(error.message);
    }
}

async function putSubject() {
    const subject = document.getElementById("editSubject").value;
    const subject_name = document.getElementById("editSubjectName").value;
    const pulpit = document.getElementById("editPulpitForSubject").value;

    if(subject == '' || subject_name == '' || pulpit == ''){
        alert('empty fields')
        return
    }

    const updatedSubject = { subject, subject_name, pulpit };

    try {
        const response = await fetch("/api/subjects", {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSubject),
        });

        if (!response.ok) {
          throw new Error("error put subject");
        }
        console.log(response);
        
        const result = await response.json();

        document.getElementById("editSubject").value = '';
        document.getElementById("editSubjectName").value = '';
        document.getElementById("editPulpitForSubject").value = '';
    } catch (error) {
        alert(error);
    }
}

async function delSubject() {
    const subject = document.getElementById("deleteSubject").value;

    if(subject == ''){
        alert('empty fields')
        return
    }

    const deletedSubject = { subject }
    try {
        const response = await fetch(`/api/subjects`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(deletedSubject),
        });

        if (!response.ok) {
          throw new Error("error del subject");
        }

        const result = await response.json();
        document.getElementById("deleteSubject").value = "";

    } catch (error) {
        alert(error);
    }
}

async function getAuditoriumType() {
    try {
        fetch('/api/auditoriumtypes', {
        method: 'GET',
        mode: 'no-cors',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
        .then((response) => {
        if (!response.ok) {
            throw new Error('get auditoriumTypes error');
        }
        return response.json()
        })
        .then((data) => {
            console.log(`data: ${data}`)
            displayAuditoriumTypes(data);
        });
    } catch (error) {
        alert(error);
    }
}

function displayAuditoriumTypes(auditoriumTypes) {
    const listElement = document.getElementById("auditoriumType-list");
    listElement.innerHTML = "";

    if (auditoriumTypes.length === 0) {
        listElement.innerHTML = "<p>no auditoriumTypes</p>";
        return;
    }

    auditoriumTypes.forEach((auditoriumType) => {
        const item = document.createElement("div");
        item.className = "auditoriumType-item";
        item.innerHTML = `<strong>${auditoriumType.auditorium_typename}</strong><br>code: ${auditoriumType.auditorium_type}<br>`;
        listElement.appendChild(item);
    });
}

async function postAuditoriumType() {
    const auditorium_type = document.getElementById("auditoriumType").value;
    const auditorium_typename = document.getElementById("auditoriumTypeName").value;

    if(auditorium_type == '' || auditorium_typename == ''){
        alert('empty fields')
        return
    }

    const newAuditoriumType = { auditorium_type, auditorium_typename };
    console.log(newAuditoriumType);

    try {
        const response = await fetch("/api/auditoriumtypes", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(newAuditoriumType),
        });

        if (!response.ok) {
          throw new Error("error post auditoriumTypes");
        }

        const result = await response.json();

        document.getElementById("auditoriumType").value = '';
        document.getElementById("auditoriumTypeName").value = '';
    } catch (error) {
        alert(error.message);
    }
}

async function putAuditoriumType() {
    const auditorium_type = document.getElementById("editAuditoriumType").value;
    const auditorium_typename = document.getElementById("editAuditoriumTypeName").value;

    if(auditorium_type == '' || auditorium_typename == ''){
        alert('empty fields')
        return
    }

    const updatedAuditoriumType = { auditorium_type, auditorium_typename };

    try {
        const response = await fetch("/api/auditoriumtypes", {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAuditoriumType),
        });

        if (!response.ok) {
          throw new Error("error put auditoriumTypes");
        }
        
        const result = await response.json();

        document.getElementById("editAuditoriumType").value = '';
        document.getElementById("editAuditoriumTypeName").value = '';
    } catch (error) {
        alert(error);
    }
}

async function delAuditoriumType() {
    const auditorium_type = document.getElementById("deleteAuditoriumType").value;

    if(auditorium_type == ''){
        alert('empty fields')
        return
    }

    const deletedAuditoriumType = { auditorium_type }
    try {
        const response = await fetch(`/api/auditoriumtypes`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(deletedAuditoriumType),
        });

        if (!response.ok) {
          throw new Error("error del auditoriumTypes");
        }

        const result = await response.json();
        document.getElementById("deleteAuditoriumType").value = "";

    } catch (error) {
        alert(error);
    }
}

async function getAuditorium() {
    try {
        fetch('/api/auditoriums', {
        method: 'GET',
        mode: 'no-cors',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
        .then((response) => {
        if (!response.ok) {
            throw new Error('get auditoriums error');
        }
        return response.json()
        })
        .then((data) => {
            console.log(`data: ${data}`)
            displayAuditoriums(data);
        });
    } catch (error) {
        alert(error);
    }
}

function displayAuditoriums(auditoriums) {
    const listElement = document.getElementById("auditorium-list");
    listElement.innerHTML = "";

    if (auditoriums.length === 0) {
        listElement.innerHTML = "<p>no auditoriums</p>";
        return;
    }

    auditoriums.forEach((auditorium) => {
        const item = document.createElement("div");
        item.className = "auditorium-item";
        item.innerHTML = `<strong>${auditorium.auditorium_name}</strong><br>code: ${auditorium.auditorium}<br>capacity:${auditorium.auditorium_capacity}<br>${auditorium.auditorium_type}`;
        listElement.appendChild(item);
    });
}

async function postAuditorium() {
    const auditorium = document.getElementById("auditorium").value;
    const auditorium_capacity = document.getElementById("auditoriumCapacity").value;
    const auditorium_name = document.getElementById("auditoriumName").value;
    const auditorium_type = document.getElementById("auditoriumTypeForAuditorium").value;

    if(auditorium == '' || auditorium_capacity == '' || auditorium_name == '' || auditorium_type == ''){
        alert('empty fields')
        return
    }

    const newAuditorium = { auditorium, auditorium_name, auditorium_type, auditorium_capacity };
    console.log(newAuditorium);

    try {
        const response = await fetch("/api/auditoriums", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(newAuditorium),
        });

        if (!response.ok) {
          throw new Error("error post auditoriums");
        }

        const result = await response.json();

        document.getElementById("auditorium").value = ''
        document.getElementById("auditoriumCapacity").value = ''
        document.getElementById("auditoriumName").value = ''
        document.getElementById("auditoriumTypeForAuditorium").value = ''

    } catch (error) {
        alert(error.message);
    }
}

async function putAuditorium() {
    const auditorium = document.getElementById("editAuditorium").value;
    const auditorium_capacity = document.getElementById("editAuditoriumCapacity").value;
    const auditorium_name = document.getElementById("editAuditoriumName").value;
    const auditorium_type = document.getElementById("editAuditoriumTypeForAuditorium").value;

    if(auditorium == '' || auditorium_capacity == '' || auditorium_name == '' || auditorium_type == ''){
        alert('empty fields')
        return
    }

    const updatedAuditorium = { auditorium, auditorium_name, auditorium_type, auditorium_capacity };
    
    try {
        const response = await fetch("/api/auditoriums", {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAuditorium),
        });

        if (!response.ok) {
          throw new Error("error put auditoriums");
        }
        
        const result = await response.json();

        document.getElementById("editAuditorium").value = ''
        document.getElementById("editAuditoriumCapacity").value = ''
        document.getElementById("editAuditoriumName").value = ''
        document.getElementById("editAuditoriumTypeForAuditorium").value = ''

    } catch (error) {
        alert(error);
    }
}

async function delAuditorium() {
    const auditorium = document.getElementById("deleteAuditorium").value;

    if(auditorium == ''){
        alert('empty fields')
        return
    }

    const deletedAuditorium = { auditorium }
    try {
        const response = await fetch(`/api/auditoriums`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(deletedAuditorium),
        });

        if (!response.ok) {
          throw new Error("error del auditoriums");
        }

        const result = await response.json();
        document.getElementById("deleteAuditorium").value = "";

    } catch (error) {
        alert(error);
    }
}

