/*
let contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function() {
    //event.preventDefault(); // Stops the page from refreshing


    alert("Thank you for filling the form.");

    contactForm.reset(); // Clears the form
});
*/
const form = document.getElementById("contactForm");
if (form) {
    form.onsubmit = function() {
        alert("Thank you for filling the form.");
    };
}

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function() {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
        mainNav.classList.toggle("is-open", !isOpen);
    });
}

// const signupForm =document.getElementById('signup');
// const welcomeModal =document.getElementById('welcomeModal');
// const modalName =document.getElementById('modalName');
// const closeModal =document.getElementById('closeModal');


// signupForm.addEventListener('submit',function(e) {
//     e.preventDefault();

//     const fullname=document.getElementById('fullname').value.trim();
//     const email=document.getElementById('email').value.trim();
//     const password=document.getElementById('phone').value;
//     const phone=document.getElementById('phone').value.trim();

//     //full name must have at least two wordds(first+last)
//     const nameParts =fullname.spilt(' ').filter(part => part.length > 0);
//     if(nameParts.lengh < 2){
//         alert('please enter your full name(first and last name).');
//         return;
//     }

//     //basic email fprmat check
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if(!emailPattern.text(email)) {
//         alert('please enter a valid email adderse.');
//         return;
//     }

//     //basic phone check (digit only at least 10)
//     const phonePattern = /^[0-9] {10,}$/;
//     if(!phonePattern.text(phone.replace(/[\s()-]/g, ''))) {
//         alert('please enter a valid phone number (at least 10 digits).');
//         retrun;
//     }

//     //all checks passed, submit the form
//         modalName.textContent =fullname;
//         welcomeModal.classList.add('active');
//         signupForm.reset();
// });
// closeModal.addEventListener('click', function() {
//     welcomeModal.classList.remove('active');
// });
