/* ==========================================================================
   Author: Jeanclaude Stephane
   Contact: jeanclaude.stephane@hotmail.fr
   ========================================================================== */

"use strict"
//mouse_obj
const mouse =
			{
				down:
					{
					x:0,
					y:0
					},
				up:
					{
					x:0,
					y:0
					}
				
			}

const mouseMove_cb=()=>{
	disappear_fleches_ui()
}
const mouseDown_cb=(e)=>{
	//hide_anchor()zero_outline()
	mouse.down.x = e.clientX
	mouse.down.y = e.clientY
}

const mouseUp_cb=(e)=>{
	mouse.up.x = e.clientX
	mouse.up.y = e.clientY
	compare_move(e)
}
const compare_move=(e)=> 
	mouse.down.x==mouse.up.x&&mouse.down.y==mouse.up.y?
	click_cb(e):''//console.log("c'était un drag")

//**********pick obj
const click_cb=(e)=> {
    if (e.preventDefault)
        e.preventDefault()

    const x = e.clientX //corrige le décalage causé par les boutons.
	//il faudra aussi corriger celui causer par le panneau pdf
    const y = e.clientY

   const obj = m_scs.pick_object(x, y)

    if (!obj)
        return
	

    console.log(obj.name)
	selected_object = obj
	selected_objects.push(obj)
	if(selected_objects.length>1){
								m_scs.clear_outline_anim(selected_objects[0])
								selected_objects = []
								selected_objects.push(obj)
								}
	//activer l'outline
	outline_mode(obj)
	//activer l'anchor
	anchor_on(obj,x,y)
	//zoom efficace de la camera
	centrer_la_camera(obj)
}