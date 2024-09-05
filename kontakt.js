// Henter formularen og inputfelterne ved hjælp af deres respektive ID'er
const form = document.querySelector('form');
const fullName = document.getElementById("name"); // Fuldt navn felt
const email = document.getElementById("email");   // Email felt
const phone = document.getElementById("phone");   // Telefon nummer felt
const subject = document.getElementById("subject"); // Emne felt
const message = document.getElementById("message"); // Besked felt

// Funktion til at sende en email ved hjælp af EmailJS
function sendEmail() {
    // Bygger body-delen af emailen baseret på brugernes input
    const bodyMessage = `Fulde Navn: ${fullName.value}<br> 
    Email: ${email.value}<br> Tlf 
    Nummer: ${phone.value}<br> 
    Emne: ${subject.value}<br> 
    Din Besked: ${message.value}<br>`;

    // Sender emailen ved hjælp af EmailJS med en SecureToken
    Email.send({
        SecureToken: "c0cb6cd1-e444-4230-89bc-412b09c39d0c", // Sikkerhedstoken for EmailJS
        To: 'oliwiakeyha1308@gmail.com',                     // Modtagerens email-adresse
        From: "oliwiakeyha1308@gmail.com",                   // Afsenderens email-adresse
        Subject: subject.value,                              // Emnet for emailen, taget fra inputfeltet
        Body: bodyMessage                                    // Emailens indhold
    }).then(
        message => {
            // Tjekker om emailen blev sendt succesfuldt
            if (message == "OK") {
                // Viser en succes besked ved hjælp af SweetAlert hvis emailen er sendt
                Swal.fire({
                    title: "Yay!",
                    text: "Beskeden er blevet sendt!",
                    icon: "success"
                });
            }
        }
    );
}

// Funktion til at validere inputfelterne
function checkInputs() {
    const items = document.querySelectorAll(".item"); // Henter alle inputfelter med klassen "item"

    for (const item of items) {
        // Tjekker om feltet er tomt
        if (item.value == "") {
            item.classList.add("error"); // Tilføjer "error" klasse hvis feltet er tomt
            item.parentElement.classList.add("error"); // Tilføjer "error" klasse til forældreelementet (typisk en div)
        }

        // Hvis email-feltet ikke er tomt, tjekkes om emailen er gyldig
        if (items[1].value != "") {
            checkEmail();
        }

        // Lytter på inputfelterne for at tjekke gyldigheden når brugeren indtaster
        items[1].addEventListener("keyup", () => {
            checkEmail();
        });

        // Tilføjer en eventlistener til at fjerne "error" klassen hvis brugeren begynder at indtaste gyldige data
        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            } else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

// Funktion til at tjekke om emailen er gyldig
function checkEmail() {
    // Regex til at validere email-formatet
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorTxtEmail = document.querySelector(".error-txt.email"); // Henter elementet til fejlmeddelelser

    // Hvis emailen ikke matcher det gyldige format
    if (!email.value.match(emailRegex)) {
        email.classList.add("error"); // Tilføjer "error" klasse til email-feltet
        email.parentElement.classList.add("error"); // Tilføjer "error" klasse til email-feltets forælder

        if (email.value != "") {
            errorTxtEmail.innerText = "Skriv en gyldig E-mail adresse"; // Fejlmeddelelse hvis emailen ikke er gyldig
        } else {
            errorTxtEmail.innerText = "E-mail skal udfyldes!"; // Fejlmeddelelse hvis email-feltet er tomt
        }
    } else {
        // Hvis emailen er gyldig fjernes "error" klasserne
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

// Tilføjer en eventlistener til at fange indsendelse af formularen
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Forhindrer den normale formularindsendelse
    checkInputs(); // Tjekker inputfelterne for gyldighed

    // Hvis alle felter er gyldige, sendes emailen
    if (!fullName.classList.contains("error") && !email.classList.contains("error") 
        && !phone.classList.contains("error") && !subject.classList.contains("error") 
        && !message.classList.contains("error")) {
        sendEmail(); // Kald sendEmail funktionen hvis alle felter er gyldige

        form.reset(); // Nulstiller formularen efter indsendelse
        return false; // Returnerer false for at sikre at formularen ikke indsendes på ny
    }
});
