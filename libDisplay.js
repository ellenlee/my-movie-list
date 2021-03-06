function displayDataList (dataList, itemTemplate) {
  const BASE_URL = 'http://localhost:3000'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'

  const dataPanel = document.getElementById('data-panel')
  const searchBtn = document.getElementById('submit-search')
  const searchInput = document.getElementById('search')

  let htmlContent = ''
  dataList.forEach(function (item, index) {
    htmlContent += itemTemplate(item, index)
  })
  dataPanel.innerHTML = htmlContent

  // add show Movie event listener
  dataPanel.addEventListener('click', (event) => {
    if (event.target.matches('.btn-show-movie')) {
      showMovie(event.target.dataset.id)
    } else if (event.target.matches('.btn-add-favorite')) {
      addFavoriteItem(event.target.dataset.index)
    } else if (event.target.matches('.btn-remove-favorite')) {
      removeFavoriteItem(event.target.dataset.index)
    }
  })

  searchBtn.addEventListener('click', event => {
    let resultData = ''
    event.preventDefault()
    const regex = RegExp(searchInput.value, 'i')
    dataList.forEach((item, index) => {
      if (item.title.match(regex)) {
        resultData += itemTemplate(item, index)
      }
    })
    dataPanel.innerHTML = resultData
  })

  function showMovie (movieId) {
    const modalTitle = document.getElementById('show-movie-title')
    const modalImage = document.getElementById('show-movie-image')
    const modalDate = document.getElementById('show-movie-date')
    const modalDescription = document.getElementById('show-movie-description')
    const url = INDEX_URL + movieId
    console.log(url)
    axios.get(url).then(response => {
      const data = response.data.results
      console.log(data)
      modalTitle.textContent = data.title
      modalImage.innerHTML = `<img src="${POSTER_URL}${data.image}" class="img-fluid" alt="Responsive image">`
      modalDate.textContent = `release at : ${data.release_date}`
      modalDescription.textContent = `${data.description}`
    })
  }

  function addFavoriteItem (index) {
    if (!(index || index === 0)) return
    const dataStorage = JSON.parse(localStorage.getItem('favoriteMovie')) || []
    const obj = dataList[index]
    if (!dataStorage.some(item => item.id == dataList[index].id)) {
      dataStorage.push(obj)
      alert(`Added ${obj.title} to favorite successfully !`)
    }
    localStorage.setItem('favoriteMovie', JSON.stringify(dataStorage))
  }

  function removeFavoriteItem (index) {
    if (!index) return

    // delete item and save it to localStorage
    dataList.splice(index, 1)
    localStorage.setItem('favoriteMovie', JSON.stringify(dataList))

    // repaint dataList
    let newContent = ''
    dataList.forEach(function (item, index) {
      newContent += itemTemplate(item, index)
    })
    dataPanel.innerHTML = newContent
  }
}
