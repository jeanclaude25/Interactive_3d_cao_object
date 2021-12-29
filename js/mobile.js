"use strict"
const isMobile = {
	Android:()=>{
		return navigator.userAgent.match(/Android/i)
				},
	BlackBerry:()=>{
		return navigator.userAgent.match(/BlackBerry/i)},
	iOS:()=>{
		return navigator.userAgent.match(/iPhone|iPad|iPod/i)},
	Opera:()=>{
		return navigator.userAgent.match(/Opera Mini/i)},
	Windows:()=>{
		return navigator.userAgent.match(/IEMobile/i)},
	LowRes:()=>{
		return window.innerWidth<=800&&window.innerHeight<=600?!0:!1},
	any:()=>{
		return isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Opera()||isMobile.Windows()||isMobile.LowRes()}
	}

const charger_le_panneau = () =>{
	const panel=document.getElementById("inlineFrame")
	panel.src="pdf/maintenance_procedure.pdf"
}

const ne_pas_charger_le_panneau = ()=>{
	const panel=document.getElementById("documentation")
	panel.style.visibility="hidden"
	panel.style.zIndex="0"
}
isMobile.any()?ne_pas_charger_le_panneau():charger_le_panneau()