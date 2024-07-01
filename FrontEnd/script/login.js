const request = async () => {
		const email = inputEmail.value;
		const password = inputPassword.value;
	await fetch("http://localhost:5678/api/users/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email: email, password: password }),
	})
		.then((response) => {
			if (response.status == 401) {
				alert("Mot de passe incorrect");
			} else if (response.status == 404) {
				alert("Utilisateur non trouvé");
			}
			response.status;
			return response.json();
		})
		.then((data) => {
			localStorage.setItem("token", data["token"]);
			window.location.href = "index.html";
		})
		.catch(function (error) {
			alert("HTTP Error" + error.status);
		});
};

let inputEmail = document.querySelector("#email");
let inputPassword = document.querySelector("#password");
let btnLogin = document.querySelector("#btnLogin");

btnLogin.addEventListener("click", (event) => {
	event.preventDefault();
	const email = inputEmail.value;
	const password = inputPassword.value;

	if (email.length == 0 && password.length == 0) {
		alert("Merci de saisir l'utilisateur et le mot de passe !");
	} else if (email.length == 0) {
		alert("Merci de saisir l'utilisateur !");
	} else if (password.length == 0) {
		alert("Merci de saisir le mot de passe !");
	} else {
		request()
	}
});

