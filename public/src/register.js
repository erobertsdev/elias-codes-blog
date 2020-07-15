const registerButton = document.getElementById('register-button');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

registerButton.disabled = true;

confirmPasswordInput.addEventListener('keyup', (e) => {
	if (confirmPasswordInput.value !== passwordInput.value) {
		registerButton.disabled = true;
	} else {
		registerButton.disabled = false;
	}
});
