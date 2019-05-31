exports.schema = {
  address: {
    street: { type: String, required: true },
    street2: { type: String, required: false },
    state: { type: String, required: true },
    postal_code: { type: Number, required: true }
  },
  bill: {
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    patient_id: { type: "patient", required: true }
  },
  check_in: {
    patient_id: { type: "patient", required: true },
    receptionist_id: { type: "receptionist", required: true },
    room_number: { type: Number, required: true },
    date: { type: Date, required: true },
    notes: { type: String, required: true }
  },
  check_out: {
    patient_id: { type: "patient", required: true },
    receptionist_id: { type: "receptionist", required: true },
    date: { type: Date, required: true },
    notes: { type: String, required: true }
  },
  diagnosis: {
    diagnosis: { type: String, required: true },
    date: { type: Date, required: true },
    patient_id: { type: "patient", required: true }
  },
  doctor: {
    name: { type: String, required: true },
    speciality: { type: String, required: true }
  },
  guardian: {
    patient_id: { type: "patient", required: true },
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    address_id: { type: "address", required: true }
  },
  insurance: {
    patient_id: { type: "patient", required: true },
    provider_name: { type: String, required: true },
    member_id: { type: String, required: true },
    group_id: { type: String, required: true }
  },
  law_enforcement_officer: {
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    precinct: { type: String, required: true }
  },
  lawyer: {
    name: { type: String, required: true },
    law_office: { type: String, required: true },
    phone_number: { type: String, required: true }
  },
  nurse: {
    name: { type: String, required: true }
  },
  patient: {
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    address_id: { type: "address", required: true },
    primary_insurance_id: { type: "insurance", required: true }
  },
  pharmacy: {
    address_id: { type: "address", required: true },
    name: { type: String, required: true },
    phone_number: { type: String, required: true }
  },
  prescription: {
    name: { type: String, required: true },
    patient_id: { type: "patient", required: true },
    doctor_id: { type: "doctor", required: true },
    pharmacy_id: { type: "pharmacy", required: true }
  },
  receptionist: {
    name: { type: String, required: true }
  }
};
