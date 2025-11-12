// Carousel functionality
const images = ['src/img/img1.jpg', 'src/img/img2.jpg', 'src/img/img3.jpg']

let currentIndex = 0

function updateCarousel() {
  const imgElement = document.getElementById('carousel-image')
  if (!imgElement) return
  imgElement.src = images[currentIndex]
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length
  updateCarousel()
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length
  updateCarousel()
}

// Form validation and submission
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm')
  const resultDiv = document.getElementById('result')

  if (!form) return

  form.addEventListener('submit', function (e) {
    e.preventDefault()

    // Get form values
    const name = document.getElementById('name').value.trim()
    const email = document.getElementById('email').value.trim()
    const phone = document.getElementById('phone').value.trim()

    // Validate fields
    let errors = []

    if (!name) {
      errors.push('El nombre es obligatorio.')
    } else if (name.length < 3) {
      errors.push('El nombre debe tener al menos 3 caracteres.')
    }

    if (!email) {
      errors.push('El email es obligatorio.')
    } else if (!isValidEmail(email)) {
      errors.push('El email no tiene un formato válido.')
    }

    if (!phone) {
      errors.push('El teléfono es obligatorio.')
    } else if (!isValidPhone(phone)) {
      errors.push('El teléfono no tiene un formato válido.')
    }

    // Show errors or success
    if (errors.length > 0) {
      showResult(errors.join('<br>'), 'error')
    } else {
      // Create HTML page with submitted data
      const newPageContent = `
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <title>Gracias por tu mensaje</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 40px; text-align: center; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; background: #f9f9f9; }
                        h1 { color: #2c3e50; }
                        p { margin: 10px 0; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>✅ ¡Mensaje enviado con éxito!</h1>
                        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
                        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                        <p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
                        <p>Te responderemos a la brevedad.</p>
                        <a href="contact.html">Volver al formulario</a>
                    </div>
                </body>
                </html>
            `

      // Open new page
      const newWindow = window.open('', '_blank')
      newWindow.document.write(newPageContent)
      newWindow.document.close()

      // Reset form
      form.reset()
      showResult('Tu mensaje fue enviado correctamente.', 'success')
    }
  })

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  function isValidPhone(phone) {

    const re = /^[\+]?[0-9]{2,4}[\s]?[9]?[\s]?[0-9]{3,4}[\s\-]?[0-9]{6,8}$/
    return re.test(phone.replace(/[\s\-\.()]/g, '').length >= 10) && /[0-9]{6}/.test(phone)
  
  }

  function escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  function showResult(message, type) {
    resultDiv.innerHTML = message
    resultDiv.className = `result ${type}`
    resultDiv.style.display = 'block'

    // Auto-hide after 5 seconds
    setTimeout(() => {
      resultDiv.style.display = 'none'
    }, 5000)
  }
})

// Initialize carousel on load
window.onload = function () {
  updateCarousel()
}
