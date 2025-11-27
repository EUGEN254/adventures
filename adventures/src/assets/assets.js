import profile_pic from "./profile_pic.png";
import logo from "./logo.png";
import dropdown_icon from "./dropdown_icon.svg";
import menu_icon from "./menu_icon.svg";
import cross_icon from "./cross_icon.png";
import verified_icon from "./verified_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import info_icon from "./info_icon.svg";
import upload_icon from "./upload_icon.png";
import explorebeach from "./explorebeach.jpg";
import exploremountain from "./homebeach.jpg";
import explorecity from "./hometrees.jpg";
import play_store from "./play_store.png";
import app_store from "./app_store.png";
import arrowIcon from "./arrowIcon.svg";
import instagramIcon from "./instagramIcon.svg";
import facebookIcon from "./facebookIcon.svg";
import twitterIcon from "./twitterIcon.svg";
import about_image from "./about_image.jpg";
import  hotel1 from './hotel1.jpg'
import  hotel2 from './hotel2.jpg'
import  hotel3 from './hotel3.jpg'

export const assets = {
  logo,
  verified_icon,
  info_icon,
  profile_pic,
  play_store,
  arrow_icon,
  app_store,
  arrowIcon,
  hotel1,
  hotel2,
  hotel3,
  about_image,
  instagramIcon,
  facebookIcon,
  twitterIcon,
  explorebeach,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
};

export const features = [
  {
    id: 101,
    title: "Beach Adventures",
    desc: "Relax or party by the ocean with stunning views.",
    img: explorebeach,
    total: 100,
    slots_booked: {
      "21_9_2025": {
        "10:00": 3, // 3 bookings so far
        "10:30": 5, // fully booked
      },
    },
  },
  {
    id: 102,
    title: "Mountain Trips",
    desc: "Hike breathtaking trails and enjoy fresh air.",
    img: exploremountain,
    total: 100,
    slots_booked: {},
  },
  {
    id: 103,
    title: "City Tours",
    desc: "Discover culture, food, and nightlife in vibrant cities.",
    img: explorecity,
    total: 100,
    slots_booked: {},
  },
];

export const userBookings = [
  {
    id: 1,
    place: "Beach Resort",
    date: "2025-09-25",
    location: "Maldives",
    image: explorebeach,
    is_paid: false,
    total: 100,
  },
  {
    id: 2,
    place: "Mountain Cabin",
    date: "2025-10-05",
    location: "Swiss Alps",
    image: explorebeach,
    is_paid: true,
    total: 200,
  },
  {
    id: 3,
    place: "City Hotel",
    date: "2025-11-15",
    location: "New York, USA",
    image: explorebeach,
    is_paid: false,
    total: 300,
  },
];

export const verifiedHotels = [
  {
    featureId: 101, // Beach Adventures
    hotels: [
      { name: "Ocean View Resort", img: hotel1, price: 200 },
      { name: "Sunset Beach Hotel", img: hotel1, price: 200 },
      { name: "Palm Paradise", img: hotel1, price: 200 },
    ],
  },
  {
    featureId: 102, // Mountain Trips
    hotels: [
      { name: "Island Retreat", img: hotel2, price: 200 },
      { name: "Coral Bay Hotel", img: hotel2, price: 200 },
      { name: "Caribbean Luxury", img: hotel2, price: 200 },
    ],
  },
  {
    featureId: 103, // City Tours
    hotels: [
      { name: "Desert Lodge", img: hotel3, price: 200 },
      { name: "Sahara View Hotel", img: hotel3, price: 200 },
    ],
  },
];

