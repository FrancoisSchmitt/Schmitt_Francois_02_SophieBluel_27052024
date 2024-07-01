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
const isModalPictureClose = () => {};

const isModalAddPictureClose = () => {};
