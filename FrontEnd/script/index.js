/**
 *
 * @param {*} element
 * @const hasMainContent is an arrow function that implements all the main content data called in the following API http://localhost:5678/api/works. This function was called in @const getWorks to implement it.
 * @const hasContentInModal is a arrow function to implement all data in the modal called in the following API http://localhost:5678/api/works. This function was called in @const getWorks to implement it.
 * @const hasIdCategoriesForSort is a arrow function to implement the sort list for the gallery .
 *
 */

const hasMainContent = (element) => {
	const gallery = document.querySelector(".gallery");
	const figure = document.createElement("figure");
	const figcaption = document.createElement("figcaption");
	const img = document.createElement("img");

	img.src = element.imageUrl;
	img.alt = element.title;
	figcaption.innerHTML += element?.title;

	figure.setAttribute("data-id", element?.category?.id);
	figure.classList.add("picturesSort");

	gallery.appendChild(figure);
	figure.appendChild(img);
	figure.appendChild(figcaption);
};

const hasContentInModal = (element) => {
	const modalGallery = document.querySelector(".modal-gallery");
	const imgModal = document.createElement("img");
	const i = document.createElement("i");

	imgModal.src = element.imageUrl;
	imgModal.alt = element.title;

	imgModal.classList.add("small-image");
	i.classList.add("fa-" + "solid", "fa-" + "trash");

	modalGallery.appendChild(imgModal);
	modalGallery.appendChild(i);
};

const hasIdCategoriesForSort = (element) => {
	const myProject = document.querySelector(".categories");
	const span = document.createElement("span");

	span.innerHTML += element?.name;
	span.classList.add("sort-list");
	span.setAttribute("id", element?.id);
	myProject.appendChild(span);
};

async function getWorks() {
	fetch("http://localhost:5678/api/works", {
		method: "GET",
		body: JSON.stringify(),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			response.forEach((element) => {
				hasMainContent(element);
				hasContentInModal(element);
			});
		})
		.catch((error) => {
			if (error) {
				console.error("Network error:", error);
			} else {
				console.error("Error:", error.message);
			}
		});
}
getWorks();

async function categories() {
	const isLogged = localStorage.getItem("token");

	if (!isLogged) {
		fetch("http://localhost:5678/api/categories", {
			method: "GET",
			body: JSON.stringify(),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((response) => {
				response.forEach((element) => {
					hasIdCategoriesForSort(element);
				});
			})
			.catch((error) => {
				if (error) {
					console.error("Network error:", error);
				} else {
					console.error("Error:", error.message);
				}
			});
	} else if (isLogged) {
		const myProject = document.querySelector(".categories");
		myProject.style.display = "none";
	}
};

categories();


const isLogged = () => {
	const isLogged = localStorage.getItem("token");
	const login = document.getElementById("login");
	const logout = document.querySelector("#logout");
	const aHrefElement = document.createElement("a");
	if (isLogged) {
		login.style.display = "none";
		aHrefElement.classList.add("hasLogout");
		aHrefElement.innerHTML += "Logout";
		logout.appendChild(aHrefElement);
	}
};
isLogged();

const isEditMode = () => {
	const isLogged = localStorage.getItem("token");
	console.log(isLogged);
	const headEditMode = document.querySelector(".head-edit-mode");
	const editMode = document.querySelector(".edit-mode");
	if (isLogged) {
		headEditMode.style.display = "flex";
		editMode.style.display = "flex";
	}
};
isEditMode();

const hasLogout = () => {
	const isLogged = localStorage.getItem("token");
	if (isLogged) {
		const hasLogout = document.querySelector(".hasLogout");
		hasLogout.addEventListener("click", (event) => {
			localStorage.removeItem("token");
			localStorage.removeItem("userId");
			event.preventDefault();
			window.location.replace("login.html");
		});
	}
};

hasLogout();



const isSort = () => {
	const sortList = document.querySelector(".categories");
	const dataIdPicture = document.querySelectorAll(".gallery.picturesSort");
	console.log(dataIdPicture);
	console.log(dataIdPicture.getAttribute("data-id"));
	sortList.addEventListener("click", (event) => {
		event.stopPropagation()
		console.log("BUBBLING PHASE", "SOOORT");
		console.log(event.target)
	});
};

isSort()