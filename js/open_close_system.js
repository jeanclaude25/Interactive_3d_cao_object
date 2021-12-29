/* ==========================================================================
   Author: Jeanclaude Stephane
   Contact: jeanclaude.stephane@hotmail.fr
   ========================================================================== */

"use strict"
//attrape les boutons de control
const bouton_ouverture = document.getElementById("open")
//attrape le texte à modifier
const texte_open = document.getElementById("control_text")
let system_open=false
const anims = {
			open : {
				slow : {
					start : 0,
					end : 50
				},
				fast : {
					start : 100,
					end : 125
				}
			},
			close : {
				slow : {
					start : 50,
					end : 100
				},
				fast : {
					start : 125,
					end : 150
				}
			}
			}
			
//associe ses boutons aux animations
bouton_ouverture.onclick = () => toggle_open_system()

const check_nla=()=>{
	m_nla.is_play()?console.log("Sorry, NLA is already playing"):''
	system_open?console.log("le système est deja ouvert"):console.log("le système est deja fermé")
	console.log("frame: "+m_nla.get_frame())
}

const toggle_open_system=()=>{
	console.log("demande d'ouverture ou fermeture")
	hide_anchor()
	zero_outline()
	m_nla.is_play()?check_nla()
	:system_open == false?open_system(anims.open.slow):close_system(anims.close.slow)			
								
}

const conf_nla=(rangeSpeedValue)=>{
					m_nla.stop()
					m_nla.set_range(rangeSpeedValue.start, rangeSpeedValue.end)
					m_nla.set_frame(rangeSpeedValue.start)
					m_nla.play()
					}

const open_system=(rangeSpeedValue)=>{
						console.log("ouverture")
						conf_nla(rangeSpeedValue)
						bouton_ouverture.classList.remove("nla_ready")
						bouton_ouverture.classList.add("nla_playing")
						console.log(texte_open.innerHTML)
						texte_open.innerHTML = "OPENING"
						//lance une fonction qui va controler quant l'anim est fini
						setTimeout('endNLAControl()', 2100)
						system_open = true
						hide_anchor()
						zero_outline()
						}

const close_system=(rangeSpeedValue)=>{
						console.log("fermeture")
						conf_nla(rangeSpeedValue)
						bouton_ouverture.classList.remove("nla_ready")
						bouton_ouverture.classList.add("nla_playing")
						setTimeout('endNLAControl()', 2100)
						texte_open.innerHTML = "CLOSING"
						//lance une fonction qui va controler quant l'anim est fini
						system_open = false
						hide_anchor()
						zero_outline()
						}

const endNLAControl=()=>{
	if(m_nla.is_play()){
		setTimeout('endNLAControl()', 500)
	}else{
		bouton_ouverture.classList.remove("nla_playing")
		bouton_ouverture.classList.add("nla_ready")
		system_open == true?texte_open.innerHTML = "CLOSE":texte_open.innerHTML = "OPEN"
		//enleve l'ancien style
		}
}