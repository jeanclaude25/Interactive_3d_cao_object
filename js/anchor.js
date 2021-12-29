/* ==========================================================================
   Author: Jeanclaude Stephane
   Contact: jeanclaude.stephane@hotmail.fr
   ========================================================================== */

"use strict"
let obj_anchor
const anchor_elem = document.getElementById("anchor_id")
const anchor_txt = document.getElementById("anchor_txt")
const loupe = document.getElementById("loupe")
loupe.onclick = () => {zoom_on_object(selected_object) }
const attach_anchor = () => {
	obj_anchor = m_scs.get_object_by_name("anchor")
	m_anchors.attach_move_cb(obj_anchor, (x, y, appearance, obj, elem) => {
        
        move_css_anchor(x,y)
		/*
        if (appearance == "visible")
            anchor_elem.style.visibility = "visible"
        else
            anchor_elem.style.visibility = "hidden"*/
    })
}

const move_anchor_obj = (obj,x,y) => {
	//get translate obj
	//set_translate anchor? Ou mouse x,y?
	const pos = m_trans.get_translation(obj)
	m_trans.set_translation(obj_anchor,pos[0],pos[1],pos[2])
	//bouger le css de l'anchor aux positions de la souris
}
const move_css_anchor = (x,y) =>{
	
	anchor_elem.style.left = x + "px"
    anchor_elem.style.top = y + "px"
}
const show_anchor = () =>{	anchor_elem.classList.add('appear')}
const hide_anchor = () =>{ anchor_elem.classList.remove('appear')}
const rename_anchor = (nom) =>{anchor_txt.innerHTML=nom}
const anchor_on = (obj,x,y) =>{
	console.log("activer l'anchor")
	//tout d'abord, le faire apparaitre sous la souris
	show_anchor()
	rename_anchor(obj.name)
	move_anchor_obj(obj,x,y)
	//le parenter eventuellement à l'objet.
}
