// Interactivity for the points counters
document.addEventListener('DOMContentLoaded', () => {
    let currentPoints = {
        madison: 0,
        landon: 0,
        jayden: 0
    };
    let activeChild = 'madison';

    const childButtons = document.querySelectorAll('.child-button');
    const taskItems = document.querySelectorAll('.task-card');
    const manualPointsInput = document.getElementById('manual-points');
    const updateButton = document.getElementById('btn-update-points');
    const resetButton = document.getElementById('btn-reset-points');

    function updateDisplay(childName) {
        const counterElement = document.getElementById(`points-${childName}`);
        if (counterElement) {
            counterElement.textContent = currentPoints[childName];
        }
    }

    childButtons.forEach(button => {
        button.addEventListener('click', () => {
            childButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            activeChild = button.id.split('-')[1];
            manualPointsInput.value = currentPoints[activeChild];
        });
    });

    taskItems.forEach(item => {
        item.addEventListener('click', () => {
            const points = parseInt(item.dataset.points);
            currentPoints[activeChild] += points;
            updateDisplay(activeChild);
            manualPointsInput.value = currentPoints[activeChild];
        });
    });

    updateButton.addEventListener('click', () => {
        const newPoints = parseInt(manualPointsInput.value);
        if (!isNaN(newPoints)) {
            currentPoints[activeChild] = newPoints;
            updateDisplay(activeChild);
        } else {
            alert("Veuillez entrer un nombre valide.");
        }
    });

    resetButton.addEventListener('click', () => {
        currentPoints[activeChild] = 0;
        updateDisplay(activeChild);
        manualPointsInput.value = 0;
    });

    updateDisplay('madison');
    updateDisplay('landon');
    updateDisplay('jayden');
});
