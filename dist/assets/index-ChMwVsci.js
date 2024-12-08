(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(t){if(t.ep)return;t.ep=!0;const i=o(t);fetch(t.href,i)}})();const r={},u="./dist/json/",a="./dist/sessions/",c="./dist/index.html",d=async e=>{await r.mkdir(a,{recursive:!0});const s=`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Session ${e.session_id}</title>
    </head>
    <body>
        <h1>Session ${e.session_id}</h1>
        <p><strong>Date:</strong> ${e.timestamp}</p>
        <p><strong>Summary:</strong> ${e.summary}</p>
        <h2>User Input</h2>
        <ul>${e.user_input.map(n=>`<li>${n}</li>`).join("")}</ul>
        <h2>Assistant Output</h2>
        <ul>${e.assistant_output.map(n=>`<li>${n}</li>`).join("")}</ul>
    </body>
    </html>
  `,o=r.join(a,`${e.session_id}.html`);await r.writeFile(o,s),console.log(`Session HTML created at: ${o}`)},p=async e=>{let s=await r.readFile(c,"utf-8");const o=`<li><a href="./sessions/${e.session_id}.html">Session ${e.session_id}</a></li>`;s=s.replace("</ul>",`${o}
</ul>`),await r.writeFile(c,s),console.log("Homepage updated with new session link.")},m=async()=>{try{const e=`${u}session.json`,s=await r.readFile(e,"utf-8"),o=JSON.parse(s);await d(o),await p(o)}catch(e){console.error("Error:",e)}};m();
