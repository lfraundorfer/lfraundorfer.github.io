let campaigns = document.querySelectorAll('.campaign');
let buttons = document.querySelectorAll('.switch-btn');

let active = 0;


buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        console.log(index);
        campaigns.forEach(campaign => {
            campaign.classList.remove('active');
        });
        buttons.forEach(btn => {
            btn.classList.remove('active');
        });
        campaigns[index].classList.add('active');
        buttons[index].classList.add('active');
    })
});
// buttons[active].addEventListener("click", () => {
//     console.log(buttons.length-1);
//     campaigns[active].classList.remove('active');
//     buttons[active].classList.remove('active');
//     active++;
//     if (active > (buttons.length-1)) {
//     active = 0;
//     }
//     campaigns[active].classList.add('active');
//     buttons[active].classList.add('active');

// });