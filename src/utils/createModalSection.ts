import { type ArrestLogType } from "@/types/arrestLog.interface";
import { type PoliceComplaint } from "@/types/policeComplaint.type";
import { type PoliceForceAttributes } from "@/types/policeForce.type";
import { type PolicePursuit } from "@/types/policePursuit.type";
import { type DisplayLog } from "../types/openDataPortal.type";

type LogModalSections = {
  title: string;
  fields: { label: string; value: string | number | null }[];
};

export function createModalSection(log: DisplayLog) {
  let sections: LogModalSections[] = [];

  if (log.attributes.hasOwnProperty("Arrest_ID")) {
    const arrestLogData = log.attributes as ArrestLogType;
    sections = [
      {
        title: "Identification",
        fields: [
          { label: "Object ID", value: arrestLogData.OBJECTID },
          { label: "Arrest ID", value: arrestLogData.Arrest_ID },
          { label: "Unique Key", value: arrestLogData.UNIQUEKEY },
          { label: "Case Number", value: arrestLogData.Case_Number },
        ],
      },
      {
        title: "Personal Information",
        fields: [
          { label: "First Name", value: arrestLogData.FIRSTNAME },
          { label: "Middle Name", value: arrestLogData.MIDDLENAME },
          { label: "Last Name", value: arrestLogData.LASTNAME },
          { label: "Suffix", value: arrestLogData.SUFFIX },
          { label: "Date of Birth", value: arrestLogData.DOB },
          { label: "Age", value: arrestLogData.AGE },
          { label: "Sex", value: arrestLogData.SEX },
          { label: "Race", value: arrestLogData.RACE },
        ],
      },
      {
        title: "Arrest Details",
        fields: [
          { label: "Date Arrested", value: arrestLogData.DATE_ARRESTED },
          { label: "Time of Arrest", value: arrestLogData.TIME_ARREST },
          { label: "Arrest Status", value: arrestLogData.ARREST_STATUS },
          { label: "Arrest Charge", value: arrestLogData.Arrest_Charge },
          {
            label: "Charge Description",
            value: arrestLogData.Charge_Description,
          },
          { label: "Charge Sequence", value: arrestLogData.Charge_Sequence },
          { label: "Degree", value: arrestLogData.Degree },
        ],
      },
      {
        title: "Location Information",
        fields: [
          {
            label: "Street Number",
            value: arrestLogData.ArrestLocationStreetNBR,
          },
          { label: "Street", value: arrestLogData.ArrestLocationStreet },
          {
            label: "Apartment/Floor",
            value: arrestLogData.ArrestLocationAptFlr,
          },
          { label: "City", value: arrestLogData.ArrestLocationCity },
        ],
      },
    ];
  }

  if (log.attributes.hasOwnProperty("CitizenComplaint")) {
    const policeComplaintData = log.attributes as PoliceComplaint;
    sections = [
      {
        title: "Police Information",
        fields: [
          { label: "Assignment", value: policeComplaintData.Assignment },
          { label: "Bureau", value: policeComplaintData.Bureau },
          { label: "Division", value: policeComplaintData.Division },
          { label: "Service Type", value: policeComplaintData.ServiceType },
          { label: "Team", value: policeComplaintData.Team },
          { label: "Team", value: policeComplaintData.YearsOfService },
        ],
      },
      {
        title: "Citizen Information",
        fields: [
          { label: "Age", value: policeComplaintData.CitizenAge },
          {
            label: "Complaint",
            value: policeComplaintData.CitizenComplaint,
          },
          { label: "Sex", value: policeComplaintData.CitizenSex },
        ],
      },
      {
        title: "Complaint Details",
        fields: [
          { label: "Allegation", value: policeComplaintData.Allegation },
          {
            label: "Allegation Type",
            value: policeComplaintData.AllegationType,
          },
          { label: "Case Number", value: policeComplaintData.CaseNumber },
          { label: "Count", value: policeComplaintData.Count_ },

          { label: "F First Match", value: policeComplaintData.F_first_match },
          {
            label: "Finding",
            value: policeComplaintData.Finding,
          },
          {
            label: "Incident Number",
            value: policeComplaintData.IncidentNumber,
          },
          { label: "Object ID 1", value: policeComplaintData.OBJECTID_1 },
          { label: "Object ID", value: policeComplaintData.OBJECTID },

          { label: "Occurred Date", value: policeComplaintData.OccurredDate },
          {
            label: "Occurred Day of the Week",
            value: policeComplaintData.OccurredDayOfWeek,
          },
          {
            label: "Source",
            value: policeComplaintData.Source,
          },
          {
            label: "Unique Key",
            value: policeComplaintData.UniqueKey,
          },
        ],
      },
      {
        title: "Location Information",
        fields: [
          {
            label: "Address",
            value: policeComplaintData.Address,
          },
          { label: "Block", value: policeComplaintData.Block },
          {
            label: "City",
            value: policeComplaintData.City,
          },
          {
            label: "State",
            value: policeComplaintData.State,
          },
          { label: "County", value: policeComplaintData.County },
          { label: "Location", value: policeComplaintData.Location },
          {
            label: "Street Direction",
            value: policeComplaintData.StreetDirection,
          },
          {
            label: "Street Name",
            value: policeComplaintData.StreetName,
          },
          {
            label: "Street Type",
            value: policeComplaintData.StreetType,
          },
          {
            label: "Zip Code",
            value: policeComplaintData.Zipcode,
          },
        ],
      },
    ];
  }
  if (log.attributes.hasOwnProperty("CopterUsed")) {
    const policePursuitData = log.attributes as PolicePursuit;
    const policePursuit = log.attributes as PolicePursuit;

    sections = [
      {
        title: "Identification",
        fields: [
          { label: "Object ID", value: policePursuit.OBJECTID },
          { label: "Incident Number", value: policePursuit.IncidentNumber },
          { label: "Unique Key", value: policePursuit.UniqueKey },
          { label: "Case Number", value: policePursuit.CaseNumber },
          { label: "Pursuit Number", value: policePursuit.PursuitNumber },
        ],
      },

      {
        title: "Agency & Assignment",
        fields: [
          { label: "County", value: policePursuit.COUNTY },
          { label: "Division", value: policePursuit.Division },
          { label: "Bureau", value: policePursuit.Bureau },
          { label: "Team", value: policePursuit.Team },
          { label: "Assignment", value: policePursuit.Assignment },
        ],
      },

      {
        title: "Pursuit Details",
        fields: [
          { label: "Occurred Day", value: policePursuit.OccurredDayOfWeek },
          { label: "Occurred Date", value: policePursuit.OccurredDate },
          { label: "Reason", value: policePursuit.Reason },
          { label: "Time of Day", value: policePursuit.TimeOfDay },
          { label: "Vehicle Type", value: policePursuit.VehicleType },
          { label: "Max Speed", value: policePursuit.MaxSpeed },
          { label: "Distance", value: policePursuit.Distance },
          { label: "Aborted", value: policePursuit.Aborted },
          { label: "Accident", value: policePursuit.Accident },
          { label: "Arrest", value: policePursuit.Arrest },
        ],
      },

      {
        title: "Officer & Offender Info",
        fields: [
          { label: "Officer Age", value: policePursuit.OfficerAge },
          { label: "Years of Service", value: policePursuit.YearsOfService },
          { label: "Offender Sex", value: policePursuit.OffenderSex },
          { label: "Offender Race", value: policePursuit.OffenderRace },
        ],
      },

      {
        title: "Equipment & Support",
        fields: [
          { label: "Copter Available", value: policePursuit.CopterAvailable },
          { label: "Copter Used", value: policePursuit.CopterUsed },
          {
            label: "In-car Cam Available",
            value: policePursuit.InCarCamAvailable,
          },
          { label: "In-car Cam Used", value: policePursuit.InCarCamUsed },
          { label: "Stop Device Used", value: policePursuit.StopDeviceUsed },
          { label: "Stop Device", value: policePursuit.StopDevice },
        ],
      },

      {
        title: "Location",
        fields: [
          { label: "Location Began", value: policePursuit.LocationBegan },
          { label: "Location Ended", value: policePursuit.LocationEnded },
          { label: "Weather Condition", value: policePursuit.WeatherCondition },
        ],
      },

      {
        title: "Damage & Outcome",
        fields: [
          { label: "Damage (Human Resources)", value: policePursuit.DamageHR },
          { label: "Damage (Other)", value: policePursuit.DamageOther },
          { label: "Damage (Police)", value: policePursuit.DamagePolice },
          {
            label: "Damage (Parked Vehicle)",
            value: policePursuit.DamageParkedVehicle,
          },
          { label: "Damage (Property)", value: policePursuit.DamageProperty },
          {
            label: "Damage (Suspect Vehicle)",
            value: policePursuit.DamageSuspectVehicle,
          },
          { label: "Injury Type", value: policePursuit.InjuryType },
          { label: "Damage Type", value: policePursuit.DamageType },
          { label: "Liability Claim", value: policePursuit.LiabilityClaim },
        ],
      },

      {
        title: "Policy & Justification",
        fields: [
          { label: "Followed Policy", value: policePursuit.FollowPolicy },
          { label: "Justified", value: policePursuit.JUSTIFIED },
          {
            label: "Influencing Factor",
            value: policePursuit.InfluencingFactor,
          },
        ],
      },

      {
        title: "Additional Info",
        fields: [
          {
            label: "Associated Officer Count",
            value: policePursuit.AssociatedOfficerCount,
          },
          { label: "Officer Condition", value: policePursuit.OfficerCondition },
          { label: "Violation", value: policePursuit.VIOLATION },
          { label: "Aborted By", value: policePursuit.AbortedBy },
          { label: "Concluded By", value: policePursuit.ConcludedBy },
          {
            label: "Initiated By Agency",
            value: policePursuit.InitiatedByAgency,
          },
          {
            label: "Concluded By Agency",
            value: policePursuit.ConcludedByAgency,
          },
          { label: "Total Time (min)", value: policePursuit.TotalTimeMinutes },
        ],
      },
    ];
  }
  if (log.attributes.hasOwnProperty("OfficerInjured")) {
    const policeForce = log.attributes as PoliceForceAttributes;

    sections = [
      {
        title: "Identification",
        fields: [
          { label: "Object ID", value: policeForce.OBJECTID },
          { label: "Incident Number", value: policeForce.IncidentNumber },
          { label: "Unique Key", value: policeForce.UniqueKey },
          { label: "File Number", value: policeForce.FileNumber },
          { label: "Case Number", value: policeForce.CaseNumber },
          { label: "Object ID (Alt)", value: policeForce.OBJECTID_1 },
        ],
      },

      {
        title: "Incident Details",
        fields: [
          { label: "Occurred Day", value: policeForce.OccurredDayOfWeek },
          { label: "Occurred Date", value: policeForce.OccurredDate },
          { label: "Call Type", value: policeForce.CallType },
          { label: "Reason", value: policeForce.Reason },
          {
            label: "Aggravating Factors",
            value: policeForce.AggravatingFactors,
          },
          { label: "Use Of Force Type", value: policeForce.UseOfForceType },
          {
            label: "Use Of Force Scale",
            value: policeForce.UseOfForceTypeScale,
          },
          { label: "Disposition", value: policeForce.Disposition },
        ],
      },

      {
        title: "Agency & Assignment",
        fields: [
          { label: "County", value: policeForce.County },
          { label: "Division", value: policeForce.Division },
          { label: "Bureau", value: policeForce.Bureau },
          { label: "Team", value: policeForce.Team },
          { label: "Assignment", value: policeForce.Assignment },
          { label: "Years of Service", value: policeForce.YearsOfService },
        ],
      },

      {
        title: "Suspect Information",
        fields: [
          { label: "Suspect Arrested", value: policeForce.SuspectArrested },
          { label: "Suspect Injured", value: policeForce.SuspectInjured },
          {
            label: "Suspect Hospitalized",
            value: policeForce.SuspectHospitalized,
          },
        ],
      },

      {
        title: "Officer Information",
        fields: [
          { label: "Officer Injured", value: policeForce.OfficerInjured },
          {
            label: "Officer Hospitalized",
            value: policeForce.OfficerHospitalized,
          },
        ],
      },

      {
        title: "Location",
        fields: [
          { label: "Location", value: policeForce.Location },
          { label: "Address", value: policeForce.Address },
          { label: "Block", value: policeForce.Block },
          { label: "Street Name", value: policeForce.StreetName },
          { label: "Street Type", value: policeForce.StreetType },
          { label: "Street Direction", value: policeForce.StreetDirection },
          { label: "City", value: policeForce.City },
          { label: "State", value: policeForce.State },
          { label: "Zipcode", value: policeForce.Zipcode },
        ],
      },

      {
        title: "Metadata",
        fields: [
          { label: "Count", value: policeForce.Count_ },
          { label: "First Match", value: policeForce.F_first_match },
        ],
      },
    ];
  }

  return sections;
}
