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

	figure.setAttribute("data", element?.category?.id);
	figure.classList.add("pics");

	gallery.appendChild(figure);
	figure.appendChild(img);
	figure.appendChild(figcaption);
};

const hasContentInModal = (element) => {
	const modalGallery = document.querySelector(".modal-gallery");

	const figureImg = document.createElement("figure");
	const imgModal = document.createElement("img");
	const trashIcon = document.createElement("i");

	figureImg.setAttribute("data-id", element.id)
	figureImg.classList.add("figure-image-modal");

	imgModal.src = element.imageUrl;
	imgModal.alt = element.title;

	imgModal.classList.add("small-image");
	trashIcon.classList.add("fa-" + "solid", "fa-" + "trash-" + "can", "trashIcon");
	modalGallery.appendChild(figureImg);
	figureImg.appendChild(imgModal);
	figureImg.appendChild(trashIcon);
		trashIcon.addEventListener("click", (e) => {
			e.preventDefault();
			console.log(e);
			const id = figureImg.getAttribute("data-id");
			deleteWorks(id, figureImg);
		});
};


const hasIdCategoriesForSort = (element) => {
	const myProject = document.querySelector(".categories");
	const span = document.createElement("span");

	span.innerHTML += element?.name;
	span.classList.add("sort-list");
	span.setAttribute("id", element?.id);
	myProject.appendChild(span);
};



// const selectCategory = function (element) {
// 	const categorySelect = document.getElementById("category-select");
// 	categorySelect.innerHTML = "";
// 	// Ajout d'un champ vide
// 	const emptyField = document.createElement("option");
// 	emptyField.value = "";
// 	emptyField.innerText = "";
// 	emptyField.selected = true;
// 	categorySelect.appendChild(emptyField);
// 	//Affichage des catégories
// 	element.forEach((category) => {
// 		const option = document.createElement("option");
// 		option.value = category.id;
// 		option.innerText = category.name;
// 		categorySelect.appendChild(option);
// 	});
// };



/**
 *
 * @function getWorks is a function to require all data from the api 
 * @function categories is a function to require all categories from the api 
 * @function deleteWorks is a function to delete project elements
 * 
 */

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
					selectCategory(element);
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
}

categories();

const deleteWorks = async (id) => {
	await fetch("http://localhost:5678/api/works/" + id, {
		method: "DELETE",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token"),
			Accept: "application/json",
		},
	})
		.then((response) => {
			hasContentInModal(id);
		})
		.then((data) => data)
		.catch((err) => alert(err));
};
/**
 *
 * @const isLogged is a arrow function to check if we are logged or note 
 * @const isEditMode is a arrow function to edit you'r profile project 
 * @const hasLogout is a arrow function to logout and return in index
 * 
 */


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
			window.location.replace("index.html");
		});
	}
};

hasLogout();



const isSort = () => {
	const sortList = document.querySelector(".categories");
	const dataIdPicture = document.getElementsByClassName("pics");
	console.log(dataIdPicture);
	// console.log(dataIdPicture.getAttribute("data"));
	sortList.addEventListener("click", (event) => {
		event.stopPropagation();
		console.log("BUBBLING PHASE", "SOOORT");
		console.log(event.target);
	});
};

isSort()


