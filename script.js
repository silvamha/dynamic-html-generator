import fs from 'fs/promises';
import path from 'path';

const jsonDir = './dist/json';
const sessionsDir = './dist/sessions';
const homepagePath = './dist/index.html';

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
        <p><strong>Date:</strong> ${sessionData.timestamp || 'N/A'}</p>
        <p><strong>Summary:</strong> ${sessionData.summary || 'No summary available'}</p>
        <h2>Content</h2>
        <div class="content">
            <h3>Question</h3>
            <p>${sessionData.content?.question || 'No question'}</p>
            <h3>Answer</h3>
            <p>${sessionData.content?.answer || 'No answer'}</p>
        </div>
        <p><a href="/">Back to Home</a></p>
    </body>
    </html>
    `;

    const outputFilePath = path.join(sessionsDir, `${sessionData.session_id}.html`);
    await fs.writeFile(outputFilePath, sessionHTML);
    console.log(`Session HTML created at: ${outputFilePath}`);
    return outputFilePath;
};

const updateHomepage = async (sessionPaths) => {
    try {
        let homepageContent = await fs.readFile(homepagePath, 'utf-8');
        
        // Clear existing dynamic links
        homepageContent = homepageContent.replace(
            /(<ul id="session-list">)[\s\S]*?(<\/ul>)/,
            '$1\n            <!-- Dynamic links to session pages will be added here -->\n        $2'
        );

        // Add new links
        const newLinks = sessionPaths.map(sessionPath => {
            const sessionId = path.basename(sessionPath, '.html');
            return `<li><a href="/sessions/${sessionId}.html">Session ${sessionId}</a></li>`;
        }).join('\n            ');

        const updatedHomepageContent = homepageContent.replace('</ul>', `    ${newLinks}\n        </ul>`);
        
        await fs.writeFile(homepagePath, updatedHomepageContent);
        console.log('Homepage updated with session links');
    } catch (error) {
        console.error('Error updating homepage:', error);
    }
};

const main = async () => {
    try {
        const files = await fs.readdir(jsonDir);
        const sessionPaths = [];

        for (const file of files) {
            if (file.endsWith('.json')) {
                const jsonFile = path.join(jsonDir, file);
                const data = await fs.readFile(jsonFile, 'utf-8');
                const sessionData = JSON.parse(data);
                
                const sessionPath = await generateHTML(sessionData);
                sessionPaths.push(sessionPath);
            }
        }

        await updateHomepage(sessionPaths);
    } catch (error) {
        console.error('Error processing sessions:', error);
    }
};

if (typeof window === 'undefined') {
    main();
}