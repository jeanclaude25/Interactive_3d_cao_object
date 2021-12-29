/* ==========================================================================
   Author: Jeanclaude Stephane
   Contact: jeanclaude.stephane@hotmail.fr
   ========================================================================== */

"use strict"
//attrape les boutons de control
const bouton_documentation = document.getElementById("doc_bouton")
//div a travailler
const canvas_cont = document.getElementById("canvas_cont")
const documentation = document.getElementById("documentation")
const documentation_picture = document.getElementById("doc_bouton")
//attrape le texte à modifier
let panel_open=false

const open_panel = () => {
	canvas_cont.style.width = document.body.clientWidth - 470 +"px"
	documentation.style.marginLeft = document.body.clientWidth - 590 +"px"
	documentation_picture.classList.add("open")
	panel_open=true			
}
const close_panel = () => {
	try{
	canvas_cont.style.width = 100 +"%"
	documentation.style.marginLeft = document.body.clientWidth - 110 +"px"
	panel_open = false
	documentation_picture.classList.remove("open")
	}catch(e){}
}

if(isMobile.any()){
	bouton_documentation.style.visibility="hidden"
	documentation.style.visibility="hidden"
	documentation_picture.style.visibility="hidden"
}else{
	//associe ses boutons aux animations
	bouton_documentation.onclick = () => toggle_open_panel()
	close_panel()
	}

const toggle_open_panel= () =>{
	console.log("pression panel")
	//attrape la dimension de la fenetre
	console.log(document.body.clientWidth)
	panel_open?close_panel():open_panel()
}

window.onresize = () => {
	//mettre les valeurs d'animations à zero
	canvas_cont.classList.add("notransition")
	documentation.classList.add("notransition")
	panel_open?open_panel():close_panel()
	//remettre les valeurs d'animations d'origine
	documentation.classList.remove("notransition")
	canvas_cont.classList.remove("notransition")
	}