
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabase = createClient(
    'https://ujjwkhrkkjgoghrxzktx.supabase.co', 
    'sb_publishable_JppNdvfoHD6jNjHviNo82Q_AsFGeFtb'
);

setTimeout(async () => {

    const { data: { session } } = await supabase.auth.getSession();
    console.log(session);
    const signInUpDiv = document.getElementById('signIn-Up-card');
    const userDiv = document.getElementById('user-card');

    const user = session?.user;
    if (!user) {
        signInUpDiv.style.display = 'block';

        const signInUpBtn = document.getElementById('signIn-Up-Btn');
        
        signInUpBtn.addEventListener('click', () => {
            window.location.href = '/src/html/signIn.html';
        });

    } else {
        userDiv.style.display = 'block';

        let userMessage = document.getElementById('user-message-card');
        userMessage.innerHTML = `
            <h2>Welcome ${user.user_metadata.firstName} ${user.user_metadata.lastName}</h2>
            <label>Email : ${user.user_metadata.email}</label>
        `;

        const filesNames = ['test.txt', 'white.png', 'PbootCMS-V3.2.12.zip'];
        const downloadAssets = document.getElementById('user-download-card');
        let htmlString = '';
        filesNames.forEach((file, index) => {
            htmlString += `
                <div class="download-group">
                    <label>${file}</label>
                    <button id="btn-${index}" data-index="${index}">Download</button>
                </div>
            `;
        });
        downloadAssets.innerHTML = htmlString;

        async function handleDownload(fileName) {
            try {
                const overlayDiv = document.getElementById(`overlay`);
                if (overlayDiv) overlayDiv.style.display = "block";

                const { data, error } = await supabase.storage
                    .from('TEST')
                    .createSignedUrl(fileName, 300);

                if (error) {
                    alert(`Failed to download: ${error.message}`);
                    window.location.href = '/';
                    return;
                }
                if (overlayDiv) overlayDiv.style.display = "none";

                const headResponse = await fetch(data.signedUrl, { method: 'HEAD' });
                if (!headResponse.ok) {
                    const link = document.createElement('a');
                    link.href = data.signedUrl;
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    return;
                }
                const contentType = headResponse.headers.get('content-type') || '';
                const link = document.createElement('a');
                link.download = fileName; 

                if (contentType.startsWith('text/') || contentType.startsWith('image/')) {
                    const response = await fetch(data.signedUrl);
                    if (!response.ok) {
                        alert('Download failed.');
                        return;
                    }

                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    link.href = url;

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);

                } else {
                    link.href = data.signedUrl;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }


            } catch (err) {
                if (overlayDiv) overlayDiv.style.display = "none";
                alert('Download failed.');
                window.location.href = '/';
            }
        }


        downloadAssets.addEventListener('click', async (event) => {
            const target = event.target;

            if (target.tagName === 'BUTTON') {
                const index = target.getAttribute('data-index'); 
                if (index !== null) {
                    const fileName = filesNames[index];
                    await handleDownload(fileName);
                }
            }
        });


        const signOutBtn = document.getElementById('signOut-Btn');

        signOutBtn.addEventListener('click', async () => {
            const overlayDiv = document.getElementById(`overlay`);
            if (overlayDiv) overlayDiv.style.display = "block";

            await supabase.auth.signOut({ scope: 'local' });
            window.location.href = '/';
        });

    }

}, 0);

