
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabase = createClient(
    'https://ujjwkhrkkjgoghrxzktx.supabase.co', 
    'sb_publishable_JppNdvfoHD6jNjHviNo82Q_AsFGeFtb'
);

setTimeout(async () => {

	const resetBtn = document.getElementById('resetBtn');
    const backBtn = document.getElementById('backBtn');

	function getFormData() {
		const userEmail = document.getElementById('user-email').value;
		return { userEmail };
	};
    
	backBtn.addEventListener('click', async () => {
		window.location.href = './signIn.html';
	});

    resetBtn.addEventListener('click', async () => {
        const data = getFormData();

        const warningLabel = document.getElementById(`user-email-blank`);
        if (!data.userEmail || data.userEmail.trim() === '') {
            if (warningLabel) warningLabel.style.display = 'block';
            return;
        } else {
            if (warningLabel) warningLabel.style.display = 'none';
        }

        const overlayDiv = document.getElementById(`overlay`);
        if (overlayDiv) overlayDiv.style.display = "block";

        const baseUrl = window.location.origin;
        const redirectUrl = `${baseUrl}/src/html/updatePwd.html`;
		const { resetError } = await supabase.auth.resetPasswordForEmail(data.userEmail, {
            redirectTo: redirectUrl
        });

        if (overlayDiv) overlayDiv.style.display = "none";

        if (resetError) {
            alert(`Failed to sent the password reset link: ${resetError}`);
            return;
        } else {
            alert(`If that email is registered, we'll send a password reset link. Please check your email ${data.userEmail}.`);
        }

	});



}, 0);

