document.addEventListener("DOMContentLoaded", () => {
    const missionsList = document.getElementById("missions-list");
    const missionSelect = document.getElementById("mission-select");
    const candidaturesList = document.getElementById("candidatures-list");
    const formCandidature = document.getElementById("form-candidature");

    // Charger les missions depuis le fichier JSON
    fetch("data/missions.json")
        .then(response => response.json())
        .then(missions => {
            missions.forEach(mission => {
                // Affichage des missions dans la section missions
                const missionElement = document.createElement("div");
                missionElement.classList.add("mission");
                missionElement.innerHTML = `
                    <h3>${mission.titre}</h3>
                    <p><strong>Entreprise :</strong> ${mission.entreprise}</p>
                    <p>${mission.description}</p>
                    <p><strong>Budget :</strong> ${mission.budget}</p>
                `;
                missionsList.appendChild(missionElement);

                // Ajout des missions dans la liste du formulaire
                const option = document.createElement("option");
                option.value = mission.id;
                option.textContent = mission.titre;
                missionSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Erreur lors du chargement des missions :", error));

    // Gestion de l'envoi de candidature
    formCandidature.addEventListener("submit", (e) => {
        e.preventDefault();
        const nom = document.getElementById("nom").value;
        const missionId = missionSelect.value;
        const missionText = missionSelect.options[missionSelect.selectedIndex].text;

        if (nom && missionId) {
            const candidatureElement = document.createElement("li");
            candidatureElement.innerHTML = `
                <span>${nom} a postulé pour <strong>${missionText}</strong></span>
                <button class="supprimer">Supprimer</button>
            `;
            candidaturesList.appendChild(candidatureElement);

            // Ajouter un event listener pour la suppression
            candidatureElement.querySelector(".supprimer").addEventListener("click", () => {
                candidatureElement.remove();
            });

            // Réinitialiser le formulaire
            formCandidature.reset();
        }
    });
});
