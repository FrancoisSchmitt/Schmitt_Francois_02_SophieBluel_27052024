/**
 *
 * @param {*} element
 * @const hasMainContent is an arrow function that implements all the main content data called in the following API http://localhost:5678/api/works. This function was called in @const getWorks to implement it.
 * @const hasContentInModal is a arrow function to implement all data in the modal called in the following API http://localhost:5678/api/works. This function was called in @const getWorks to implement it.
 * @const hasIdCategoriesForSort is a arrow function to implement the sort list for the gallery .
 *
 */

const isSort = () => {
	const sortList = document.querySelector(".categories");
	const dataIdPicture = document.querySelectorAll(".pics");

	sortList.addEventListener("click", (event) => {
		let buttons = document.querySelectorAll(".sort-list");
		for (let i = 0; i < buttons.length; i++) {
			if (buttons[i].classList.contains("active")) {
				buttons[i].classList.remove("active");
				sortList.classList.remove("active")
			} if (event.target) {
				// event.target.classList.toggle("active");
				event.target.classList.add("active");
				sortList.classList.remove("active");
			}
		}
		event.stopPropagation();
		dataIdPicture.forEach((element) => {
			if (element.dataset.id !== event.target.id) {
				element.style.display = "none";
			} else {
				element.style.display = "block";
			}
			if (event.target.id == 0) {
				element.style.display = "block";
			}
		});
	});
};

function hasMainContent(elements) {
	const gallery = document.querySelector(".gallery");
	gallery.innerHTML = "";
	// console.log(elements);

	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		const figure = document.createElement("figure");
		const figcaption = document.createElement("figcaption");
		const img = document.createElement("img");

		img.src = element.imageUrl;
		img.alt = element.title;
		figcaption.innerHTML += element?.title;
		figure.dataset.id = element?.category?.id;
		figure.classList.add("pics");

		gallery.appendChild(figure);
		figure.appendChild(img);
		figure.appendChild(figcaption);
	}
	isSort();
}

function hasContentInModal(works) {
	const modalGallery = document.querySelector(".modal-gallery");
	modalGallery.innerHTML = "";

	for (let i = 0; i < works.length; i++) {
		const element = works[i];
		const figureImg = document.createElement("figure");
		const imgModal = document.createElement("img");
		const trashIcon = document.createElement("i");

		figureImg.setAttribute("data-id", element.id);
		figureImg.classList.add("figure-image-modal");

		imgModal.src = element.imageUrl;
		imgModal.alt = element.title;

		imgModal.classList.add("small-image");
		trashIcon.classList.add(
			"fa-" + "solid",
			"fa-" + "trash-" + "can",
			"trashIcon"
		);

		modalGallery.appendChild(figureImg);
		figureImg.appendChild(imgModal);
		figureImg.appendChild(trashIcon);

		trashIcon.addEventListener("click", (e) => {
			e.preventDefault();
			const id = figureImg.getAttribute("data-id");
			deleteWorks(id, figureImg);
		});
	}
}

const hasIdCategoriesForSort = (elements) => {
	const isLogged = localStorage.getItem("token");

	if (!isLogged) {
		const categorieSort = document.querySelector(".categories");
		const buttonForAll = document.createElement("button");

		buttonForAll.innerText = "Tous";
		buttonForAll.classList.add("sort-list", "active");
		buttonForAll.setAttribute("id", "0");

		categorieSort.appendChild(buttonForAll);

		elements.forEach((element) => {
			const button = document.createElement("button");

			button.innerHTML += element?.name;
			button.classList.add("sort-list");
			button.setAttribute("id", element?.id);

			categorieSort.appendChild(button);
		});
	}
};

const selectCategory = function (elements) {
	const isLogged = localStorage.getItem("token");

	if (isLogged) {
		const categorySelect = document.querySelector("#category-select");
		categorySelect.innerHTML = "";
		elements.forEach((category) => {
			const option = document.createElement("option");
			option.value = category.id;
			option.innerText = category.name;
			categorySelect.appendChild(option);
		});
	}
};

/**
 *
 * @function getWorks is a function to require all data from the api
 * @function categories is a function to require all categories from the api
 * @function deleteWorks is a function to delete project elements
 *
 */

async function getWorks() {
	try {
		const response = await fetch(`http://localhost:5678/api/works`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("HTTP erreur, status", response.status);
		}

		const data = await response.json();
		hasMainContent(data);
		hasContentInModal(data);
	} catch (error) {
		console.error("Error to get works", error.message);
	}
}

getWorks();

async function categories() {
	const isLogged = localStorage.getItem("token");

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
			hasIdCategoriesForSort(response);
			selectCategory(response);
		})
		.catch((error) => {
			if (error) {
				console.error("Network error:", error);
			} else {
				console.error("Error:", error.message);
			}
		});
	if (isLogged) {
		const myProject = document.querySelector(".categories");
		myProject.style.display = "none";
	}
}

categories();

async function deleteWorks(id) {
	try {
		const response = await fetch(`http://localhost:5678/api/works/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				Accept: "application/json",
			},
		});

		if (response.status === 200 || response.status === 204) {
			console.log(`Deleted work with ID: ${id}`);
			await getWorks();
		} else {
			console.error(
				`Failed to delete work with ID: ${id}, status: ${response.status}`
			);
		}
	} catch (error) {
		console.error("Failed to delete work:", error.message);
	}
}


function resetForm() {
	document.getElementById("add-photo-form").reset();
	const preview = document.querySelector(".new-preview");
	preview.style.display = "none";
	preview.remove()

	//Réaffichage des éléments lorsque réinitialisation
	const addPics = document.querySelector(".hide-for-preview");

	addPics.style.display = "flex";

	const submitBtnM2 = document.getElementById("valider");
	submitBtnM2.style.backgroundColor = "";
}

async function createNewWork() {
	try {
		const title = document.querySelector("#titleModalPic").value;
		const closeModal = document.querySelector("#add-picture");
		const image = document.querySelector("#add-photo2").files[0];
		const categories = document.querySelector("#category-select").value;
		const categoriesINT = parseInt(categories);
		const formData = new FormData();
		
		if (image) {
			formData.append("image", image, image.name);
			formData.append("title", title);
			formData.append("category", categoriesINT);
			closeModal.addEventListener("click", (event) => {
				closeModal.style.display = "none!important";
			});
			
		} else {
			alert("Veuillez sélectionner une image");
		}
		const response = await fetch("http://localhost:5678/api/works", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
			body: formData,
		});

		if (response.status === 200 || response.status === 201) {
			getWorks();
			resetForm();
		} else {
			console.error(`Failed to create work, status: ${response.status}`);
		}
	} catch (error) {
		console.error("Failed to create work:", error.message);
	}
}

const form = document.querySelector("#add-photo-form");

form.addEventListener("submit", (event) => {
	event.preventDefault();
	createNewWork();
});

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
	// console.log(isLogged);
	const headEditMode = document.querySelector(".head-edit-mode");
	const editMode = document.querySelector(".edit-mode");
	const addClass = document.querySelector(".my-project");

	if (isLogged) {
		headEditMode.style.display = "flex";
		editMode.style.display = "flex";
		addClass.classList.add("wrap");
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
