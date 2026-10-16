emailjs.init({ publicKey: "L4XR2qeA5RlDduicv" });

const form = document.getElementById("contactForm");
const statusEl = document.getElementById("statusMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("thoughts").value.trim();

  if (!name || !email || !message) {
    statusEl.textContent = "Please fill in all fields.";
    return;
  }

  statusEl.textContent = "Sending...";
  try {
    await emailjs.send("service_mmyih9n", "template_q17dub8", {
      from_name: name,
      from_email: email,
      message: message,
    });
    statusEl.textContent = "Message sent. Thank you!";
    form.reset();
  } catch (err) {
   statusEl.textContent = "Error: " + (err.text || err.message);
    console.error(err);
  }
});