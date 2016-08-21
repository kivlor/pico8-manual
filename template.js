module.exports = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>PICO-8 Manual</title>
      <style type="text/css">
        /* normalize */
        img,legend{border:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary{display:block}audio,canvas,video{display:inline-block}audio:not([controls]){display:none;height:0}[hidden]{display:none}html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body,figure{margin:0}a:focus{outline:dotted thin}a:active,a:hover{outline:0}h1{font-size:2em;margin:.67em 0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:700}dfn{font-style:italic}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0}mark{background:#ff0;color:#000}code,kbd,pre,samp{font-family:monospace,serif;font-size:1em}pre{white-space:pre-wrap}q{quotes:"\\201C" "\\201D" "\\2018" "\\2019"}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}svg:not(:root){overflow:hidden}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{padding:0}button,input,select,textarea{font-family:inherit;font-size:100%;margin:0}button,input{line-height:normal}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=search]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}textarea{overflow:auto;vertical-align:top}table{border-collapse:collapse;border-spacing:0}
        
        /* elems */
        body,html,ol,ul{margin:0;padding:0}::selection{background:#c2c3c7}*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}html{font-family:monaco,Consolas,"Lucida Console",monospace;font-size:16px;line-height:1.5}@media (min-width:58em){html{font-size:20px}}body{background:#fff;color:#000;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}h1,h2,h3,h4,h5,h6{margin-top:0;margin-bottom:1rem;padding:0;color:#000;font-weight:700;line-height:1.25}h1{font-size:2rem}h2{margin-top:.5rem;font-size:1.5rem}h3{font-size:1.25rem}h4,h5,h6{font-size:1rem}blockquote,mark,p,pre{margin:0 0 1rem;padding:0}blockquote,pre{padding:.5rem}mark{background-color:#c2c3c7}pre code{display:block}blockquote{border-left:.25rem solid #c2c3c7}blockquote p:last-child{margin-bottom:0}a{color:#29adff;text-decoration:none}a strong{color:inherit}a:hover{text-decoration:underline}ol,ul{list-style-position:inside}dl dd,dl dt,ol li,ul li{margin:0 0 .5rem}ol li ol,ol li ul,ul li ol,ul li ul{padding-top:.5rem}dl dt{font-weight:700}dl dd{padding-left:0}

        /* structure */
        #wrap { margin: 0 auto; padding: 4rem 2rem; max-width: 60rem; }
      </style>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,700">
    </head>
    <body>
      <div id="wrap">
{{content}}
      </div>
    </body>
</html>`;
