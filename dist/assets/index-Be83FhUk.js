(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const r={},a="./dist/json",l="./dist/sessions",d="./dist/index.html",u=async t=>{var i,e;await r.mkdir(l,{recursive:!0});const n=`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/styles.css">
        <title>Session ${t.session_id}</title>
    </head>
    <body>
        <h1>Session ${t.session_id}</h1>
        <p><strong>Date:</strong> ${t.timestamp}</p>
        <p><strong>Summary:</strong> ${t.summary}</p>
        <h2>Content</h2>
        <div class="content">
            <h3>Question</h3>
            <p>${((i=t.content)==null?void 0:i.question)||""}</p>
            <h3>Answer</h3>
            <p>${((e=t.content)==null?void 0:e.answer)||""}</p>
        </div>
        <p><a href="/">Back to Home</a></p>
    </body>
    </html>
    `,s=r.join(l,`${t.session_id}.html`);await r.writeFile(s,n),console.log(`Session HTML created at: ${s}`)},p=async(t,n)=>{try{let s=await r.readFile(d,"utf-8");n&&(s=s.replace(/(<ul id="session-list">)[\s\S]*?(<\/ul>)/,`$1
            <!-- Dynamic links to session pages will be added here -->
        $2`));const i=`<li><a href="/sessions/${t.session_id}.html">Session ${t.session_id}</a></li>`,e=s.replace("</ul>",`    ${i}
        </ul>`);await r.writeFile(d,e),console.log(`Added link for session ${t.session_id} to homepage`)}catch(s){console.error("Error updating homepage:",s)}},f=async()=>{try{const t=await r.readdir(a);for(const[n,s]of t.entries())if(s.endsWith(".json")){const i=r.join(a,s),e=await r.readFile(i,"utf-8"),o=JSON.parse(e);await u(o),await p(o,n===0)}}catch(t){console.error("Error:",t)}};typeof window>"u"&&f();
