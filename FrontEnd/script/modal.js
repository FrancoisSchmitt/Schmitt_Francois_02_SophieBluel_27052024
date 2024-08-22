const isModalPictureOpen = () => {
	const isOpen = document.querySelectorAll(".edit");
	const modalPictureOpen = document.querySelector("#edit-picture");
	isOpen.forEach((openModal) => {
		openModal.addEventListener("click", (event) => {
			modalPictureOpen.style.display = "block";
		});
	});
};

isModalPictureOpen();

const isModalAddPictureOpen = () => {
	const isOpen = document.querySelector("#create");
	const modalAddPictureOpen = document.querySelector("#add-picture");
	const modalPictureIsHide = document.querySelector("#edit-picture");

	isOpen.addEventListener("click", (event) => {
		modalAddPictureOpen.style.display = "block";
		modalPictureIsHide.style.display = "none";
	});
};

const isModalPictureClose = () => {
	const modalPictureOpen = document.querySelector("#edit-picture");
	const closeModal = document.querySelector(".close-edit-picture");

	closeModal.addEventListener("click", (event) => {
		modalPictureOpen.style.display = "none";
	});
};

const isModalAddPictureClose = () => {
	const modalPictureIsHide = document.querySelector("#add-picture");
	const closeModal = document.querySelector(".modal-closed-btn");
	const returnBack = document.querySelector(".modal-return");
	const modalPictureOpen = document.querySelector("#edit-picture");
	const valider = document.querySelector("#valider");


	closeModal.addEventListener("click", (event) => {
		modalPictureIsHide.style.display = "none";
	});
	valider.addEventListener("click", (event) => {
		modalPictureIsHide.style.display = "none";
	});

	returnBack.addEventListener("click", (event) => {
		modalPictureIsHide.style.display = "none";
		modalPictureOpen.style.display = "block"
	});
};

isModalAddPictureOpen();
isModalPictureClose();
isModalAddPictureClose();

const addPicturesElements = document.querySelector("#preview");
const imageInput = document.querySelector("#add-photo2");

imageInput.addEventListener("change", imgPreview);
function imgPreview() {
	
	const title = document.querySelector("#titleModalPic").value;
	const valider = document.querySelector("#valider");
	const fileExtension = /\.(jpg|png)$/i;
	if (!title.length === 0 && this.files.length > 0 && !fileExtension.test(this.files[0].name)) {
		valider.setAttribute("disabled");
		valider.classList.remove("green");
		return;
	} else {
		valider.classList.add("green")
		valider.removeAttribute("disabled");
		console.log(valider)
		console.log(title)
	}
	
	

	addPicturesElements.style.display = "none";

	const file = this.files[0];
	const file_reader = new FileReader();
	file_reader.readAsArrayBuffer(file);
	file_reader.addEventListener("load", (e) => displayImage(e, file));
	console.log(file_reader)
}

function displayImage(e, file) {
	const figure_element = document.createElement("img");
	const hideFileUpdate = document.querySelector(".hide-for-preview");
	const image_blob = new Blob([e.target.result], { type: file.type });
	figure_element.src = URL.createObjectURL(image_blob);
	figure_element.classList.add("new-preview")
	document.querySelector(".add-pics-file").appendChild(figure_element);
	hideFileUpdate.style.display = "none"
}
