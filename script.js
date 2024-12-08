// import fs from 'fs/promises'; // ES Module for file system
// import path from 'path';

// // Define paths
// const jsonDir = './dist/json/';
// const sessionsDir = './dist/sessions/';
// const homepagePath = './dist/index.html';



// // Helper function to create an HTML file from JSON
// const generateHTML = async (sessionData) => {
//     await fs.mkdir(sessionsDir, { recursive: true });

//     const sessionHTML = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Session ${sessionData.session_id}</title>
//     </head>
//     <body>
//         <h1>Session ${sessionData.session_id}</h1>
//         <p><strong>Date:</strong> ${sessionData.timestamp}</p>
//         <p><strong>Summary:</strong> ${sessionData.summary}</p>
//         <h2>User Input</h2>
//         <ul>${sessionData.user_input.map(input => `<li>${input}</li>`).join('')}</ul>
//         <h2>Assistant Output</h2>
//         <ul>${sessionData.assistant_output.map(output => `<li>${output}</li>`).join('')}</ul>
//     </body>
//     </html>
//   `;

//     const outputFilePath = path.join(sessionsDir, `${sessionData.session_id}.html`);
//     await fs.writeFile(outputFilePath, sessionHTML);
//     console.log(`Session HTML created at: ${outputFilePath}`);
// };

// // Update the homepage with a link to the new session
// const updateHomepage = async (sessionData) => {
//     let homepageContent = await fs.readFile(homepagePath, 'utf-8');
//     const newLink = `<li><a href="./sessions/${sessionData.session_id}.html">Session ${sessionData.session_id}</a></li>`;
//     homepageContent = homepageContent.replace('</ul>', `${newLink}\n</ul>`);
//     await fs.writeFile(homepagePath, homepageContent);
//     console.log('Homepage updated with new session link.');
// };

// // Main function
// const main = async () => {
//     try {
//         const jsonFile = `${jsonDir}session.json`; // Replace with your JSON file
//         const data = await fs.readFile(jsonFile, 'utf-8');
//         const sessionData = JSON.parse(data);

//         // Generate session HTML and update homepage
//         await generateHTML(sessionData);
//         await updateHomepage(sessionData);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };

// // Run the main function
// main();


// import fs from 'fs/promises';
// import path from 'path';

// // Define paths
// const jsonDir = './dist/json/';
// const sessionsDir = './dist/sessions/';
// const homepagePath = './dist/index.html';

// // Ensure sessions directory exists
// await fs.mkdir(sessionsDir, { recursive: true });

// // Helper function to create an HTML file from JSON
// const generateHTML = async (sessionData) => {
//     const sessionHTML = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Session ${sessionData.session_id}</title>
//     </head>
//     <body>
//         <h1>Session ${sessionData.session_id}</h1>
//         <p><strong>Date:</strong> ${sessionData.timestamp}</p>
//         <p><strong>Summary:</strong> ${sessionData.summary}</p>
//         <h2>User Input</h2>
//         <ul>${sessionData.user_input.map(input => `<li>${input}</li>`).join('')}</ul>
//         <h2>Assistant Output</h2>
//         <ul>${sessionData.assistant_output.map(output => `<li>${output}</li>`).join('')}</ul>
//     </body>
//     </html>
//   `;

//     const outputFilePath = path.join(sessionsDir, `${sessionData.session_id}.html`);
//     await fs.writeFile(outputFilePath, sessionHTML);
//     console.log(`Session HTML created at: ${outputFilePath}`);
// };

// // Update the homepage with a link to the new session
// const updateHomepage = async (sessionData) => {
//     let homepageContent = await fs.readFile(homepagePath, 'utf-8');
//     const newLink = `<li><a href="./sessions/${sessionData.session_id}.html">Session ${sessionData.session_id}</a></li>`;
//     homepageContent = homepageContent.replace('</ul>', `${newLink}\n</ul>`);
//     await fs.writeFile(homepagePath, homepageContent);
//     console.log('Homepage updated with new session link.');
// };

// // Main function
// const main = async () => {
//     try {
//         const jsonFile = `${jsonDir}session.json`; // Replace with your JSON file
//         const data = await fs.readFile(jsonFile, 'utf-8');
//         const sessionData = JSON.parse(data);

//         // Generate session HTML and update homepage
//         await generateHTML(sessionData);
//         await updateHomepage(sessionData);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };

// // Run the script only in Node.js
// main();


// import fs from 'fs/promises';
// import path from 'path';

// // Define paths - NO MORE dist prefix
// const jsonDir = './json/';
// const sessionsDir = './sessions/';
// const homepagePath = './index.html';

// // Helper function to create an HTML file from JSON
// const generateHTML = async (sessionData) => {
//     await fs.mkdir(sessionsDir, { recursive: true });
//     await fs.mkdir(jsonDir, { recursive: true });

//     const sessionHTML = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <link rel="stylesheet" href="../styles.css">
//         <title>Session ${sessionData.session_id}</title>
//     </head>
//     <body>
//         <h1>Session ${sessionData.session_id}</h1>
//         <p><strong>Date:</strong> ${sessionData.timestamp}</p>
//         <p><strong>Summary:</strong> ${sessionData.summary}</p>
//         <h2>Content</h2>
//         <div class="content">
//             <h3>Question</h3>
//             <p>${sessionData.content.question}</p>
//             <h3>Answer</h3>
//             <p>${sessionData.content.answer}</p>
//         </div>
//         <p><a href="../index.html">Back to Home</a></p>
//     </body>
//     </html>
//     `;

//     const outputFilePath = path.join(sessionsDir, `${sessionData.session_id}.html`);
//     await fs.writeFile(outputFilePath, sessionHTML);
//     console.log(`Session HTML created at: ${outputFilePath}`);
// };

// // Update the homepage with a link to the new session
// const updateHomepage = async (sessionData) => {
//     let homepageContent = await fs.readFile(homepagePath, 'utf-8');
//     const newLink = `<li><a href="./sessions/${sessionData.session_id}.html">Session ${sessionData.session_id}</a></li>`;
//     homepageContent = homepageContent.replace('</ul>', `    ${newLink}\n        </ul>`);
//     await fs.writeFile(homepagePath, homepageContent);
//     console.log('Homepage updated with new session link.');
// };

// // Main function
// const main = async () => {
//     try {
//         const jsonFile = path.join(jsonDir, 'session.json');
//         const data = await fs.readFile(jsonFile, 'utf-8');
//         const sessionData = JSON.parse(data);

//         // Generate session HTML and update homepage
//         await generateHTML(sessionData);
//         await updateHomepage(sessionData);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };

// // Only run in Node.js environment
// if (typeof window === 'undefined') {
//     main();
// }

// import fs from 'fs/promises';
// import path from 'path';

// // Define paths - everything in public folder
// const publicDir = './public';
// const jsonDir = path.join(publicDir, 'json');
// const sessionsDir = path.join(publicDir, 'sessions');
// const homepagePath = './index.html';

// // Helper function to create an HTML file from JSON
// const generateHTML = async (sessionData) => {
//     // Create all necessary directories
//     await fs.mkdir(publicDir, { recursive: true });
//     await fs.mkdir(jsonDir, { recursive: true });
//     await fs.mkdir(sessionsDir, { recursive: true });

//     const sessionHTML = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <link rel="stylesheet" href="../styles.css">
//         <title>Session ${sessionData.session_id}</title>
//     </head>
//     <body>
//         <h1>Session ${sessionData.session_id}</h1>
//         <p><strong>Date:</strong> ${sessionData.timestamp}</p>
//         <p><strong>Summary:</strong> ${sessionData.summary}</p>
//         <h2>Content</h2>
//         <div class="content">
//             <h3>Question</h3>
//             <p>${sessionData.content.question}</p>
//             <h3>Answer</h3>
//             <p>${sessionData.content.answer}</p>
//         </div>
//         <p><a href="../index.html">Back to Home</a></p>
//     </body>
//     </html>
//     `;

your script:
Edit:
script.js
+2
-207
83
Preview
Apply
import fs from 'fs/promises';
import path from 'path';

// Define paths - everything in public folder
const publicDir = './public';
const jsonDir = path.join(publicDir, 'json');
const sessionsDir = path.join(publicDir, 'sessions');
const homepagePath = './index.html';

// Helper function to create an HTML file from JSON
const generateHTML = async (sessionData) => {
    // Create all necessary directories
    await fs.mkdir(publicDir, { recursive: true });
    await fs.mkdir(jsonDir, { recursive: true });
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
            <p>${sessionData.content.question}</p>
            <h3>Answer</h3>
            <p>${sessionData.content.answer}</p>
        </div>
        <p><a href="/">Back to Home</a></p>
    </body>
    </html>
    `;

    // Also copy the JSON to public directory to preserve it
    await fs.writeFile(
        path.join(jsonDir, 'session.json'),
        JSON.stringify(sessionData, null, 2)
    );

    const outputFilePath = path.join(sessionsDir, `${sessionData.session_id}.html`);
    await fs.writeFile(outputFilePath, sessionHTML);
    console.log(`Session HTML created at: ${outputFilePath}`);
};

// Update the homepage with a link to the new session
const updateHomepage = async (sessionData) => {
    let homepageContent = await fs.readFile(homepagePath, 'utf-8');
    const newLink = `<li><a href="./sessions/${sessionData.session_id}.html">Session ${sessionData.session_id}</a></li>`;
    
    // Remove any duplicate links first
    homepageContent = homepageContent.replace(new RegExp(newLink, 'g'), '');
    
    // Add the new link
    homepageContent = homepageContent.replace('</ul>', `    ${newLink}\n        </ul>`);
    await fs.writeFile(homepagePath, homepageContent);
    console.log('Homepage updated with new session link.');
};

// Main function
const main = async () => {
    try {
        const jsonFile = path.join(jsonDir, 'session.json');
        const data = await fs.readFile(jsonFile, 'utf-8');
        const sessionData = JSON.parse(data);

        // Generate session HTML and update homepage
        await generateHTML(sessionData);
        await updateHomepage(sessionData);
    } catch (error) {
        console.error('Error:', error);
    }
};

// Only run in Node.js environment
if (typeof window === 'undefined') {
    main();
}