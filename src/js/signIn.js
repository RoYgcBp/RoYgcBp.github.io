
import { createClient } from '@supabase/supabase-js'
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
		const overlayDiv = document.getElementById(`overlay`);
        if (overlayDiv) overlayDiv.style.display = "block";

		const data = getFormData();
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: data.userEmail,
            password: data.password
        });

        console.log({ signInData, signInError });

		if (signInError) {
			alert(`Failed to sign in: ${signInError.message}`);
			if (overlayDiv) overlayDiv.style.display = "none";
			return;
		} else {
			window.location.href = '/';
		}
	});






}, 0);
