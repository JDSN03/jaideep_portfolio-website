/* Jaideep Singh
================================================================== */

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const container = document.querySelector('.main-bg')
  const body = document.querySelector('body')
  // let h = container.querySelector('img').offsetHeight
  // let w = container.querySelector('img').offsetWidth
  // let x = 0
  // let y = 0
  // let multiplier = 3.75
  body.style.height = container.querySelector('img').offsetHeight + 'px'
  // body.style.width = w + 'px'

// Diagonal scrolling
// let scroller = debounce(function () {

//   container.scroll({
//     left: window.pageYOffset * 2,
//     behavior: "auto"
//   })


// }, 0);

window.addEventListener('scroll', () => {
  container.scroll({
    left: window.pageYOffset * 1.7
  })
})


let story = document.querySelector('#story')
let storyBtn = document.querySelector('.storypx a')

storyBtn.addEventListener('click', e => {
  e.preventDefault()
  window.scrollTo({top: story.offsetTop})
})

let portfolio = document.querySelector('#portfolio')
let portfolioBtn = document.querySelector('.portfoliopx a')

portfolioBtn.addEventListener('click', e => {
  e.preventDefault()
  window.scrollTo({top: portfolio.offsetTop})
})

let contact = document.querySelector('#contact')
let contactBtn = document.querySelector('.contactpx a')

contactBtn.addEventListener('click', e => {
  e.preventDefault()
  window.scrollTo({top: contact.offsetTop})
})


// TILES
; (function () {


  // CLEAR ANY EXISTING TIMEOUTS
  function clearTimeouts() {
    const highestId = window.setTimeout(() => {
      for (let i = highestId; i >= 0; i--) {
        window.clearInterval(i);
      }
    }, 0);
  }

  // CHECK FOR TILES
  if (document.querySelector('.tile')) {
    let tiles = document.querySelectorAll('.tile')
    let mainbg = document.querySelector('.main-bg img')
    let textOverlay = document.querySelector('.text-overlay')
    for (let i = 0; i < tiles.length; i++) {
      let tile = tiles[i]

      // SET UP TILE SLIDESHOWS BASED ON NUMBER OF IMAGES INSIDE DIV
      function slideshow(imgs, num = 0) {
        let i
        for (let x = 0; x < imgs.length; x++) {
          if (imgs[x].classList.contains('active-image')) {
            i = x
          } else {
            i = num;
          }
        }

        // ADD OR REMOVE ACTIVE STATUS OF TILES AND OVERLAY
        if (!textOverlay.classList.contains('overlay-active')) {
          if (document.querySelector('img.active-image')) {
            document.querySelector('img.active-image').classList.remove('active-image')
          }
          if (i < imgs.length - 1) {
            i++;
          } else {
            i = 0
          }
          imgs[i].classList.add('active-image')
         
          
          function recall() {
            clearTimeouts()
            slideshow(imgs, i)
          }

          setTimeout(recall, 2000)
        }
      }


      // SET CLICK INTERACTION ON ALL TILES
      tile.addEventListener('click', function () {


        if (!this.classList.contains('active')) {
          textOverlay.classList.remove('overlay-active')
          if (document.querySelector('.tile.active')) {
            document.querySelector('.tile.active').classList.remove('active')
          }
          tile.classList.add('active')
          let images = this.querySelectorAll('img')

          // FIGURE OUT ACTIVE INDEX TO NOT RESTART AT 0 EACH TIMEM
          let idx = 0
          for (let i = 0; i < images.length; i++) {
            if (images[i].classList.contains('active-image')) {
              idx = i
            }
          }
          clearTimeouts()
          slideshow(images, idx)

        } else {
          let textContent = textOverlay.querySelector('div')
          textContent.innerHTML = ''
          if (textOverlay.classList.contains('overlay-active')) {
            textOverlay.classList.remove('overlay-active')
            let images = this.querySelectorAll('img')
            let idx = 0
            for (let i = 0; i < images.length; i++) {
              if (images[i].classList.contains('active-image')) {
                idx = i
              }
            }
            clearTimeouts()
            slideshow(images, idx)
          }
          // if (this.querySelector('.active-image')) {
          //   // GET CONTENT FROM DATA-TEXT ATTRIBUTE TO POPULATE OVERLAY ON SECOND CLICK
          //   let x = this.querySelector('.active-image')
          //   if (x.getAttribute('data-text')) {
          //     textContent.innerHTML = `<img src=${x.getAttribute('src')} alt=""> <p>${x.getAttribute('data-text')}</p>`
          //     textOverlay.classList.add('overlay-active')
          //   }

          // }

          // LOAD UP IMAGES AND DATA ATTRIBUTES
          
          let parentEl = this
          let images = parentEl.querySelectorAll('img')
          let title, description, date, client, role, url, tags = ''
          let data = ''
          let imageList = ''

          title = parentEl.getAttribute('data-title') ? `<div class="project-title">${parentEl.getAttribute('data-title')}</div>` : ''
          description = parentEl.getAttribute('data-description') ? `<div class="project-description">${parentEl.getAttribute('data-description')}</div>` : ''
          date = parentEl.getAttribute('data-date') ? `Date: ${parentEl.getAttribute('data-date')}<br>` : ''
          client = parentEl.getAttribute('data-client') ? `Client: ${parentEl.getAttribute('data-client')}<br>` : ''
          role = parentEl.getAttribute('data-role') ? `Role: ${parentEl.getAttribute('data-role')}<br>` : ''
          url = parentEl.getAttribute('data-url') ? `URL: <a href="${parentEl.getAttribute('data-url')}">${parentEl.getAttribute('data-url')}</a><br>` : ''
          tags = parentEl.getAttribute('data-tags') ? `Tags: ${parentEl.getAttribute('data-tags')}<br>` : ''

          data = `<div class="project-data">${date}${client}${role}${url}${tags}</div>`
          
          let logo = ``

          for (let i = 0; i < images.length; i++) {
            let image = images[i]
            if (i === 1) {
              logo = `<img src="${image.getAttribute('src')}" alt="">`
            } else {
              imageList += `<img src="${image.getAttribute('src')}" alt="">`
            }
          }

          imageList = `${logo}${imageList}`

          textContent.innerHTML = `
            <div class="project-info">
              ${title}
              ${description}
              ${data}
            </div>
            <div class="project-images">
              ${imageList}
            </div>
            ` 

          textOverlay.classList.add('overlay-active')
          textOverlay.scroll(0,0)
          document.querySelector('body').classList.add('no-scroll')
        }
      })
    }

    function overlayCloser() {
      
      if (document.querySelector('.story-active')) {
        document.querySelector('.story-active').classList.remove('story-active')
      }

      if (textOverlay.classList.contains('overlay-active')) {
        textOverlay.classList.remove('overlay-active')
        if (document.querySelector('.tile.active')) {
          let images = document.querySelector('.tile.active').querySelectorAll('img')
          let idx = 0
          for (let i = 0; i < images.length; i++) {
            if (images[i].classList.contains('active-image')) {
              idx = i
            }
          }
          clearTimeouts()
          slideshow(images, idx)
        }
      } else if (document.querySelector('.tile.active')) {
        document.querySelector('.tile.active').classList.remove('active')
        clearTimeouts()
      }

      document.querySelector('body').classList.remove('no-scroll')

    }

    // CLOSE OVERLAY IF OPENED, OTHERWISE CLOSE ACTIVE TILE ON CLICK OUTSIDE OF TILE/OVERLAY
    mainbg.addEventListener('click', overlayCloser)

    // CLOSE OVERLAY BUTTON
    let closeOverlay = document.querySelector('.close-overlay')
    closeOverlay.addEventListener('click', overlayCloser)
  }

})();


// STORY
; (function () {
  // CHECK FOR STORY CLASS
  if (document.querySelector('.story-container')) {
    let story = document.querySelector('.story-container')
    let overlay = document.querySelector('.text-overlay')
    let storyText = document.querySelector('.story-text').innerHTML
    story.addEventListener('click', function() {
      if (story.classList.contains('story-active')) {
        if (!overlay.classList.contains('overlay-active')) {
          overlay.querySelector('div').innerHTML = `<div class="story-content">${storyText}</div>`
          overlay.classList.add('overlay-active')
          document.querySelector('body').classList.add('no-scroll')
        } else {
          overlay.classList.remove('overlay-active')
          story.classList.remove('story-active')
        }
      } else {
          story.classList.add('story-active');
      }
    })
  }
})();
