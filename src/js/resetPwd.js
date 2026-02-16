
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  'https://ujjwkhrkkjgoghrxzktx.supabase.co', 
  'sb_publishable_JppNdvfoHD6jNjHviNo82Q_AsFGeFtb'
);

setTimeout(async () => {

	const resetBtn = document.getElementById('resetBtn');
    const backBtn = document.getElementById('backBtn');

	function getFormData() {
		const userEmail = document.getElementById('user-email').value;
		const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
		return { userEmail, newPassword, confirmPassword };
	};

    resetBtn.addEventListener('click', async () => {
		
	});
    
	backBtn.addEventListener('click', async () => {
		window.location.href = './signIn.html';
	});


}, 0);

