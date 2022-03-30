import CustomAxios from "../utils/customAxios";
import { Notyf } from "notyf";

const AppointmentCard = (props) => {

  const notyf = new Notyf();

  let patients;
  let doctors;
  if(localStorage.getItem('patientList'))
  {
    patients = (JSON.parse(localStorage.getItem("patientList"))).find((patient, index) => {
      return patient.id == props.patient;
    })
  }
  if(localStorage.getItem('doctors'))
  {
    doctors = (JSON.parse(localStorage.getItem("doctors"))).find((doctor, index) => {
      return doctor.id == props.doctor;
    })
  }

  async function handleAcceptAppointment(event) {
    console.log(props.date)
    CustomAxios.put(`appointments/${props.id}/`, {
      id: props.id,
      doctor_id: props.doctor, 
      patient_id: props.patient, 
      description: props.description,
      status: 1,
      date: props.date
    }).then((response) => {
      console.log("appointment edited =", response);
      window.location.reload(true)
    })
    .catch((err) => {
      console.log(err)
    }) 
  }

  async function handleRejectAppointment(event) {
    event.preventDefault();
    CustomAxios.put(`appointments/${props.id}/`, {
      id: props.id,
      doctor_id: props.doctor,
      patient_id: props.patient,
      description: props.description,
      status: 3,
      date: props.date
    }).then((response) => {
      console.log("appointment edited =", response);
      window.location.reload(true)
    })
    .catch((err) => {
      console.log(err);
    })
    
  }
  
  return(
    <div className="appointment-card">
      <div className="appointment-title">Appointment with</div>
      <div className="appointment-title">
        {
          props.byPatient ? ("Dr. " + doctors.first_name + " " + doctors.last_name) : (patients.first_name + " " + patients.last_name)
        } </div>
      <div className="appointment-description">{props.description}</div>
      <div className="appointment-show-date">{props.date}</div>
      <div className="appointment-button-grid">
      {
        props.pendingByDoctor ? 
        <button className="appointment-button button" onClick={handleAcceptAppointment}>Accept</button> : <div></div> 
      }
      {
        props.pendingByDoctor ? 
        <button className="appointment-button button" onClick={handleRejectAppointment}>Delete</button> : <div></div> 
      }
      </div>
      <div className="appointment-status">
        {
          !props.pendingByDoctor ? ((props.status == 1) ? <div className="green">ACCEPTED</div> : (props.status == 2 ? <div className="yellow">PENDING</div> : <div className="red">DECLINED</div>)) : <></>
        }
      </div> 
    </div>
  )
}

export default AppointmentCard;