
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabase = createClient(
    'https://ujjwkhrkkjgoghrxzktx.supabase.co', 
    'sb_publishable_JppNdvfoHD6jNjHviNo82Q_AsFGeFtb'
);

setTimeout(async () => {
	const { data: { user }, userDataError } = await supabase.auth.getUser();

    if (userDataError || !user) window.location.href = '/';
	
	console.log(user);

    let userMessage = document.getElementById('user-message-card');

    userMessage.innerHTML = `
        <label>Email : ${user.user_metadata.email}</label>
    `;
	const updateBtn = document.getElementById('updateBtn');
    const backBtn = document.getElementById('backBtn');

	function getFormData() {
		const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
		return { newPassword, confirmPassword };
	};
    
	backBtn.addEventListener('click', async () => {
		window.location.href = './signIn.html';
	});

    updateBtn.addEventListener('click', async () => {
		const data = getFormData();

		let allFilled = true;
		
		if (data.newPassword === '') {
			allFilled = false;
			const warningLabel = document.getElementById(`new-password-blank`);
			warningLabel.style.display = 'block';
		} else {
			const warningLabel = document.getElementById(`new-password-blank`);
			warningLabel.style.display = 'none';
		}

		if (data.confirmPassword === '') {
			allFilled = false;
			const warningLabel = document.getElementById(`confirm-password-blank`);
			warningLabel.style.display = 'block';
		} else {
			const warningLabel = document.getElementById(`confirm-password-blank`);
			warningLabel.style.display = 'none';
		}

		if (data.newPassword !== data.confirmPassword) {
			const warningLabel = document.getElementById(`password-different`);
			warningLabel.style.display = 'block';
		} else {
			const warningLabel = document.getElementById(`password-different`);
			warningLabel.style.display = 'none';
		}

        const overlayDiv = document.getElementById(`overlay`);
        if (overlayDiv) overlayDiv.style.display = "block";

		if (!allFilled) return;

		const { updateError } = await supabase.auth.updateUser({
			password: data.newPassword
		})
		await supabase.auth.signOut({ scope: 'local' });

		if (overlayDiv) overlayDiv.style.display = "none";
		if (updateError) {
			alert(`Password update failed: ${updateError}`);
		} else {
			alert(`Password updated successfully! Please sign in with your new password.`);
		}
		
		window.location.href = './signIn.html';
	});


}, 0);


