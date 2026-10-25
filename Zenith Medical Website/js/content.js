/**
 * =========================================================
 * ZENITH MEDICAL CENTRE — EDITABLE CLINIC CONTENT
 * =========================================================
 * Clinic staff / admins: this is the ONLY file you should need
 * to edit to keep the website up to date. It controls:
 *   - Clinic hours
 *   - Contact details (phone, fax, email, address, parking)
 *   - Announcement banner messages
 *   - New-patient registration status
 *   - Physician roster shown on the Home and Our Doctors pages
 *
 * HOW TO EDIT:
 *   1. Open this file in any text editor.
 *   2. Change the text between quotes " " only.
 *   3. Do not remove commas, quotes, or brackets.
 *   4. Save the file and refresh the website.
 *
 * IMPORTANT: Any field that says [PLACEHOLDER] must be replaced
 * with real clinic-supplied information before the site goes live.
 * Do not invent phone numbers, addresses, or physician details.
 * =========================================================
 */

const CLINIC_CONTENT = {

  // ---- Core identity ----
  clinicName: "Zenith Medical Centre",
  tagline: "Healthcare centred around you and your family.",

  // ---- Contact details ----
  contact: {
    phone: "[PLACEHOLDER PHONE NUMBER]",
    phoneHref: "tel:+16135550100", // update to match phone once confirmed
    fax: "[PLACEHOLDER FAX NUMBER]",
    email: "[PLACEHOLDER EMAIL ADDRESS]",
    addressLine1: "[PLACEHOLDER STREET ADDRESS]",
    addressLine2: "Ottawa, Ontario  [PLACEHOLDER POSTAL CODE]",
    mapQuery: "Ottawa, Ontario, Canada", // replace with full clinic address once confirmed
    parking: "[PLACEHOLDER PARKING INFORMATION — e.g., on-site lot, accessible spaces, street parking notes]"
  },

  // ---- Hours of operation ----
  // Used on: Home (quick info card), Contact page
  hours: [
    { day: "Monday",    hours: "[PLACEHOLDER HOURS]" },
    { day: "Tuesday",   hours: "[PLACEHOLDER HOURS]" },
    { day: "Wednesday", hours: "[PLACEHOLDER HOURS]" },
    { day: "Thursday",  hours: "[PLACEHOLDER HOURS]" },
    { day: "Friday",    hours: "[PLACEHOLDER HOURS]" },
    { day: "Saturday",  hours: "[PLACEHOLDER HOURS]" },
    { day: "Sunday",    hours: "Closed" }
  ],

  // ---- New patient registration status ----
  // Set to one of: "accepting", "waitlist", "closed"
  registrationStatus: "accepting",

  registrationStatusText: {
    accepting: "We are currently accepting new patients.",
    waitlist: "We are currently maintaining a wait list for new patients.",
    closed: "New patient registration is temporarily closed."
  },

  // ---- Announcement banner ----
  // Only the first item with active: true is shown.
  // Add new announcements to the top of the list.
  announcements: [
    {
      id: "flu-clinic-2026",
      active: true,
      message: "Flu vaccination clinics are now being scheduled. <a href=\"contact.html\">Contact us</a> to book your appointment."
    },
    {
      id: "new-patient-intake",
      active: false,
      message: "We are welcoming new patients! Visit our <a href=\"new-patients.html\">New Patients</a> page to register."
    },
    {
      id: "holiday-closure",
      active: false,
      message: "The clinic will be closed on [Holiday Name], [Date]. We will reopen on [Date]."
    },
    {
      id: "new-doctor",
      active: false,
      message: "We're pleased to welcome [Doctor Name] to our medical team. <a href=\"doctors.html\">Meet our physicians</a>."
    }
  ],

  // ---- Physician roster ----
  // "slug" must match the filename in /doctors/ (without .html)
  doctors: [
    {
      slug: "doctor-one",
      name: "Dr. [Full Name]",
      credentials: "MD, CCFP",
      role: "Family Physician",
      accepting: true,
      interests: ["Preventive care", "Chronic disease management"],
      languages: ["English", "French"],
      bio: "[PLACEHOLDER BIOGRAPHY — background, approach to family medicine, and philosophy of care.]"
    },
    {
      slug: "doctor-two",
      name: "Dr. [Full Name]",
      credentials: "MD, CCFP, FCFP",
      role: "Family Physician",
      accepting: false,
      interests: ["Women's health", "Prenatal care"],
      languages: ["English"],
      bio: "[PLACEHOLDER BIOGRAPHY — background, approach to family medicine, and philosophy of care.]"
    },
    {
      slug: "doctor-three",
      name: "Dr. [Full Name]",
      credentials: "MD, CCFP",
      role: "Family Physician",
      accepting: true,
      interests: ["Pediatrics", "Seniors' health"],
      languages: ["English", "Arabic"],
      bio: "[PLACEHOLDER BIOGRAPHY — background, approach to family medicine, and philosophy of care.]"
    }
  ]
};
