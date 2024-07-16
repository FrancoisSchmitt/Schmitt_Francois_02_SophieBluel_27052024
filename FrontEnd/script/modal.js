const isModalPictureOpen = () => {
	const isOpen = document.querySelector("#myBtn");
	const modalPictureOpen = document.querySelector("#edit-picture");

	isOpen.addEventListener("click", (event) => {
		modalPictureOpen.style.display = "block";
		console.log(event);
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
		console.log(event);
	});
};

isModalAddPictureOpen();
const isModalPictureClose = () => {
	const closeModal = document.querySelector(".close-add-picture");
	const modalAddPictureOpen = document.querySelector("#add-picture");
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

isModalAddPictureClose();
isModalAddPictureOpen();
