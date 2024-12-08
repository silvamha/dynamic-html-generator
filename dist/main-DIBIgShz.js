(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();const o={},a="./public",c=o.join(a,"json"),d=o.join(a,"sessions"),u="./index.html",p=async e=>{await o.mkdir(a,{recursive:!0}),await o.mkdir(c,{recursive:!0}),await o.mkdir(d,{recursive:!0});const i=`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/styles.css">
        <title>Session ${e.session_id}</title>
    </head>
    <body>
        <h1>Session ${e.session_id}</h1>
        <p><strong>Date:</strong> ${e.timestamp}</p>
        <p><strong>Summary:</strong> ${e.summary}</p>
        <h2>Content</h2>
        <div class="content">
            <h3>Question</h3>
            <p>${e.content.question}</p>
            <h3>Answer</h3>
            <p>${e.content.answer}</p>
        </div>
        <p><a href="/">Back to Home</a></p>
    </body>
    </html>
    `;await o.writeFile(o.join(c,"session.json"),JSON.stringify(e,null,2));const n=o.join(d,`${e.session_id}.html`);await o.writeFile(n,i),console.log(`Session HTML created at: ${n}`)},h=async e=>{let i=await o.readFile(u,"utf-8");const n=`<li><a href="./sessions/${e.session_id}.html">Session ${e.session_id}</a></li>`;i=i.replace(new RegExp(n,"g"),""),i=i.replace("</ul>",`    ${n}
        </ul>`),await o.writeFile(u,i),console.log("Homepage updated with new session link.")},m=async()=>{try{const e=o.join(c,"session.json"),i=await o.readFile(e,"utf-8"),n=JSON.parse(i);await p(n),await h(n)}catch(e){console.error("Error:",e)}};typeof window>"u"&&m();
//# sourceMappingURL=main-DIBIgShz.js.map
