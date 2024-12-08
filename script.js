import fs from 'fs/promises';
import path from 'path';

const jsonDir = './dist/json';
const sessionsDir = './dist/sessions';
const homepagePath = './dist/index.html';

const generateSessionHTML = async (sessionData) => {
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
        
        <h2>Conversation Details</h2>
        <div class="session-details">
            <h3>Session Type</h3>
            <p>${sessionData.session_type || 'Unspecified'}</p>
            
            <h3>Tags</h3>
            <ul>
                ${(sessionData.tags || []).map(tag => `<li>${tag}</li>`).join('')}
            </ul>
            
            <h3>Conversation</h3>
            <div class="conversation">
                ${(sessionData.user_input || []).map((input, index) => `
                    <div class="user-input">
                        <strong>User:</strong> ${input}
                    </div>
                    <div class="assistant-output">
                        <strong>Assistant:</strong> ${(sessionData.assistant_output || [])[index] || ''}
                    </div>
                `).join('')}
            </div>
            
            <h3>Outcomes</h3>
            <ul>
                ${(sessionData.outcomes || []).map(outcome => `<li>${outcome}</li>`).join('')}
            </ul>
        </div>
        
        <p><a href="/">Back to Home</a></p>
    </body>
    </html>
    `;

    const outputFilePath = path.join(sessionsDir, `${sessionData.session_id}.html`);
    await fs.mkdir(sessionsDir, { recursive: true });
    await fs.writeFile(outputFilePath, sessionHTML);
    return outputFilePath;
};

const updateHomepage = async (sessionPaths) => {
    // Remove duplicate paths and session.json
    const filteredPaths = [...new Set(sessionPaths)]
        .filter(path => !path.includes('session.json'));

    const uniqueLinks = filteredPaths.map(sessionPath => {
        const sessionId = path.basename(sessionPath, '.html');
        return `<li><a href="/sessions/${sessionId}.html">Session ${sessionId}</a></li>`;
    }).join('\n');

    let homepageContent = await fs.readFile(homepagePath, 'utf-8');
    
    // Forcefully replace the entire <ul> content, removing any existing links
    homepageContent = homepageContent.replace(
        /<ul id="session-list">[\s\S]*?<\/ul>/,
        `<ul id="session-list">\n${uniqueLinks}\n</ul>`
    );

    await fs.writeFile(homepagePath, homepageContent);
    console.log('Homepage updated with unique session links');
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
                
                const sessionPath = await generateSessionHTML(sessionData);
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