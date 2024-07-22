const request = async () => {
	const email = inputEmail.value;
	const password = inputPassword.value;
	await fetch("http://localhost:5678/api/users/login", {
		method: "POST",
		headers: {
			accept: "application/json",
			"Content-type": "application/json",
		},
		body: JSON.stringify({ email: email, password: password }),
	})
		.then(async (response) => {
			if (response.ok) {
				response = await response.json();
				console.log("Les identifiants sont corrects");
				console.log(response);
				localStorage.setItem("token", response?.token);
				window.location.href = "index.html";
			} else {
				alert("Utilisateur ou mot de passe incorrect");
			}
		})
		.catch(function (error) {
			console.error(error);
		});
};

function validateEmail(email) {
	const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
	return emailRegex.test(email);
}
let inputEmail = document.querySelector("#email");
let inputPassword = document.querySelector("#password");
let btnLogin = document.querySelector("#btnLogin");

btnLogin.addEventListener("click", (event) => {
	event.preventDefault();
	const email = inputEmail.value;
	const password = inputPassword.value;

	if (email.length == 0 && password.length == 0) {
		alert("Merci de saisir l'utilisateur et le mot de passe !");
	} else if (!validateEmail(email)) {
		alert("Erreur identifiant, mail non conforme");
	} else if (password.length == 0) {
		alert("Merci de saisir le mot de passe !");
	} else {
		request();
	}
});
