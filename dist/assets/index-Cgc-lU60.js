(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const r={},c="./dist/json",l="./dist/sessions",d="./dist/index.html",u=async s=>{var i,e;await r.mkdir(l,{recursive:!0});const o=`
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
        <h2>Content</h2>
        <div class="content">
            <h3>Question</h3>
            <p>${((i=s.content)==null?void 0:i.question)||"No question"}</p>
            <h3>Answer</h3>
            <p>${((e=s.content)==null?void 0:e.answer)||"No answer"}</p>
        </div>
        <p><a href="/">Back to Home</a></p>
    </body>
    </html>
    `,n=r.join(l,`${s.session_id}.html`);return await r.writeFile(n,o),console.log(`Session HTML created at: ${n}`),n},p=async s=>{try{let o=await r.readFile(d,"utf-8");o=o.replace(/(<ul id="session-list">)[\s\S]*?(<\/ul>)/,`$1
            <!-- Dynamic links to session pages will be added here -->
        $2`);const n=s.map(e=>{const t=r.basename(e,".html");return`<li><a href="/sessions/${t}.html">Session ${t}</a></li>`}).join(`
            `),i=o.replace("</ul>",`    ${n}
        </ul>`);await r.writeFile(d,i),console.log("Homepage updated with session links")}catch(o){console.error("Error updating homepage:",o)}},h=async()=>{try{const s=await r.readdir(c),o=[];for(const n of s)if(n.endsWith(".json")){const i=r.join(c,n),e=await r.readFile(i,"utf-8"),t=JSON.parse(e),a=await u(t);o.push(a)}await p(o)}catch(s){console.error("Error processing sessions:",s)}};typeof window>"u"&&h();
