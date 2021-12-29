/* ==========================================================================
   Author: Jeanclaude Stephane
   Contact: jeanclaude.stephane@hotmail.fr
   Merci à BKM : https://openclassrooms.com/fr/members/2csch1dtd046
   => https://openclassrooms.com/forum/sujet/detecter-l-inactivite-d-un-utilisateur-38698
   ========================================================================== */

"use strict"
//veille avec auto-rotate
let activite_detectee = false;
let auto_rotate_speed = 0;

//************************************************************************************



const intervalle = 5000;
const cam_auto_rot = (speed) =>{
							cam_anim.auto_rotate(speed);
							auto_rotate_speed = speed;
							}

// On crée la fonction qui teste toutes les x secondes l'activité du visiteur via activite_detectee
const testerActivite = () => {
  // On teste la variable activite_detectee
     // Si une activité a été détectée [On réinitialise activite_detectee]
	 first_start? appear_fleches_ui():''
     if(activite_detectee){
		 disappear_fleches_ui();
       activite_detectee = false;
		//console.log("tu bouges");
}else{
		 //console.log("tu ne bouge pas");	 
		 !cam_anim.is_auto_rotate()||auto_rotate_speed==0?cam_auto_rot(0.05):'' 
	 }
  setTimeout('testerActivite();', intervalle); //on relance en boucle la fnct de detection
}
// On lance la fonction testerActivite() pour la première fois, au chargement de la page
//setTimeout('testerActivite();', intervalle);

//************************************************************************************
const user_move = () => {
	activite_detectee = true;
	cam_auto_rot(0); 
}

const init_veille = () => {
						document.onmousemove = () => user_move()
						document.onkeydown = () => user_move()
						document.onmousedown = () => user_move()			
}

	