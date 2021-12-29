/* ==========================================================================
   Author: Jeanclaude Stephane
   Contact: jeanclaude.stephane@hotmail.fr
   ========================================================================== */
//dans cette version je rajoute l'auto_rotate
//ainsi qu'une detection de l'inactivité de l'utilisateur
"use strict"
//var camera
//var loading_is_finish = false
let first_start = true

let m_scs, m_obj, m_obj_util, m_trans, m_geom, m_nla,m_cam,m_ctl,m_vec3,m_time,m_app, cam_anim, 
m_anchors,m_config

b4w.register("custom_anchors_main", (exports, require) => {
m_app   = require("app")
const m_data  = require("data")
const m_assets = require("assets")
m_config = require("config")
m_scs   = require("scenes")
m_obj_util = require("__obj_util")
m_obj   = require("objects")
m_trans = require("transform")
m_geom = require("geometry")
m_nla = require("nla")
m_anchors = require("anchors")
//utilisé pour l'animation de camera procédurale
m_cam = require("camera")
m_ctl = require("controls")
m_vec3 = require("vec3")
m_time = require("time")
/****************************/
cam_anim = require("camera_anim")//utilisé pour la veille

exports.init = () => {
    m_app.init({
        canvas_container_id: "canvas_cont",
		quality: "P_ULTRA",
		reflection_quality: "LOW",
		srgb_type: "SRGB_SIMPLE",
		//alpha_sort: true,
		//max_fps: 24,
        callback: init_cb,
        alpha: true,
        autoresize: true,
		show_fps: false,
        console_verbose: false,
		show_hud_debug_info: false
		
    })
	
}
const getRandomIntInclusive = (min, max) =>{
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min +1)) + min
}
const init_cb = (canvas_elem, success) => {
    if (!success) {
        console.log("b4w init failure")
        return
    }
    load()
	canvas_elem.addEventListener("mousedown", mouseDown_cb, false)
	canvas_elem.addEventListener("mouseup", mouseUp_cb, false)
	canvas_elem.addEventListener("mousemove", mouseMove_cb, false)
	canvas_elem.addEventListener("touchmove", touchMove_cb, false)
	//canvas_elem.addEventListener("dblclick", dblClick_cb, false)
	//canvas_elem.addEventListener("mouseover", mouseOver_cb, false)
}

const load = () =>{
	const preloader_cont = document.getElementById("preloader_cont")
    preloader_cont.style.visibility = "visible"
	m_data.load("assets/"+ "base" +".json", load_cb, preloader_cb)
	
}
const load_cb = (data_id) => {
    m_app.enable_camera_controls()
	const camobj = m_scs.get_active_camera()
	init_camera_animation(camobj)		
	
	
}

const preloader_cb = (percentage) => {
									const prelod_dynamic_path = document.getElementById("prelod_dynamic_path")
    let percantage_num = prelod_dynamic_path.nextElementSibling
    prelod_dynamic_path.style.width = percentage + "%"
    percantage_num.innerHTML = percentage + "%"	   
    
									if (percentage == 100) {
										const preloader_cont = document.getElementById("preloader_cont")
										const canvas = document.getElementById("canvas_cont")
										preloader_cont.classList.add('finish')
										canvas.classList.add('starting')
															//loading_is_finish = true
															m_nla.stop()
															m_nla.set_range(0, 1)
															m_nla.set_frame(0)
															m_nla.play()
															init_veille()
															setTimeout('testerActivite()', 5000)
															afficher_interface()
															attach_anchor()
															}
									}


})

b4w.require("custom_anchors_main").init() 

const afficher_interface = () =>{
	console.log("demarrer l'interface user")
	//catch les éléments à faire apparaitre
	const header = document.getElementById("header")
	const sous_header = document.getElementById("bybm3d")
	const bouton_house = document.getElementById("default_main")
	const bouton_control = document.getElementById("controls")
	//demarrage des animations
	header.classList.add("starting")
	sous_header.classList.add("starting")
	bouton_house.classList.add("starting")
	bouton_control.classList.add("starting")
	if(!isMobile.any()){
		const documentation = document.getElementById("documentation")
		documentation.classList.add("starting")
	}
	
	
	
}