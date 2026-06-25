function toggleMenu() {
              var menu = document.getElementById("navMenu");
              menu.classList.toggle("active");
            }
            window.onclick = function (event) {
              if (!event.target.matches(".hamburger")) {
                var menu = document.getElementById("navMenu");
                if (menu.classList.contains("active")) {
                  menu.classList.remove("active");
                }
              }
            };