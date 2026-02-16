
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabase = createClient(
	'https://ujjwkhrkkjgoghrxzktx.supabase.co', 
	'sb_publishable_JppNdvfoHD6jNjHviNo82Q_AsFGeFtb'
);

setTimeout(async () => {

	const loginBtn = document.getElementById('loginBtn');
	const signUpBtn = document.getElementById('signUpBtn');
	const forgotBtn = document.getElementById('forgotBtn');
	const backBtn = document.getElementById('backBtn');

	function getFormData() {
		const userEmail = document.getElementById('user-email').value;
		const password = document.getElementById('password').value;
		return { userEmail, password };
	};

	signUpBtn.addEventListener('click', async () => {
		window.location.href = 'signUp.html';
	});

	forgotBtn.addEventListener('click', async () => {
		window.location.href = 'resetPwd.html';
	});

	backBtn.addEventListener('click', async () => {
		window.location.href = '/';
	});

	loginBtn.addEventListener('click', async () => {
		const data = getFormData();

		let allFilled = true;

		if (data.userEmail === '') {
			allFilled = false;
			const warningLabel = document.getElementById(`user-email-blank`);
			warningLabel.style.display = 'block';
		} else {
			const warningLabel = document.getElementById(`user-email-blank`);
			warningLabel.style.display = 'none';
		}

		if (data.password === '') {
			allFilled = false;
			const warningLabel = document.getElementById(`password-blank`);
			warningLabel.style.display = 'block';
		} else {
			const warningLabel = document.getElementById(`password-blank`);
			warningLabel.style.display = 'none';
		}

		if (!allFilled) return;

		const overlayDiv = document.getElementById(`overlay`);
        if (overlayDiv) overlayDiv.style.display = "block";


        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: data.userEmail,
            password: data.password
        });

		if (signInError) {
			alert(`Failed to sign in: ${signInError.message}`);
			if (overlayDiv) overlayDiv.style.display = "none";
			return;
		}
		
		window.location.href = '/';
		
	});






}, 0);
