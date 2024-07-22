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
	const modalAddPictureOpen = document.querySelector("#add-picture");
	const closeModal = document.querySelector(".close-edit-picture");

	closeModal.addEventListener("click", (event) => {
		modalAddPictureOpen.style.display = "none";
	});
};

const isModalAddPictureClose = () => {
	const modalPictureIsHide = document.querySelector("#edit-picture");
	const closeModal = document.querySelector(".close-edit-picture");

	closeModal.addEventListener("click", (event) => {
		modalPictureIsHide.style.display = "none";
	});
};

isModalAddPictureOpen();
isModalPictureClose();
isModalAddPictureClose();

const addPicturesElements = document.querySelector("#preview");
const imageInput = document.querySelector("#add-photo2");

imageInput.addEventListener("change", imgPreview);
function imgPreview() {
	const fileExtension = /\.(jpg|png)$/i;
	if (this.files.length === 0 || !fileExtension.test(this.files[0].name)) {
		return;
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
	const image_blob = new Blob([e.target.result], { type: file.type });
	figure_element.src = URL.createObjectURL(image_blob);
	document.querySelector(".add-preview").appendChild(figure_element);
}
