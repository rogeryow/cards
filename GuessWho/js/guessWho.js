// sup dodong !
// yes dong ge pas pas nko ni
let randomNumbers = []

while(randomNumbers.length < 6){
	let randomInt = Math.floor(Math.random() * 11) + 1
	if(randomNumbers.indexOf(randomInt) === -1) randomNumbers.push(randomInt)
}

let randomArray = shuffleArray([...randomNumbers, ...randomNumbers])

letsPlay()

function letsPlay() {
	const root = document.getElementById('gallery')
	const gallery = [...document.getElementById('gallery').children]
	let source = 'img/front/'
	let counter = 0
	let firstPick = 0
	let secondPick = 0
	let getFirstIndex = 0
	let getSecondIndex = 0
	let win = 0

	gallery.forEach((item, index) => {
		let imageSrc = randomArray[index]
		item.setAttribute('pic', imageSrc)
		item.setAttribute('index', index)
		// item.src = `${source}${imageSrc}.jpg`

		item.addEventListener('click', flipCards)

		function flipCards() {
			let imageSrc = this.getAttribute('pic')
			let imageIndex = this.getAttribute('index')
			this.src = `${source}${imageSrc}.jpg`

			counter++

			if(counter == 1) {
				firstPick = imageSrc
				getFirstIndex = imageIndex
			}else if(counter == 2) {
				secondPick = imageSrc
				getSecondIndex = imageIndex
				if(firstPick == secondPick) {
					win++
					disablePics()	
					resetPick()
					if(win == 6) {
						final()
						playSound()
					}			
				}else if(firstPick != secondPick) {
					toggleClickEvents()
					setTimeout(function() {
						unflippedCards()		
						resetPick()	
						toggleClickEvents()
					}, 1500)
				}
			}

			function toggleClickEvents() {
				root.classList.toggle('noEvents')
			}

			function playSound() {
				var sounds = document.getElementById('sounds')
				sounds.play()
			}

			function disablePics() {
				gallery.forEach((item) => {
					let imgIndex = item.getAttribute('index')
					if(imgIndex == getFirstIndex || imgIndex == getSecondIndex) {
						item.classList.add('noEvents')
					}
				})
			}

			function resetPick() {
				firstPick = 0
				secondPick = 0
				getFirstIndex = 0
				getSecondIndex = 0
				counter = 0	
			}

			function unflippedCards() {
				gallery.forEach((item) => {
					let imgSrc = item.getAttribute('pic')
					if(imgSrc == firstPick || imgSrc == secondPick) {
						item.src = 'img/back/back.png'
					}
				})
			}

			function final() {
				const background = document.getElementById('background')
				const finalPic = document.getElementById('finalPic')

				finalPic.src = `img/final/final.jpg`
				background.style.zIndex = '2'
			}
		} 


	})
}

function shuffleArray(array) {
	var currentIndex = array.length, temporaryValue, randomIndex

	while (0 !== currentIndex) {

		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1


		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array
}