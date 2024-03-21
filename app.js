const auth = "K3vsIIGxRQwBSyOiKq4Yvf2kaae6MtRD9np6KwLXxgjB4Bl3wZ6H2qtu";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitBtn = document.querySelector(".submit-btn");
const form = document.querySelector(".search-form");
let searchValue;

// Event Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

// Functions
function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <div class="gallery-info">
      <p>${photo.photographer}</p>
       <a href=${photo.src.original}>Download</a>
    </div>
    <img src="${photo.src.large}"/> `;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  const data = await fetchApi(
    "https://api.pexels.com/v1/curated?per_page=15&page=1"
  );
  generatePictures(data);
}

async function searchPhotos(search) {
  clear();
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${search}&per_page=15&page=1`
  );
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}
curatedPhotos();
