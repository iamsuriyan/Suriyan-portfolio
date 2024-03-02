//navbar
function fun(){
    var mob_nav = document.querySelector(".navbar");
    mob_nav.classList.toggle("active");
}

//navbar close in toggle navbar
function suriyan(){
  var mob_nav = document.querySelector(".navbar");
  mob_nav.classList.remove("active");
}

//works text animation
class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = '!<>-_\\/[]{}—=+*^?#________'
      this.update = this.update.bind(this)
    }
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = []
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }
  const phrases = [
    'I`m working on it,',
    'will be updated soon...'
  ]
  
  const el = document.querySelector('.text')
  const fx = new TextScramble(el)
  
  let counter = 0
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 800)
    })
    counter = (counter + 1) % phrases.length
  }
  
next()


//prevent default-form
function dummy(e) {
  e.preventDefault();
  return false;
}


//mail

function sendMail() {
  // Get form field values
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;
  let message = document.getElementById('message').value;

  
  if (!name || !email || !phone || !message) {
    alert("Please fill in all required fields before sending the message.");
    return;
  }

  // Prepare parameters for emailjs
  let parms = {
    name: name,
    email: email,
    phone: phone,
    message: message,
  };

  // Send the email using emailjs
  emailjs.send("service_2f516tq", "template_d3bjwk8", parms)
    .then((res) => {
      // Reset form fields
      document.getElementById('name').value = "";
      document.getElementById('email').value = "";
      document.getElementById('phone').value = "";
      document.getElementById('message').value = "";

      // Display success message to the user
      alert("Message sent successfully!");
    })
    .catch((error) => {
      // Display error message to the user
      console.error("Error sending message:", error);
      alert("An error occurred while sending the message. Please try again later.");
    });
}

