import fs from 'fs/promises';
import path from 'path';

const jsonDir = './dist/json';
const sessionsDir = './dist/sessions';
const homepagePath = './dist/index.html';

// Validate JSON files before processing
const validateJsonFile = (filePath, data) => {
    try {
        const parsedData = JSON.parse(data);
        if (!parsedData.session_id) {
            throw new Error(`Invalid JSON: Missing session_id in ${filePath}`);
        }
        return parsedData;
    } catch (error) {
        console.error(`Error parsing ${filePath}:`, error.message);
        console.log(`File contents: ${data}`);
        return null;
    }
};

const main = async () => {
    try {
        // Ensure directories exist
        await fs.mkdir(sessionsDir, { recursive: true });

        // Log directory contents for debugging
        console.log('JSON Directory Contents:');
        const files = await fs.readdir(jsonDir);
        console.log(files);

        const sessionPaths = [];

        for (const file of files) {
            if (file.endsWith('.json')) {
                const jsonFile = path.join(jsonDir, file);
                
                // Read and log file contents
                const rawData = await fs.readFile(jsonFile, 'utf-8');
                console.log(`Processing file: ${file}`);
                console.log('Raw file contents:', rawData);

                const sessionData = validateJsonFile(jsonFile, rawData);
                
                if (!sessionData) {
                    console.error(`Skipping invalid file: ${file}`);
                    continue;
                }

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
                await fs.writeFile(outputFilePath, sessionHTML);
                console.log(`Session HTML created at: ${outputFilePath}`);
                sessionPaths.push(outputFilePath);
            }
        }

        // Update homepage
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
        console.error('FATAL ERROR in main process:', error);
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
    }
};

if (typeof window === 'undefined') {
    main();
}