export const url = "https://api.topfightschool.ru";
// export const url = 'http://localhost:3001'
export const googleSheetsUrl =
  "https://script.google.com/macros/s/AKfycbxkxjNqAx1U_WmhwlLn0CKuQ4PA-PrnKK-31RVUgn71zNTyaMhzd__wi1CggSuCVcqr1g/exec";

export enum Routes {
  Home = "/",
  Locations = "/locations",
  Children = "/children",
  Adults = "/adults",
  Camps = "/camps",
  Competitions = "/competitions",
  Trainings = "/trainings",
  Shop = "/shop",
  Team = "/team",
  Contacts = "/contacts",
  Appointment = "/appointment",
  Gallery = "/gallery",
}

export enum AdminRoutes {
  Home = "/admin",
  Locations = "/admin/locations",
  Team = "/admin/team",
}

export enum WeekDays {
  Monday = "Понедельник",
  Tuesday = "Вторник",
  Wednesday = "Среда",
  Thursday = "Четверг",
  Friday = "Пятница",
  Saturday = "Суббота",
  Sunday = "Воскресенье",
}
