(function () {
  const BASE_URL = 'http://localhost:3000'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []

  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    displayDataList(data, indexItemTemplate)
  }).catch((err) => console.log(err))

  function indexItemTemplate (item, index) {
    return `
      <div class="col-sm-3">
        <div class="card mb-2">
          <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
          <div class="card-body movie-item-body">
            <h6 class="card-title">${item.title}</h5>
          </div>
          <div class="card-footer">
          <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
          <button class="btn btn-info btn-add-favorite" data-index="${index}">+</i></button>
          </div>
        </div>
      </div>
      `
  }
})()
