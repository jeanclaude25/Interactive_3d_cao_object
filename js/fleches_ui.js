/* ==========================================================================
   Author: Jeanclaude Stephane
   Contact: jeanclaude.stephane@hotmail.fr
   Merci à BKM : https://openclassrooms.com/fr/members/2csch1dtd046
   => https://openclassrooms.com/forum/sujet/detecter-l-inactivite-d-un-utilisateur-38698
   ========================================================================== */

"use strict"
//Attrape les fleches
const appear_fleches_ui = () =>{
m_scs.show_object(m_scs.get_object_by_name("Fleches"))
first_start = false
}
const disappear_fleches_ui = ()=>m_scs.hide_object(m_scs.get_object_by_name("Fleches"))
