// Constants
const ADMIN_PASSWORD = '1234';

// State
let selectedDays = 0;
let participants = 0;
let extendDiscount = false;
let paymentMethod = '';

// DOM Elements
const calendar = document.getElementById('calendar');
const participantsSelect = document.getElementById('participants');
const extendDiscountCheckbox = document.getElementById('extend-discount');
const paymentMethodSelect = document.getElementById('payment-method');
const adminPasswordInput = document.getElementById('admin-password');
const adminLoginButton = document.getElementById('admin-login');
const pricingTables = document.getElementById('pricing-tables');

// Time slots checkboxes
const timeSlots = {
    '8am': document.getElementById('8am'),
    '8amPA': document.getElementById('8am-pa'),
    '2pm': document.getElementById('2pm'),
    '2pmPA': document.getElementById('2pm-pa'),
    '3pm': document.getElementById('3pm'),
    '3pmPA': document.getElementById('3pm-pa')
};

// Initialize Calendar
function initializeCalendar() {
    const calendarHTML = `
        <table class="calendar">
            <tr>
                <th>Dom</th>
                <th>Lun</th>
                <th>Mar</th>
                <th>Mié</th>
                <th>Jue</th>
                <th>Vie</th>
                <th>Sáb</th>
            </tr>
            ${generateCalendarDays()}
        </table>
    `;
    calendar.innerHTML = calendarHTML;
    addCalendarListeners();
}

function generateCalendarDays() {
    // Calendar data structure (simplified version)
    const calendarData = [
        [1,2,3,4,5,6,7],
        [8,9,10,11,12,13,14],
        [15,16,17,18,19,20,21],
        [22,23,24,25,26,27,28],
        [29,30,31,'','','',''],
        ['','','',1,2,3,4],
        [5,6,7,8,9,10,11]
    ];

    return calendarData.map(week => {
        return '<tr>' + week.map(day => {
            if (day === '') {
                return '<td></td>';
            }
            const isDisabled = shouldDisableDay(day);
            return `
                <td class="${isDisabled ? 'disabled' : ''}">
                    <span class="${isDisabled ? 'disabled' : ''}">${day}</span>
                </td>
            `;
        }).join('') + '</tr>';
    }).join('');
}

function shouldDisableDay(day) {
    // Define disabled days logic
    const disabledDays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,21,22,25,28,29,1,4,5,11];
    return disabledDays.includes(day);
}

function addCalendarListeners() {
    const cells = calendar.querySelectorAll('td span:not(.disabled)');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            cell.classList.toggle('selected');
            selectedDays = calendar.querySelectorAll('span.selected').length;
            updateSummary();
        });
    });
}

// Update Calculations
function updateSummary() {
    document.getElementById('selected-days').textContent = selectedDays;
    calculateRegularSchedule();
    calculateExtraSchedule();
    updateTotal();
}

function calculateRegularSchedule() {
    let baseRate;
    const totalParticipants = participants + (extendDiscount ? 1 : 0);

    if (selectedDays >= 1 && selectedDays <= 4) {
        baseRate = totalParticipants === 1 ? 305 : totalParticipants === 2 ? 285 : 260;
    } else if (selectedDays >= 5 && selectedDays <= 9) {
        baseRate = totalParticipants === 1 ? 288 : totalParticipants === 2 ? 265 : 253;
    } else if (selectedDays >= 10 && selectedDays <= 14) {
        baseRate = totalParticipants === 1 ? 273 : totalParticipants === 2 ? 251 : 241;
    } else if (selectedDays >= 15 && selectedDays <= 18) {
        baseRate = totalParticipants === 1 ? 265 : totalParticipants === 2 ? 245 : 234;
    }

    const regularSchedule = baseRate * selectedDays * participants;
    document.getElementById('regular-schedule').textContent = regularSchedule.toFixed(2);
}

function calculateExtraSchedule() {
    let extraTotal = 0;
    const slots = ['8am', '2pm', '3pm'];
    
    slots.forEach(slot => {
        if (timeSlots[slot].checked) {
            const withPA = timeSlots[slot + 'PA'].checked;
            const baseRate = selectedDays <= 4 ? (withPA ? 50 : 45) : (withPA ? 30 : 27);
            let slotTotal = baseRate * selectedDays;

            if (participants > 1) {
                const additionalRate = selectedDays <= 4 ? (withPA ? 25 : 23) : (withPA ? 15 : 14);
                slotTotal += additionalRate * selectedDays * (participants - 1);
            }

            extraTotal += slotTotal;
        }
    });

    document.getElementById('extra-schedule').textContent = extraTotal.toFixed(2);
}

function updateTotal() {
    const regularSchedule = parseFloat(document.getElementById('regular-schedule').textContent);
    const extraSchedule = parseFloat(document.getElementById('extra-schedule').textContent);
    const total = regularSchedule + extraSchedule;
    document.getElementById('total-amount').textContent = total.toFixed(2);
}

// Event Listeners
participantsSelect.addEventListener('change', (e) => {
    participants = parseInt(e.target.value) || 0;
    extendDiscountCheckbox.disabled = participants === 0;
    updateSummary();
});

extendDiscountCheckbox.addEventListener('change', (e) => {
    extendDiscount = e.target.checked;
    updateSummary();
});

paymentMethodSelect.addEventListener('change', (e) => {
    paymentMethod = e.target.value;
    updateSummary();
});

// Time slot listeners
Object.keys(timeSlots).forEach(slot => {
    if (!slot.includes('PA')) {
        timeSlots[slot].addEventListener('change', (e) => {
            timeSlots[slot + 'PA'].disabled = !e.target.checked;
            if (!e.target.checked) {
                timeSlots[slot + 'PA'].checked = false;
            }
            updateSummary();
        });
    }
    if (slot.includes('PA')) {
        timeSlots[slot].addEventListener('change', updateSummary);
    }
});

adminLoginButton.addEventListener('click', () => {
    if (adminPasswordInput.value === ADMIN_PASSWORD) {
        pricingTables.classList.remove('hidden');
    } else {
        alert('Contraseña incorrecta');
    }
});

// Initialize the calendar when the page loads
document.addEventListener('DOMContentLoaded', initializeCalendar);