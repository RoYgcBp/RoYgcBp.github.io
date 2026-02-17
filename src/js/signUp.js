
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabase = createClient(
    'https://ujjwkhrkkjgoghrxzktx.supabase.co', 
    'sb_publishable_JppNdvfoHD6jNjHviNo82Q_AsFGeFtb'
);

setTimeout(async () => {

	const registerBtn = document.getElementById('registerBtn');
    const backBtn = document.getElementById('backBtn');

	function getFormData() {
		const userEmail = document.getElementById('user-email').value;
		const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
		const firstName = document.getElementById('user-first-name').value;
		const middleInitial = document.getElementById('user-middle-initial').value;
        const lastName = document.getElementById('user-last-name').value;
        const institution = document.getElementById('user-institution').value;
        const leader = document.getElementById('user-leader').value;
        const country = document.getElementById('user-country').value;
        const purpose = document.getElementById('user-purpose').value;
		return { 
            userEmail, newPassword, confirmPassword, 
            firstName, middleInitial, lastName,
            institution, leader, country, purpose
         };
	};

    registerBtn.addEventListener('click', async () => {
        const signUpInputData = getFormData();

        const requiredFieldIds = [
            'user-email', 'new-password', 'confirm-password',
            'user-first-name', 'user-last-name', 
            'user-institution', 'user-country', 'user-purpose'
        ];

        let allFilled = true;

        requiredFieldIds.forEach(id => {
            const input = document.getElementById(id);
            const value = input ? input.value : '';
            const warningLabel = document.getElementById(`${id}-blank`);

            if (!value || value.trim() === '') {
                allFilled = false;
                if (warningLabel) warningLabel.style.display = 'block';
            } else {
                if (warningLabel) warningLabel.style.display = 'none';
            }
        });
        
        if (signUpInputData.newPassword !== signUpInputData.confirmPassword) {
            const warningLabel = document.getElementById(`password-different`);
            if (warningLabel) warningLabel.style.display = 'block';
            return;
        } else {
            const warningLabel = document.getElementById(`password-different`);
            if (warningLabel) warningLabel.style.display = 'none';
        }

        if (!allFilled) return;

        const overlayDiv = document.getElementById(`overlay`);
        if (overlayDiv) overlayDiv.style.display = "block";

        const redirectUrl = `http://github.ythe.test.wuresearchgroup.cn/src/html/signIn.html`;
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: signUpInputData.userEmail,
            password: signUpInputData.newPassword,
            options: {
                emailRedirectTo: redirectUrl,
                data: {
                    firstName: signUpInputData.firstName,
                    middleInitial: signUpInputData.middleInitial,
                    lastName: signUpInputData.lastName,
                    institution: signUpInputData.institution,
                    leader: signUpInputData.leader,
                    country: signUpInputData.country,
                    purpose: signUpInputData.purpose
                }
            }
        });

        if (signUpError) {
            alert(`Failed to sign up: ${signUpError.message}`);
            if (overlayDiv) overlayDiv.style.display = "none";
            return;
        } else {
            alert(`The verification link has been sent to ${signUpInputData.userEmail}, please check. `);
        }

        window.location.href = './signIn.html';
	});
    
	backBtn.addEventListener('click', async () => {
		window.location.href = './signIn.html';
	});


}, 0);
