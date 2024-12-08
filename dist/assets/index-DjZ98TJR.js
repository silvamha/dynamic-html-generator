(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const i={},d="./json/",a="./sessions/",l="./index.html",u=async e=>{await i.mkdir(a,{recursive:!0}),await i.mkdir(d,{recursive:!0});const s=`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../styles.css">
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
        <p><a href="../index.html">Back to Home</a></p>
    </body>
    </html>
    `,n=i.join(a,`${e.session_id}.html`);await i.writeFile(n,s),console.log(`Session HTML created at: ${n}`)},h=async e=>{let s=await i.readFile(l,"utf-8");const n=`<li><a href="./sessions/${e.session_id}.html">Session ${e.session_id}</a></li>`;s=s.replace("</ul>",`    ${n}
        </ul>`),await i.writeFile(l,s),console.log("Homepage updated with new session link.")},p=async()=>{try{const e=i.join(d,"session.json"),s=await i.readFile(e,"utf-8"),n=JSON.parse(s);await u(n),await h(n)}catch(e){console.error("Error:",e)}};typeof window>"u"&&p();
