(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function o(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(e){if(e.ep)return;e.ep=!0;const i=o(e);fetch(e.href,i)}})();const a={},c="./dist/json",d="./dist/sessions",u="./dist/index.html",h=async s=>{const n=`
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
                ${(s.tags||[]).map(t=>`<li>${t}</li>`).join("")}
            </ul>
            
            <h3>Conversation</h3>
            <div class="conversation">
                ${(s.user_input||[]).map((t,e)=>`
                    <div class="user-input">
                        <strong>User:</strong> ${t}
                    </div>
                    <div class="assistant-output">
                        <strong>Assistant:</strong> ${(s.assistant_output||[])[e]||""}
                    </div>
                `).join("")}
            </div>
            
            <h3>Outcomes</h3>
            <ul>
                ${(s.outcomes||[]).map(t=>`<li>${t}</li>`).join("")}
            </ul>
        </div>
        
        <p><a href="/">Back to Home</a></p>
    </body>
    </html>
    `,o=a.join(d,`${s.session_id}.html`);return await a.mkdir(d,{recursive:!0}),await a.writeFile(o,n),o},p=async s=>{const o=[...new Set(s)].filter(r=>!r.includes("session.json")).map(r=>{const l=a.basename(r,".html");return`<li><a href="/sessions/${l}.html">Session ${l}</a></li>`}).join(`
`);let t=await a.readFile(u,"utf-8");const e=t.indexOf('<ul id="session-list">'),i=t.indexOf("</ul>",e);e!==-1&&i!==-1&&(t=t.slice(0,e+22)+`
`+o+`
`+t.slice(i)),await a.writeFile(u,t),console.log("Homepage updated with unique session links")},f=async()=>{try{const s=await a.readdir(c),n=[];for(const o of s)if(o.endsWith(".json")){const t=a.join(c,o),e=await a.readFile(t,"utf-8"),i=JSON.parse(e),r=await h(i);n.push(r)}await p(n)}catch(s){console.error("Error processing sessions:",s)}};typeof window>"u"&&f();
