import fs from 'fs/promises';
import path from 'path';

const jsonDir = './dist/json'; // Path to JSON files
const sessionsDir = './dist/sessions'; // Path to generated HTML files
const homepagePath = './dist/index.html'; // Path to homepage

const generateHTML = async (sessionData) => {
    await fs.mkdir(sessionsDir, { recursive: true });

    const sessionHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/styles.css">
        <title>Session ${sessionData.session_id}</title>
    </head>
    <body>
        <h1>Session ${sessionData.session_id}</h1>
        <p><strong>Date:</strong> ${sessionData.timestamp}</p>
        <p><strong>Summary:</strong> ${sessionData.summary}</p>
        <h2>Content</h2>
        <div class="content">
            <h3>Question</h3>
            <p>${sessionData.content?.question || ''}</p>
            <h3>Answer</h3>
            <p>${sessionData.content?.answer || ''}</p>
        </div>
        <p><a href="/">Back to Home</a></p>
    </body>
    </html>
    `;

    const outputFilePath = path.join(sessionsDir, `${sessionData.session_id}.html`);
    await fs.writeFile(outputFilePath, sessionHTML);
    console.log(`Session HTML created at: ${outputFilePath}`);
};

const updateHomepage = async (sessionData, isFirstSession) => {
    try {
        // Read the homepage file
        let homepageContent = await fs.readFile(homepagePath, 'utf-8');
        
        // If it's the first session, clear existing dynamic links
        if (isFirstSession) {
            homepageContent = homepageContent.replace(
                /(<ul id="session-list">)[\s\S]*?(<\/ul>)/,
                '$1\n            <!-- Dynamic links to session pages will be added here -->\n        $2'
            );
        }
        
        // Create the new link
        const newLink = `<li><a href="/sessions/${sessionData.session_id}.html">Session ${sessionData.session_id}</a></li>`;
        
        // Replace the closing </ul> tag with the new link and the closing tag
        const updatedHomepageContent = homepageContent.replace('</ul>', `    ${newLink}\n        </ul>`);
        
        // Write the updated content back to the file
        await fs.writeFile(homepagePath, updatedHomepageContent);
        
        console.log(`Added link for session ${sessionData.session_id} to homepage`);
    } catch (error) {
        console.error('Error updating homepage:', error);
    }
};

const main = async () => {
    try {
        const files = await fs.readdir(jsonDir);
        for (const [index, file] of files.entries()) {
            if (file.endsWith('.json')) {
                const jsonFile = path.join(jsonDir, file);
                const data = await fs.readFile(jsonFile, 'utf-8');
                const sessionData = JSON.parse(data);
                await generateHTML(sessionData);
                
                // Pass a flag to indicate if it's the first session
                await updateHomepage(sessionData, index === 0);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

if (typeof window === 'undefined') {
    main();
}