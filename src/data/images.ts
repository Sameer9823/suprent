/**
 * Central image catalogue (Unsplash, stable photo IDs).
 * Replace entries here, or per-item `images` in properties.ts / facilities.ts,
 * with real SUPGS photography when it is available.
 * If a photo ever disappears from Unsplash, <SafeImage> shows a neutral fallback
 * instead of a broken image, so pages keep working.
 */
export function unsplash(id: string, width = 1600): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=75`;
}

export const photo = {
  heroBuilding: "photo-1486406146926-c627a92ad1ab",
  aboutBuilding: "photo-1545324418-cc1a3fa10c00",
  officeTowers: "photo-1560179707-f14e90ef3623",
  officeInterior: "photo-1497366216548-37526070297c",
  officeOpen: "photo-1497366811353-6870744d04b2",
  storeInterior: "photo-1441986300917-64674bd600d8",
  shopping: "photo-1472851294608-062f824d29cc",
  retailStore: "photo-1515169067868-5387ec356754",
  phone: "photo-1511707171634-5f897ff02aa9",
  car: "photo-1492144534655-ae79c964c9d7",
  tractor: "photo-1592982537447-7440770cbfc9",
  hospital: "photo-1519494026892-80bbd2d6fd0d",
  hospitalCorridor: "photo-1538108149393-fbbd81895907",
  restaurant: "photo-1517248135467-4c7edcad34c4",
  hotel: "photo-1566073771259-6a8506099945",
  eventHall: "photo-1519167758481-83f550bb49b3",
  banquet: "photo-1464366400600-7168b8af9bc3",
  classroom: "photo-1580582932707-520aed937b7b",
  warehouse: "photo-1586528116311-ad8dd3c8310d",
  warehouseShelves: "photo-1553413077-190dd305871c",
  library: "photo-1481627834876-b7833e8f5570",
  libraryStudy: "photo-1521587760476-6c12a4b040da",
  laundry: "photo-1517677208171-0bc6725a3e60",
  laundryMachines: "photo-1582735689369-4fe89db7114c",
  gym: "photo-1534438327276-14e5300c3a48",
  gymFloor: "photo-1571902943202-507ec2618e8f",
} as const;

export type PhotoKey = keyof typeof photo;

export function img(key: PhotoKey, alt: string, width = 1600) {
  return { src: unsplash(photo[key], width), alt };
}
