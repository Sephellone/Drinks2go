const toggleClasses=(s,e,a)=>{s.classList.contains(e)?(s.classList.remove(e),s.classList.add(a)):(s.classList.remove(a),s.classList.add(e))},isTabKey=s=>9===s.keyCode,isEscapeKey=s=>"Escape"===s.key,isEnterKey=s=>13===s.keyCode;export{toggleClasses,isTabKey,isEscapeKey,isEnterKey};