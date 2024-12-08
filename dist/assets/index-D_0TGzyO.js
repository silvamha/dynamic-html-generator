(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const i={},a="./json",l="./sessions",d="./index.html",u=async t=>{var r,e;await i.mkdir(a,{recursive:!0}),await i.mkdir(l,{recursive:!0});const s=`
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
    `;await i.writeFile(i.join(a,"session.json"),JSON.stringify(t,null,2));const n=i.join(l,`${t.session_id}.html`);await i.writeFile(n,s),console.log(`Session HTML created at: ${n}`)},f=async t=>{let s=await i.readFile(d,"utf-8");const n=`<li><a href="/sessions/${t.session_id}.html">Session ${t.session_id}</a></li>`;s=s.replace("</ul>",`    ${n}
        </ul>`),await i.writeFile(d,s)},h=async()=>{try{const t=i.join(a,"session.json"),s=await i.readFile(t,"utf-8"),n=JSON.parse(s);await u(n),await f(n)}catch(t){console.error("Error:",t)}};typeof window>"u"&&h();
