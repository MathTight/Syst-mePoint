// Système de points pour les enfants avec persistance (localStorage)

const children = ["madison", "landon", "jayden"];
let selectedChild = "madison";
let points = {};

// Chargement initial des points depuis localStorage ou initialisation à 0
function loadPoints() {
    const stored = localStorage.getItem("childrenPoints");
    if (stored) {
        points = JSON.parse(stored);
    } else {
        children.forEach(name => points[name] = 0);
        savePoints();
    }
}
function savePoints() {
    localStorage.setItem("childrenPoints", JSON.stringify(points));
}

// Mise à jour de l'affichage des compteurs
function updatePointsDisplay() {
    children.forEach(name => {
        document.getElementById(`points-${name}`).textContent = points[name];
    });
}

// Sélection d'un enfant
function setActiveChild(name) {
    selectedChild = name;
    document.querySelectorAll('.child-button').forEach(btn => {
        btn.classList.toggle('active', btn.id === `btn-${name}`);
        btn.classList.toggle('bg-blue-300', btn.id === `btn-${name}`);
        btn.classList.toggle('bg-gray-200', btn.id !== `btn-${name}`);
    });
}

// Ajout/retrait de points en cliquant sur une tâche
function setupTasks() {
    document.querySelectorAll('.task-card').forEach(card => {
        card.addEventListener('click', () => {
            const pts = parseInt(card.getAttribute('data-points'), 10);
            points[selectedChild] += pts;
            savePoints();
            updatePointsDisplay();
        });
    });
}

// Mise à jour manuelle des points
function setupManualEdit() {
    document.getElementById('btn-update-points').addEventListener('click', () => {
        const val = parseInt(document.getElementById('manual-points').value, 10);
        if (!isNaN(val)) {
            points[selectedChild] = val;
            savePoints();
            updatePointsDisplay();
        }
        document.getElementById('manual-points').value = '';
    });
}

// Réinitialisation des points de tous les enfants
function setupReset() {
    document.getElementById('btn-reset-points').addEventListener('click', () => {
        if (confirm("Voulez-vous vraiment réinitialiser les points de tous les enfants ?")) {
            children.forEach(name => points[name] = 0);
            savePoints();
            updatePointsDisplay();
        }
    });
}

// Sélection d'enfant via boutons
function setupChildButtons() {
    children.forEach(name => {
        document.getElementById(`btn-${name}`).addEventListener('click', () => {
            setActiveChild(name);
        });
    });
}

// Initialisation
window.addEventListener('DOMContentLoaded', () => {
    loadPoints();
    updatePointsDisplay();
    setupChildButtons();
    setActiveChild(selectedChild);
    setupTasks();
    setupManualEdit();
    setupReset();
});
