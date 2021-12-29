/* ==========================================================================
   Author: Jeanclaude Stephane
   Contact: jeanclaude.stephane@hotmail.fr
   ========================================================================== */

"use strict"
const ANIM_TIME = 2
const _anim_stop = false
let _delta_target = ANIM_TIME
const _cam_anim = {
    timeline: -ANIM_TIME,
    starting_eye: new Float32Array(3),
    starting_target: new Float32Array(3),
    final_eye: new Float32Array(3),
    final_target: new Float32Array(3),
    current_eye: new Float32Array(3),
    current_target: new Float32Array(3)
}

const _vec3_tmp = new Float32Array(3)

const zoom_on_object = (obj) =>{
	console.log("j'ai cliqué sur le zoom " +obj.name)
	//mettre la camera plus proche
	const camobj = m_scs.get_active_camera()
	m_cam.target_zoom_object(camobj, obj)
}
const centrer_la_camera = (obj) =>{
	console.log("activer le camera zoom")
	
	const target = obj
    const eye = m_scs.get_object_by_name("camera_base")
	const camobj = m_scs.get_active_camera()
    const pos_view = m_trans.get_translation(eye)
    const pos_target = m_trans.get_translation(target)
    start_camera_animation(camobj, pos_view, pos_target)
}

const start_camera_animation = (camobj, pos_view, pos_target) => {
    // retrieve camera current position
    m_cam.target_get_pivot(camobj, _cam_anim.current_target)
    m_trans.get_translation(camobj, _cam_anim.current_eye)

    // set camera starting position
    m_vec3.copy(_cam_anim.current_target, _cam_anim.starting_target)
    m_vec3.copy(_cam_anim.current_eye, _cam_anim.starting_eye)

    // set camera final position
    m_vec3.copy(pos_view, _cam_anim.final_eye)
    m_vec3.copy(pos_target, _cam_anim.final_target)

    // start animation
    _delta_target = ANIM_TIME
    _cam_anim.timeline = m_time.get_timeline()
}

const init_camera_animation = (camobj) =>{

    const t_sensor = m_ctl.create_timeline_sensor()
    const e_sensor = m_ctl.create_elapsed_sensor()

    const logic_func = (s) => s[0] - _cam_anim.timeline < ANIM_TIME
    

    const cam_move_cb = (camobj, id, pulse) => {

        if (pulse == 1) {
            if (_anim_stop) {
                _cam_anim.timeline = -ANIM_TIME
                return
            }

            m_app.disable_camera_controls()

            // elapsed = frame time (e_sensor value)
            const elapsed = m_ctl.get_sensor_value(camobj, id, 1)
            let delta = elapsed / ANIM_TIME

            m_vec3.subtract(_cam_anim.final_eye, _cam_anim.starting_eye, _vec3_tmp)
            m_vec3.scaleAndAdd(_cam_anim.current_eye, _vec3_tmp, delta, _cam_anim.current_eye)

            _delta_target -= elapsed
            delta = 1 - _delta_target * _delta_target / (ANIM_TIME * ANIM_TIME)
            m_vec3.subtract(_cam_anim.final_target, _cam_anim.starting_target, _vec3_tmp)
            m_vec3.scaleAndAdd(_cam_anim.starting_target, _vec3_tmp, delta, _cam_anim.current_target)

            m_cam.target_set_trans_pivot(camobj, _cam_anim.current_eye, _cam_anim.current_target)

        } else {
            m_app.enable_camera_controls(false, false, false, null, true)
            if (!_anim_stop)
                m_cam.target_set_trans_pivot(camobj, _cam_anim.final_eye, 
                        _cam_anim.final_target)
            else
                _anim_stop = false
        }
    }

    m_ctl.create_sensor_manifold(camobj, "CAMERA_MOVE", m_ctl.CT_CONTINUOUS,
            [t_sensor, e_sensor], logic_func, cam_move_cb)
}