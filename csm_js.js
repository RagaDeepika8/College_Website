// JavaScript for Page Content Switching
document.addEventListener("DOMContentLoaded", function() {
  // Hide all sections initially
  const sections = document.querySelectorAll('.page-section');
  sections.forEach(section => section.style.display = 'none');
  
  // Function to show the selected section
  function showPage(sectionId) {
    sections.forEach(section => section.style.display = 'none'); // Hide all sections
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
      selectedSection.style.display = 'block'; // Show selected section
    }
  }

  // Set up initial page (home) to be displayed
  showPage('home');

  // Attach the showPage function to sidebar links
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default link behavior
      const sectionId = this.getAttribute('href').substring(1); // Get section ID from href attribute
      showPage(sectionId); // Show the selected section
    });
  });
});
let slideIndex = 0;
const headerContent = document.querySelector('.header');

function showSlides() {
  const slides = document.querySelectorAll('.mySlides img');
  slides.forEach(slide => slide.parentElement.style.display = "none");

  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }

  const currentSlide = slides[slideIndex - 1];
  currentSlide.parentElement.style.display = "block";

  // Calculate and set inverse color for header content
  calculateAndSetInverseColor(currentSlide);

  setTimeout(showSlides, 3000);
}

function calculateAndSetInverseColor(image) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  // Set canvas size to image size
  canvas.width = image.width;
  canvas.height = image.height;
  context.drawImage(image, 0, 0, image.width, image.height);

  // Get pixel data
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  // Calculate average color
  let r = 0, g = 0, b = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    r += pixels[i];
    g += pixels[i + 1];
    b += pixels[i + 2];
  }
  
  const pixelCount = pixels.length / 4;
  r = Math.floor(r / pixelCount);
  g = Math.floor(g / pixelCount);
  b = Math.floor(b / pixelCount);

  // Invert the color
  const invertedR = 255 - r;
  const invertedG = 255 - g;
  const invertedB = 255 - b;

  // Set the inverse color as the header text color
  headerContent.style.color = `rgb(${invertedR}, ${invertedG}, ${invertedB})`;
}

showSlides();
// Display the home section by default on page load
window.onload = function() {
  showPage('home');
};
let index = 0;

function showNextTestimonial() {
    const testimonials = document.querySelectorAll('.testimonial');
    
    testimonials.forEach((testimonial, i) => {
        testimonial.style.transform = `translateX(${(i - index) * 100}%)`;
        testimonial.style.opacity = (i === index) ? '1' : '0';
        testimonial.style.transition = 'opacity 0.5s ease';
    });

    index = (index + 1) % testimonials.length;
}

setInterval(showNextTestimonial, 3000); // Rotate every 3 secondssetInterval(showNextTestimonial, 3000); // Rotate every 3 seconds
document.querySelectorAll('.sidebar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
        showPage(targetId);
    });
});



document.getElementById("open-chatbot").onclick = function() {
  document.getElementById("chatbot").style.display = "flex";
};

document.getElementById("close-chatbot").onclick = function() {
  document.getElementById("chatbot").style.display = "none";
};

document.getElementById("send-button").onclick = async function() {
  const inputField = document.getElementById("chatbot-input");
  const message = inputField.value;
  if (message.trim() === "") return;

  addMessageToChat("user", message);
  inputField.value = "";

  const response = await getBotResponse(message);
  addMessageToChat("bot", response);
};

function addMessageToChat(sender, message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("chatbot-message", `${sender}-message`);
  messageDiv.textContent = message;
  document.getElementById("chatbot-messages").appendChild(messageDiv);
  messageDiv.scrollIntoView();
}

async function getBotResponse(message) {
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer YOUR_OPENAI_API_KEY`
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: message,
      max_tokens: 100
    })
  });
  const data = await response.json();
  return data.choices[0].text.trim();
}
