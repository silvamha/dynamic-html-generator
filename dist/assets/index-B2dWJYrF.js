(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const n={},a="./dist/json",l="./dist/sessions",d="./dist/index.html",u=async t=>{var r,e;await n.mkdir(l,{recursive:!0});const s=`
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
            <p>${((r=t.content)==null?void 0:r.question)||""}</p>
            <h3>Answer</h3>
            <p>${((e=t.content)==null?void 0:e.answer)||""}</p>
        </div>
        <p><a href="/">Back to Home</a></p>
    </body>
    </html>
    `,i=n.join(l,`${t.session_id}.html`);await n.writeFile(i,s),console.log(`Session HTML created at: ${i}`)},f=async t=>{let s=await n.readFile(d,"utf-8");const i=`<li><a href="/sessions/${t.session_id}.html">Session ${t.session_id}</a></li>`;s=s.replace("</ul>",`    ${i}
        </ul>`),await n.writeFile(d,s)},h=async()=>{try{const t=await n.readdir(a);for(const s of t)if(s.endsWith(".json")){const i=n.join(a,s),r=await n.readFile(i,"utf-8"),e=JSON.parse(r);await u(e),await f(e)}}catch(t){console.error("Error:",t)}};typeof window>"u"&&h();
