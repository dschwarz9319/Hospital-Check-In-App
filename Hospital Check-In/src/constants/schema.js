export default {
  address: {
    street: String,
    street2: String,
    state: String,
    postal_code: Number,
    _descriptor: ["street"]
  },
  bill: {
    amount: Number,
    date: Date,
    patient_id: "patient",
    _descriptor: ["Patient:", "patient_id", "date"]
  },
  check_in: {
    patient_id: "patient",
    receptionist_id: "receptionist",
    room_number: Number,
    date: Date,
    notes: String,
    _descriptor: ["patient_id", "date"]
  },
  check_out: {
    patient_id: "patient",
    receptionist_id: "receptionist",
    date: Date,
    notes: String,
    _descriptor: ["Patient:", "patient_id", "date"]
  },
  diagnosis: {
    diagnosis: String,
    date: Date,
    patient_id: "patient",
    _descriptor: ["Patient:", "patient_id", "diagnosis"]
  },
  doctor: {
    name: String,
    speciality: String,
    _descriptor: ["name"]
  },
  guardian: {
    patient_id: "patient",
    name: String,
    phone_number: String,
    address_id: "address",
    _descriptor: ["name"]
  },
  insurance: {
    patient_id: "patient",
    provider_name: String,
    member_id: String,
    group_id: String,
    _descriptor: ["provider_name", "member_id"]
  },
  law_enforcement_officer: {
    name: String,
    phone_number: String,
    precinct: String,
    _descriptor: ["name"]
  },
  lawyer: {
    name: String,
    law_office: String,
    phone_number: String,
    _descriptor: ["name"]
  },
  nurse: {
    name: String,
    _descriptor: ["name"]
  },
  patient: {
    name: String,
    phone_number: String,
    address_id: "address",
    primary_insurance_id: "insurance",
    _descriptor: ["name"]
  },
  pharmacy: {
    address_id: "address",
    name: String,
    phone_number: String,
    _descriptor: ["name"]
  },
  prescription: {
    name: String,
    patient_id: "patient",
    doctor_id: "doctor",
    pharmacy_id: "pharmacy",
    _descriptor: ["Patient:", "patient_id", "name"]
  },
  receptionist: {
    name: String,
    _descriptor: ["name"]
  }
};
