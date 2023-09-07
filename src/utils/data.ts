import { ILocationData } from '../services/types/location';
import { IScheduleData } from '../services/types/schedule';
import skyFitnesImage from '../assets/locations-page/sky-fitness.jpg';
import faceToFaceImage from '../assets/locations-page/face-to-face.jpg';
import tigerImage from '../assets/locations-page/tiger.jpg';
import ninjafitImage from '../assets/locations-page/ninjafit.jpg';

const scheduleData = {
  monday: [
    { startTime: '12:00', endTime: '13:30', trainer: 'Тренер 1' },
    { startTime: '13:30', endTime: '14:00', trainer: 'Тренер 1' },
  ],
  tuesday: [
    { startTime: '15:00', endTime: '16:30', trainer: 'Тренер 2' },
    { startTime: '18:00', endTime: '19:30', trainer: 'Тренер 2' },
  ],
  wednesday: [
    { startTime: '12:00', endTime: '13:30', trainer: 'Тренер 1' },
    { startTime: '13:30', endTime: '14:00', trainer: 'Тренер 3' },
  ],
  thursday: [],
  friday: [{ startTime: '13:30', endTime: '14:00', trainer: 'Тренер 3' }],
  saturday: [{ startTime: '15:30', endTime: '17:00', trainer: 'Тренер 2' }],
  sunday: [
    { startTime: '12:00', endTime: '13:30', trainer: 'Тренер 1' },
    { startTime: '13:30', endTime: '14:00', trainer: 'Тренер 1' },
    { startTime: '14:00', endTime: '15:30', trainer: 'Тренер 1' },
  ],
};

export const locationsData = [
  {
    name: 'Face to Face',
    photo: faceToFaceImage,
    address: 'Московская область г.Красногорск ул. Ново-Никольская 6Д',
    map: `<div style="position:relative;overflow:hidden;"><a href="https://yandex.ru/maps/org/face_to_face/84049475209/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Face to Face</a><a href="https://yandex.ru/maps/10735/krasnogorsk/category/fitness_club/184107363/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:14px;">Фитнес-клуб в Красногорске</a><a href="https://yandex.ru/maps/10735/krasnogorsk/category/sports_hall_gym/41430094175/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:28px;">Спортивный, тренажёрный зал в Красногорске</a><iframe src="https://yandex.ru/map-widget/v1/?ll=37.263888%2C55.837111&mode=poi&poi%5Bpoint%5D=37.263766%2C55.837197&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D84049475209&z=21" width="100%" height="400" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div>`,
    schedule: scheduleData,
    id: 0,
    photoId: 0,
  },
  {
    name: 'Tiger',
    photo: tigerImage,
    address: 'Московская область Красногорск Международная ул..,12 ТЦ Вегас',
    map: `<div style="position:relative;overflow:hidden;"><a href="https://yandex.ru/maps/org/tiger/193644313166/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Tiger</a><a href="https://yandex.ru/maps/10735/krasnogorsk/category/sports_club/184107297/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:14px;">Спортивный клуб, секция в Красногорске</a><a href="https://yandex.ru/maps/10735/krasnogorsk/category/sports_hall_gym/41430094175/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:28px;">Спортивный, тренажёрный зал в Красногорске</a><iframe src="https://yandex.ru/map-widget/v1/?indoorLevel=5&ll=37.386659%2C55.820985&mode=search&oid=193644313166&ol=biz&sctx=ZAAAAAgBEAAaKAoSCZbtQ95ysUJAEY6s%2FDIY6UtAEhIJ9UwvMZbphz8RkL5J06Bobj8iBgABAgMEBSgKOABA71NIAWISbGV0b192X2dvcm9kZT10cnVlagJydZ0BzcxMPaABAKgBAL0BTucn2cIBBs705rDRBeoBAPIBAPgBAIICBXRpZ2VyigIAkgIAmgIMZGVza3RvcC1tYXBz&sll=37.386659%2C55.820985&sspn=0.020049%2C0.006375&text=tiger&z=16.62" width="560" height="400" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div>`,
    schedule: scheduleData,
    id: 0,
    photoId: 0,
  },
  {
    name: 'Ninjafit',
    photo: ninjafitImage,
    address: 'Москва ул.Хорошёвское ш., 16, стр. 3, Москва, 125284 • этаж 1 ',
    map: `<div style="position:relative;overflow:hidden;"><a href="https://yandex.ru/maps/org/ninjafit/136731312796/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Ninjafit</a><a href="https://yandex.ru/maps/213/moscow/category/fitness_club/184107363/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:14px;">Фитнес-клуб в Москве</a><a href="https://yandex.ru/maps/213/moscow/category/sports_club/184107297/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:28px;">Спортивный клуб, секция в Москве</a><iframe src="https://yandex.ru/map-widget/v1/?ll=37.546789%2C55.774048&mode=search&oid=136731312796&ol=biz&sctx=ZAAAAAgBEAAaKAoSCRoYeVkTxUJAETMXuDzW4ktAEhIJ9UwvMZbppz8RRDAOLh1zjj8iBgABAgMEBSgKOABAppIHSAFiEmxldG9fdl9nb3JvZGU9dHJ1ZWoCcnWdAc3MTD2gAQCoAQC9AaZuUZ3CAYgB9uehtKoG5OTi69cDr6LYkwTEmP%2FpA6e2l89259jd8wPturL2IMqSgZikA5TCsNTdBanF6KybAZyFya79A9iHyeoEmZXpgYkCzqWzngfw2qGIBdSljqwErfjxjesGiaWlg%2B8Go9mRhQei6Lr5A8TFuLUGg6ey240Fo8HN0MoG1PXBhASYi%2FThBOoBAPIBAPgBAIICEtGB0L%2FQvtGA0YLQutC70YPQsYoCCTE4NDEwNzI5N5ICAJoCDGRlc2t0b3AtbWFwc6oC7gEyMjg3MDY1MTE3MzYsMjM3ODUxMTc5NDAzLDE4MDUxNTM0MDExLDI0MTU0Mjc1NDk4MSwyMTgxMzg3MTAzNjQsMTU4ODEzMzk0NjMyLDEwOTk3NjA5OTExMSwyMjM3NzY0NDc0MjQsMTI3ODgzODE0MzE0LDczMTgwMTMyNzMyLDIxNDMzNTAzMzcwMiwzMTUwMzE1MTQyOCwyMjI4OTU2ODQ0ODMsOTUyOTQ1OTI1NDIsMTQ5NzY0NzQ1OSwxMDU1OTcyMjYwMjQsNjEyODI2NDEyMjYsODgzMjAwMjM1NDQsMjI4MzUyMzM4ODU5&sll=37.546172%2C55.774048&sspn=0.004612%2C0.001468&text=%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%BA%D0%BB%D1%83%D0%B1&z=18.74" width="560" height="400" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div>`,
    schedule: scheduleData,
    id: 0,
    photoId: 0,
  },
  {
    name: 'Sky Fitness',
    photo: skyFitnesImage,
    address: 'Москва ул.Пятницкое ш., 43, Москва, 125310 • этаж -1',
    map: `<div style="position:relative;overflow:hidden;"><a href="https://yandex.ru/maps/org/sky_fitness/142060829267/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Sky Fitness</a><a href="https://yandex.ru/maps/213/moscow/category/fitness_club/184107363/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:14px;">Фитнес-клуб в Москве</a><a href="https://yandex.ru/maps/213/moscow/category/sports_hall_gym/41430094175/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:28px;">Спортивный, тренажёрный зал в Москве</a><iframe src="https://yandex.ru/map-widget/v1/?ll=37.350492%2C55.857129&mode=poi&poi%5Bpoint%5D=37.350201%2C55.857216&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D142060829267&z=20.28" width="560" height="400" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div>`,
    schedule: scheduleData,
    id: 0,
    photoId: 0,
  },
];
