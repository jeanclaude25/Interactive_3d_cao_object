/* ==========================================================================
   Author: Jeanclaude Stephane
   Contact: jeanclaude.stephane@hotmail.fr
   ========================================================================== */

"use strict"
//attrape les boutons de control
const bouton_retour = document.getElementById("default_main")
//var menu_visualisation = document.getElementById("documentation")
//obj
let selected_object
let selected_objects=[]

			
//associe ses boutons aux animations
bouton_retour.onclick = ()=>{retour_system()}

const retour_system =()=>{
	console.log("remise à zero du systeme")
	//camera au zero
	const target = m_scs.get_object_by_name("camera_target")
    const eye = m_scs.get_object_by_name("camera_base")
	const camobj = m_scs.get_active_camera()
    const pos_view = m_trans.get_translation(eye)
    const pos_target = m_trans.get_translation(target)
    start_camera_animation(camobj, pos_view, pos_target)
           
	//si ouvert, l'objet se referme
	//si ouvert, le panneau se referme.
	close_panel()
	hide_anchor()
	zero_outline()
	system_open?close_system(anims.close.fast):''
	console.log("remettre la camera au point zero")
	selected_object = null
	
}

const zero_outline=()=>{
	if(selected_object){
	m_scs.clear_outline_anim(selected_objects[0])
	selected_objects.length = 0
	selected_object = null
	}
}
	
const outline_mode=(obj) => m_scs.apply_outline_anim(obj, 1, 1, 0)