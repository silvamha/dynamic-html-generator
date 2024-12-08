(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const r={},l="./dist/json",c="./dist/sessions",d="./dist/index.html",u=async s=>{await r.mkdir(c,{recursive:!0});const o=`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/styles.css">
        <title>Session ${s.session_id}</title>
    </head>
    <body>
        <h1>Session ${s.session_id}</h1>
        <p><strong>Date:</strong> ${s.timestamp||"N/A"}</p>
        <p><strong>Summary:</strong> ${s.summary||"No summary available"}</p>
        
        <h2>Conversation Details</h2>
        <div class="session-details">
            <h3>Session Type</h3>
            <p>${s.session_type||"Unspecified"}</p>
            
            <h3>Tags</h3>
            <ul>
                ${(s.tags||[]).map(i=>`<li>${i}</li>`).join("")}
            </ul>
            
            <h3>Conversation</h3>
            <div class="conversation">
                ${(s.user_input||[]).map((i,e)=>`
                    <div class="user-input">
                        <strong>User:</strong> ${i}
                    </div>
                    <div class="assistant-output">
                        <strong>Assistant:</strong> ${(s.assistant_output||[])[e]||""}
                    </div>
                `).join("")}
            </div>
            
            <h3>Outcomes</h3>
            <ul>
                ${(s.outcomes||[]).map(i=>`<li>${i}</li>`).join("")}
            </ul>
        </div>
        
        <p><a href="/">Back to Home</a></p>
    </body>
    </html>
    `,n=r.join(c,`${s.session_id}.html`);return await r.writeFile(n,o),console.log(`Session HTML created at: ${n}`),n},p=async s=>{try{let o=await r.readFile(d,"utf-8");o=o.replace(/(<ul id="session-list">)[\s\S]*?(<\/ul>)/,`$1
            <!-- Dynamic links to session pages will be added here -->
        $2`);const n=s.map(e=>{const t=r.basename(e,".html");return`<li><a href="/sessions/${t}.html">Session ${t}</a></li>`}).join(`
            `),i=o.replace("</ul>",`    ${n}
        </ul>`);await r.writeFile(d,i),console.log("Homepage updated with session links")}catch(o){console.error("Error updating homepage:",o)}},h=async()=>{try{const s=await r.readdir(l),o=[];for(const n of s)if(n.endsWith(".json")){const i=r.join(l,n),e=await r.readFile(i,"utf-8"),t=JSON.parse(e),a=await u(t);o.push(a)}await p(o)}catch(s){console.error("Error processing sessions:",s),console.error("Detailed error:",s.message),console.error("Error stack:",s.stack)}};typeof window>"u"&&h();
